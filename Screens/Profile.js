import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView,Button, TouchableOpacity,Image, Alert,AsyncStorage,FlatList,ActivityIndicator, RefreshControl, TextInput,scrollView} from 'react-native';
import {Card, CardItem, Container, Header, Left, Body, Right,  Fab,Item,Input, List, ListItem, Thumbnail,Picker,Form,SwipeRow,Content} from 'native-base';
import * as Firebase from "firebase";
//import { Card } from 'react-native-elements';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';




export default class Profile extends Component {
 
 
constructor(){

  super();

  this.state={

    islog : false,
    name : null,
    email : null,
    userId : null,
    documentData: [],
    limit: 9,
    lastVisible: null,
    loading: false,
    refreshing: false,
    namelbl : " ",
    emaillbl : " ",
    connStt : "Searching......",
    YourPost : " ",
    enableScrollViewScroll: true
  }

 // this.userProfile();
}


componentDidMount() {
  this.reRenderSomething= this.props.navigation.addListener('focus', () => {
    this.userProfile1();
    this.retrieveData1();
   
  });
}

componentWillUnmount() {
  //this.reRenderSomething;
}


  userProfile1= async ()=>{

  

    const userId = await AsyncStorage.getItem('userId'); 

    this.setState({
      userId : userId
    })

 if(userId){

      const name = "unknown";

        var db = Firebase.firestore();
        var docRef = db.collection("users").doc(userId);

        docRef.get().then((doc)=> {
            if (doc.exists) {
             
             this.setState({
               islog : true,
               email : doc.data().email,
               name : doc.data().name,
               namelbl : "User  :",
               emaillbl : "Email Account​  :",
               connStt : "",
               YourPost : "Your Posts"
             });
             
             //   console.log(doc.data().name);
            // Alert.alert(""+doc.data().name)   ;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      }
      else{
       // this.props.navigation.navigate('Login')

       this.setState({
        islog : false,
        connStt : "User cannot be founded​.!!!"
      })

      Alert.alert(
        "Register as a new user​....",
         " ",
         [
          {
            text: "Login​",
            onPress:()=>(this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }))
          },
          { text: "Next​"}
           ],
        
       );
     
      }

      //Alert.alert("jhfvhvsd")
 }
 
 



 retrieveData1 = async () => {

  const userId = await AsyncStorage.getItem('userId'); 

  try {
    
    this.setState({
      loading: true,
    });
    console.log('Retrieving Data');
   
     var db = Firebase.firestore();
     let initialQuery = await db.collection('posts')
      .where("userId", "==", userId)
      .orderBy('postTime', "desc")
      .limit(this.state.limit)
    // Cloud Firestore: Query Snapshot
    let documentSnapshots = await initialQuery.get();
    // Cloud Firestore: Document Data
    let documentData = documentSnapshots.docs.map(document => document.data());
    // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
    if(documentData.length){
    let lastVisible = documentData[documentData.length - 1].postTime;
    // Set State
    this.setState({
      documentData: documentData,
      lastVisible: lastVisible,
      loading: false,
    });
  }
  else{
    this.setState({
      loading: false,
    });
  }
  }

  catch (error) {
    console.log(error);
    this.setState({
     
      loading: false,
    });
  }
}



retrieveMore =async () => {

 const userId = await AsyncStorage.getItem('userId'); 

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
  .where("userId", "==", userId)
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
  console.log(error);
  this.setState({
    refreshing: false,
  });
}
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



deletePost=(postId)=>{

  Alert.alert(
    "Important..!",
    "Confirm delete",
    [
      {
        text: "Delete​",
        onPress: ()=>{

          var db = Firebase.firestore();
          db.collection("posts").doc(postId).delete().then(()=> {

            
            Alert.alert("Successfully deleted.!");

            this.retrieveData1();

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
         
        } ,
        style: "cancel"
      },
      { text: "Cancel"}
    ],
    { cancelable: false }
  );
}


userProfile= async ()=>{

  

  const userId = await AsyncStorage.getItem('userId'); 

if(userId){


Alert.alert(
 "Wait for a second....",
  " ",
  [
    ],
 
);


    const name = "unknown";

      var db = Firebase.firestore();
      var docRef = db.collection("users").doc(userId);

      docRef.get().then((doc) =>{
          if (doc.exists) {
           

            Alert.alert(
              "User",
              doc.data().name,
              [
                {
                  text: "Log out",
                  onPress: async()=>{
    

                    Firebase.auth().signOut()
                    
                    try{
                      await AsyncStorage.setItem('userId', "");
                      await AsyncStorage.setItem('isLog', "");
                      
                   
                       this.setState({
                        islog : false,
                        name : null,
                        email : null,
                        userId : null,
                        documentData: [],
                        limit: 9,
                        lastVisible: null,
                        loading: false,
                        refreshing: false,
                        namelbl : " ",
                        emaillbl : " ",
                        connStt : "User cannot be found​.!!!",
                        YourPost : " "
                       })

                      Alert.alert("Successfully logout")
                                
              
                    }catch(error){
                      Alert.alert("Error occured. Please try again later​")
                    }

                   
                  } ,
                  style: "cancel"
                },
                { text: "Next​"}
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
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    }
    
  }

  onEnableScroll= (value) => {
    this.setState({
      enableScrollViewScroll: value,
    });
  };


  render () {

 const height =   Dimensions.get('window').height;
 const width =   Dimensions.get('window').width;

 return (
    <Container >

     <Header>
     <Left>
          <Thumbnail small source={require('../assets/log1.png')} />
          </Left>
          <Body style ={{alignItems:"center",justifyContent:"center"}}>
          <Text style ={{fontSize:20, color:"#fff"}}>fin-Pal</Text>
          </Body>
          <Right>
          

           
            <TouchableOpacity transparent
            style={{marginHorizontal:10}}
            onPress={this.userProfile}
            >
              <Icon name="user" size={30} color="#fff" />
              </TouchableOpacity>


 
          </Right>
        </Header>
    

  <Text></Text>

        <View   style={{borderRadius:1000, justifyContent:"center", alignItems:"center"}}>
     <Image
       style={{ justifyContent:"center", alignItems:"center"}}
        source={require('../assets/download.png')}
      />
      <Text></Text>
     </View>

     <View style={{alignItems:"center", justifyContent:"center"}}>
     <Text style={{fontSize:20, justifyContent:"center",alignItems:"center"}}>{this.state.connStt}</Text>
     </View>
 <Text style={{fontSize:13}}>   {this.state.namelbl} {this.state.name}</Text>
 <Text style={{fontSize:13}}>   {this.state.emaillbl} {this.state.email}</Text>
 <Text></Text>

 <FlatList
        data={this.state.documentData}
        renderItem={({ item }) => 
       <View>
               <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: item.url}} />
                <Body>
                  <Text>{item.description}</Text>
                   <Text note>@ ->{item.showTime}</Text>
                </Body>
              </Left>
            </CardItem>
           
            <CardItem>
              <Left>
                
              </Left>
              <Body>
               
              </Body>
              <Right>
                <TouchableOpacity
                onPress={()=>this.deletePost(item.postId)}
                >
                <Text style={{color :"#0A79DF", fontSize:16}}>Delete​</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
      </View>  
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
     


     </Container>
)
}

}
