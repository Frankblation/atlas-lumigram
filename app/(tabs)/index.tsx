import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, Alert, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LongPressGestureHandler, TapGestureHandler, State } from "react-native-gesture-handler";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";


interface Post {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
  createdAt: any;
}

const testFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    console.log("Firestore Connected. Found Documents:", querySnapshot.size);
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
  }
};

interface Post {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
  createdAt: any;
}

const FeedItem = ({ item }: { item: Post }) => {
  const [showCaption, setShowCaption] = useState(false);
  const doubleTapRef = useRef(null);

  const handleLongPress = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) setShowCaption(true);
    else if (nativeEvent.state === State.END) setShowCaption(false);
  };

  const handleSingleTap = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      Alert.alert("That's just one tap, partner!");
    }
  };

  const handleDoubleTap = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      Alert.alert("Double Tap", `You liked ${item.createdBy}'s post!`);
    }
  };

  return (
    <View style={styles.item}>
      <TapGestureHandler onHandlerStateChange={handleSingleTap} waitFor={doubleTapRef}>
        <View>
          <TapGestureHandler ref={doubleTapRef} numberOfTaps={2} onHandlerStateChange={handleDoubleTap}>
            <View>
              <LongPressGestureHandler onHandlerStateChange={handleLongPress} minDurationMs={300}>
                <View>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  {showCaption && (
                    <View style={styles.overlayCaption}>
                      <Text style={styles.overlayCaptionText}>{item.caption}</Text>
                    </View>
                  )}
                </View>
              </LongPressGestureHandler>
            </View>
          </TapGestureHandler>
        </View>
      </TapGestureHandler>
    </View>
  );
};

export default function HomeScreen() {
  const auth = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastPost, setLastPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts(isRefresh = false) {
    if (loading) return;
    setLoading(true);

    const { posts: newPosts, lastPost: newLastPost } = await firestore.fetchPosts(
      isRefresh ? null : lastPost
    );

    if (isRefresh) {
      setPosts(newPosts);
    } else {
      setPosts([...posts, ...newPosts]);
    }

    setLastPost(newLastPost);
    setLoading(false);
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userIdText}>Logged in {auth.user?.displayName}</Text>
      <FlashList
        data={posts}
        renderItem={({ item }) => <FeedItem item={item} />}
        estimatedItemSize={400}
        keyExtractor={(item) => item.id}
        onEndReached={() => loadPosts()}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadPosts(true)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0000", paddingTop: 10 },
  userIdText: { color:"#ffff", textAlign: "center", fontSize: 16, marginBottom: 10 },
  item: { marginBottom: 50, marginLeft: 6, marginRight: 6, backgroundColor: "#ffff", borderRadius: 10},
  image: { width: "100%", height: 450, borderRadius:0, borderWidth:10},
  overlayCaption: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  overlayCaptionText: { color: "#fff", fontSize: 16, padding: 20, textAlign: "center" },
});
