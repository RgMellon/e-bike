import React from "react";
import { Image } from "native-base";

import detail from '../../../img/detail.png'

export function DetailBackground() {
    return <Image source={detail} alt="bike" position="absolute" top="140" right="0"  bottom="0" />
}