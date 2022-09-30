import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { SafeAreaView } from "react-native";

import { theme } from './src/styles/theme'
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.ocean}}>
        <Box>Hello world</Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}