import React from "react";
import { FlatList } from 'react-native'
import { Card, CardProps } from "../../molecule/Card";


export type EquipmentProps = {
    data: CardProps[]
}

export function Equipments({data}: EquipmentProps) {
    return  (
        <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data}
            renderItem={({item: equipment}) =>  
                <Card  image={equipment.image} model={equipment.model} 
                      title={equipment.title}  price={equipment.price} formatPrice={equipment.formatPrice} id={equipment.id} />
                }
            keyExtractor={(item) => item.title}
        />
    )
}




