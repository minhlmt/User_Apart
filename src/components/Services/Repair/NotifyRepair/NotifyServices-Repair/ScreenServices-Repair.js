import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from '../../../globals/constants'
// import NotifyRepair from './NotifyRepair'

import NotifyWaitComfirm from './NotifyWaitConfirm'
import NotifyCofirm from './NotifyCofirm'
import NotifyDone from './NotifyDone'
import NotifyNotConfirm from './NotifyNotConfirm'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack=createStackNavigator();
export default function TabRepair ({route}){
  const {token,userId,apartId}=route.params
    return(
        <Tab.Navigator initialRouteName='WaitConfirm'  
        tabBarOptions={{
           activeTintColor: '#e91e63',
           labelStyle: { fontSize: 14 ,  fontWeight: "bold",},
           style: { backgroundColor: 'powderblue' },
           
         }}>
           <Tab.Screen name="WaitConfirm" component={NotifyWaitComfirm} options={{tabBarLabel:'Chờ xác nhận'}}  initialParams={{token,userId,apartId}}/>
           <Tab.Screen name="Confirm" component={NotifyCofirm} options={{tabBarLabel:'Đã xác nhận'}}  initialParams={{token,userId,apartId}}/>
           <Tab.Screen name="Done" component={NotifyDone} options={{tabBarLabel:'Hoàn thành'}}  initialParams={{token,userId,apartId}}/>
           <Tab.Screen name="NotConfirm" component={NotifyNotConfirm} options={{tabBarLabel:'Không duyệt'}}  initialParams={{token,userId,apartId}}/>
          
       </Tab.Navigator>
    )
}
// export default function ScreenNotifyManage({route}){
//     const {token,userId}=route.params;
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name={ScreenKey.NotifyRepair} component={TabRepair}  initialParams={{token:token,userId:userId}} options={{headerShown:false}}/>
//             <Stack.Screen name={ScreenKey.NotifyDetailRepair} component={NotifyDetailRepair} options={{headerShown:false}} />
//         </Stack.Navigator>
//     )
   
// }