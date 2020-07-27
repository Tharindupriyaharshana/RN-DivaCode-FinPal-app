import React,{Component} from 'react';
import {Veiw, Text, StyleSheet,AsyncStorage} from "react-native";
import Catogory from "./Catogory";
import ViewMore1 from "./ViewMore1";
import { Container, Header, Left, Body, Right,  Fab,Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function NavHome() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Catogory" component={Catogory} 
        options={{headerShown: false}}
        />
        <Stack.Screen name="ViewMore1" component={ViewMore1}
         options={{headerShown: false}}
        
        />
       
      </Stack.Navigator>
    
  );
}

export default NavHome;