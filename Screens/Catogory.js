import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, AsyncStorage, FlatList, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Fab, Item, Icon, Input, List, ListItem, Thumbnail, Picker, Form, Button } from 'native-base';
//import { color } from 'react-native-reanimated';
import * as Firebase from "firebase";
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import { Card } from 'react-native-elements'



if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);

}




export default class Catogory extends Component {

    constructor() {
        super();

        this.state = {
            filter: "All",
            Allcol: "#E71C23",
            cat1col: "#0A79DF",
            cat2col: "#0A79DF",
            cat3col: "#0A79DF",
            documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            selected: "ගෙවත්ත​​"
        }
    }


    componentDidMount() {
        this.retrieveData1();
    }

    componentWillUnmount() {
        //this.reRenderSomething;
    }

    retrieveData1 = async() => {

        const userId = await AsyncStorage.getItem('userId');

        try {

            this.setState({
                loading: true,
                // documentData :[]
            });
            console.log('Retrieving Data');

            var db = Firebase.firestore();
            let initialQuery = await db.collection('posts')
                .where("Catagory", "==", this.state.selected)
                .orderBy('postTime', "desc")
                .limit(this.state.limit)
                // Cloud Firestore: Query Snapshot
            let documentSnapshots = await initialQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            console.log(documentData[0])
            if (documentData.length) {
                let lastVisible = documentData[documentData.length - 1].postTime;
                // Set State
                this.setState({
                    documentData: documentData,
                    lastVisible: lastVisible,
                    loading: false,
                });
            } else {
                this.setState({
                    loading: false,
                });
            }
        } catch (error) {
            console.log(error);
            this.setState({

                loading: false,
            });
        }
    }



    retrieveMore = async() => {

        const userId = await AsyncStorage.getItem('userId');

        if (this.state.refreshing) {
            console.log("not this time")
        } else {

            let lastVisible1 = this.state.documentData[this.state.documentData.length - 1].postTime;
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
                    .where("Catagory", "==", this.state.selected)
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
            } catch (error) {
                console.log(error);
                this.setState({
                    refreshing: false,
                });
            }
        }

    }



    renderHeader = () => {
        try {
            return ( <
                Text > < /Text>
            )
        } catch (error) {
            console.log(error);
        }
    };
    // Render Footer
    renderFooter = () => {
        try {
            if (this.state.refreshing) {
                return ( <
                    ActivityIndicator / >
                )
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    };



    onValueChange(value) {

        console.log(JSON.stringify(value))
        this.setState({
            selected: value
        }, () => this.retrieveData1());
    }

    render() {
        return ( <
            Container >
            <
            Header style = {
                { backgroundColor: "#0c2461", borderRadius: 30 } } >
            <
            Left >
            <
            Thumbnail small source = { require('../assets/log1.png') }
            /> <
            /Left> <
            Body style = {
                { alignItems: "center", justifyContent: "center" } } >
            <
            Text style = {
                { fontSize: 20, color: "#fff" } } > FinPal Catogories < /Text> <
            /Body> <
            Right >


            <
            /Right> <
            /Header>

            <
            View style = {
                { borderWidth: 2, borderColor: "#000" } } >
            <
            Picker mode = "dropdown"
            iosHeader = "වර්ගය තෝරන්න"
            iosIcon = { < Icon name = "arrow-down" / > }
            style = {
                { width: undefined } }
            selectedValue = { this.state.selected }
            onValueChange = { this.onValueChange.bind(this) } >
            <
            Picker.Item label = "Stocks"
            value = "ගෙවත්ත​​" / >
            <
            Picker.Item label = "Bonds"
            value = "ලිපි" / >
            <
            Picker.Item label = "Shares"
            value = "කාබනික වගාව" / >
            <
            Picker.Item label = "Tresury Bills and Bonds"
            value = "නව නිපැයුම්" / >
            <
            Picker.Item label = "Crypto currency"
            value = "වාණිජ වගාව​" / >
            <
            /Picker> <
            /View>    

            <
            FlatList data = { this.state.documentData }
            renderItem = {
                ({ item }) => < Card

                image = {
                    { uri: item.url } } >

                <
                TouchableOpacity
                onPress = {
                    () => this.props.navigation.navigate('ViewMore1', {
                        url: item.link
                    })
                }


                >
                <
                Text style = {
                    { marginBottom: 10, fontSize: 18 } } > { item.description } <
                /Text> <
                Text style = {
                    { color: "#0A79DF", marginLeft: "70%", fontSize: 16 } } > view more < /Text> <
                Text style = {
                    { color: "#777" } } > by - > { item.name } < /Text> <
                Text style = {
                    { color: "#777" } } > @ - > { item.showTime } < /Text> <
                /TouchableOpacity>

                <
                /Card>

            }

            // Item Key
            keyExtractor = {
                (item, index) => String(index) }
            // Header (Title)
            // ListHeaderComponent={this.renderHeader}
            // Footer (Activity Indicator)
            ListFooterComponent = { this.renderFooter }
            // On End Reached (Takes a function)
            //onEndReached={ this.retrieveMore}

            // onMomentumScrollEnd = {() => {this.onEndReachedCalledDuringMomentum = true;}}
            onMomentumScrollBegin = {
                () => { this.onEndReachedCalledDuringMomentum = false; } }

            onEndReached = {
                () => {
                    if (!this.onEndReachedCalledDuringMomentum) {
                        this.retrieveMore();


                        this.onEndReachedCalledDuringMomentum = true;
                        setTimeout(() => {

                        }, 1000);

                    }
                }
            }
            //onMomentumScrollEnd={this.retrieveMore}
            //scrollEnabled={!this.props.loadingData}
            // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold = { 0.1 }

            initialNumToRender = { 9 }
            // Refreshing (Set To True When End Reached)
            // refreshing={this.state.loading}

            // onRefresh={this.retrieveData1}


            refreshing = { this.state.loading }
            onRefresh = { this.retrieveData1.bind(this) }
            title = "Pull to refresh"
            tintColor = "#000"
            titleColor = "#000"

            style = {
                { marginTop: 20 } }

            />

            <
            /Container>
        )
    }
}