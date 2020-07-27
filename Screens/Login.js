import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert , Platform, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form, Fab} from 'native-base';
import {AsyncStorage} from 'react-native';
import * as Firebase from "firebase";
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => 
{ for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

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



export default class Login extends React.Component {
     
  constructor(){

    super();

    this.state ={

        email : null,
        Password : null,

       
       
    }

   
}




registerForPushNotificationsAsync = async () => {
 
 try{
  if (Constants.isDevice) {


    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
   // this.setState({ expoPushToken: token });
   var db1 = Firebase.firestore();
   var cityRef = db1.collection('token').doc(token);

    cityRef.set({
       tokenId : token
   }).then(()=>{
     console.log("ok");
   }).catch(err=>{
     console.log(""+err);
   })

   //console.log("ok")
   

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
}
catch(err){
  console.log(err);
}
}






login =()=>{


  

  if(this.state.Password && this.state.email){

    Alert.alert(
      "රැදීසිටින්න....",
      " ",
      [
        ],
     
    );
  
    setTimeout(()=>{
  
    },1000)

 
Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.Password)
.then((user)=>{

  this.storeData(user.user.uid);

   
}

)
.catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    
    if(errorCode=="auth/invalid-email"){
      Alert.alert("වැරදි ඊමේල් ගිණුමකි");
     
    }
    else if(errorCode=="auth/user-disabled"){
      Alert.alert("මෙම පරිශීලකයා අටුවා ඇත​");
     
    } 
    else if(errorCode=="auth/user-not-found"){
      Alert.alert("මෙම ඊමේල් ගිණුමට පරිශීලකයෙකු නොමැත​");
     
    }
    else if(errorCode=="auth/wrong-password"){
      Alert.alert("මුරපදය වැරදියි");
      
    }
    else{
      Alert.alert("කිසියම් දෝෂයක් පවතී. නැවත උත්සහ කරන්න​");
     
    }

    
  });

}else{
  Alert.alert("ඊමේල් ගිණුම හෝ මුරපදය ඇතුළත් කර නොමැත​")
}

}


storeData = async (userId) => {
try {

  var db = Firebase.firestore();
  var docRef = db.collection("users").doc(userId);

  docRef.get().then(async(doc)=> {
    
    console.log("Cached document data:", doc.data());

    if(doc.data().status =="yes"){

    await AsyncStorage.setItem('email', doc.data().email );
    await AsyncStorage.setItem('userName', doc.data().name);
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('isLog', "yes");

    this.registerForPushNotificationsAsync();

    Alert.alert("සාර්ථකයි..")

 
    this.props.navigation.navigate('TabNav')
  
    //console.log("done");
    }else{
      Firebase.auth().signOut();
      Alert.alert("ප්‍රවේශ අවසරය තවමත් ලැබී නැත​");
    }

}).catch(function(error) {
    console.log("Error getting cached document:", error);
});

} catch (error) {
 Alert.alert("කිසියම් දෝශයක් පවතී. නැවත උත්සහ කරන්න​");
}
};


  
  render(){
  

    return (
      
      <View style={{flex :1, backgroundColor:"white"}}>
 
 <Header
 
 >
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
         style={{ height: 40, borderColor: '#47535E', borderWidth: 1 ,width :"80%",fontSize:17,borderRadius:10,marginTop:20}}
         placeholder ="     ඊමේල් ගිණුම ඇතුළත් කරන්න​"
         value = {this.state.email}
         onChangeText= {email=>this.setState({email})}
          />
          <Text></Text>
         

          <TextInput
         style={{ height: 40, borderColor: '#47535E', borderWidth: 1 ,width :"80%",fontSize:17,borderRadius:10}}
         placeholder ="    මුරපදය ඇතුලත් කරන්න​"
         value = {this.state.Password}
         onChangeText= {Password=>this.setState({Password})}
         secureTextEntry={true}
          />

<Text></Text>
<Text></Text>
         <TouchableOpacity
          onPress={this.login}
         >
         <Text
         style={{marginTop:10,borderColor:"#47535E",  fontSize: 20,
         borderWidth:1,paddingHorizontal:"15%",paddingVertical:5,borderRadius:10}} >
           ඇතුල් වන්න​
         </Text>
         </TouchableOpacity>

          <Text></Text> 

          <TouchableOpacity
         onPress={() => this.props.navigation.navigate('Register')}
         >
         <Text
         style={{marginTop:10,borderColor:"#47535E", fontSize: 20,
         borderWidth:1,paddingHorizontal:"12%",paddingVertical:5,borderRadius:10}} >
           ලියාපදිංචි වන්න​
         </Text>
         </TouchableOpacity>

         <Text></Text> 

         <TouchableOpacity
         onPress={() => this.props.navigation.navigate('ChangePassword')}
           >
            <Text
                style={{marginTop:10,borderColor:"#47535E", fontSize: 20,
                   borderWidth:1,paddingHorizontal:"2%",paddingVertical:5,borderRadius:10}} >
            මුරපදය වෙනස් කරන්න​
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
            onPress={() => this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'TabNav' }],
            })}
            >
            <Ionicons name="ios-home" size={32} />
            
          </Fab>
         
    </View>
    
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#eee',
    //alignItems: 'center',
    //justifyContent: 'center',
    //borderWidth : 2,
   // borderColor : "#47535E",
    //margin :"10%,",
    //borderRadius :10,
    //marginHorizontal :"10%",
    //marginVertical : "10%",
    
},
}
);

















