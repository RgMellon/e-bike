import React, { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';



interface FadeAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function FadeAnimation({ children, ...rest }: FadeAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [
        {
          translateX: -cardOffset.value,
        },
      ],
    };
  });

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 1000 });
    cardOffset.value = withTiming(0, { duration: 1000 });
  }, []);

  return (
    <Animated.View {...rest} style={animatedStyle}>
      {children}
    </Animated.View>
  );
}