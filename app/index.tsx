import Auth from "~/components/auth/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";

export default function Page() {
  return (
    <SafeAreaView>
      <Auth />
    </SafeAreaView>
  );
}
