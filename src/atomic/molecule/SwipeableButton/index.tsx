import React, { ReactNode, forwardRef } from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import { View } from 'react-native';

type Props = {
    children: ReactNode
    leftAction: ReactNode
    handleSwipe: () => void
}

const SwipeableButton: React.ForwardRefRenderFunction<Swipeable, Props> = (
  { children, handleSwipe,  leftAction},
  ref
) => (
    <View>
            <Swipeable 
                ref={ref} 
                rightThreshold={145} 
                overshootRight={false}
                
                onSwipeableLeftOpen={handleSwipe}
                  renderLeftActions={() => leftAction}
                >
                {children}
            </Swipeable>
    </View>
)

export default forwardRef(SwipeableButton)