import React from "react";
import {  Box, Image, Text } from "native-base";
import { TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export type CardProps = {
    title: string;
    price: number;
    model: string
    image: string
    id: string
    formatPrice: string
    amount?: number
}

export function Card({image, title, model, id, formatPrice}: CardProps) {
    const {navigate} = useNavigation()

    function handleRedirect() {
        navigate('Detail', {
            equipmentId: id
        })
    }

    return  (
        <TouchableOpacity style={{padding: 5, width: '50%', height: 240, opacity: .9}} onPress={handleRedirect}>
            <Box
                borderRadius="20px" 
                p="4" flex="1" 
                shadow="5" 
                bg="primary.50:alpha.9" 
                justifyContent="center"
                alignItems="center"
            >   
                <Box>
                    <Image src={image} w="121px" h="80px" alt="bike img" resizeMode="contain" />
                    <Box mt="17px">
                        <Text fontSize="sm" bold color="white:alpha.50">{title}</Text>
                        <Text fontSize="md" bold color="white">{model}</Text>
                        <Text fontSize="sm" bold color="white:alpha.50">{formatPrice}</Text>
                    </Box>
                </Box>
            </Box>
        </TouchableOpacity>
    )
}




