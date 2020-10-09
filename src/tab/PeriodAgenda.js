import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Database from '../Database';
import { CustomHeader } from '../index';
import moment from 'moment' // 2.20.1
import FlashMessage, { showMessage } from "react-native-flash-message";
const db = new Database();
const testIDs = require('../testIDs');
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

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
        let marked=true;
        // let i=0;
        let deletedMarkeDates = 0;
        db.listProduct(this.state.dbs).then((data) => {
            products = data;

            for (var i = 0; i < products.length; i++) {
                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription

                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+_pDescription);


                if (_pcatId == 1) {
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "red" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        // products,
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        pName: _pdate,
                    });
                    // const strTime = "2020-09-24";
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: ' ' + _pDescription + ' #',
                        height: Math.max(50, Math.floor(Math.random() * 150))
                    });
                } if (_pcatId == 4) {
                    // console.log("cat is is : zcsas asd asd  asd asd  :" + _pdate);
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "green" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        // pName: nextVaaccination,
                        // ovulation_date: _ovfdate,
                        // next_period_date: _next_p_date,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: ' ' + _pDescription + ' #',
                        height: Math.max(50, Math.floor(Math.random() * 150))
                    });
                } if (_pcatId == 5) {
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "pink" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        // pName: nextVaaccination,
                        // ovulation_date: _ovfdate,
                        // next_period_date: _next_p_date,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: ' ' + _pDescription + ' #',
                        height: Math.max(50, Math.floor(Math.random() * 150))
                    });
                }if (_pcatId == 6) {
                    // '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "#4dd0e1" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        // pName: nextVaaccination,
                        // ovulation_date: _ovfdate,
                        // next_period_date: _next_p_date,
                    });
                    this.state.items[_pdate] = [];
                    this.state.items[_pdate].push({
                        name: ' ' + _pDescription + ' #',
                        height: Math.max(50, Math.floor(Math.random() * 150))
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
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fce4ec' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                <Agenda
                    testID={testIDs.agenda.CONTAINER}
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    // selected={'2020-09-16'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    // rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    // markedDates={{
                    //     '2020-05-16': {selected: true, marked: true},
                    //     '2020-05-17': {marked: true},
                    //     '2020-05-18': {disabled: true}
                    //   }}
                    markedDates={this.state._markedDates}
                // markedDates={{
                //    '2017-05-08': {textColor: '#43515c'},
                //    '2017-05-09': {textColor: '#43515c'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
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
        // const strTime = this.timeToString(time);
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
                    backgroundColor:'#f06292'
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