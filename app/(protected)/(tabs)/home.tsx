import { useRouter } from "expo-router";
import { View } from "tamagui";

import MealTile from "~/components/MealTile";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "~/components/MyButton";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="flex w-10/12 gap-6">
        <MyButton onPress={() => router.push("/scan")}>Scan</MyButton>
        <MealTile name="Breakfast" />
        <MealTile name="Lunch" />
        <MealTile name="Dinner" />
        <MealTile name="Supper" />
        <MyButton onPress={() => router.replace("/")}>Go to sign-in</MyButton>
      </View>
    </SafeAreaView>
  );
}
