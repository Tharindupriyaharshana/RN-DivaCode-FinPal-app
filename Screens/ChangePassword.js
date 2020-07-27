import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form, Fab} from 'native-base';
import * as Firebase from "firebase";
import { Ionicons } from '@expo/vector-icons';

export default class ChangePassword extends React.Component {
  
   constructor(){

    super();

    this.state ={
        email : null
    }
   }


   ChangePassword=()=>{

    if(this.state.email){

      Alert.alert(
        "Checking your email",
         " ",
         [
           ],
        
       );
      var auth = Firebase.auth();
      var emailAddress = this.state.email;

auth.sendPasswordResetEmail(emailAddress).then(()=> {
 Alert.alert("Change your password using email link")
 this.setState({ email : null})
 
}).catch(function(error) {
 Alert.alert("Email is invalid or there isn't email")
});
    }
    else{
      Alert.alert("Email is invalid")
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
          <Text style ={{fontSize:20, color:"#fff"}}>Fin Pal</Text>
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
             placeholder ="     Enter your email"
             value = {this.state.email}
             onChangeText= {email=>this.setState({email})}
              />
             
             
    
    <Text></Text>
    <Text></Text>
             
              <TouchableOpacity
             onPress={this.ChangePassword}
             >
             <Text
             style={{marginTop:10,borderColor:"#47535E", fontSize: 20,
             borderWidth:1,paddingHorizontal:"10%",paddingVertical:5,borderRadius:10}} >
               Change
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
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth : 2,
        borderColor : "#47535E",
        //margin :"10%,",
        borderRadius :10,
        marginHorizontal :"10%",
        marginVertical : "10%",
        
    },
    }
    );
    