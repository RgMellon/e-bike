import { useNavigation } from "@react-navigation/native";
import { AlertDialog, Box, Button, Center, Divider, HStack, Icon, Text } from "native-base";
import { Header } from "../../atomic/organism/Header";
import { AntDesign } from '@expo/vector-icons';

import { useCart } from "../../hooks/use-cart";
import { FadeAnimation } from "../../atomic/atoms/FadeAnimation";
import { CartItem } from "../../atomic/organism/CartItem";
import SwipeableButton  from "../../atomic/molecule/SwipeableButton";
import { GradientSquareButton } from "../../atomic/atoms/GradientSquareButton";
import { Swipeable } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import Empty from "../../atomic/molecule/Empty";
import { Load } from "../../atomic/molecule/Load";

export function Cart() {
  const {navigate} = useNavigation()
  const swipeableRef = useRef<Swipeable>(null)
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  const currentId = useRef('')

  const {goBack} = useNavigation()
  const {items, total, loading, removeToCart, getCartItems, quantity} = useCart()

  useEffect(() => {
    getCartItems()
  }, [])

  function handleDeleteOnSwipe(id:string) {
    setIsOpen(!isOpen)
    currentId.current = id
  }

  function handleConfirmRemove() {
      swipeableRef.current?.close()
      setIsOpen(!isOpen)
      removeToCart(currentId.current)
  }

  function handleConfirm() {
    swipeableRef.current?.close()
    navigate('CreditCard')
  }

  function handleCancel() {
    setIsOpen(!isOpen)
    swipeableRef.current?.close()
  }

  return (
    <Box p="20px" flex="1" justifyContent="space-between">
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}  >
        <AlertDialog.Content backgroundColor="primary.200" borderRadius="20px" >
          <Center w="100%" position="relative">
              <Text color="white" fontSize="md" mt="40px" fontFamily="heading"> Do you want to remove ? </Text>

              <Button.Group space={2} mt="40px" mb="40px">
                <Button  color="white" bg="" onPress={handleCancel} ref={cancelRef}>
                  Cancel
                </Button>
              <Button backgroundColor="red.300:alpha.20" onPress={handleConfirmRemove}>
                Delete
              </Button>
              </Button.Group>
          </Center>
        </AlertDialog.Content> 
      </AlertDialog>

      {loading && <Load />}
      {!loading && <>
        {quantity === 0 && 
          <Center flex="1">
            <Empty />
          </Center>
        }
        {quantity >= 1 && (
          <>
            <Box>
              <Header text="My Shopping Cart" inverted type={'goBack'} handlePress={goBack}/>

              {items.map(item =>
                <FadeAnimation key={item.id}>
                    <SwipeableButton 
                    ref={swipeableRef}
                    handleSwipe={() => {handleDeleteOnSwipe(item.id)}}
                    leftAction={
                      
                        <Center w="100px" h="85px" mt="33px" bg="primary.100" borderRadius="20px">
                          <Center bg="red.300:alpha.20" w="140%" ml="40px" flex="1" borderRadius="20px">
                              <Icon as={AntDesign} name="delete" color="white"/> 
                          </Center>
                        </Center>
                      
                    }> 
                    <CartItem id={item.id} image={item.image} amount={item.amount} formatPrice={item.subTotal} title={item.title}/>
                    <Divider my={6} bgColor="primary.50" />
                  </SwipeableButton>
                </FadeAnimation>
              )}

            </Box>
        

            <Box mb="50">
                <HStack justifyContent="space-between" mb="4">
                  <Text fontSize="sm" bold color="white">Subtotal: </Text>
                  <Text fontSize="sm"  color="white:alpha.50">{total}</Text>
                </HStack>  

                <HStack justifyContent="space-between" mb="4">
                    <Text fontSize="sm" bold color="white">Delivery Fee:</Text>
                    <Text fontSize="sm"  color="white:alpha.50"> $ 0 </Text>
                </HStack> 

                <HStack justifyContent="space-between">
                  <Text fontSize="sm" bold color="white">Total: </Text>
                  <Text fontSize="sm"  color="white:alpha.50">{total}</Text>
                </HStack>    

                <Center mt="5">
                  <Box w="140px" h="40px" bg="primary.50" justifyContent="center" borderRadius="8px">
                    <SwipeableButton
                      handleSwipe={handleConfirm}
                      leftAction={
                        <Box w="140px" justifyContent="center" bg="primary.50" borderRadius="8px" />
                      }>
                      <GradientSquareButton> 
                          <Icon as={AntDesign} name="right" color="white"/> 
                      </GradientSquareButton>
                    </SwipeableButton>

                    <Text zIndex="-1" color="white" left="50px" position="absolute">Checkout</Text>
                  </Box>
                </Center>
            </Box> 
          </>
        )}
      </>
      }
      </Box>
  )
}