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
// import CustomNotification from './CustomPushNotification';


import PushNotification from 'react-native-push-notification';
// import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)

import { extendMoment } from 'moment-range';
import CustomPushNotification from './CustomPushNotification';
const moments = extendMoment(moment);


const db = new Database();

const cn = new CustomPushNotification();

let _next_pLast_date;



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
            isLoading: true,
            _deleteDate: '',
            _babybDate: ''
        }
    }
    componentDidMount() {

        this.loadData();
    }
    testPush() {
        // PushNotification.localNotificationSchedule({

        //     title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name in other devices)
        //     message: "My Notification Message",// (required)

        //     ticker: "My Notification Ticker", // (optional)

        //     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        //     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        //     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        //     subText: "This is a subText", // (optional) default: none


        //     date: new Date(Date.now()) // in 60 secs

        // });
    }
    loadData() {
        db.listBabyDetails().then((data) => {
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

        /////////////////////////testing///////////////////
        // var arr = ["2020-08-01", "2020-08-03", "2020-08-05", "2020-08-08", "2020-08-10"];
        // var result = arr.reduce((a, c) => {
        //     if (arr[1] == '2020-08-03') {
        //         a[c] = { selected: true, marked: true, selectedColor: 'red' };
        //         return a;
        //     }
        // }, {});
        // var arr = ["ABC", "CDE", "EFG", "CBA", "XYZ"];
        // var obj = arr.reduce((c, v) => Object.assign(c, [v]), {});
        // console.log(result);
        /////////////////////////testing///////////////////
        this.setState({
            isLoading: false,
        });
        db.loadDB();
        let _ovfdate = "";
        let _ovfLastdate;
        let _next_p_date = "";
        let selected = true;
        let selected1 = false;
        let markedDates = {}
        let updatedMarkedDates = '';

        let products = [];
        let period = [];
        let _plastdate;
        let _plastcatId;
        let _pdate = '';

        // let i=0;
        let deletedMarkeDates = 0;
        db.listProduct().then((data) => {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ppp2 : " + this.state.pName);
            products = data;
            for (var i = 0; i < products.length; i++) {

                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription
                if (_pcatId == 1) {
                    deletedMarkeDates = 1;
                    // if (this.state._deleteDate == '') {

                    // if (this.state.pName==_pdate) {

                    //         selected = !this.state._markedDates[_pdate].selected;
                    //         markedDates = this.state._markedDates[_pdate];
                    // }
                    // if (_pdate.substring(0, 7) == _today.substring(0, 7)) {
                    //     _ovfdate = moment(_pdate).add(14, 'day').format('YYYY-MM-DD');
                    //     _next_p_date = moment(_pdate).add(28, 'day').format('YYYY-MM-DD');
                    // }


                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "red" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        // products,
                        isLoading: false,

                        _markedDates: updatedMarkedDates,
                        pName: _pdate,
                        // ovulation_date: _ovfdate,
                        // next_period_date: _next_p_date,
                    });

                    // }
                    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> delete mrk : : " + _pdate);
                } if (_pcatId == 2) {
                    let data = {
                        _title: "Yor delivary date is " + _pdate,
                        _bigText: "5 days more to you delivery",
                    }
                    let before5Daydelevary = moment(_pdate).subtract(5, 'day').format('YYYY-MM-DD');
                    if (_today == before5Daydelevary) {
                        cn.testPush(data);
                    }
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "#03a9f4" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        // products,
                        isLoading: false,

                        _markedDates: updatedMarkedDates,
                        pName: _pdate,

                    });
                } if (_pcatId == 3) {
                    var babayBirgDay = this.state._babybDate;
                    if (babayBirgDay != "") {
                        let nextVaaccination = moment(babayBirgDay).add(_pdate, 'day').format('YYYY-MM-DD');
                        let data = {
                            _title: "Yor " + _pDescription + " vacination date is " + nextVaaccination,
                            _bigText: "2 days more ",
                        }
                        let beforeVaccination = moment(nextVaaccination).subtract(2, 'day').format('YYYY-MM-DD');

                        if (_today == beforeVaccination) {

                            cn.testPush(data);
                        }

                        markedDates = { ...markedDates, ...{ selected }, selectedColor: "#ffd740" };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [nextVaaccination]: markedDates } }
                        this.setState({
                            // products,
                            isLoading: false,

                            _markedDates: updatedMarkedDates,
                            pName: nextVaaccination,
                            // ovulation_date: _ovfdate,
                            // next_period_date: _next_p_date,
                        });
                    }
                }
            }

            // deletedMarkeDates=
            // this.tmpArray = [

            //     { date: this.state.ovulation_date, age: 10, color: "green" },
            //     { date: this.state.next_period_date, age: 10, color: "pink" },
            // ];
            // {
            //     this.tmpArray.map((item, key) => (
            //         markedDates = { ...markedDates, ...{ selected }, selectedColor: item.color },
            //         updatedMarkedDates = { ...this.state._markedDates, ...{ [item.date]: markedDates } },
            //         this.setState({
            //             _markedDates: updatedMarkedDates,
            //         })
            //     )

            //     )
            // }


            // markedDates = { ...markedDates, ...{ selected }, selectedColor: "red" };
            // updatedMarkedDates = { ...this.state._markedDates, ...{ ["2020-09-11"]: markedDates } }


            // markedDates = { ...markedDates, ...{ selected }, selectedColor: "green" };
            // updatedMarkedDates = { ...this.state._markedDates, ...{ ["2020-09-01", "2020-09-03"]: markedDates } }
            // updatedMarkedDates = { ...this.state._markedDates, ...{ [this.state.ovulation_date]: markedDates } }

            // markedDates = { ...markedDates, ...{ selected }, selectedColor: "pink" };
            // updatedMarkedDates2 = { ...this.state._markedDates, ...{ [this.state.next_period_date]: markedDates } }
            // this.setState({
            //     _markedDates: updatedMarkedDates,

            //     // _markedDates: updatedMarkedDates2,

            // });
        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })
        if (this.state._deleteDate != '') {

            //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  date eka : : " + _pdate);
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  pname eka : : " + this.state._deleteDate);
            // selected = !this.state._markedDates[_deleteDate].selected;
            // markedDates = this.state._markedDates[_deleteDate];

            markedDates = { ...markedDates, ...{ selected1 }, selectedColor: "red" };
            updatedMarkedDates = { ...this.state._markedDates, ...{ [this.state._deleteDate]: markedDates } }
            this.setState({
                products,
                isLoading: false,

                _markedDates: updatedMarkedDates,
                // pName: _pdate,
                // ovulation_date: _ovfdate,
                // next_period_date: _next_p_date,
            });
        }

        const start = moment(_today, 'YYYY-MM-DD');
        let arrayData = 0;

        db.listLastPeriodDate().then((datat) => {

            period = datat;
            for (var i = 0; i < period.length; i++) {
                arrayData = 1;
                _plastdate = period[i].pName
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>?????????????????????????????????? : " + _plastdate);
                _plastcatId = period[i].pCatId
                _ovfLastdate = moment(_plastdate).add(14, 'day').format('YYYY-MM-DD');
                _next_pLast_date = moment(_plastdate).add(28, 'day').format('YYYY-MM-DD');
            }
            if (arrayData > 0) {
                const end = moment(_next_pLast_date, 'YYYY-MM-DD');
                const range = moment.range(start, end);
                const range2 = range.snapTo('day');

                const end2 = moment(_ovfLastdate, 'YYYY-MM-DD');
                const range3 = moment.range(start, end2);
                const range4 = range3.snapTo('day');
                this.setState({
                    isLoading: false,
                    ovulation_date: _ovfLastdate,
                    next_period_date: _next_pLast_date,
                    reacl_next_p_date: range2.diff('days'),
                    reacl_next_ov_date: range4.diff('days'),
                });
                this.tmpArray = [

                    { date: this.state.ovulation_date, age: 10, color: "#008e76" },
                    { date: this.state.next_period_date, age: 10, color: "#f06292" },
                ];
                {
                    this.tmpArray.map((item, key) => (

                        markedDates = { ...markedDates, ...{ selected }, selectedColor: item.color },
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [item.date]: markedDates } },
                        this.setState({
                            isLoading: false,
                            _markedDates: updatedMarkedDates,



                        })
                    ))
                }
            }


        });


    }

    savePeriod() {
        this.RBSheet.close();
        this.setState({
            isLoading: false,
        });
        let data = {
            // pId: this.state.pId,
            pName: this.state.pName,
            pDescription: "Period start",
        }
        let result = [];
        let pDateandMonth;
        let pDateandMonthId;
        let availabel = 0;
        db.loadDB();
        db.listGetCurrntMonthPeriod().then((datas) => {
            result = datas;
            for (var i = 0; i < result.length; i++) {
                pDateandMonth = result[i].pName

                if (pDateandMonth == this.state.pName) {
                    pDateandMonthId = result[i].pId
                    availabel = 1;
                }
            }
            if (availabel == 1) {
                let dataCmonth = {
                    pId: pDateandMonthId,
                    pName: this.state.pName,

                }
                db.deletePeriod(pDateandMonthId).then((result) => {

                    this.setState({
                        _deleteDate: this.state.pName,
                        isLoading: false,
                        reacl_next_p_date: '',
                        reacl_next_ov_date: '',
                        next_period_date: '',
                        ovulation_date: '',
                    });
                    this.loadData();



                }).catch((err) => {
                })
                availabel = 0;
            } else {
                db.adderiod(data).then((result) => {

                    this.setState({
                        isLoading: false,
                    });
                    this.loadData();

                }).catch((err) => {

                    this.setState({
                        //   isLoading: false,
                    });
                })

            }
            availabel = 0;
        })

        // availabel = 0;
    }
    addEDD() {
        this.RBSheet.close();
        this.setState({
            isLoading: false,
        });
        const eddDate = moment(this.state.pName).add(277, 'day').format('YYYY-MM-DD');
        let data = {
            pName: eddDate,
            pDescription: 'Delevary Date',
        }
        let result = [];
        let _eddIdId;
        let availabeledd = 0;


        db.loadDB();
        db.getEddDate().then((datas) => {
            result = datas;
            for (var i = 0; i < result.length; i++) {
                _eddIdId = result[i].pId
                availabeledd = 1;

            }
            if (availabeledd == 1) {

                availabeledd = 0;
            } else {
                db.addEDD(data).then((result) => {
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
            availabeledd = 0;
        })





    }
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }
    geteriods() {

    }
    onDaySelect = (day) => {
        this.RBSheet.open();
        const _selectedDay = moment(day.dateString).format(_format);
        // let marked = true;
        // let markedDates = {}
        if (this.state._markedDates[_selectedDay]) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<????????? : " + _selectedDay);
            // Already in marked dates, so reverse current marked state
            // marked = !this.state._markedDates[_selectedDay].marked;
            // markedDates = this.state._markedDates[_selectedDay];
        }

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
    // renderContent = () => { }


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
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fce4ec' }}>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                        <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1, }}>
                          
                        </View>
                        <View style={{ flex: 1, padding: 15,bottom:80 }}>

                            <Card>
                                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
                                <Card.Content>

                                    {/* <Paragraph>Card content</Paragraph> */}
                                    <Calendar
                                        theme={{
                                            dotColor: 'pink',
                                            // backgroundColor: 'white',
                                            // selectedDayBackgroundColor: 'white',
                                            selectedDayTextColor: 'white'
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
                                        //     '2020-08-25': { selected: true, selectedColor: 'green' },
                                        //     '2020-08-26': { selected: true, selectedColor: 'red' }
                                        // }}

                                        // markingType='multi-period'
                                        markedDates={this.state._markedDates}
                                    // markingType={'multi-dot'}

                                    />
                                </Card.Content>

                            </Card>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: 'red'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Period</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#008e76'

                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Ovulation</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#f06292'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Next period</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#ffd740'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Vaccination</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>

                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#03a9f4'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Delivary date</Text>
                                </View>
                            </View>
                            {/* <Calendar
                            markedDates={this.state.marked}
                        // markingType={'multi-dot'}
                        /> */}
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                <Text style={{ color: 'grey' }}>Period</Text>
                                {
                                    this.state.reacl_next_p_date ?
                                        <Text style={{ fontSize: 40, }}>{this.state.reacl_next_p_date} Days left</Text>

                                        :
                                        <Text ></Text>

                                }
                                {
                                    this.state.reacl_next_ov_date ?
                                        <Text style={{ color: 'grey' }}> Ovulation {this.state.reacl_next_ov_date} days left</Text>
                                        :
                                        <Text ></Text>
                                }




                                {/* <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('TestScreeen')} >
                                <Text>dsdsdsd</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('ProductScreen2')} >
                                <Text>View</Text>
                            </TouchableOpacity> */}
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
                                        <Text style={{ color: 'gray', fontSize: 12 }}>2020-08-26</Text>
                                        <TouchableOpacity onPress={() => this.savePeriod()} style={styles.button}>
                                            <Text style={styles.buttonText}>Period Start ?</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.container}>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EDDCalculator'); this.addEDD(); }}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>
                                                        {/* <Icon
                                                        name='baby'
                                                        type='font-awesome'
                                                        color='gray'
                                                        onPress={() => console.log('hello')} /> */}
                                                        <Image source={IMAGE.ICON_FETUS}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <Text style={{ marginTop: 5 }}> EDD</Text>

                                                </View>
                                            </TouchableOpacity>

                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BMICalculator')}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>
                                                        <Image source={IMAGE.ICON_MENU_METER}
                                                            style={{ height: 35, width: 35 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <Text style={{ marginTop: 5 }}> Calc</Text>

                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('BMICalculator'); this.RBSheet.close() }}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>
                                                        <Image source={IMAGE.ICON_MENU_METER}
                                                            style={{ height: 35, width: 35 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <Text style={{ marginTop: 5 }}>BMI </Text>

                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BMICalculator')}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>
                                                        <Image source={IMAGE.ICON_MENU_METER}
                                                            style={{ height: 35, width: 35 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <Text style={{ marginTop: 5 }}>BMI </Text>

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
        // flexWrap: 'wrap',
        // paddingTop: 5,
        // paddingLeft: 10,
        // paddingRight: 10
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