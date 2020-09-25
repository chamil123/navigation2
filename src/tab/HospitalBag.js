import React, { Component, useState } from 'react';
import { Modal, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch } from 'react-native';

import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1

import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { IMAGE } from '../constants/image';
import *as Animatable from 'react-native-animatable';

import Database from '../Database';
import {
    BarIndicator,
} from 'react-native-indicators';
const db = new Database();

export class HospitalBag extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            isLoading: true,
            _mother_bag: [],
            notFound: 'mother bag not found.\nPlease click (+) button to add it.',
            switchValue: '',
            date: '',


        }
        this.getData = this.getData.bind(this);
    }
    abc = (value) => {

        // this.setState({ switchValue: value });
    }
    componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        that.setState({
            date:
                year + '-' + month + '-' + date,
        });
        this.getData();
    }

    getData = (value, value2) => {

        let data = {
            hStatus: value2,
            hId: value,
            date: this.state.date,
        }

        this.setState({ switchValue: value });
        let int;
        let result;
        if (value != null) {
            db.updateStatus(data).then((result) => {
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
        db.listBag().then((data) => {
            result = data;
            if (result == 0) {
                db.addItemOfMother_bag().then((result) => {
                    console.log(result);

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                this.viewListData();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    viewListData() {
        let mother_bag = [];

        db.listMotherBagItems().then((data) => {


            if (data != null) {
                mother_bag = data;

                this.setState({
                    _mother_bag: mother_bag,
                    isLoading: false,
                });

            }


        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })

    }
    keyExtractor = (item, index) => index.toString()
    render() {
        let { isLoading } = this.state

        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            let value = 0;


            return (

                <SafeAreaView style={{ flex: 1, }}>

                    <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='white' />

                    <View style={styles.header}>
                        <Image style={{ width: 350, height: 260, marginLeft: 0, }}
                            source={IMAGE.ICON_HOSPITAL_MOM_BAG}
                            resizeMode="contain"
                        />
                        {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Prepare baby bag</Text>


                    </TouchableOpacity> */}
                    </View>
                    <Animatable.View style={styles.footer} animation="fadeInUpBig">



                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HospitalBagBaby')}>
                            <Text style={styles.buttonText}>Prepare baby bag</Text>


                        </TouchableOpacity>
                        <FlatList


                            keyExtractor={this.keyExtractor}
                            data={this.state._mother_bag}
                            // renderItem={this.renderItem}

                            renderItem={({ item }) => <ListItem
                                style={{ height: 60, paddingTop: 30 }}
                                onPress={() => {
                                    this.getData(item.hId, item.hStatus);
                                    // this.props.navigation.navigate('ProductDetails', {
                                    //   prodId: `${item.hId}`,
                                    // });
                                }}
                            >

                                <Body>

                                    <Text>{item.hName}</Text>
                                    <Text style={styles.dateText}>{item.hDate}</Text>
                                </Body>
                                <Right>

                                    <Switch
                                        value={item.hStatus == "true" ? true : false}
                                    />

                                </Right>
                            </ListItem>



                            } />


                    </Animatable.View>
                </SafeAreaView>
            );
        }
        // <SafeAreaView style={{ flex: 1, }}>
        //     <ScrollView
        //         contentInsetAdjustmentBehavior="automatic"
        //         style={styles.scrollView}>
        //         <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
        //         <View style={{ flex: 1, padding: 10 }}>

        //             <TouchableOpacity onPress={() => this.savePeriod()} style={styles.button}>
        //                 <Text style={styles.buttonText}>Period Start ?</Text>


        //             </TouchableOpacity>
        //         </View>

        //         <View style={{ flex: 1 }}>


        //         </View>
        //     </ScrollView>
        // </SafeAreaView>

    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    }, dateText: {
        fontSize: 11,
        color: 'grey',
    }, insText: {
        color: "grey",
        fontSize: 12,
        marginLeft: 19,

    }, footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});