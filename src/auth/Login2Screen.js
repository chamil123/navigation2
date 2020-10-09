import React, { Component } from 'react';
import { Text, StatusBar, View, Image, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
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
        backgroundColor: '#ff9100'
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
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
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
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f2f2f2" />
                    <CustomHeader bgcolor='#f2f2f2' title="" navigation={this.props.navigation} bdcolor='#f2f2f2' />
                    <FlashMessage duration={1000} />
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>

                        <View style={{
                            flex: 1, justifyContent: 'space-between', paddingHorizontal: 15,
                            paddingVertical: 0,
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 0 }}>Log in </Text>
                                <Text style={{ fontSize: 12, marginTop: -2, color: 'grey' }}>Use email to Login</Text>
                                <Image style={{ width: 210, height: 190, marginLeft: 0 }}
                                    source={IMAGE.ICON_LOG}
                                    resizeMode="contain"
                                />
                            </View>
                            <Animatable.View animation="fadeInUp">
                                <TextInput blurOnSubmit onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="Username" />
                                <TextInput blurOnSubmit secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 15 }} label="Password" />

                                <TouchableOpacity activeOpacity={1.0} ref="touchableOpacity" style={{ marginTop: 60, }} onPress={this.InputUsers}>

                                    <LinearGradient colors={['#fbb146', '#f78a2c']}

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
                </SafeAreaView>
            );
        }
    }
}