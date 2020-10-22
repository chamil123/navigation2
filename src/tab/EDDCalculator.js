import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { IMAGE } from '../constants/image';
import * as Progress from 'react-native-progress';
import { CustomHeader } from '../index';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment' // 2.20.1
import { extendMoment } from 'moment-range';
const moments = extendMoment(moment);
import RBSheet from "react-native-raw-bottom-sheet";
import Database from '../Database';
import *as Animatable from 'react-native-animatable';
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { TextInput } from 'react-native-paper';
const db = new Database();
import ActionButton from 'react-native-action-button';
import DatePicker from 'react-native-date-picker';
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)


const screenWidth = Dimensions.get("window").width;

const labels = ["1st month", , "3rd month ", "5thmonth", "7th month", "9th month"];
const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: 'gray'
}
export class EDDCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            currentPosition: 0,
            _eddDateCount: '',
            _compltedMonths: '',
            dbs: '',
            TextInpuPbValue: '',
            date: new Date(),
            abd:IMAGE.ICON_BABY_1_WEEK,
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.getDDDate();
    }
    getDDDate() {
        const start = moment(_today, 'YYYY-MM-DD');

        // db.loadDB();
        let edd = [];
        let plastdate = "";
        let eddDate = "";
        let compltedMonths = "";
        db.getEddDate(this.state.dbs).then((datat) => {
            edd = datat;
            for (var i = 0; i < edd.length; i++) {
                plastdate = edd[i].pName
                console.log("dsdssd ((((((((((((((((((((((())))))))))))))))))))))) : " + plastdate);
            }
            // eddDate = moment(plastdate).add(277, 'day').format('YYYY-MM-DD');
            const end = moment(plastdate, 'YYYY-MM-DD');
            const range = moment.range(start, end);
            const range2 = range.snapTo('day');
            compltedMonths = ((277 - range2.diff('days')) / 30).toFixed(0);
            this.setState({
                _eddDateCount: range2.diff('days'),
                _compltedMonths: compltedMonths
            });

        });
    }
    componentDidMount() {





    }
    onPageChange(position) {
        this.setState({ currentPosition: position });
    }
    addEDD() {
        this.RBSheet.close();
        this.setState({
            isLoading: false,
        });
        var dates = this.state.date;
        var formattedDate = moment(dates).format("YYYY-MM-DD")
        const eddDate = moment(formattedDate).add(277, 'day').format('YYYY-MM-DD');



        let data = {
            pName: eddDate,
            pDescription: 'Estimated Delivery Date',
        }
        let result = [];
        let _eddIdId;
        let availabeledd = 0;


        // console.log("edd dATE :::::::::::::::" + eddDate);
        db.getEddDate(this.state.dbs).then((datas) => {
            result = datas;
            for (var i = 0; i < result.length; i++) {
                _eddIdId = result[i].pId
                availabeledd = 1;

            }
            if (availabeledd == 1) {

                availabeledd = 0;
            } else {
                db.addEDD(this.state.dbs, data).then((result) => {
                    this.setState({
                        isLoading: false,
                    });
                    this.getDDDate();
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
    updateEdd() {
        console.log("dsdsdssssssss??????????????????????????????????");

        // let result = [];
        // let _eddIdId;
        // let availabeledd = 0;
        // db.getEddDate(this.state.dbs).then((datas) => {
        //     result = datas;
        //     for (var i = 0; i < result.length; i++) {
        //         _eddIdId = result[i].pId
        //         availabeledd = 1;

        //     }
        //     if (availabeledd == 1) {

        //         db.deletePeriod(_eddIdId).then((result) => {


        //         }).catch((err) => {
        //         })

        //         availabeledd = 0;
        //     }
        //     availabeledd = 0;
        // })


    }
    render() {
        const data = [10, 5, 25, 15, 20]

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value}
                </Text>
            ))
        )
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fbb146' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />

                <View style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Estimated Date of Delivery (EDD)</Text>
                        <Text style={{ color: 'white' }}>Pregnancy Due Date Calculator</Text>
                    </View>

                </View>
                <View style={styles.footer}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={{ justifyContent: 'center', padding: 0, paddingTop: 25, }}>
                            <View style={{ backgroundColor: 'white', borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>


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
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <StepIndicator
                                    calendarHeaderContainerStyle={{ backgroundColor: 'red' }}
                                    customStyles={customStyles}
                                    currentPosition={this.state._compltedMonths}
                                    stepCount={9}
                                    labels={labels}

                                /></View>

                            {/* <View style={{ flexDirection: 'row' }}>
                            
                                <View style={styles.monthWith}>
                                    <Image style={styles.monthImageSize}
                                        source={IMAGE.ICON_1MONTH}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.monthWith}>
                                    <Image style={styles.monthImageSize}
                                        source={IMAGE.ICON_3MONTH}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.monthWith}>
                                    <Image style={styles.monthImageSize}
                                        source={IMAGE.ICON_5MONTH}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.monthWith}>
                                    <Image style={styles.monthImageSize}
                                        source={IMAGE.ICON_7MONTH}
                                        resizeMode="contain" ss
                                    />
                                </View>
                                <View style={styles.monthWith}>
                                    <Image style={styles.monthImageSize}
                                        source={IMAGE.ICON_9MONTH}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View> */}
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <AnimatedCircularProgress
                                    size={290}
                                    rotation={0}
                                    width={5}
                                    fill={(this.state._eddDateCount / 277) * 100}


                                    tintColor="#f78a2c"

                                    backgroundColor="#cfd8dc">
                                    {
                                        (fill) => (

                                            <TouchableOpacity style={styles.button5}

                                            // onPress={() => console.log('hello')}

                                            // onPress={() => this.saveData()}

                                            >
                                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={this.state.abd}
                                                        style={{ height: 240, width: 240, borderRadius: 150 }}
                                                    >
                                                    </Image>
                                                    {/* {
                                                        this.state._eddDateCount ?
                                                            <Text style={{ fontSize: 70, fontWeight: 'bold' }}>{this.state._eddDateCount}</Text>
                                                            :
                                                            <Text style={{ fontSize: 70, fontWeight: 'bold' }}>0</Text>
                                                    }

                                                    <Text style={{ fontSize: 20, }}>days left</Text> */}
                                                </View>

                                                {/* <Image style={{ width: 75, height: 75, marginLeft: 0, marginTop: 0 }}
                                            source={IMAGE.ICON_BABY_FOOT2}
                                            resizeMode="contain"
                                        /> */}
                                            </TouchableOpacity>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>
                            {/* <View style={{ justifyContent: 'center', padding: 50, }}>

                                <TouchableOpacity style={styles.button} onPress={() => { this.updateEdd(); this.RBSheet.open() }}>
                                 
                                    <Text style={styles.buttonText}>Edit EDD  Date</Text>
                                </TouchableOpacity>
                            </View> */}



                            <View style={styles.container}>
                                
                                <Card style={[styles.periodcard]}>
                                  
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ flexDirection: 'column' }}>

                                            <Text style={{ fontSize: 60, marginBottom: -10, marginTop: -10, color: '#424242' }}>{this.state.reacl_next_p_dateCount}</Text>
                                            <Text>Days left</Text>

                                        </View>
                                        <View >
                                            <View style={{ marginLeft: 8, flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ marginTop: 10, marginBottom: -10 }}>
                                                        <Text style={{ color: '#9e9e9e', fontSize: 12 }}>Start date</Text>
                                                        <Text style={{ fontSize: 12, fontSize: 12, fontWeight: 'bold' }}>{this.state.pName}</Text>
                                                    </View>

                                                    <View style={{ marginTop: 10, marginBottom: -10 }}>
                                                        <Text style={{ color: '#9e9e9e', fontSize: 12, marginLeft: 0 }}>Next Perod date</Text>
                                                        <Text style={{ fontSize: 12, fontSize: 12, fontWeight: 'bold', textAlign: 'right' }}>{this.state._next_period_date}</Text>
                                                    </View>

                                                </View>

                                                <Progress.Bar style={{ marginTop: 20, backgroundColor: '#e0e0e0', borderColor: 'white', }} color='#f78a2c' progress={(28) / 100} height={5} borderRadius={5} width={250} />
                                                <View>
                                                    <Text style={{ color: '#9e9e9e', fontSize: 12, marginLeft: 0, marginTop: 4 }}>Ovulation Date : <Text style={{ fontSize: 12, fontSize: 12, fontWeight: 'bold', color: 'black' }}>2020-10-15</Text></Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </Card>

                       
                            </View>

                        </View>
                        {/* <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
                        <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>

                    </View> */}


                    </ScrollView>
                    <ActionButton


                        renderIcon={active => active ? (<Icon iconStyle={{ fontSize: 18, padding: 8, }} type='font-awesome' name="plus" color='white' />) : (<Icon iconStyle={{ fontSize: 18, padding: 8 }} type='font-awesome' name="plus" color='white' />)}
                        onPress={() => this.RBSheet.open()}
                        buttonColor="red">
                        {/* <ActionButton.Item
                            buttonColor="#1abc9c"
                            title="Add New"
                            onPress={() => this.props.navigation.navigate('AddMesurement')}>
                            <Icon
                                type='font-awesome'
                                color='gray'
                                iconStyle={{ fontSize: 18, padding: 8 }}
                                name="plus" color="white"

                            />

                        </ActionButton.Item> */}

                    </ActionButton>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    // closeOnPressMask={false}
                    height={300}
                    openDuration={400}
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
                        keyboardShouldPersistTaps='handled'
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={{ flex: 1, marginBottom: 20 }}>
                            {/* <CalendarStrip

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
                            /> */}
                            <DatePicker
                                mode="date"
                                enableAutoDarkMode={true}
                                date={this.state.date}
                                style={{ marginBottom: 10 }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            {/* <TextInput value={this.state.selectedDate} autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="BP value" /> */}
                            {/* <Text>{this.state.selectedDate}</Text> */}
                            <TouchableOpacity onPress={() => this.addEDD()} style={styles.button}>
                                <Text style={styles.buttonText}>Add Edd Date ?</Text>


                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </RBSheet>
            </SafeAreaView>
        );
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
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        backgroundColor: '#fbb146'
        // justifyContent: 'center',
        // alignItems: 'center',
    }, backgroundImage: {
        // height: height,
        position: "absolute",

        resizeMode: 'cover',

        // resizeMode: 'cover', // or 'stretch'
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }, button5: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 130,
        elevation: 5, // Android
        height: 255,
        width: 255,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }, monthWith: {
        width: (screenWidth) / 5
    }, monthImageSize: {
        width: 50,
        height: 50,
        marginLeft: 0
    }, button: {
        backgroundColor: "#f78a2c",
        padding: 10,
        borderRadius: 25,
        // marginTop: 5,

        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',

    }, periodcard: {
        height: 115,
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderRadius: 8,
        elevation: 1,
        // shadowColor: 'gray',
        shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.2,
        shadowRadius: 8,
        // alignItems: 'center',
        margin: 5,
        padding: 15

    }, itemRow: {
        borderBottomColor: '#ccc',
        marginTop: 10,
        borderBottomWidth: 1
    }, itemImage: {
        width: '100%',
        // height: 200,
        resizeMode: 'cover'
    }, line: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        height: 50
    },
});