
import { Link, useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'


export default function login() {
    const router = useRouter();
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Login</Text>
        <Link href="/register" replace>
        <Text>Create New Account</Text>
        </Link>
        <Pressable onPress={() => {
            router.push("/(tabs)")
        }}
        >
        <Text>Sign In</Text>
        </Pressable>
      </View>
    )
  };

