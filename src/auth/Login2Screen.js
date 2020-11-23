import React, { Component } from 'react';
import { TextInput, Text, StatusBar, View, Image, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
// import { TextInput } from 'react-native-paper';
import *as Animatable from 'react-native-animatable';
import Database from '../Database';
const db = new Database();
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        marginTop: 20,
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        height: 500

    }, title: {
        color: '#85375a',
        fontWeight: 'normal',
        fontSize: 18
    }, text: {
        color: 'gray',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    }, signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    }, textSign: {
        color: 'white',
        fontWeight: 'bold'
    }, linearGradient: {
        // flex: 1,
        // width: 280,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 14,
        color: 'black',
        backgroundColor: 'transparent',
    }


});

export class Login2Screen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInputName: '',
            TextInputpassword: '',
            dbs: '',
            isLoading: true,
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })

        this.loadDbVarable = this.loadDbVarable.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
            isLoading: false,
        });
        db.listBag(this.state.dbs).then((data) => {
            result = data;
            if (result == 0) {

                db.addItemOfMother_bag(this.state.dbs).then((result) => {

                }).catch((err) => {
                    console.log(err);
                })
            }
            this.setState({

                isLoading: false,
            });
        }).catch((err) => {
            console.log(err);
        })



    }
    InputUsers = () => {
        const { TextInputName } = this.state;
        const { TextInputpassword } = this.state;

        fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/loginCheck.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member_email: TextInputName,
                member_password: TextInputpassword,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                id = "";
                member_name = "";
                member_role_id = "";
                this.setState({
                    isLoading: false,
                }, function () {
                    // In this block you can do something with new state.
                });
                if (responseJson !== "") {
                    AsyncStorage.setItem('memberNames', responseJson.member_name).then(
                        responseJson => {
                            this.props.navigation.navigate('HomeApp', { msg: responseJson })
                        }
                    );
                    AsyncStorage.setItem('memberId', responseJson.member_role);
                } else {
                    // Alert.alert("Login Fail");
                    showMessage({
                        message: "Login Fail",
                        description: "Username or password incorrect" + `${responseJson}`,
                        backgroundColor: 'red',

                    })
                    this.props.navigation.navigate('Login2')
                }
            }).catch((error) => {
                console.error(error);
            })

    }
    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (

                <BarIndicator color='#fbb146' />

            );
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fbb448" />
                    <LinearGradient colors={['#fbb448', '#f78a2c']} style={styles.gradient}>
                        {/* // <SafeAreaView style={{ flex: 1 }}> */}
                        {/* <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f2f2f2" /> */}
                        <CustomHeader bgcolor='#fbb448' title="" navigation={this.props.navigation} bdcolor='#fbb448' />
                        <FlashMessage duration={1000} />
                        <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>


                            <View style={{
                                flex: 1, justifyContent: 'space-between', paddingHorizontal: 15,
                                paddingVertical: 0,
                            }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 15, color: 'white' }}>Log in </Text>
                                    <Text style={{ fontSize: 16, color: 'black', marginBottom: 25 }}>Use email to Login</Text>
                                    <View style={{backgroundColor: 'rgba(252, 252, 252, 0.1)',padding:25,borderRadius:120}}>
                                    <View style={{backgroundColor: 'rgba(252, 252, 252, 0.2)',padding:15,borderRadius:100}}>
                                        <Image style={{ width: 140, height: 140, marginLeft: 0 }}
                                            source={IMAGE.ICON_LOG}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    </View>

                                </View>
                                <Animatable.View animation="fadeInUp">
                                    <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, marginTop: 20 }}>User Name :</Text>
                                    <TextInput blurOnSubmit onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder="Enter User Name" onEndEditing={this.clearFocus} autoFocus={false} />
                                    <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2 }}>Password :</Text>
                                    <TextInput blurOnSubmit secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder="Enter Password" onEndEditing={this.clearFocus} autoFocus={false} />

                                    <TouchableOpacity activeOpacity={1.0} ref="touchableOpacity" style={{ marginTop: 40, }} onPress={this.InputUsers}>

                                        <LinearGradient colors={['#fff', '#ffeed5']}

                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0.9 }}

                                            style={styles.linearGradient}>
                                            <Text style={styles.buttonText}>
                                                Log in
  </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </Animatable.View>


                            </View>


                        </ScrollView>
                    </LinearGradient>
                </View>

            );
        }
    }
}