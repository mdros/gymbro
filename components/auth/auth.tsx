import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { Input, Label, Text, Theme, View } from "tamagui";

import { useAuth } from "~/components/auth/ctx";
import { supabase } from "~/utils/supabase";
import { MyButton } from "~/components/MyButton";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { session, logOut } = useAuth();

  const signInWithEmail = async () => {
    setLoading(true);

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    router.replace("/home");
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    if (!session) {
      Alert.alert("Please check your inbox for email verification!");
    }

    setLoading(false);
  };

  if (session) {
    return (
      <View>
        <Text>Hello, {session.user.email}</Text>
        <MyButton onPress={() => router.replace("/home")}>Go home</MyButton>
        <MyButton onPress={() => logOut()}>Log out</MyButton>
      </View>
    );
  }

  return (
    <View
      height="100%"
      width="100%"
      display="flex"
      padding={20}
      justifyContent="space-between"
    >
      <View paddingBottom={100}>
        <Label>Email</Label>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <Label>Password</Label>
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>

      <View>
        <MyButton disabled={loading} onPress={() => signInWithEmail()}>
          Sign in
        </MyButton>

        <MyButton disabled={loading} onPress={() => signUpWithEmail()}>
          Sign up
        </MyButton>
      </View>
    </View>
  );
}
