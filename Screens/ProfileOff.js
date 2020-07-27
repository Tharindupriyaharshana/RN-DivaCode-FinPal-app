import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView,Button, TouchableOpacity, Alert,AsyncStorage,FlatList,ActivityIndicator, RefreshControl, TextInput} from 'react-native';
import {Card, CardItem, Container, Header, Left, Body, Right,  Fab,Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form,SwipeRow,Content} from 'native-base';
import * as Firebase from "firebase";
//import { Card } from 'react-native-elements';
import 'firebase/firestore';
import { decode, encode } from 'base-64';


global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }



const firebaseConfig = {
  apiKey: "AIzaSyCpZS19G4PSyBCj_7HLOmDO3JbIPfMuJEE",
  authDomain: "authentificationapp-8c5df.firebaseapp.com",
  databaseURL: "https://authentificationapp-8c5df.firebaseio.com",
  projectId: "authentificationapp-8c5df",
  storageBucket: "authentificationapp-8c5df.appspot.com",
  messagingSenderId: "333526535761",
  appId: "1:333526535761:web:3a201254d99aadb150b270",
  measurementId: "G-X5LN3MYKFP"
  };

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
    
  }


export default class ProfileOff extends Component {
 
 
constructor(){

  super();

  this.state={

    
  }

 // this.userProfile();
}


componentDidMount() {
  this.reRenderSomething= this.props.navigation.addListener('focus', () => {
    
   // this.forceUpdate();
  });
}

componentWillUnmount() {
 // this.reRenderSomething;
}



  render () {

 return (
    <Container >
     <Header>
        
     </Header>
     
     </Container>
);
}
}