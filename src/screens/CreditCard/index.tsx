import { useNavigation } from '@react-navigation/native';
import { Canvas, RoundedRect, LinearGradient, vec, Group, Circle, Text, useFont } from '@shopify/react-native-skia'
import { Box, Center, FormControl, HStack, Icon, Input, Text as TextBase } from 'native-base';
import React, { useState } from 'react'
import { Dimensions, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Header } from '../../atomic/organism/Header';
import { AntDesign } from '@expo/vector-icons';
import RobotoFont from  '../../assets/fonts/Roboto-Regular.ttf'
import { Load } from '../../atomic/molecule/Load';
import SwipeableButton from '../../atomic/molecule/SwipeableButton';
import { GradientSquareButton } from '../../atomic/atoms/GradientSquareButton';

const width = Dimensions.get('window').width - 24;
const height = 200;

type CardInfo = {
  nameOnCard:string,
  cardNumber: string,
  expiry: string,
  cvv: string,
}

export function CreditCard() {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    nameOnCard:"",
    cardNumber: "",
    expiry: "",
    cvv: ""
  })

  const {goBack} = useNavigation()
  const font = useFont(RobotoFont, 16)

  if(font === null) {
    return <Load />
  }

  return (
    <KeyboardAvoidingView style = {{ flex: 1 }} enabled
    {...(Platform.OS === 'ios' && { behavior: 'padding',   keyboardVerticalOffset: 50 })}>
    
    <ScrollView style={{padding:20}}>
    <Header  text="Payment" inverted type={'goBack'} handlePress={() => {goBack()}}/>
      <Center mt="20px" pb="40px">
        <Canvas style={{height, width}}>
          <RoundedRect x={0} y={0} height={height} width={width} r={10}>
            <LinearGradient 
              start={vec(0, 0)}
              end={vec(256, 256)}
              colors={["#4B4CED", "#34C8E8", "#3D9CEA", "#34C8E8"]} 
            />
          </RoundedRect>

          <Text 
            x={20}
            y={50}
            color="#fff"
            text={cardInfo.nameOnCard}
            font={font}
          />

          <Text 
            x={20}
            y={height - 90}
            color="#fff"
            text={cardInfo.expiry}
            font={font}
          />

          <Text 
            x={20}
            y={height - 30}
            color="#fff"
            text={cardInfo.cardNumber.substring(0,4)}
            font={font}
          />

        <Text 
            x={80}
            y={height - 30}
            color="#fff"
            text={cardInfo.cardNumber.substring(4,8)}
            font={font}
          />

        <Text 
            x={140}
            y={height - 30}
            color="#fff"
            text={cardInfo.cardNumber.substring(8,12)}
            font={font}
          />

        <Text 
            x={200}
            y={height - 30}
            color="#fff"
            text={cardInfo.cardNumber.substring(12,16)}
            font={font}
          />

          <Text 
            x={width - 60}
            y={height - 30}
            color="#fff"
            text={cardInfo?.cvv}
            font={font}
          />
        </Canvas>

       
      
      <Box alignItems="center" w="100%">
        <FormControl w="100%">
          <HStack  mt="40px" space={4}>
           <Box w="60%">
            <FormControl.Label>Name on Card </FormControl.Label>
            <Input color="white:alpha.50" value={cardInfo.nameOnCard} onChangeText={text => setCardInfo(current =>({
              ...current,
              nameOnCard: String(text)
            }))} h="50px"  w="100%" bg="primary.200" borderColor="primary.200" />
          </Box> 

          <Box w="35%">
            <FormControl.Label>Expiry</FormControl.Label>
            <Input color="white:alpha.50" onChangeText={text => setCardInfo(current =>({
              ...current,
              expiry: String(text)}))} h="50px" w="100%" bg="primary.200" borderColor="primary.200" />
          </Box>
          </HStack>

          <HStack mt="20px" space={4}>
           <Box w="60%">
            <FormControl.Label>Card Number</FormControl.Label>
            <Input keyboardType="number-pad" color="white:alpha.50"  maxLength={16} onChangeText={text => setCardInfo(current =>({
              ...current,
              cardNumber: String(text)}))} h="50px"  w="100%" bg="primary.200" borderColor="primary.200" />
          </Box> 

          <Box w="35%">
            <FormControl.Label>CVV</FormControl.Label>
            <Input keyboardType="number-pad"  color="white:alpha.50" maxLength={4} onChangeText={text => setCardInfo(current =>({
              ...current,
              cvv: String(text)}))} h="50px" w="100%" bg="primary.200" borderColor="primary.200" />
          </Box>
          </HStack>
        </FormControl>
        </Box>
              

        <Box w="200px" mt="50px" h="40px" bg="primary.50" justifyContent="center" borderRadius="8px">
                    <SwipeableButton
                      handleSwipe={() => {}}
                      leftAction={
                        <Box w="200px" justifyContent="center" bg="primary.50" borderRadius="8px" />
                      }>
                      <GradientSquareButton> 
                          <Icon as={AntDesign} name="right" color="white"/> 
                      </GradientSquareButton>
                    </SwipeableButton>

                    <TextBase zIndex="-1" color="white" left="50px" position="absolute">Confirm Payment</TextBase>
                  </Box>
      </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}