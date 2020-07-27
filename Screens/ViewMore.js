import React , { Component } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text ,Image, ScrollView, Button ,SingleColorSpinner,ActivityIndicator} from 'react-native';
import { Container, Header, Left, Body, Right,  Fab,Item,Icon,Input, List, ListItem, Thumbnail,Picker,Form} from 'native-base';
import { Ionicons } from '@expo/vector-icons';


// Pass a "uri" prop as the webpage to be rendered
class WebViewScreen extends Component {
  
  constructor(props) {
    super(props); 
    this.state = { visible: true };
  }
  hideSpinner() {
    this.setState({ visible: false });
  }
  render() {

    const { url } = this.props.route.params;
    return (
      <React.Fragment>
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

        <WebView
          onLoadStart={() => this.setState({ visible: true })}
          onLoadEnd={() => this.setState({ visible: false })}

          // Pass uri in while navigating with react-navigation. To reach this screen use:
          // this.props.navigation.navigate("WebViewScreen", {uri: "google.ca"});
          source={{ uri: url }} 
        />
        {this.state.visible ? (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              jusityContent: "space-around",
              flexWrap: "wrap",
              alignContent: "center",
            }}
            size="large"
          />
        ) : null}


<Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position= "bottomLeft"
            onPress={() => this.props.navigation.goBack()}
            >
            <Ionicons name="ios-home" size={32} />
            
          </Fab>
      </React.Fragment>
    );
  }
}
export default WebViewScreen;