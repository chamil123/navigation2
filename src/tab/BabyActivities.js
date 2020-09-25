import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

import Database from '../Database';
import moment from 'moment' // 2.20.1
import { List, ListItem, Left, Body, Right } from 'native-base';
import *as Animatable from 'react-native-animatable';
import { BarChart, Grid } from 'react-native-svg-charts';
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import ActionButton from 'react-native-action-button';
import { TextInput } from 'react-native-paper';
import { BarIndicator, } from 'react-native-indicators';
const db = new Database();
var j = 0;

const _format = 'YYYY-MM-DD'

const _today = moment().format(_format)
export class BabyActivities extends Component {
    constructor(props) {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        super(props);


        this.state = {
            isLoading: true,
            selectedDate: new Date(),
            TextInputdaValue: '',
            _current_date: date,
            _list_kcData: [],

            _kick_count: 0,
            increment: 0,


        }


    }
    componentDidMount() {


        this.getaAllClickData();
    }
    saveData() {
        this.RBSheet.close();
        const _format = 'YYYY-MM-DD'
        const _selectedDay = moment(this.state.selectedDate).format(_format);

        this.setState({
            isLoading: false,


        });
        let data = {
            // pId: this.state.pId,
            baDate: _selectedDay.toString(),
            baText: this.state.TextInputdaValue
        }

        console.log("################ :" + _selectedDay.toString());
        console.log("^^^^^^^^^^^^^^^^ :" + this.state.TextInputdaValue);
        db.addBabyActivity(data).then((result) => {
            console.log(result);
            this.setState({
                isLoading: false,
            });
            this.getData();
            //   this.props.navigation.state.params.onNavigateBack;
            //   this.props.navigation.goBack();
        }).catch((err) => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        })


    }

    getaAllClickData() {

        db.listAllBabyActivity().then((results) => {
            result = results;
            this.setState({
                isLoading: false,
                _list_kcData: results,
            });


        }).catch((err) => {
            console.log(err);
        })
    }
    // getData() {
    //     const self = this;
    //     db.listBloodPresure().then((data) => {
    //      let result = data;
    //       if (result == 0) {

    //       } else {
    //         var temp2 = [];
    //         var temp3 = [];
    //         var temp4 = [];
    //         var temp5 = [];
    //         var _monthDate;
    //         const dataClone = { ...self.state.data }
    //         for (var i = 0; i < result.length; i++) {
    //           _monthDate = result[i].bpDate.substring(5, 10);

    //           temp2.push([result[i].bpValue]);
    //           temp3.push([_monthDate]);
    //           temp4.push([result[i].bpmin]);
    //           temp5.push([result[i].bpmax]);

    //         }
    //         dataClone.labels = temp3;
    //         dataClone.datasets[0].data = temp2;
    //         dataClone.datasets[1].data = temp4;
    //         dataClone.datasets[2].data = temp5;

    //         self.setState({
    //           isLoading: false,
    //           data: dataClone,
    //           _list_bpData: data,
    //         });

    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     })
    //   }

    keyExtractor = (item, index) => index.toString()
    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                    <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>

                        <View>
                            <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1 }}>
                                <View style={{ marginTop: 0, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Baby activity</Text>
                                    {/* <Text style={{ color: 'white' }}>Pregnancy Due Date Calculator</Text> */}
                                </View>
                            </View>

                            {/* <View style={styles.breadthPo1}> */}
                            <View style={styles.container}>

                                <Card style={[styles.card, { backgroundColor: '#d5cdfe' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedingTimeChart', {
                                        data: ''
                                    })}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 45, padding: 10 }}>
                                                <Image source={IMAGE.ICON_GROUTH_CHART_1}
                                                    style={{ height: 30, width: 30 }}
                                                >
                                                </Image>
                                            </View>

                                            <Text style={{ marginTop: 0, fontSize: 12 }}>Feeding </Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>


                                <Card style={[styles.card, { backgroundColor: '#cbf2fe' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UrinationTime')}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 45, padding: 10 }}>
                                                <Image source={IMAGE.ICON_BABY_BOTTLE}
                                                    style={{ height: 30, width: 30 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginTop: 0, fontSize: 12 }}>Urination</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card, { backgroundColor: '#fcd7d3' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EliminationChart')}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 45, padding: 10 }}>
                                                <Image source={IMAGE.ICON_BABY_BOTTLE}
                                                    style={{ height: 30, width: 30 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginTop: 0, fontSize: 12 }}>Elimination</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card, { backgroundColor: '#fce6d2' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SleepingTimeChart')}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 45, padding: 10 }}>
                                                <Image source={IMAGE.ICON_BABY_BOTTLE}
                                                    style={{ height: 30, width: 30 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginTop: 0, fontSize: 12 }}>Bath time</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>




                            </View>
                            {/* </View> */}

                            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: -50 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={IMAGE.ICON_BABY_ACTIVITY}
                                        style={{ height: 250, width: 250 }}
                                    >
                                    </Image>
                                </View>
                                <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History of activities</Text>
                                <FlatList

                                    style={{
                                        backgroundColor: 'white', marginVertical: 0,
                                        //  borderRadius: 16,
                                        elevation: 2,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.7,
                                        shadowRadius: 8,

                                    }}
                                    keyExtractor={this.keyExtractor}
                                    data={this.state._list_kcData}

                                    // renderItem={this.renderItem}

                                    renderItem={({ item }) => <ListItem
                                        style={{
                                            height: 50, paddingTop: 15,

                                        }}
                                    >
                                        <Left>
                                            <View style={styles.iconMore}>

                                                <Icon
                                                    name='calendar'
                                                    type='font-awesome'
                                                    color='gray'
                                                    iconStyle={{ fontSize: 18 }}
                                                    onPress={() => console.log('hello')} />
                                            </View>
                                        </Left>
                                        <Body style={{ marginLeft: -160 }}>
                                            <Text style={{ color: 'gray', fontSize: 12 }}>{item.baDate}</Text>
                                            <Text style={styles.dateText}>{item.baText} </Text>
                                        </Body>
                                        <Right>
                                            <View style={styles.iconMore}>
                                                <Icon
                                                    type='font-awesome'
                                                    color='gray'
                                                    iconStyle={{ fontSize: 18 }}
                                                    name="trash-o" color="gray" />
                                            </View>
                                        </Right>
                                    </ListItem>
                                    }
                                />
                            </View>

                        </View>
                    </ScrollView>
                    <ActionButton buttonColor="#f78a2c" onPress={() =>
                        this.RBSheet.open()
                    }
                        style={{ position: 'absolute', zIndex: 999 }}
                    >


                    </ActionButton>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        closeOnDragDown={true}
                        // closeOnPressMask={false}
                        height={300}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20
                            }
                        }}

                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>
                            <View style={{ flex: 1 }}>
                                <CalendarStrip

                                    selectedDate={this.state.selectedDate}
                                    onPressDate={(date) => {
                                        this.setState({ selectedDate: date });

                                    }}
                                    onPressGoToday={(today) => {
                                        this.setState({ selectedDate: today });
                                    }}
                                    onSwipeDown={() => {
                                        // alert('onSwipeDown');
                                    }}
                                    markedDate={['2020-08-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
                                />



                                {/* <TextInput /> */}
                                <TextInput onChangeText={TextInputValue => this.setState({ TextInputdaValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="PB value" />
                                <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                                    <Text style={styles.buttonText}>Add Activity</Text>


                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </RBSheet>
                </SafeAreaView>
            );
        }
    }
} const styles = StyleSheet.create({

    button6: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    }, footer: {
        flex: 6,
        backgroundColor: '#f3f3f3',
        zIndex: -1
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 2,
        backgroundColor: '#fbb146'
        // justifyContent: 'center',
        // alignItems: 'center',
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        bottom: 70,
        zIndex: 5,
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
        height: 90,
        // width: (Dimensions.get("window").width / 2) - 20,
        // width: "45%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',


        margin: 5
    }, button: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: 300,

        marginTop: 20
    }, buttonText: {
        fontSize: 15,
        color: '#fff',
    }
});