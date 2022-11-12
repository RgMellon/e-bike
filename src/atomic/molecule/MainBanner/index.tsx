import React from "react";
import {  Box, Image } from "native-base";


import slider from '../../../img/slider.png';
import bike from '../../../img/bike.png';

import { ImageBackground } from "react-native";

export function MainBanner() {
    return <Box w="100%" h="300" mt="-20px">
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} resizeMode="contain" source={slider}  >
                <Image source={bike} alt="bike"/>
            </ImageBackground>
        </Box>
    }