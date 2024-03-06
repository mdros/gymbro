import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text, View } from "tamagui";

export default function MealTile({ name }: { name: string }) {
  const router = useRouter();
  return (
    <View>
      <View>
        <Text>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        <Text className="">0 kcal</Text>
      </View>

      <TouchableOpacity onPress={() => router.push("/scan")}>
        <Feather name="plus-square" size={38} />
      </TouchableOpacity>
    </View>
  );
}
