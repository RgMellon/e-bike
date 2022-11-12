import React from "react";
import {  Box, HStack, Image, Text } from "native-base";

import bike from '../../../img/categories/subtract.png'
import helmet from '../../../img/categories/helmet.png'
import mountain from '../../../img/categories/mountain.png'
import road from '../../../img/categories/road.png'

export function CategoryList() {
    return  (
        <Box mb="20px" mt="5px" alignSelf="center" justifyContent="space-between">
            <HStack justifyContent="space-between" width="95%">
            
            <Box w="50px" h="50px" justifyContent="center" alignItems="center" borderRadius="10px" shadow="5" bg={
                    { linearGradient: 
                    { colors: ['ocean.100', 'purple.100'],
                       start: [0.3, 0.3],
                       end: [0.6, 0.8],
                    },
                }} >
                <Text color="white"> All </Text>
            </Box> 

            <Box mt="-10px" justifyContent="center" alignItems="center"  w="50px" h="50px" borderRadius="10px" shadow="5"  bg="primary.50:alpha.9" >
                <Image source={bike} alt="image of bike" />
            </Box> 

            <Box  mt="-20px" justifyContent="center" alignItems="center"  w="50px" h="50px" borderRadius="10px" shadow="5" opacity="1" bg="primary.50:alpha.9" >
                <Image source={road} alt="image of bike" /> 
            </Box> 

            <Box  mt="-30px" justifyContent="center" alignItems="center"  w="50px" h="50px" borderRadius="10px" opacity="0.7" shadow="5"  bg="primary.50:alpha.9" >
                <Image source={helmet} alt="image of bike" />
            </Box> 

            <Box  mt="-40px" justifyContent="center" alignItems="center"  w="50px" h="50px" borderRadius="10px" opacity="0.6" shadow="5"  bg="primary.50:alpha.9" >
                <Image source={mountain} alt="image of bike" />
            </Box> 
            </HStack>
        </Box>
    )
}




