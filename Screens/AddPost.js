import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Button,Alert,AsyncStorage,ActivityIndicator,Image,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Item,Input, List, ListItem, Thumbnail,Picker,Form, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as Firebase from "firebase";
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import {Permission,Notification} from 'expo'
import { Ionicons } from '@expo/vector-icons';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



export default class AddPost extends React.Component {

constructor(){
  super();

  this.state={
    description :null, 
    link : null,
    iconCol : "#900",
    count : 0,
    isModalVisible : false,
    Catagory : "Bonds​​",
    imageUri: null,
    postId : null,
    isModal1Visible :false,
  }
}

changeCount =()=>{
  
  description=>this.setState({description})
  this.setState({
    count : this.state.count+1
    
  })

}


visibleModal = (Catagory) => {
  this.setState({isModalVisible: !this.state.isModalVisible,
                Catagory : Catagory
  });
 
 };

 openImagePickerAsync = async () => {
    
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Need your permission");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled === true) {
    this.setState({ imageUri: null,
      iconCol : "#900" 
       });
  return;
 }

console.log(pickerResult);

this.setState({ imageUri: pickerResult.uri,
                 iconCol : "#090" 
                  });
};
  





addPost=async()=>{

 
if(this.state.imageUri && this.state.link && this.state.description ){


  Alert.alert(
    "Processing....",
    " ",
    [
      ],
   
  );


  var rootRef = Firebase.database().ref();
  var storesRef = rootRef.child('image');
  var newStoreRef = storesRef.push();
  const id = newStoreRef.key

 let uri = this.state.imageUri;
 let description =this.state.description;
 let Catagory = this.state.Catagory;
 let link = this.state.link;

  const uId = await AsyncStorage.getItem('userId'); 
  const email = await AsyncStorage.getItem('email'); 
  const name = await AsyncStorage.getItem('userName'); 
  const time =Date.now()
  
  let d = Date(time); 
  let a = d.toString() ;
  let arr = a.split("GMT");

  const response = await fetch(uri);
  const blob = await response.blob();
  let ref = Firebase.storage().ref().child("postImage/"+id).put(blob)
  
 ref.on('state_changed', function(snapshot){
  
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case Firebase.storage.TaskState.PAUSED: 
        console.log('Upload is paused');
        break;
      case Firebase.storage.TaskState.RUNNING: 
        console.log('Upload is running');
        break;
    }
  }, function(error) {
   
  }, ()=> {
    
    ref.snapshot.ref.getDownloadURL().then(async(downloadURL)=> {
      console.log('File available at', downloadURL);

    var db = Firebase.firestore();
    var docRef = db.collection("posts").doc(id).set({
    userId : uId,
    description : description,
    link : link,
    Catagory : Catagory,
    url : downloadURL,
    postTime : time ,
    showTime : arr[0],
    postId : id,
    name : name,
    email : email

     })

     

     Alert.alert("Success!")

    })
    .catch(err=>{
      Alert.alert("Error ! Check your internet connection​")
    });
  });

  
  //this.sendNotification();
 
    
  

  this.setState({
    description :null, 
    link : null,
    iconCol : "#900",
    count : 0,
    isModalVisible : false,
    Catagory : "Bonds",
    imageUri: null,
    postId : null,
    isModal1Visible :false,
  })

  }
  else{
    Alert.alert("Require a photo , description and the link")
  }
  
}
 

sendNotification= async ()=>{

let val =this.state.description;

 try{ 
  console.log('Retrieving Data');
 
   var db = Firebase.firestore();
   let initialQuery = await db.collection('token')
    
  // Cloud Firestore: Query Snapshot
  let documentSnapshots = await initialQuery.get();
  // Cloud Firestore: Document Data
  let documentData = documentSnapshots.docs.map(document => document.data());
  
  documentData.forEach(async(item)=>{
   
   try{
    const message = {
      to: item.tokenId,
      sound: 'default',
      title: 'New entry--',
      body: val,
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

  }
  catch(err){
    console.log(err);
  }
  })
  
  
  
}
catch (error) {
 console.log(error);
 
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
          <Text style ={{fontSize:20, color:"#fff"}}>Fin-Pal</Text>
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

<Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1}}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{fontSize:20,color:"#FFF"}}>Select Catagory</Text>
            <Text></Text>
            <Text></Text>
            <Button title="​Business Investment"  onPress={()=>this.visibleModal("Business investment")} />
            <Text></Text>
            <Button title="Stocks​" onPress={()=>this.visibleModal("Stocks")} />
            <Text></Text>
            <Button title="Bonds"  onPress={()=>this.visibleModal("Bonds")} />
            <Text></Text>
            <Button title="Shares​"  onPress={()=>this.visibleModal("Shares")} />
            <Text></Text>
            <Button title="Treasury Bills"  onPress={()=>this.visibleModal("Treasury Bills ")} />
            <Text></Text>
            <Button title="Cryptocurrency"  onPress={()=>this.visibleModal("Cryptocurrency ")} />
            
          </View>
        </Modal>

        <Modal isVisible={this.state.isModal1Visible} style={{justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator />
        </Modal>
        <Text></Text>
         

         <TextInput
        style={{ height: 40, borderColor: '#47535E', width :300,fontSize:17,borderRadius:10,borderWidth:1,borderColor:"#000"}}
        placeholder ="   Insert your link here"
        value = {this.state.link}
        onChangeText= {link=>this.setState({link})}
       
         />

<Text></Text>
         

      <TextInput
         style={{ height: 150, borderColor: '#47535E',  width :300,fontSize:17,borderRadius:10,borderWidth:1,borderColor:"#000"}}
         placeholder ="     Enter details here​"
         value = {this.state.description}
         onChangeText= {description=>{this.setState({description})}}
         multiline ={true}
         maxLength={200}
          />
    <Text style={{color:"#900"}}>Should not exceed 200 characters</Text>
          <Text></Text>
         

         
       <View style={{flexDirection:"row"}}>
        
        <Text> Select a photo </Text>
        <Text>  </Text>
        <Text> </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text> </Text>
        <Text> </Text>
        
        <TouchableOpacity
        onPress={this.openImagePickerAsync}
        >
          <Icon name="image" size={30} color={this.state.iconCol} />
        </TouchableOpacity>
        <Text>  </Text>
        <Text>  </Text>
        <Text> </Text>
 
        

        </View>
        <Text></Text>

        <View style={{flexDirection:"row"}}>
        

        <Text> Select a Category </Text>
        <Text>  </Text>
        <Text> </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text> </Text>
        <Text> </Text>
        
        <TouchableOpacity
          onPress={()=>this.visibleModal("Bonds")}
        >
          <Icon name="chevron-circle-down" size={30} color="#900" />
        </TouchableOpacity>

        <Text>  </Text>
        <Text>  </Text>
        <Text> </Text>
  <Text> {this.state.Catagory}</Text>
        

        </View>
          
<Text></Text>
          <TouchableOpacity
        onPress={this.addPost}
           >
            <Text
                style={{marginTop:10,borderColor:"#47535E", fontSize: 20,
                   borderWidth:1,paddingHorizontal:45,paddingVertical:5,borderRadius:10}} >
              Enter
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
   onPress={() => this.props.navigation.navigate('TabNav')}
   >
   <Ionicons name="ios-home" size={32} />
   
 </Fab>
 
</View>
  );
}
}

