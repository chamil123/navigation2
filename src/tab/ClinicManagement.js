import React, { Component } from 'react';
import { TextInput, Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';
// import RBSheet from "react-native-raw-bottom-sheet";
// import DatePickerDialog from '@react-native-community/datetimepicker';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import FlashMessage, { showMessage } from "react-native-flash-message";
const db = new Database();
// import { TextInput } from 'react-native-paper';

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _formatTime = 'HH:mm:ss';

export class ClinicManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DateText: _today,

            DateHolder: null,
            TextInpuPbValue: '',
            isLoading: true,
            date: new Date(),
            dbs: '',
            userName: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);


    }
    DatePickerMainFunctionCall = () => {

        let DateHolder = this.state.DateHolder;

        if (!DateHolder || DateHolder == null) {

            DateHolder = new Date();
            this.setState({
                DateHolder: DateHolder
            });
        }

        //To open the dialog
        this.refs.DatePickerDialog.open({

            date: DateHolder,

        });

    }

    /**
     * Call back for dob date picked event
     *
     */
    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            DateText: moment(date).format('YYYY-MM-DD')
        });
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        // this.getData();
        // this.viewListData();
    }
    async componentDidMount() {
        const myArray = await AsyncStorage.getItem('memberNames');
        this.setState({
            userName: myArray,
        });
    }
    saveData() {
        var dates = this.state.DateText;
        var formattedDate = moment(dates).format("YYYY-MM-DD")

        let data = {
            _note: this.state.TextInputNoteValue,
            _date: dates,
            pTime:moment().format(_formatTime),
        }

      
        db.addNote(this.state.dbs, data).then((result) => {
            this.props.navigation.navigate('PeriodAgenda');
            
            // this.props.navigation.goBack();
            //  goBack();
        }).catch((err) => {

        })

    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <CustomHeader bgcolor='#fbb146' title="" navigation={this.props.navigation} bdcolor='#fbb146' />
                <FlashMessage duration={1000} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    {/* <View> */}
                    <View style={{ backgroundColor: '#fbb146', height: 135, zIndex: -1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <View style={{ marginTop: 0, marginLeft: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>Hello {this.state.userName}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Clinic Management</Text>
                            {/* <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AgendaHistory')} style={[styles.buttonh, { backgroundColor: '#ED1B26', width: 120 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='bar-chart'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'gray' }}
                                        />
                                    </View>
                                    <Text style={{ color: 'white', padding: 7 }}>History</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodAgenda')} style={[styles.buttonh, { backgroundColor: 'green', width: 130 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='calendar'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, color: 'gray' }}
                                        />
                                    </View>
                                    <Text style={{ color: 'white', padding: 7 }}>Calendar</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                       
                    </View>

                    <View style={styles.breadthPo1}>

                        <Text style={{ marginVertical: 10 }} >Select date</Text>

                        <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

                            <View style={{ borderColor: 'gray', height: 50, borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10, paddingTop: 15 }}>
                                {
                                    this.state.DateText != '' ?
                                        <Text style={styles.datePickerText}>{this.state.DateText}</Text>
                                        :
                                <Text style={styles.datePickerText}>{_today}</Text>
                                }


                            </View>

                        </TouchableOpacity>
                        <Text style={{ marginVertical: 10,marginTop:30 }}> Description </Text>
                        <TextInput multiline={true} autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputNoteValue: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10, paddingTop: 10 }}placeholder="Enter Description here" />
                        {/* <TextInput
                            keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 }}
                            autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} label="Baby Name" /> */}
                        <TouchableOpacity onPress={() => this.saveData()} activeOpacity={0.5} >
                            {/* <Text style={styles.buttonText}>Save Baby' Data</Text>
                                 */}

                            <LinearGradient colors={['#fbb146', '#f78a2c']}

                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0.9 }}

                                style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Add weight
</Text>
                            </LinearGradient>


                        </TouchableOpacity>
                    </View>

                    {/* </View> */}
                </ScrollView>

                {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
                <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />

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
        backgroundColor: '#f3f3f3',
        zIndex: -1
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 2,
        backgroundColor: '#fbb146',
        borderBottomStartRadius: 30,
        //    borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        // justifyContent: 'center',
        // alignItems: 'center',
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

        // justifyContent: 'center',
        // alignSelf: 'center',
        // position: 'absolute',
        // backgroundColor: 'white',
        // bottom: 100,
        zIndex: 5,
        // width: '95%',
        // borderRadius: 10,
        // elevation: 2,
        padding: 18,
        // paddingTop: 20,
        marginTop: 10,
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
    }, button1: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 25,
        // marginTop: 5,
        width: 80,
        marginTop: 10,

        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',



    }, button: {
        backgroundColor: "white",
        padding: 7,
        borderRadius: 25,
        marginTop: 18,
        width: 125,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,

    }, linearGradient: {

        marginTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        padding: 3,

        // marginTop: 40,
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
    }, buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }, datePickerBox: {
        marginTop: 9,
        borderColor: '#FF5722',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent: 'center'
    },

    datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#000',

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
});