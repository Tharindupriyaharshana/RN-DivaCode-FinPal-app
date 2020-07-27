import { StyleSheet, Text, View, ScrollView,Button, TouchableOpacity, Alert,AsyncStorage,FlatList,ActivityIndicator, RefreshControl, TextInput} from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,  Fab,Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Card } from 'react-native-elements'
import * as Firebase from "firebase";
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { Dialog } from 'react-native-simple-dialogs';
import Modal from 'react-native-modal';


global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }



const firebaseConfig = {
  apiKey: "AIzaSyCpbrbrHToly3WT2sjXMGE-5QELIuV9nOc",
    authDomain: "blogapp-4d6f3.firebaseapp.com",
    databaseURL: "https://blogapp-4d6f3.firebaseio.com",
    projectId: "blogapp-4d6f3",
    storageBucket: "blogapp-4d6f3.appspot.com",
    messagingSenderId: "521510019150",
    appId: "1:521510019150:web:d1e43cd5eed4bd19d1631f",
    measurementId: "G-B3G686P8HG"
  };

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
    
  }



export default class Home extends React.Component {
    
  componentDidMount() {
    StatusBar.setHidden(true);
 }
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        selected: undefined,
        isLog : null,
        userId : null,
        data : [],
        dataCount : 10,
        promptVisible : false,
        documentData: [],
        limit: 9,
        lastVisible: null,
        loading: false,
        refreshing: false,
        searchText : null,
        searchCondition : false,
        isModalVisible : false ,
        Catagory : "All",
      };

    // this.getPostData();
    }


    retrieveData1 = async () => {

      try {
        
        this.setState({
          loading: true,
        });
        console.log('Retrieving Data');
       
         var db = Firebase.firestore();
         let initialQuery = await db.collection('posts')
          .orderBy('postTime', "desc")
          .limit(this.state.limit)
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await initialQuery.get();
        // Cloud Firestore: Document Data
        let documentData = documentSnapshots.docs.map(document => document.data());
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastVisible = documentData[documentData.length - 1].postTime;
        // Set State
        this.setState({
          documentData: documentData,
          lastVisible: lastVisible,
          loading: false,
        });
      }
      catch (error) {
      //  console.log(error);
        this.setState({
         
          loading: false,
        });
      }
  }
 


  retrieveMore =async () => {

    if(this.state.refreshing){
console.log("not this time")
    }
    else{

    let lastVisible1 = this.state.documentData[this.state.documentData.length-1].postTime;
    this.setState({
     
      lastVisible: lastVisible1,
      
    });

    try {
      // Set State: Refreshing
      this.setState({
        refreshing: true,
      });
      console.log('Retrieving additional Data');
      // Cloud Firestore: Query (Additional Query)
      var db = Firebase.firestore();
      let additionalQuery = await db.collection('posts')
        .orderBy('postTime', "desc")
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
     
      let newArr = [...this.state.documentData, ...documentData]

      let uniqueArr = [...new Set(newArr)];
   
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = uniqueArr[uniqueArr.length - 1].postTime;
      // Set State
      this.setState({
        documentData: uniqueArr,
        lastVisible: lastVisible,
        refreshing: false,
      });
    }
    catch (error) {
     // console.log(error);
      this.setState({
        refreshing: false,
      });
    }
}

  }


 
refreshList = async () => {

 
}



searchRetrive = async()=>{

this.setState({
  searchCondition :true,
  promptVisible : false
},()=>{
  console.log(this.state.searchCondition)
  console.log(this.state.searchText)
})

}

    async componentDidMount() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      this.setState({ isReady: true });

      this.retrieveData();
      this.retrieveData1();
    
     
    }



    



 
  
     addPostNav =async()=>{
 
       const userId = await AsyncStorage.getItem('userId');
 
       if(userId){
         this.props.navigation.navigate('AddPost')
       }
       else{
         this.props.navigation.navigate('Login')
       }
 
     }
   

    onValueChange =()=>{

      this.setState({
        selected: value
      });
    }



    retrieveData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const isLog = await AsyncStorage.getItem('isLog');

       
        if (isLog == "yes" && userId !=="null") {
          
          this.setState({
           isLog :"yes",
           userId : userId
         })

       

        }else{
          
        }
      } catch (error) {
      
      }
    };


    userProfile= async ()=>{

  

    const userId = await AsyncStorage.getItem('userId'); 

 if(userId){


  Alert.alert(
   "Loading....",
    " ",
    [
      ],
   
  );


      const name = "unknown";

        var db = Firebase.firestore();
        var docRef = db.collection("users").doc(userId);

        docRef.get().then(function(doc) {
            if (doc.exists) {
             

              Alert.alert(
                "User Name",
                doc.data().name,
                [
                  {
                    text: "Log out",
                    onPress: async()=>{
      
                      Firebase.auth().signOut()
                      
                      try{
                        await AsyncStorage.setItem('userId', "");
                        await AsyncStorage.setItem('isLog', "");
                        
                       
                     
                        Alert.alert("Logout")
                      }catch(error){
                        Alert.alert(""+error)
                      }
                     
                    } ,
                    style: "cancel"
                  },
                  { text: "OK"}
                ],
                { cancelable: false }
              );

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      }
      else{
        this.props.navigation.navigate('Login')
      }
      
    }


renderHeader = () => {
    try {
      return (
        <Text ></Text>
      )
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Footer
  renderFooter = () => {
    try {
     if (this.state.refreshing) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };


  visibleModal = (Catagory) => {
    this.setState({isModalVisible: !this.state.isModalVisible,
                  Catagory : Catagory
    });
  
   };
  
  
    render() {
      if (!this.state.isReady) {
        return <View></View>;
      }
  
      return ( 
        
        <Container style ={{backgroundColor:"#6a89cc"}}>
        <Header  style ={{backgroundColor:"#0c2461",borderRadius:30}}  >
          <Left>
          <Thumbnail small source={require('../assets/log1.png')} />
          </Left>
          <Body style ={{alignItems:"center",justifyContent:"center"}}>
          <Text style ={{fontSize:20, color:"#f8c291"}}>Aswanu</Text>
          </Body>
          <Right>
         
 
          </Right>
        </Header>



 <Dialog
    visible={this.state.promptVisible}
  // title={"  "}
    onTouchOutside={() => this.setState({promptVisible: false,
                                          searchText : null          })} >
    <View>
    <Icon name='search'/>
       <TextInput
       placeholder ="type here"
       fontSize ={15}
       onChangeText ={searchText=>this.setState({searchText})}
       value  = {this.state.searchText}
     />
     <Text></Text>

<Button
title="Search"
onPress={this.searchRetrive}
>
</Button>
    </View>
</Dialog>



  <View style={{backgroundColor:"#6a89cc",flex:30, height:10}}>
  
  
  <FlatList 
        data={this.state.documentData}
        renderItem={({ item }) =>  <Card style ={{backgroundColor:"#0c2461",borderRadius:20}}
 
        image={{uri:item.url}}>

<TouchableOpacity 
        onPress={() => this.props.navigation.navigate('ViewMore',{
          url : item.link
        })
      } 

      
        >
        <Text style={{marginBottom: 10, fontSize:18}}>
         {item.description}
        </Text>
    <Text style={{color :"#0c2461", marginLeft:"70%", fontSize:16}}>More details</Text>
    <Text style={{color :"#e55039"}}>Author:  {item.name}</Text>
    <Text style={{color :"#e55039"}}>Date:  {item.showTime}</Text>
        </TouchableOpacity>
        
       </Card>
       
       }
       
        // Item Key
        keyExtractor={(item, index) => String(index)}
        // Header (Title)
       // ListHeaderComponent={this.renderHeader}
        // Footer (Activity Indicator)
        ListFooterComponent={this.renderFooter}
        // On End Reached (Takes a function)
        //onEndReached={ this.retrieveMore}

    // onMomentumScrollEnd = {() => {this.onEndReachedCalledDuringMomentum = true;}}
     onMomentumScrollBegin = {() => {this.onEndReachedCalledDuringMomentum = false;}}
   
     onEndReached = {() => {
   if (!this.onEndReachedCalledDuringMomentum) {
    this.retrieveMore(); 
    
   
      this.onEndReachedCalledDuringMomentum = true;
  setTimeout(() => {
    
  },1000);
   
   }
  }
}
        //onMomentumScrollEnd={this.retrieveMore}
        //scrollEnabled={!this.props.loadingData}
     // How Close To The End Of List Until Next Data Request Is Made
        onEndReachedThreshold={0.1}

        initialNumToRender={9}
        // Refreshing (Set To True When End Reached)
       // refreshing={this.state.loading}

       // onRefresh={this.retrieveData1}

       
            refreshing={this.state.loading}
            onRefresh={this.retrieveData1.bind(this)}
            title="Pull to refresh"
            tintColor="#000"
            titleColor="#000"
         
     
      
      />

  
</View>
<View style={{flex:0.3}}>

  <Text></Text>
  <Text></Text>
  <Text></Text>
  
</View>

<Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#0c2461' }}
            position="bottomRight"
            onPress={this.addPostNav}
            >
            <Ionicons name="ios-add" size={32} />
            
          </Fab>
      </Container>
      );
    }
  }



  // Styles
const styles = StyleSheet.create({
  container: {
   // height: height,
   // width: width,
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
  },
  itemContainer: {
    height: 80,
    //width: width,
    borderWidth: 5.2,
    borderColor: '#000',
    backgroundColor:"#000",
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});


// my fb info

// apiKey: "AIzaSyCpbrbrHToly3WT2sjXMGE-5QELIuV9nOc",
//     authDomain: "blogapp-4d6f3.firebaseapp.com",
//     databaseURL: "https://blogapp-4d6f3.firebaseio.com",
//     projectId: "blogapp-4d6f3",
//     storageBucket: "blogapp-4d6f3.appspot.com",
//     messagingSenderId: "521510019150",
//     appId: "1:521510019150:web:d1e43cd5eed4bd19d1631f",
//     measurementId: "G-B3G686P8HG"


//fb isuru

// apiKey: "AIzaSyCpZS19G4PSyBCj_7HLOmDO3JbIPfMuJEE",
//   authDomain: "authentificationapp-8c5df.firebaseapp.com",
//   databaseURL: "https://authentificationapp-8c5df.firebaseio.com",
//   projectId: "authentificationapp-8c5df",
//   storageBucket: "authentificationapp-8c5df.appspot.com",
//   messagingSenderId: "333526535761",
//   appId: "1:333526535761:web:3a201254d99aadb150b270",
//   measurementId: "G-X5LN3MYKFP"