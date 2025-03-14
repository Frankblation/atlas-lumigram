import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/components/AuthProvider";
import Loading from "@/components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();  // Destructure the login function from useAuth

  async function handleSignIn() {
    setLoading(true);
    try {
      console.log("Login attempt with:", { email, password });
      await login(email, password); // Call login from AuthProvider
      router.replace('/(tabs)');  // Navigate to the authenticated screen
    } catch (error) {
      alert("Email or password is incorrect");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Replacing text with logo images */}
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.loginText}>Login</Text>

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

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>

        <Link href="/register" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Create a new account</Text>
          </Pressable>
        </Link>
      </View>
      {loading && <Loading />}
    </View>
  )
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
  loginText: {
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
})
