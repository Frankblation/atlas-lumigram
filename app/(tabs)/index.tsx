import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed } from "@/placeholder";
import { LongPressGestureHandler, TapGestureHandler, State } from "react-native-gesture-handler";
interface ItemProps {
  item: {
    id: string;
    image: string;
    caption: string;
    createdBy: string;
    };
  };

const FeedItem = ({ item }: ItemProps)=> {
  const [showCaption, setShowCaption] = useState(false);
  const doubleTapRef = useRef(null);

  const handleLongPress = (event: { nativeEvent: { state: number; }; }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setShowCaption(true);
    } else if (event.nativeEvent.state === State.END) {
      setShowCaption(false);
    }
  };

  const handleSingleTap = (event: { nativeEvent: { state: number; }; }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
    Alert.alert("that's just one tap partner"
    );
    }
  };

  const handleDoubleTap = (event: { nativeEvent: { state: number; }; }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert("Double Tap", `You liked ${item.createdBy}'s post!`);
    }
  };

  return (
    <View style={styles.Item}>
      {/* Single Tap Gesture Handler */}
      <TapGestureHandler
        onHandlerStateChange={handleSingleTap}
        waitFor={doubleTapRef}
      >
        <View>
          {/* Double Tap Gesture Handler */}
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            onHandlerStateChange={handleDoubleTap}
          >
            <View>
              {/* Long Press Gesture Handler */}
              <LongPressGestureHandler
                onHandlerStateChange={handleLongPress}
                minDurationMs={300}
              >
                <View>
                  <Image source={{ uri: item.image }} style={styles.Image} />
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
  return (
    <View style={styles.container}>
      <FlashList
        data={homeFeed}
        renderItem={({ item }) => <FeedItem item={item} />}
        estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    marginBottom: 70,
  },
  Item: {
    marginBottom: 50,
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  Image: {
    width: "100%",
    height: 340,
    borderRadius: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  caption: {
    color: "#333",
  },
  overlayCaption: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  overlayCaptionText: {
    color: "#fff",
    fontSize: 16,
    padding: 20,
    textAlign: "center",
  }
});
