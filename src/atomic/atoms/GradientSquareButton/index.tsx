import { Box, Button } from "native-base";
import { InterfaceIconButtonProps } from "native-base/lib/typescript/components/composites/IconButton/types";


type Props = { 
    children: React.ReactNode
} & InterfaceIconButtonProps

export function GradientSquareButton({children, ...rest}: Props) {
    return (
       <Box borderRadius={10} 
        w="40px"
        h="40px"
        alignItems="center"
        justifyContent="center"
         bg={{
            linearGradient: { 
                colors: ['ocean.100', 'purple.100'],
                start: [0.3, 0.3],
                end: [0.6, 0.8]}
            }
        }>
            <Button  
                _pressed={{bgColor: 'transparent'}}
                bg="transparent"
                {...rest}>{children}
            </Button>
        </Box> 
    )
}

