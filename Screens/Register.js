import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,TouchableOpacity ,TextInput,Alert,Image,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form, Fab} from 'native-base';
//import { Image } from 'react-native-elements';
//import * as ImagePicker from 'expo-image-picker';
import * as Firebase from "firebase";
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { Ionicons } from '@expo/vector-icons';


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


export default class Register extends React.Component { 

   constructor(){

    super();

    this.state ={

        name : "",
        email : "",
        Password : "",
        userIdenty : "",
        mainLink : "",
        status : "no"
       
    }
   }

 
   emailRegister=()=>{

       if(this.state.name && this.state.email && this.state.Password && this.state.mainLink){

        Alert.alert(
          "ලියාපදිංචි වෙමින් පවතී...",
           " ",
           [
             ],
          
         );
        
        Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.Password)
        .then((res)=>{
          let userId =res.user.uid;

          var db = Firebase.firestore();


          db.collection("users").doc(userId).set({
            name: this.state.name,
            email : this.state.email,
            uId : userId,
            mainLink : this.state.mainLink,
            status : "no"
        })
        
        })
        .then(()=>{
          Alert.alert("සාර්ථකයි. දිනක් ඇතුළත ප්‍රවේශ අවසරය ඊමේල් ගිණුමට​ ලැබෙනු ඇත​.")
          this.setState({
            name : "",
            email : "",
            Password : "",
            userIdenty : "",
            mainLink : "",
            status : "no"
       
          })
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          

          if(errorCode=="auth/invalid-email"){
            Alert.alert("ඊමේල් ගිණුම වරදියි")
          }
          if(errorCode=="auth/weak-password"){
            Alert.alert("මුරපදය ලක්‍ෂණ 6කට වඩා ඇතුළත් විය යුතුය")
          }
          else{
            Alert.alert("කිසියම් දෝශයක් පවතී. නැවත උත්සහ කරන්න")
          }
        });


       }
       else{

        Alert.alert("දත්ත සියල්ල අවශයයි")
        this.setState({
          name : "",
          email : "",
          Password : "",
          userIdenty : "",
          mainLink : ""
         
        })
       }



   }


  render(){
  return (
    <View style={{flex :1, backgroundColor:"white"}}>
 
 <Header>
          <Left>
          <Thumbnail small source={require('../assets/log1.png')} />
          </Left>
          <Body style ={{alignItems:"center",justifyContent:"center"}}>
          <Text style ={{fontSize:20, color:"#fff"}}>අස්වනු-Aswanu</Text>
          </Body>
          <Right>
         
 
          </Right>
        </Header>

     <ScrollView>
     <View   style={{ justifyContent:"center", alignItems:"center"}}>
     <Image
       style={{width:"100%",resizeMode:"contain"}}
        source={require('../assets/log.png')}
      />
     </View>
    <View style={{alignItems:"center",justifyContent:"center", flex:1}}>
    
         <TextInput
        style={{ height: 40, borderColor: '#47535E', borderWidth: 1 ,width :"80%",fontSize:17,borderRadius:10}}
        placeholder ="     බ්ලොග්  අඩවිය හෝ චැනලයේ සබැදිය​"
        value = {this.state.mainLink}
        onChangeText= {mainLink=>this.setState({mainLink})}
       
         />

        <Text></Text>

        <TextInput
        style={{ height: 40, borderColor: '#47535E', borderWidth: 1 ,width :"80%",fontSize:17,borderRadius:10}}
        placeholder ="     නම ඇතුළත් කරන්න​"
        value = {this.state.name}
        onChangeText= {name=>this.setState({name})}
       
         />

        <Text></Text>
             

          <TextInput
         style={{ height: 40, borderColor: '#47535E', borderWidth: 1 ,width :"80%",fontSize:17,borderRadius:10}}
         placeholder ="      ඊමේල් ගිණුම ඇතුළත් කරන්න"
         value = {this.state.email}
         onChangeText= {email=>this.setState({email})}
          />

        <Text></Text>
         

         <TextInput
        style={{ height: 40, borderColor: '#47535E', borderWidth: 1 ,width :"80%",fontSize:17,borderRadius:10}}
        placeholder ="    මුරපදය ඇතුලත් කරන්න"
        value = {this.state.Password}
        onChangeText= {Password=>this.setState({Password})}
        secureTextEntry={true}
         />


      <Text></Text>
      <Text></Text>
         <TouchableOpacity
         onPress={this.emailRegister}
         >
         <Text
         style={{marginTop:10,borderColor:"#47535E",  fontSize: 20,
         borderWidth:1,paddingHorizontal:"10%",paddingVertical:5,borderRadius:10}} >
           ලියාපදිංචි වන්න​
         </Text>
         </TouchableOpacity>

         </View>
         </ScrollView>
<Fab
   active={this.state.active}
   direction="up"
   containerStyle={{ }}
   style={{ backgroundColor: '#5067FF' }}
   position= "bottomLeft"
   onPress={() => this.props.navigation.goBack()}
   >
   <Ionicons name="ios-arrow-round-back" size={32} />
   
 </Fab>
 
</View>
  );
}
}


  

