import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { homeFeed } from "@/placeholder";


export default function FeedScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
      <Text style={styles.createdBy}>Posted by: {item.createdBy}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={homeFeed}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A30",
    padding: 10,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  caption: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 8,
  },
  createdBy: {
    color: "#A0A0A0",
    fontSize: 14,
    marginTop: 4,
  },
});
