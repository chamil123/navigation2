import React, { Component, useState } from 'react';
import { Modal, StyleSheet, ImageBackground, Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch } from 'react-native';

import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1

import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { IMAGE } from '../constants/image';
import *as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    BarIndicator,
} from 'react-native-indicators';
const db = new Database();
// const dbs=null;
// var db = openDatabase({ name: 'UserDatabase.db' });
var ddd;
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
            hStatus: value2,
            hId: value,
            date: this.state.date,
        }

        this.setState({ switchValue: value });
        let int;
        let result;
        if (value != null) {
            db.updateStatus(this.state.dbs, data).then((result) => {
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
        db.listBag(this.state.dbs).then((data) => {
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
        db.listMotherBagItems(this.state.dbs).then((data) => {


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

                <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

                    <CustomHeader style={{ zIndex: -5 }} bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                    <View style={styles.brestposition5}></View>
                    <View style={styles.brestposition6}></View>
                    <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View>
                    <ImageBackground
                        source={require('../images/undraw_pilates_gpdb.png')}
                        style={{ paddingBottom: 0, paddingTop: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                    >
                        <View style={{ backgroundColor: '#fbb146', height: 165, zIndex: -1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                            <View style={{ marginTop: 0, marginLeft: 20 }}>

                                <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>Hello {this.state.userName}</Text>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>It's time to check your Blood Presure level</Text>
                                <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BloodPresureBarChart')} style={[styles.buttonh, { backgroundColor: '#ED1B26', width: 130 }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#90a4ae', padding: 10, borderRadius: 35 }}>
                                            <Icon
                                                name='suitcase'
                                                type='font-awesome'
                                                color='red'
                                                iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'white' }}
                                            />
                                        </View>
                                        <Text style={{ color: 'white', padding: 7 }}>Baby Bag</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BloodPresureBarChart')} style={[styles.buttonh, { backgroundColor: 'green', width: 170 }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#90a4ae', padding: 10, borderRadius: 35 }}>
                                            <Icon
                                                name='shopping-bag'
                                                type='font-awesome'
                                                color='red'
                                                iconStyle={{ fontSize: 13, color: 'white' }}
                                            />
                                        </View>
                                        <Text style={{ color: 'white', padding: 7 }}>labour room Pack</Text>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </ImageBackground>
                    {/* <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}> */}
                        <View style={styles.container}>

                            <Card style={[styles.card]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedingTimeChart', {
                                    data: ''
                                })}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 45, padding: 0 }}>
                                            <AnimatedCircularProgress
                                                size={85}
                                                rotation={0}
                                                width={5}
                                                fill={25}
                                                tintColor="#f78a2c"
                                                backgroundColor="#cfd8dc">
                                                {
                                                    (fill) => (
                                                        <TouchableOpacity style={styles.button5}
                                                        >
                                                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                                <Text style={{ fontSize: 20, }}>25</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            </AnimatedCircularProgress>
                                            <Text style={{ marginTop: 5 }}>Hospital Bag</Text>
                                        </View>



                                    </View>
                                </TouchableOpacity>

                            </Card>


                            <Card style={[styles.card]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UrinationTime')}>
                                    <View style={{ alignItems: "center" }} >
                                        <AnimatedCircularProgress
                                            size={85}
                                            rotation={0}
                                            width={5}
                                            fill={25}
                                            tintColor="red"
                                            backgroundColor="#cfd8dc">
                                            {
                                                (fill) => (
                                                    <TouchableOpacity style={styles.button5}
                                                    >
                                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                            <Text style={{ fontSize: 20, }}>25</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </AnimatedCircularProgress>
                                        <Text style={{ marginTop: 5 }}>Baby Bag</Text>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Card style={[styles.card]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EliminationChart')}>
                                    <View style={{ alignItems: "center" }} >

                                        <AnimatedCircularProgress
                                            size={85}
                                            rotation={0}
                                            width={5}
                                            fill={25}
                                            tintColor="green"
                                            backgroundColor="#cfd8dc">
                                            {
                                                (fill) => (
                                                    <TouchableOpacity style={styles.button5}
                                                    >
                                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                            <Text style={{ fontSize: 20, }}>25%</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </AnimatedCircularProgress>
                                        <Text style={{ marginTop: 5 }}>Labour Room</Text>
                                    </View>
                                </TouchableOpacity>
                            </Card>

                        </View>
                        <View >
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', marginTop: 25, marginLeft: 18 }}>Prepair Hospital Bag</Text>


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
                                        <Text style={styles.dateText}>{
                                            item.hStatus == "true" ?
                                                item.hDate : ''
                                        }</Text>
                                    </Body>
                                    <Right>

                                        <Switch
                                            disabled={true}
                                            trackColor={{ true: '#f78a2ced', false: 'grey' }}
                                            thumbColor={'white'}

                                            value={item.hStatus == "true" ? true : false}
                                        />

                                    </Right>
                                </ListItem>



                                } />
                        </View>
                    {/* </ScrollView> */}

                    {/* <View style={styles.header}> */}
                    {/* <Image style={{ width: 350, height: 260, marginLeft: 0, }}
                            source={IMAGE.ICON_HOSPITAL_MOM_BAG}
                            resizeMode="contain"
                        /> */}

                    {/* </View> */}
                    {/* <Animatable.View style={styles.footer} animation="fadeInUpBig">
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HospitalBagBaby')}>
                                <Text style={styles.buttonText}>Prepare baby bag</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { marginRight: 20 }]} onPress={() => this.props.navigation.navigate('LabourRoomPacking')}>
                                <Text style={styles.buttonText}>labour room pack </Text>

                            </TouchableOpacity>
                        </View>
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
                                    <Text style={styles.dateText}>{
                                        item.hStatus == "true" ?
                                            item.hDate : ''
                                    }</Text>
                                </Body>
                                <Right>

                                    <Switch
                                        disabled={true}
                                        trackColor={{ true: '#f78a2ced', false: 'grey' }}
                                        thumbColor={'white'}

                                        value={item.hStatus == "true" ? true : false}
                                    />

                                </Right>
                            </ListItem>



                            } />


                    </Animatable.View> */}
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
        justifyContent: 'center',
        alignItems: 'center',
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
    }, buttonh: {
        backgroundColor: "#AF1E8F",
        padding: 5,
        borderRadius: 25,
        marginTop: 18,
        width: 120,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,


    }
    , brestposition5: {
        width: 260,
        height: 260,
        marginLeft: 280,
        marginTop: 390,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 175, 0.5)',
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
    , container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        // bottom: 40,
        // zIndex: 5,
    }, button5: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 55,
        elevation: 5, // Android
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }, breadthPo1: {

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        bottom: 130,
        zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,
        // shadowColor: '#30C1DD',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
    }, breadthPo2: {

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        // bottom: -190,
        marginBottom: 10,
        // zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,
        // shadowColor: '#30C1DD',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
    }, card: {

        height: 130,
        // width: (Dimensions.get("window").width / 2) - 20,
        width: "30.5%",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 5,
        alignItems: 'center',


        margin: 5
    }, brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -70,
        marginTop: 160,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 178, 0.8)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        // marginRight: 12,
        marginTop: 202,
        marginLeft: -32,
        backgroundColor: 'rgba(243, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
});