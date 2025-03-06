import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/components/AuthProvider";



export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
      try {
        console.log("Register attempt with:", { email, password });
        await register(email, password);
        router.replace("/(tabs)");
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert("Registration Failed", error.message);
        } else {
          Alert.alert("Registration Failed", "An unknown error occurred");
        }
      }
    };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.registerText}>Register</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#A0A0A0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Link href="/login" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Log Into Existing Site</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A30",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 240,
    height: 150,
    resizeMode: "contain",
  },
  registerText: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 24,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    width: "100%",
    backgroundColor: "#050A30",
    borderColor: "#4ECDC4",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#4ECDC4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  linkButton: {
    width: "100%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  linkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
