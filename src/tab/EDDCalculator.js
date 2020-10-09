import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { IMAGE } from '../constants/image';

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
                // console.log("dsdssd ((((((((((((((((((((((())))))))))))))))))))))) : " + plastdate);
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
        const eddDate = moment(this.state.selectedDate).add(277, 'day').format('YYYY-MM-DD');
        let data = {
            pName: eddDate,
            pDescription: 'Delevary Date',
        }
        let result = [];
        let _eddIdId;
        let availabeledd = 0;


        // db.loadDB();

        console.log("edd dATE :::::::::::::::"+eddDate);
        db.getEddDate(this.state.dbs).then((datas) => {
            result = datas;
            for (var i = 0; i < result.length; i++) {
                _eddIdId = result[i].pId
                availabeledd = 1;

            }
            if (availabeledd == 1) {

                availabeledd = 0;
            } else {
                db.addEDD(this.state.dbs,data).then((result) => {
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


        // db.loadDB();
        let result = [];
        let _eddIdId;
        let availabeledd = 0;
        db.getEddDate(this.state.dbs).then((datas) => {
            result = datas;
            for (var i = 0; i < result.length; i++) {
                _eddIdId = result[i].pId
                availabeledd = 1;

            }
            if (availabeledd == 1) {

                db.deletePeriod(_eddIdId).then((result) => {


                }).catch((err) => {
                })

                availabeledd = 0;
            }
            availabeledd = 0;
        })

        // availabel = 0;
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
                        <View style={{ justifyContent: 'center', padding: 10, paddingTop: 30 }}>



                            <StepIndicator
                                customStyles={customStyles}
                                currentPosition={this.state._compltedMonths}
                                stepCount={9}
                                labels={labels}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                {/* height: (screenWidth * 3) / 8, */}
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
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <AnimatedCircularProgress
                                    size={200}
                                    rotation={0}
                                    width={8}
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
                                                    {
                                                        this.state._eddDateCount ?
                                                            <Text style={{ fontSize: 70, fontWeight: 'bold' }}>{this.state._eddDateCount}</Text>
                                                            :
                                                            <Text style={{ fontSize: 70, fontWeight: 'bold' }}>0</Text>
                                                    }

                                                    <Text style={{ fontSize: 20, }}>days left</Text>
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
                            <View style={{ justifyContent: 'center', padding: 50, }}>

                                <TouchableOpacity style={styles.button} onPress={() => { this.updateEdd();  this.RBSheet.open() }}>
                                    {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BMIMeter')}> */}
                                    <Text style={styles.buttonText}>Edit EDD  Date</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
                        <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>

                    </View> */}
                    </ScrollView>

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
        backgroundColor: 'white',
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
        borderRadius: 105,
        elevation: 5, // Android
        height: 170,
        width: 170,
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

    },
});