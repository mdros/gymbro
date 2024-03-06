import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera/next";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "~/components/MyButton";
import { CameraType } from "expo-camera";
import { getProductInfo } from "~/api/foodApi";
import _ from "lodash";

type BarcodeData = {
  code: string;
  type: string;
};

export default function Home() {
  const [permissions, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [barcodeData, setBarcodeData] = useState<BarcodeData | null>(null);

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await requestPermission();
    };
    getPermission();
  }, [requestPermission]);

  if (!permissions || !Device.isDevice) {
    return (
      <SafeAreaView>
        <Text>No camera detected or running in simulator</Text>
      </SafeAreaView>
    );
  }

  const handleBarcodeScanned = async ({
    data,
    type,
  }: BarcodeScanningResult) => {
    console.log("log log");
    const productInfo = await getProductInfo(data);
    setBarcodeData({
      code: data,
      type: type,
    });
    setCameraOpen(false);
    Alert.alert(`${productInfo?.name} - scanned`);
  };

  const handleBarcodeScannedDebounced = _.debounce(handleBarcodeScanned, 200);

  const renderCamera = () => {
    return (
      <CameraView
        style={[cameraOpen && StyleSheet.absoluteFill, { zIndex: 10 }]}
        onBarcodeScanned={handleBarcodeScannedDebounced}
        mode="picture"
        facing={CameraType.back}
      >
        <View style={styles.cameraContainer}>
          <View style={styles.frame} />
        </View>
      </CameraView>
    );
  };

  return (
    <>
      {cameraOpen && renderCamera()}
      <SafeAreaView style={{}}>
        <View className="h-full bg-background">
          <MyButton onPress={() => setCameraOpen(true)}>Scan barcode</MyButton>
          <Text className="text-2xl color-primary">{`Code: ${barcodeData?.code}`}</Text>
          <Text className="text-2xl color-secondary">{`Type: ${barcodeData?.type}`}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
});
