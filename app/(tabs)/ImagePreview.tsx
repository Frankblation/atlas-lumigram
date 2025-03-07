import { View, Image, StyleSheet, Text } from "react-native"

interface ImagePreviewProps {
  src?: string;
}

export default function ImagePreview({ src }: ImagePreviewProps) {
  if (!src) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>No image selected</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: src }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    color: "#888",
    fontSize: 16,
  },
})

