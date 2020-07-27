import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import NavHome from "./NavHome";
import CatogoryHome from "./CatogoryHome";
import Profile from "./Profile";
import { View } from 'native-base';
import {Veiw, Text, StyleSheet,AsyncStorage} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

function TabNav() {  
  return (

    
    
    <Tab.Navigator   
    tabBarOptions={{
      style:{height:80, backgroundColor:"#0c2461" ,borderRadius:20},
      activeTintColor: '#eb2f06',
       
    }} >
      <Tab.Screen name="NavHome" component={NavHome}  
    
    options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="home" color="#e55039" size={40}/>
      ),
    }}
      />



      <Tab.Screen name="CatogoryHome" component={CatogoryHome} 
      
      options={{
        tabBarLabel: 'Catogory',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="navigation"  color="#e55039" size={40} />
        ),
      }}
      />



      <Tab.Screen name="Profile" component={Profile} 
      
        listeners={({ navigation, route }) => ({
        tabPress: e => {
            if (route.state && route.state.routeNames.length > 0) {
                navigation.navigate('Device')
            }
        },
    })}

    options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="account" color="#e55039" size={40} />
      ),
    }}
      />
    </Tab.Navigator>

    
    
  );
  
}

export default TabNav;