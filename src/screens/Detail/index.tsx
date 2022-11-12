import React, {  useEffect, useState } from "react";
import {  Box, Button, Image, HStack, Text } from "native-base";
import rectangle from '../../img/rectangle.png'

import { FadeAnimation } from "../../atomic/atoms/FadeAnimation";
import Animated, {  useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { Header } from "../../atomic/organism/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../service/api";
import { CardProps } from "../../atomic/molecule/Card";
import { useCart } from "../../hooks/use-cart";
import { formatPrice } from "../../utils/format-price";
import { Load } from "../../atomic/molecule/Load";

type RouteParams = {
    equipmentId: string;
  };

export function Detail() {
    const {goBack, navigate} = useNavigation()
    const route = useRoute();
    const {equipmentId} = route.params as RouteParams;
    
    const cardOffset = useSharedValue(440);
    
    const [showDescription, setShowDescription] = useState(true)
    const [loading, setLoading] = useState(true)
    const [equipment, setEquipment] = useState<CardProps>({} as CardProps)
    const {addToCart} = useCart()
    
    useEffect(() => {
        async function getEquipmentById() {
            setLoading(true)
           try {
                const response = await api.get(`equipments/${equipmentId}`)
                setEquipment(response.data)
                
           }  catch(err) {

           } finally {
               setLoading(false)
           }
        }

        getEquipmentById()
    }, [equipmentId])

    function handleShowDescription() {
        setShowDescription(old => !old)
    }

    function handleDescription() {
        handleShowDescription()
        if(showDescription) {
            cardOffset.value = withTiming(1, { duration: 500 });
            return
        }
        
        cardOffset.value = withTiming(440, 
            { 
                duration: 500,
            }, 
            
        );
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
        transform: [
            {
            translateY: cardOffset.value,
            },
        ],
        };
    });

    function handlePress() {
        if(!showDescription) {
            handleDescription()
            return
        }
        goBack()
    }

    function handleAddToCart() {
      addToCart(equipmentId)

        navigate('Cart')
    }

    return  (
        <>  
            {loading && <Load /> }
            {!loading && <>
                <Box pl="20px" pr="20px">
                <Header inverted type={showDescription ? 'goBack': 'down'} handlePress={handlePress} text={equipment.title} />
            </Box>
           
            <Box flex="1" position="relative" justifyContent="center" alignItems="center">
                <Image source={rectangle} alt="bike" position="absolute" top="-50" right="0"  bottom="0" />
                
                <FadeAnimation>
                    <Box w="100%" h={showDescription ? '280' : '200'} justifyContent="center" alignItems="center">
                      <Image src={equipment.image} w="350px" h="250px" alt="bike" resizeMode="contain" flex="1" />
                    </Box>
                </FadeAnimation>
            </Box>


            {showDescription && <Box bg="primary.100" 
                justifyContent="center"
                p="7"
                mb="-110"
                borderTopRadius={30}
                    shadow="5"
                    h={'110px'}  
                >
                    
                    <HStack w="100%" 
                        justifyContent="space-between">
                        <Button _pressed={{bgColor: 'primary.50'}} shadow="1" borderRadius="10" bg="primary.10" w="149" h="43" onPress={handleDescription}>Description</Button>
                        <Button _pressed={{bgColor: 'primary.50'}} shadow="1" borderRadius="10" bg="primary.10" w="149" h="43" onPress={() => console.log("hello world")}>Specification</Button>
                    </HStack>
                </Box> 
            }
                
            

            <Animated.View style={animatedStyle}>
                <Box bg="primary.100" borderTopRadius={30}
                    shadow="5"
                    h={showDescription ? '110px' : '440px'}  
                >
                    <Box
                        pl="7"
                        pr="7"
                        pt="7">
                    <HStack 
                    w="100%" 
                        justifyContent="space-between">
                        <Button _pressed={{bgColor: 'primary.50'}} shadow="1" borderRadius="10" bg="primary.10" w="149" h="43" onPress={handleDescription}>Description</Button>
                        <Button _pressed={{bgColor: 'primary.50'}} shadow="1" borderRadius="10" bg="primary.10" w="149" h="43" onPress={() => console.log("hello world")}>Specification</Button>
                    </HStack>
                    
                    {!showDescription && 
                        <Box mt="30">
                            <Text bold color="white" fontSize="17">{equipment.title}</Text>
                            <Text color="white" opacity="0.6" mt="8">
                                The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles' 130-year history and combines it with agile, dynamic performance that's perfectly suited to navigating today's cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.
                            </Text>
                        </Box>
                    }
                    </Box>

                    {!showDescription &&   
                        <HStack 
                            bg="primary.200" 
                            borderTopRadius={30}
                            justifyContent="space-between"
                            shadow="5"
                            h={100}  
                            w="100%"
                            mt="30"
                            alignItems="center"
                            p="7"
                        >
                            <Text bold color="ocean.200" fontSize="17"> {formatPrice(equipment.price)} </Text>

                            <Box  w="149" h="43" 
                                justifyContent="center" 
                                alignItems="center" 
                                borderRadius="10px" 
                                shadow="5" 
                                bg={
                                    { linearGradient: 
                                    { colors: ['ocean.100', 'ocean.200'],
                                        start: [0.5, 0.5],
                                        end: [0.6, 0.6],
                                    }
                                }} >
                                <Button _pressed={{bgColor: 'transparent'}} 
                                    bg="transparent"
                                    onPress={handleAddToCart}>Add to Cart</Button>
                            </Box> 
                            
                        </HStack>
                    }
                </Box>
            </Animated.View>    
            </>}
        </> 
    )
}




