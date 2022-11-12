import { Box, HStack, Image, Text, Button, Icon } from "native-base";

import { AntDesign } from '@expo/vector-icons';

import { CardProps } from "../../molecule/Card";
import { useCart } from "../../../hooks/use-cart";

type Props = Pick<CardProps, "title" | "image" | "formatPrice"| "amount" | "id">;

export function CartItem({title,formatPrice, image, amount, id}: Props) {
  const { handleIncrement, handleDecrement } = useCart()

  return <HStack mt="30px">
        
  <Box bg="primary.50" w="100px" h="90px" borderRadius="20px" shadow="5" justifyContent="center" alignItems="center">
      <Image w="100%" h="60px" resizeMode="contain" source={{uri: image}} alt="img bike"/>
  </Box>

  <Box ml="16px" justifyContent="space-between" paddingY="5px">
    <Text bold color="white" fontSize="17">{title}</Text>

    <HStack  alignItems="center" mb="5px">
      <Text bold color="ocean.200" fontSize="17"> {formatPrice} </Text>
      
      <HStack ml="20px" bg="primary.200" p="5px" borderRadius="5px">
        <Button borderRadius="5px" w="30px" h="30px" bg="coolGray.700" onPress={() => {handleDecrement(id)}}>
          <Icon as={AntDesign} name="minus" color="white"/> 
        </Button>

        <Box w="30px" alignItems="center" justifyContent="center">
          <Text color="white"> {amount} </Text>
        </Box>

        <Button borderRadius="5px" w="30px" h="30px" bg="ocean.50" onPress={() => {handleIncrement(id)}} >
          <Icon as={AntDesign} name="plus" color="white"/> 
        </Button>
       
      </HStack>

    </HStack>
  </Box>
</HStack> 
}