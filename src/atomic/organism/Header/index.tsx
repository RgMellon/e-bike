import React from "react";
import { HStack, Icon, Pressable, Text } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { GradientSquareButton } from "../../atoms/GradientSquareButton";


type Props = {
    inverted?: boolean,
    type?: 'goBack' | 'default' | 'down',
    handlePress: () => void
    text?: string
} 

export function Header({inverted = false, type = 'default', handlePress, text}: Props) {

    const iconModfier = {
        default: 'search1',
        goBack: 'left',
        down: 'down',
    }

    return  (
        <Pressable flexDir="row" h="100px" justifyContent={inverted ? 'flex-start' : 'space-between'} alignItems="center" >
            {!inverted && <Text fontSize="lg" fontWeight="bold" color="white">{text}</Text> }
                
            <GradientSquareButton onPress={handlePress}> 
                <Icon as={AntDesign} name={iconModfier[type]} color="white"/> 
            </GradientSquareButton>
                
            {inverted && <Text fontSize="lg" fontWeight="bold" ml="20px" color="white">{text}</Text>}
        </Pressable>
    )
}