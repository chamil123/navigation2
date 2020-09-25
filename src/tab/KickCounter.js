import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import { List, ListItem, Left, Body, Right } from 'native-base';
import { BarIndicator } from 'react-native-indicators';

const db = new Database();
var j = 0;
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
export class KickCounter extends Component {
    constructor(props) {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        super(props);
        this.state = {
            isLoading: true,
            _current_date: date,
            _list_kcData: [],
            _kick_count: 0,
            increment: 0,
        }
    }
    componentDidMount() {
        this.getData();
        this.getaAllClickData();
    }

    saveData() {
        j = 1;
        this.setState({
            increment: j,
            // isLoading: false,
        });
        this.getData();
    }
    getaAllClickData() {

        db.listAllKickCount().then((results) => {
            result = results;
            this.setState({
                isLoading: false,
                _list_kcData: results,
            });


        }).catch((err) => {
            console.log(err);
        })
    }
    getData() {
        var temp;
        let data = {
            kcDate: this.state._current_date.toString(),
            kcValue: this.state._kick_count,
        }
        db.listKickCount(data).then((results) => {
            result = results;
            if (result == 0) {
                db.addKickCount(data).then((results) => {

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                var _clickValue;
                for (var i = 0; i < result.length; i++) {
                    _clickValue = result[i].kcCount;
                    temp = _clickValue + this.state.increment;
                }
                this.setState({
                    _kick_count: temp,
                });
                let data = {
                    kcDate: this.state._current_date.toString(),
                    kcValue: this.state._kick_count,
                }
                db.updateClickCount(data).then((result) => {
                }).catch((err) => {
                    console.log(err);

                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    keyExtractor = (item, index) => index.toString()
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
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fbb146' }}>
                    <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />

                    <View style={styles.header}>
                        <View style={{ marginTop: 0, marginLeft: 20 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Kick counter</Text>
                            <Text style={{ color: 'white' }}>press on foot after kick</Text>
                        </View>

                    </View>
                    <View style={styles.footer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon

                                    name='calendar'
                                    type='font-awesome'
                                    color='gray'
                                    iconStyle={{ fontSize: 13, paddingTop: 3 }}
                                    onPress={() => console.log('hello')} />
                                <Text style={{ paddingLeft: 10 }}>Kicks on {this.state._current_date}</Text>
                            </View>
                            <Text style={{ fontSize: 22, paddingBottom: 10 }}>{this.state._kick_count}</Text>
                            <AnimatedCircularProgress
                                size={152}
                                rotation={0}
                                width={8}
                                fill={(this.state._kick_count / 10) * 100}
                                tintColor="#f78a2c"
                                backgroundColor="#cfd8dc">
                                {
                                    (fill) => (
                                        <TouchableOpacity style={styles.button5}
                                            onPress={() => this.saveData()}>
                                            <Image style={{ width: 75, height: 75, marginLeft: 0, marginTop: 0 }}
                                                source={IMAGE.ICON_BABY_FOOT2}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                        <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
                            <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>
                            <FlatList

                                style={{
                                    backgroundColor: 'white', marginVertical: 0,
                                    elevation: 2,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 8,
                                }}
                                keyExtractor={this.keyExtractor}
                                data={this.state._list_kcData}
                                renderItem={({ item }) => <ListItem
                                    style={{
                                        height: 50, paddingTop: 15,
                                    }} >
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
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.kcDate}</Text>
                                        <Text style={styles.dateText}><Text style={{ color: 'gray', fontSize: 12 }}>Kick count is :</Text> {item.kcCount} </Text>
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

                </SafeAreaView>
            );
        }
    }
} const styles = StyleSheet.create({

    button6: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        width: 150,
        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    }, footer: {
        flex: 6,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }, header: {
        flex: 1,
        backgroundColor: '#fbb146'
    }, backgroundImage: {
        position: "absolute",
        resizeMode: 'cover',
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
    }
});