import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import CustomInput from '@/components/CustomInput';
import ImagePickerComponent from '@/components/ImagePicker';
import Animated, { FlipInEasyX } from 'react-native-reanimated';
import storage from '@/lib/storage';
import { Firestore } from 'firebase/firestore';

export default function AddPostScreen() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageSelected = (uri: string | null) => {
    console.log("Image selected:", uri);
    setImageUri(uri);
  };

  // Function to handle image upload
  const handleSave = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);
    try {
      // Generate a unique filename for the image
      const filename = `post_${Date.now()}.jpg`;

      // Upload the image to Firebase Storage
      const response = await storage.upload(imageUri, filename);
      const downloadUrl = response?.downloadUrl || "";

      console.log("Image uploaded successfully:", downloadUrl);
      Alert.alert('Success', 'Post created successfully!');

      // Reset the form after successful upload
      resetForm();
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setCaption("");
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImagePickerComponent onImageSelected={handleImageSelected} imageUri={imageUri} />
      </View>

      <View style={styles.buttonContainerTwo}>
        <CustomInput
          placeholder="Add a caption"
          placeholderTextColor="gray"
          secureTextEntry={false}
          onChangeText={setCaption}
          value={caption}
          style={{ color: 'black' }}
        />

        <View style={styles.buttonContainer}>
          <Animated.View entering={FlipInEasyX.duration(200)}>
            <Pressable
              style={[styles.button, styles.buttonOne]}
              onPress={handleSave} // Trigger the save/upload function
              disabled={loading}
            >
              <Text style={styles.text}>{loading ? 'Uploading...' : 'Save'}</Text>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FlipInEasyX.duration(300)}>
            <Pressable
              style={[styles.button, styles.buttonTwo]}
              onPress={resetForm} // Reset the form
            >
              <Text style={{ color: "black" }}>Reset</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    height: "100%",
    padding: 16,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  buttonContainerTwo: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonOne: {
    backgroundColor: "#1ED2AF",
  },
  buttonTwo: {
    borderWidth: 2,
    borderColor: "black",
  },
});
