import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function register() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
        <Text>Register</Text>
        <Link href="/login" replace>
        <Text>Log Into Existing Site</Text>
        </Link>
      </View>
    )
  };

