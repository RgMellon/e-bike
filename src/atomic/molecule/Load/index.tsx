import { Center, useTheme } from "native-base";
import { ActivityIndicator } from "react-native";

export function Load() {
  const {colors} = useTheme()
  return <Center flex="1">
      <ActivityIndicator color={colors.purple[50]} />
  </Center>
}