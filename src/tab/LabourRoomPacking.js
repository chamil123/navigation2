import React, { Component, useState } from 'react';
import { Modal, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch } from 'react-native';

import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1
import { Icon } from 'react-native-elements';
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
// const dbs=null;
// var db = openDatabase({ name: 'UserDatabase.db' });
var ddd;
export class LabourRoomPacking extends Component {


    constructor(props) {
        super(props);



        this.state = {
            dataSource: [],
            isLoading: true,
            _mother_bag: [],
            notFound: 'mother bag not found.\nPlease click (+) button to add it.',
            switchValue: '',
            date: '',
            dbs: '',


        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })

        this.loadDbVarable = this.loadDbVarable.bind(this);
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
        // this.getData();
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.viewListData();
    }

    getData = (value, value2) => {

        let data = {
            lStatus: value2,
            lId: value,
            date: this.state.date,
        }

        this.setState({ switchValue: value });
        let result;
        if (value != null) {
            db.updateStatusLabourRoom(this.state.dbs, data).then((result) => {
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
        db.listBagLabour(this.state.dbs).then((data) => {
            result = data;
            if (result == 0) {
                db.addItemOfMother_bag(this.state.dbs).then((result) => {
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
        db.listLabourRoomBagItems(this.state.dbs).then((data) => {


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
                    <View style={styles.brestposition5}></View>
                    <View style={styles.brestposition6}></View>
                    <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View>
                        <Text style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold", marginTop: 15 }}>Prepare Labour room bag</Text>
                        <FlatList


                            keyExtractor={this.keyExtractor}
                            data={this.state._mother_bag}
                            // renderItem={this.renderItem}

                            renderItem={({ item }) => <ListItem
                                style={{ height: 60, paddingTop: 30 }}
                                onPress={() => {
                                    this.getData(item.lId, item.lStatus);

                                }}
                            >
                                {
                                    item.lStatus == "true" ?
                                        <Left >
                                            <Icon
                                                name='check-circle'
                                                type='font-awesome'
                                                color='#009688'
                                                iconStyle={{ fontSize: 25, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, backgroundColor: '#b2dfdb', borderRadius: 8, }}
                                                onPress={() => console.log('hello')} />
                                        </Left> : <Left>
                                            <Icon
                                                name='check-circle'
                                                type='font-awesome'
                                                color='#fff'
                                                iconStyle={{ fontSize: 25, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, backgroundColor: '#eceff1', borderRadius: 8, }}
                                                onPress={() => console.log('hello')} />
                                        </Left>
                                }
                                <Body style={{ marginLeft: -200 }}>

                                    <Text>{item.lName}</Text>
                                    <Text style={styles.dateText}>{
                                        item.lStatus == "true" ?
                                            item.lDate : ''
                                    }</Text>
                                </Body>
                                <Right>

                                    <Switch
                                        disabled={true}
                                        trackColor={{ true: '#f78a2ced', false: 'grey' }}
                                        thumbColor={'white'}
                                        value={item.lStatus == "true" ? true : false}
                                    // style={[item.lStatus ? styles.switchEnableBorder : styles.switchDisableBorder]}
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
    }, switchEnableBorder: {
        borderColor: 'blue',
        borderWidth: 1
    },

    switchDisableBorder: {
        borderColor: 'red',
        borderWidth: 1,
    },  brestposition5: {
        width: 260,
        height: 260,
        marginLeft: 280,
        marginTop: 390,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 175, 0.3)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition6: {
        width: 140,
        height: 140,
        // marginRight: 12,
        marginTop: 450,
        marginLeft: 338,
        backgroundColor: 'rgba(242, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
   , brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -120,
        marginTop: 10,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 178, 0.2)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        // marginRight: 12,
        marginTop: 52,
        marginLeft: -82,
        backgroundColor: 'rgba(255, 255,255, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
});