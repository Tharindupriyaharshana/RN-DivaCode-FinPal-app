import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import ChangePassword from "./Screens/ChangePassword";
import AddPost from "./Screens/AddPost";
import ViewMore from "./Screens/ViewMore";
import TabNav from "./Screens/TabNav";
import {Veiw, Text, StyleSheet,AsyncStorage} from "react-native";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNav" component={TabNav} 
        options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login}
         options={{headerShown: false}}
        
        />
        <Stack.Screen name="Register" component={Register} 
         options={{headerShown: false}}
        />
        <Stack.Screen name="ChangePassword" component={ChangePassword}
         options={{headerShown: false}}
        />
        <Stack.Screen name="AddPost" component={AddPost}
        options={{headerShown: false}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;