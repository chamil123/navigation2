import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Database from '../Database';
import { CustomHeader } from '../index';
import moment from 'moment' // 2.20.1
import FlashMessage, { showMessage } from "react-native-flash-message";
import CustomPushNotification from './CustomPushNotification';
const db = new Database();
const testIDs = require('../testIDs');
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

const cn = new CustomPushNotification();
// const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
// const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
// const workout = {key:'workout', color: 'green'};

export class PeriodAgenda extends Component {
    initialState = {
        [_today]: { disabled: false }
    }
    constructor(props) {
        super(props);

        this.state = {
            _markedDates: this.initialState,
            items: {},
            dbs: '',
            _babybDate: '',
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
        let selected1 = false;
        let markedDates = {}
        let updatedMarkedDates = '';
        let products = [];
        let _pdate = '';
        let marked = true;
        let deletedMarkeDates = 0;
        db.listProduct(this.state.dbs).then((data) => {
            products = data;

            for (var i = 0; i < products.length; i++) {
                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription
                _pTime = products[i].pTime
                if (_pcatId == 1) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    if (_today == nestPeriod) {
                        cn.testPush(data);
                    }

                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "red", marked: false };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        pName: _pdate,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 225 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Period</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{_pDescription}</Text>
                            </View>
                            <View style={{ width: 55, height: 55, backgroundColor: 'red', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>P</Text>
                            </View>


                        </View>,

                    });
                } if (_pcatId == 4) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    if (_today == nestPeriod) {
                        cn.testPush(data);
                    }
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "#50cebb", marked: false };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 225 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Ovulation</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 14 }}>{_pdate}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{_pDescription}</Text>
                            </View>
                            <View style={{ width: 55, height: 55, backgroundColor: '#50cebb', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>O</Text>
                            </View>
                        </View>,
                    });
                } if (_pcatId == 5) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    if (_today == nestPeriod) {
                        cn.testPush(data);
                    }

                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "pink", marked: false };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 225 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Period</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 14 }}>{_pdate}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{_pDescription}</Text>
                            </View>
                            <View style={{ width: 55, height: 55, backgroundColor: 'pink', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>N</Text>
                            </View>
                        </View>,
                    });
                } if (_pcatId == 6) {

                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    if (_today == nestPeriod) {
                        cn.testPush(data);
                    }
                    markedDates = { marked: true, dotColor: '#6a1b9a', activeOpacity: 0 };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name:
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: 225 }}>
                                    <Text style={{ color: 'gray' }}>Time : {_pTime}</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Special Note</Text>
                                    <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{_pDescription}</Text>
                                </View>
                                <View style={{ width: 55, height: 55, backgroundColor: '#6a1b9a', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white' }}>S</Text>
                                </View>


                            </View>,

                    });
                }
                if (_pcatId == 3) {
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
                        markedDates = { ...markedDates, ...{ selected }, selectedColor: "#ffc107", };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [nextVaaccination]: markedDates } }

                        this.setState({
                            isLoading: false,
                            _markedDates: updatedMarkedDates,
                            pName: nextVaaccination,

                        });
                        this.state.items[nextVaaccination] = [];
                        this.state.items[nextVaaccination].push({

                            name:
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: 225 }}>
                                        {/* <Text style={{ color: 'gray' }}>Time : {_pTime}</Text> */}
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Vaccination</Text>
                                        <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{_pDescription}</Text>
                                    </View>
                                    <View style={{ width: 55, height: 55, backgroundColor: '#ffc107', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 30, color: 'white' }}>V</Text>
                                    </View>


                                </View>,

                        });
                    }
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
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fce4ec' }}>
                <CustomHeader bgcolor='#fbb146' bcbuttoncolor='#ffc470' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                <Agenda
                    testID={testIDs.agenda.CONTAINER}
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    // selected={'2020-09-16'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    // rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    markedDates={this.state._markedDates}
                    pastScrollRange={20}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={20}
                    // Specify how each item should be rendered in agenda
                    refreshControl={null}
                    refreshing={false}
         
                    hideKnob={false}
                // markingType={'multi-dot'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                // hideExtraDays={false}
                />
                <FlashMessage duration={1000} />
            </SafeAreaView>
        );
    }
    componentDidMount() {
        // const strTime = "2020-09-24";
        // this.state.items[strTime] = [];
    }
    loadItems(day) {

        // setTimeout(() => {
        //   for (let i = 1; i < 2; i++) {
        // const time = day.timestamp + 2 * 24 * 60 * 60 * 1000;
        // // const strTime = this.timeToString(time);
        // const strTime = "2020-09-23";
        // console.log("dsdsdsdsdsdsd : " + this.timeToString(time));
        // if (!this.state.items[strTime]) {
        // this.state.items[strTime] = [];
        // const numItems = Math.floor(Math.random() * 3 + 1);
        //   for (let j = 0; j < numItems; j++) {
        // this.state.items[strTime].push({
        //     name: 'Item for ' + strTime + ' #',
        //     height: Math.max(50, Math.floor(Math.random() * 150))
        // });
        //   }
        // }
        //   }
        //   const newItems = {};
        //   Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        //   this.setState({
        //     items: newItems
        //   });
        // }, 1000);
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                // onPress={() => Alert.alert(item.name)}
                onPress={({ value, dataset, }) =>
                    //   Alert.alert("dsfsdf"+value)
                    showMessage({
                        message: `${item.name}`,
                        description: "You selected this value",
                        backgroundColor: '#f06292'
                    })
                }
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});