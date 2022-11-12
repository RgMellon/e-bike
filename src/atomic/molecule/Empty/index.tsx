import React, { useRef, useEffect } from 'react';

import LottieView from 'lottie-react-native';
import empty from './empty.json';
import { Box, Button, Center, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Empty() {
  const {navigate} = useNavigation()
  return (
      <Center>
        <LottieView autoPlay source={empty} loop style={{ width: 250 }} />
         <Text color="white" fontSize="16px">Looks like you haven't added {`\n`} anything to your cart yet </Text>

        <Button backgroundColor="ocean.200" mt="40px" borderRadius="10px" onPress={() => navigate('Home')}> Go Home</Button>
       </Center>
      
  );
}

