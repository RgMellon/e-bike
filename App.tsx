
import React from "react";
import 'intl';
import 'intl/locale-data/jsonp/en'

import { NativeBaseProvider, Box } from "native-base";
import { StatusBar } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { theme } from './src/styles/theme'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from "./src/routes/app.routes";
import { CartProvider } from './src/hooks/use-cart'




const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const navigationTheme = DefaultTheme
navigationTheme.colors.background = theme.colors.primary[100]



export default function App() {

  return (
      <NativeBaseProvider theme={theme} config={config}>
              <Box flex="1" safeAreaTop bg={theme.colors.primary[100]}>
                <GestureHandlerRootView style={{flex: 1, backgroundColor: theme.colors.primary[100]}}> 
                  <NavigationContainer theme={navigationTheme}>
                        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                       
                          <CartProvider>
                            <AppRoutes />
                          </CartProvider>
                        
                  </NavigationContainer>
                </GestureHandlerRootView>
              </Box>
      </NativeBaseProvider>
  );
}