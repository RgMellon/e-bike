import React, { useEffect, useState } from "react";
import {  Box, Text } from "native-base";

import { MainBanner } from "../../atomic/molecule/MainBanner";
import { Header } from "../../atomic/organism/Header";
import { DetailBackground } from "../../atomic/atoms/DetailBackground";
import { Equipments } from "../../atomic/organism/Equipments";


import { CategoryList } from "../../atomic/organism/CategoryList";
import { FlatList } from "react-native";
import { CardProps } from "../../atomic/molecule/Card";
import api from "../../service/api";
import { formatPrice } from "../../utils/format-price";
import { Load } from "../../atomic/molecule/Load";


export function Home() {
   const [load, setLoad] = useState(true)
    const [equipments, setEquipments] = useState<CardProps[]>([])

    useEffect(() => {
        async function getEquipments() {
            try {
              const {data} = await api.get('equipments')

            const formatResponse = data.map((equipment: CardProps)  => ({
              ...equipment,
              formatPrice:formatPrice(equipment.price)
            }))

            // console.log(formatResponse)
            setEquipments(formatResponse)
            } catch(err) {
              
            } finally {
              setLoad(false)
            }
            
        }

        getEquipments()
    }, [])

    return  (
      <>
        {load && <Load />}
        {!load  && (
          <Box flex="1" padding="20px" pt="-10px" position="relative">
            <DetailBackground />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1]} 
                renderItem={({}) => <Equipments data={equipments}/>}
                ListHeaderComponent={() => 
                    <>
                        <Header handlePress={()=>{alert('search')}}/>
                        <MainBanner />
                        <CategoryList />
                    </>
                } 
            />
          </Box>
        )}
        
      </>
    )
}




