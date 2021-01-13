
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Dimensions, Image, Text, View, TextInput, DrawerLayoutAndroidBase, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';

const db = new Database();

export class ProfileImageView extends Component {
    static navigationOptions = {
        title: 'Add Product',
    };
    constructor() {
        super();
        this.state = {
            prodId: '',
            prodName: '',
            prodDesc: '',
            abc: '',
            isLoading: false,
        };
    }
    async componentDidMount() {
        const myArray = await AsyncStorage.getItem('memberNames');
        // Alert.alert('AynStoreage : '+myArray);
        const data = new FormData();
        data.append("get_about", "true");

        return fetch('https://youandmenest.com/tr_reactnative/get_user_by_id.php?mname=' + myArray, {
            method: 'post',
            body: data,
        })
            .then((response) => response.json())
            .then((responseJson) => {

                abc = "";

                for (var i = 0; i < responseJson.length; i++) {



                    abc = responseJson[i].member_image;

                }
                // s
                this.setState({

                    abc: abc,

                    // imageSource: source,

                }, function () { })

            }).catch((error) => {
                console.error(error)
            })
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    saveProduct() {
        this.setState({
            isLoading: true,
        });
        let data = {
            prodId: this.state.prodId,
            prodName: this.state.prodName,
            prodDesc: this.state.prodDesc

        }
        db.addProduct(data).then((result) => {
            console.log(result);
            this.setState({
                isLoading: false,
            });

        }).catch((err) => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="black" />
                <View style={{ color: 'white',backgroundColor:'black' ,alignItems:'flex-end',paddingTop:10,paddingEnd:20}}>
                <Button
                  title="Skip"
                  type="outline"
                  titleStyle={{ color: 'white',fontWeight:'normal',fontSize:14 }}
                  buttonStyle={styles.submitText, { borderRadius: 25,width:80, borderColor: 'white', color: '#ccc', padding: 7, borderWidth: 0.5,marginBottom:0 }}
                  onPress={() => this.props.navigation.goBack() }

                />
                </View>
                <View style={{ flex: 1, backgroundColor: 'black' }}>

                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={420}
                        imageHeight={420}>
                        <Image style={{ height: 400 }}
                            source={{ uri: "https://youandmenest.com/tr_reactnative/" + this.state.abc }} />
                    </ImageZoom>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20
    }
})