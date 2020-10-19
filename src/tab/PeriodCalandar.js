import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1
import { IMAGE } from '../constants/image';
// import SwipeablePanel from 'rn-swipeable-panel';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import AsyncStorage from '@react-native-community/async-storage';
import CustomNotification from './CustomPushNotification';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PushNotification from 'react-native-push-notification';
// import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const today = new Date();
const currentDate = today.getDate();
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)

import { extendMoment } from 'moment-range';
import CustomPushNotification from './CustomPushNotification';
const moments = extendMoment(moment);

const db = new Database();
const cn = new CustomPushNotification();

export class PeriodCalandar extends Component {
    initialState = {
        [_today]: { disabled: false }
    }
    constructor(props) {
        super(props);
        this.state = {
            _markedDates: this.initialState,
            marked: null,
            pName: '',
            ovulation_date: '',
            next_period_date: '',
            reacl_next_p_date: '',
            reacl_next_ov_date: '',
            isLoading: false,
            _deleteDate: '',
            _babybDate: '',
            dbs: '',
            _role_id: '',
            _day: currentDate,
            _month_name: monthNames[today.getMonth()],
            _days_count: moment(_today, "YYYY-MM").daysInMonth(),
            _day_of_month: ''

        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);


    }
    async componentDidMount() {
        const role_id = await AsyncStorage.getItem('memberId');
        this.setState({
            isLoading: false,
            _role_id: role_id,
        });
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.loadData();
    }

    loadData() {
        db.listBabyDetails(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {
            } else {
                let { babybDate } = this.props
                for (var i = 0; i < result.length; i++) {
                    babybDate = result[i].bbDate;
                }
                this.setState({
                    isLoading: false,
                    _babybDate: babybDate,
                });
            }
        }).catch((err) => {
            console.log(err);
        })

        let selected = true;
        let markedDates = {}
        let updatedMarkedDates = '';
        let products = [];
        let _pdate = '';
        let marked = true;
        let _pcatId;
        let _pParity_bit = 0;
        let firstOvDate = '';
        let firstOvDateDay = '';

        const start = moment(_today, 'YYYY-MM-DD');
        db.listProduct(this.state.dbs).then((data) => {
            products = data;
            for (var i = 0; i < products.length; i++) {

                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription
                _pParity_bit = products[i].pParityBit


                if (_pcatId == 1) {
                    markedDates = { ...markedDates, ...{ selected }, startingDay: true, endingDay: true, color: "red" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        pName: _pdate,
                        _day_of_month: _pdate.substring(8, 10),
                    });
                }
                if (_pcatId == 4) {

                    if (firstOvDate == '') {
                        let data = {
                            _title: " " + _pDescription + "" + _pdate,
                            _bigText: "this is subtitle",
                        }
                        let ovulation = moment(_pdate).subtract(1, 'day').format('YYYY-MM-DD');
                        if (_today == ovulation) {
                            cn.testPush(data);
                        }

                        const end2 = moment(_pdate, 'YYYY-MM-DD');
                        const range3 = moment.range(start, end2);
                        firstOvDate = range3.snapTo('day');
                        firstOvDateDay = _pdate.substring(8, 10);
                    }


                    if (_pParity_bit == 0) {

                        markedDates = { ...markedDates, ...{ selected }, startingDay: true, color: '#50cebb', textColor: 'white', endingDay: false };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    } else if (_pParity_bit == 4) {

                        markedDates = { ...markedDates, ...{ selected }, endingDay: true, color: '#50cebb', textColor: 'white', startingDay: false };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    }
                    else {
                        markedDates = { ...markedDates, ...{ selected }, startingDay: false, endingDay: false, color: '#70d7c7', textColor: 'white' };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }

                    } this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        reacl_next_ov_date: firstOvDate.diff('days'),
                        ovulation_date: firstOvDateDay

                    });


                } if (_pcatId == 5) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(1, 'day').format('YYYY-MM-DD');
                    if (_today == nestPeriod) {
                        cn.testPush(data);
                    }

                    const end = moment(_pdate, 'YYYY-MM-DD');
                    const range = moment.range(start, end);

                    const range2 = range.snapTo('day');

                    markedDates = { ...markedDates, ...{ selected }, startingDay: true, endingDay: true, color: "pink" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        reacl_next_p_date: range2.diff('days'),

                    });

                }

            }
        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })

        // const start = moment(_today, 'YYYY-MM-DD');
        // let arrayData = 0;
    }

    savePeriod() {

        this.setState({
            isLoading: false,
        });
        this.RBSheet.close();
        var _ovlDate = moment(this.state.pName).add(14, 'day').format('YYYY-MM-DD');
        var _nextDate = moment(this.state.pName).add(28, 'day').format('YYYY-MM-DD');
        let data = {
            pName: this.state.pName,
            pDescription: "Period start ",
            pOvlDate: _ovlDate,
            pNexpdate: _nextDate,
        }
        let result = [];
        let pDateandMonth;
        let pDateandMonthId;
        let availabel = 0;
        let availabelOvl = 0;

        db.listGetCurrntMonthPeriod(this.state.dbs).then((datas) => {
            result = datas;
            var pPeriod_Id = null;
            var pcat_Id = null;
            var p_Id = null;

            for (var i = 0; i < result.length; i++) {

                pDateandMonth = result[i].pName,
                    p_Id = result[i].pId,
                    pcat_Id = result[i].pCatId,
                    pPeriod_Id = result[i].pId

                if (pDateandMonth >= _today) {



                    if (pcat_Id == 1) {
                        availabel = 1
                        let data2 = {
                            _pDateandMonth: this.state.pName,
                            _pPeriod_Id: pPeriod_Id,
                        }

                        console.log("o )))))))))))))))))))))))))))))))))))))))))))) A   : " + pDateandMonth);
                        db.updatePeriod(this.state.dbs, data2).then((result) => {

                            this.setState({
                                // pName: pDateandMonth,
                                isLoading: false,
                            });
                        }).catch((err) => {
                        })

                    } if (pcat_Id == 4) {
                        availabelOvl = 1;
                        this.unmarkDate(pDateandMonth);

                        // console.log("o cat id : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  $ > abc  : " + pDateandMonth);
                        // var _ovlDate = moment(this.state.pName).add(14, 'day').format('YYYY-MM-DD');
                        // if (i < 6) {
                        //     var upnxtOvl = moment(_ovlDate).add(i, 'days').format(_format);
                        //     // db.deleteOvanpPeriod(this.state.dbs, pPeriod_Id).then((result) => {
                        //     // }).catch((err) => {
                        //     //     this.setState = {
                        //     //         isLoading: false,
                        //     //     }
                        //     // })
                        //     db.updateOvanpPeriod(this.state.dbs, upnxtOvl, pPeriod_Id).then((result) => {
                        //     }).catch((err) => {
                        //         this.setState({
                        //             isLoading: false,
                        //         });
                        //     });
                        // }


                    } if (pcat_Id == 5) {
                        this.unmarkDate(pDateandMonth);
                        var _nextDate = moment(this.state.pName).add(28, 'day').format('YYYY-MM-DD');

                        db.updateOvanpPeriod(this.state.dbs, _nextDate, pPeriod_Id).then((result) => {
                        }).catch((err) => {
                            this.setState({
                                isLoading: false,
                            });
                        })
                    }
                }
                this.unmarkDate(pDateandMonth);
            }
            // this.loadData();
            if (availabel == 1) {
                // console.log("o cat id : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  3 > : " + pcat_Id);
                // if (pcat_Id == 5) {
                //     console.log("o cat id : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : " + pcat_Id);
                // }

            } else {

                db.adderiod(this.state.dbs, data).then((result) => {
                    this.setState({
                        isLoading: false,
                    });
                    this.loadData();
                }).catch((err) => {
                    this.setState({
                        isLoading: false,
                    });
                })
                if (availabelOvl == 0) {
                    db.addOvulationPeriod(this.state.dbs, data).then((result) => {
                        this.setState({
                            isLoading: false,
                        });
                        this.loadData();
                    }).catch((err) => {
                        this.setState({
                            isLoading: false,
                        });
                    })
                }
            }

            if (availabelOvl == 1) {

                db.gwtOvulationDates(this.state.dbs, data).then((results) => {
                    var _ovlDate = moment(this.state.pName).add(14, 'day').format('YYYY-MM-DD');

                    result = results;
                    var _pid, _pName;
                    for (var i = 0; i < result.length; i++) {
                        _pid = result[i].pId;
                        _pName = result[i].pName;
                        console.log(">>>>>>>>>>>>>>>>>>>>>>>console log and : >>>>>>>>OPO As P : " + _pName);
                        var upnxtOvl = moment(_ovlDate).add(i, 'days').format(_format);

                        db.updateOvanpPeriod(this.state.dbs, upnxtOvl, _pid).then((result) => {
                        }).catch((err) => {
                            this.setState({
                                isLoading: false,
                            });
                        });
                        this.unmarkDate(pDateandMonth);

                    }
                    this.loadData();
                    this.setState({

                    });
                }).catch((err) => {
                    console.log(err);
                })
            }
            availabel = 0;
            availabelOvl = 0;
        })
        // availabel = 0;
    }
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }
    unmarkDate(dateUnmark) {


        let selected = false;
        let markedDates = {}
        let updatedMarkedDates = '';
        markedDates = { ...markedDates, ...{ selected }, selectedColor: "black" };
        updatedMarkedDates = { ...this.state._markedDates, ...{ [dateUnmark]: markedDates } }
        this.setState({
            isLoading: false,
            _markedDates: updatedMarkedDates,
            // pName: _pdate,
        });
    }
    onDaySelect = (day) => {
        this.RBSheet.open();
        // const _selectedDay = datess;

        const _selectedDay = moment(day.dateString).format(_format);


        // let selected = false;
        // let markedDates = {}

        // if (this.state._markedDates[_selectedDay]) {

        // Already in marked dates, so reverse current marked state
        // markedDates = !this.state._markedDates[_selectedDay].selected;
        // markedDates = this.state._markedDates[_selectedDay];

        // markedDates = { ...markedDates, ...{ selected }, selectedColor: "red" };
        // updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }

        // }

        // markedDates = { ...markedDates, ...{ marked } };

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        //const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }

        // Triggers component to render again, picking up the new state
        this.setState({
            // _markedDates: updatedMarkedDates,
            pName: _selectedDay
        });

    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        } else {
            const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
            const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
            const workout = { key: 'workout', color: 'green' };
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={[styles.scrollView, { marginBottom: -200 }]}>
                        <CustomHeader bgcolor='#fbb146' title="" navigation={this.props.navigation} bdcolor='#fbb146' />
                        <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1, }}>
                            <Text style={{ fontSize: 20, marginTop: 0, marginLeft: 15, fontWeight: 'bold', color: 'white' }}>Calandar</Text>
                        </View>
                        <View style={{ flex: 1, padding: 15, bottom: 80 }}>

                            <Card>
                                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
                                <Card.Content>
                                    {/* <Paragraph>Card content</Paragraph> */}
                                    <Calendar
                                        theme={{
                                            'stylesheet.day.period': {
                                                base: {
                                                    overflow: 'hidden',
                                                    height: 34,
                                                    alignItems: 'center',
                                                    width: 38,
                                                }
                                            }
                                        }}

                                        // we use moment.js to give the minimum and maximum dates.
                                        minDate={_today}
                                        // maxDate={_maxDate}
                                        // hideArrows={true}
                                        // onDayPress={this.onDaySelect}
                                        // onPress={() => this.RBSheet.open()}
                                        onDayPress={this.onDaySelect}
                                        // onDaySelect={()=>this.RBSheet.open()}
                                        // markedDates={{
                                        //     '2020-09-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
                                        //     '2020-09-26': {dots: [massage], disabled: true}
                                        //   }}
                                        //   markingType={'multi-dot'}
                                        // markedDates={{
                                        //     '2020-09-25': { marked: true},
                                        //     '2020-09-25': { marked: true },
                                        //     // '2020-09-26': { selected: true, selectedColor: 'red' }
                                        // }}
                                        // markedDates={{
                                        //     '2020-09-20': { textColor: 'green' },
                                        //     '2020-09-22': { startingDay: true, color: 'green' },
                                        //     '2020-09-23': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
                                        //     '2020-09-04': { disabled: true, startingDay: true, color: 'green', endingDay: true }
                                        // }}
                                        // markedDates={{
                                        //     '2020-10-25': {dots: [], selected: true, selectedColor: 'red'},
                                        //     '2020-10-26': {dots:[massage, workout]}
                                        //   }}
                                        //   markingType={'multi-dot'}
                                        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                                        markingType={'period'}
                                        // markedDates={{
                                        //     '2020-10-22': {  color: '#50cebb', textColor: 'white' },
                                        //     '2020-10-23': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-24': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-25': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-26': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-27': {  color: '#50cebb', textColor: 'white' },
                                        // }}
                                        // markingType={'period'}
                                        markedDates={this.state._markedDates}
                                    // markingType={'period'}
                                    // markingType={'multi-dot'}
                                    />
                                </Card.Content>

                            </Card>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: 'red'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Period</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#50cebb'

                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Ovulation</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#f06292'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Next period</Text>
                                </View>
                                {/* {
                                    this.state._role_id == 1 ?
                                        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                            <View style={[styles.squrecolor, {
                                                backgroundColor: '#ffd740'
                                            }]} />
                                            <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Vaccination</Text>
                                        </View>
                                        : <View></View>
                                } */}
                            </View>
                            {/* {
                                this.state._role_id == 1 ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>

                                        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                            <View style={[styles.squrecolor, {
                                                backgroundColor: '#03a9f4'
                                            }]} />
                                            <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Delivary date</Text>
                                        </View>
                                    </View>
                                    : <View></View>
                            } */}
                            {/* <Calendar
                            markedDates={this.state.marked}
                        // markingType={'multi-dot'}
                        /> */}
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                {/* <Text>dasd: {this.state._day_of_month}</Text> */}
                                <Text style={{ color: 'grey' }}>Period</Text>
                                {
                                    this.state.reacl_next_p_date ?
                                        <Text style={{ fontSize: 40, }}>{this.state.reacl_next_p_date} Days left</Text>
                                        :
                                        <Text ></Text>
                                }
                                {
                                    this.state.reacl_next_ov_date ?
                                        <Text style={{ color: 'grey', marginBottom: 10 }}> Ovulation {this.state.reacl_next_ov_date} days left</Text>
                                        :
                                        <Text style={{ marginBottom: 10 }}></Text>
                                }
                                {/* <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('TestScreeen')} >
                                <Text>dsdsdsd</Text>
                            </TouchableOpacity> */}
                                {/* <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('PeriodAgenda')} >
                                    <Text>View</Text>
                                </TouchableOpacity> */}
                                {
                                    this.state.reacl_next_ov_date ?
                                        <View>
                                            <AnimatedCircularProgress
                                                size={200}
                                                rotation={0}
                                                width={8}
                                                // friction={1} 
                                                // linecap='round' 
                                                circleRadian={200}
                                                fill={(this.state._day / this.state._days_count) * 100}
                                                tintColor="#00e0ff"
                                                // lineCap="round"
                                                style={
                                                    { zIndex: -5, }
                                                }
                                                // tintColorSecondary="#ff0000"
                                                backgroundColor="#3d5875"
                                            // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
                                            >
                                                {
                                                    (fill) => (
                                                        <AnimatedCircularProgress
                                                            size={200}
                                                            rotation={(this.state._day_of_month / this.state._days_count) * 360}
                                                            width={15}
                                                            fill={(1 / this.state._days_count) * 100}
                                                            style={
                                                                { zIndex: 1 }
                                                            }
                                                            // arcSweepAngle={100}
                                                            tintColor="red"
                                                        // backgroundColor="white"
                                                        >
                                                            {
                                                                (fill) => (
                                                                    <Text>
                                                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: 20, marginBottom: -20 }}>{this.state._month_name}</Text>
                                                                            <Text style={{ fontSize: 70, }}>{this.state._day}</Text>
                                                                        </View>
                                                                    </Text>
                                                                )}
                                                        </AnimatedCircularProgress>
                                                    )
                                                }
                                            </AnimatedCircularProgress>
                                            <AnimatedCircularProgress
                                                size={195}
                                                rotation={(this.state.ovulation_date / this.state._days_count) * 360}
                                                width={18}
                                                fill={(5 / this.state._days_count) * 100}
                                                tintColor="#50cebb"
                                                // lineCap="round"

                                                style={
                                                    { zIndex: -5, top: -200 }
                                                }
                                                backgroundColor="transparent"
                                            >
                                            </AnimatedCircularProgress>
                                        </View> : <Text></Text>
                                }

                            </View>

                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                closeOnDragDown={true}
                                height={300}
                                openDuration={250}
                                customStyles={{
                                    container: {
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderTopRightRadius: 20,
                                        borderTopLeftRadius: 20
                                    }
                                }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -13 }}>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{this.state.pName}</Text>
                                        {/* <TouchableOpacity onPress={() => this.savePeriod()} style={styles.button}>
                                            <Text style={styles.buttonText}>Period Start ?</Text>
                                        </TouchableOpacity> */}
                                    </View>

                                    <View style={styles.container}>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => this.savePeriod()}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>

                                                        <Image source={IMAGE.ICON_BET_PERIOD}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginTop: 5, fontSize: 12 }}> Period</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SpecialNotes', { select_date: this.state.pName }); this.RBSheet.close(); }}>
                                                {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('SpecialNotes'); this.addEDD(); }}> */}
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>

                                                        <Image source={IMAGE.ICON_BET_NOTES}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginTop: 5, fontSize: 12 }}> Notes</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('PeriodAgenda'); this.RBSheet.close(); }}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>

                                                        <Image source={IMAGE.ICON_BET_AGENDA}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginTop: 5, fontSize: 12 }}> Agenda</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('PeriodHistory'); this.RBSheet.close() }}>
                                                <View style={{ alignItems: "center", justifyContent: 'center' }} >
                                                    <View style={{ height: 40, padding: 0 }}>
                                                        <Image source={IMAGE.ICON_BET_HISTORY}
                                                            style={{ height: 35, width: 35 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                                        <Text style={{ marginTop: 3, fontSize: 12, marginLeft: 10 }}>period History</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                    </View>
                                </View>

                            </RBSheet>
                        </View>
                        <View style={{ flex: 1 }}>
                        </View>
                    </ScrollView>
                </SafeAreaView >
            );
        }
    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: 300,

        marginTop: 5
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    }, squrecolor: {
        width: 13, height: 13, elevation: 2,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
    }, container: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',

    }, card: {
        height: 85,
        // width: (Dimensions.get("window").width / 2) - 20,
        width: "22%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',
        margin: 5
    }
});