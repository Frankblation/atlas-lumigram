"use client"

import { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignIn = () => {
    console.log("Login attempt with:", { email, password })
    router.replace("/(tabs)")
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Atlas</Text>
        <Text style={styles.schoolText}>SCHOOL</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A30",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  schoolText: {
    fontSize: 28,
    color: "#4ECDC4",
    letterSpacing: 8,
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

