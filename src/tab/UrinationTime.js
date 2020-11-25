import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
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
import { LineChart, } from "react-native-chart-kit";
import { BarIndicator, } from 'react-native-indicators';
import FlashMessage, { showMessage } from "react-native-flash-message";
const db = new Database();
var j = 0;
const _formatTime = 'hh:mm:ss';
const _format = 'YYYY-MM-DD'
const screenWidth = Dimensions.get("window").width;
const _today = moment().format(_format)
export class UrinationTime extends Component {
    constructor(props) {
        var today = new Date(),

            //  hours = today.getHours(), //Current Hours
            //  min = today.getMinutes(), //Current Minutes
            //  sec = today.getSeconds(), //Current Seconds

            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes();
        super(props);
        this.state = {
            isLoading: true,
            selectedDate: new Date(),
            TextInputdaValue: '',
            _current_time: time,
            _list_Urination_time: [],
            dbs: '',
            data: {
                labels: ["."],

                datasets: [
                    {
                        data: [0],
                        // strokeWidth: 2,
                        color: (opacity = 1) => `rgba(230,230,230,${opacity})`, // optional
                    },
                    // {
                    //     data: [1],
                    //     strokeWidth: 2,
                    //     color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                    // }, {
                    //     data: [1],
                    //     strokeWidth: 2,
                    //     color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
                    // },
                ]
            }


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
        this.getaAllUrinationData();
        this.listUrinationCountByDate();
    }
    listUrinationCountByDate() {
        const self = this;
        db.listUrinationCountByDate(this.state.dbs).then((data) => {
            var temp2 = [];
            var temp3 = [];
            var _monthDate;
            let result = data;
            const dataClone = { ...self.state.data }
            if (result == 0) {
                dataClone.datasets[0].data = [0];
                dataClone.labels = ["."];
                self.setState({
                    isLoading: false,
                    data: dataClone,

                });
            } else {

                // var temp4 = [];
                // var temp5 = [];


                for (var i = 0; i < result.length; i++) {
                    _monthDate = result[i].uDate.substring(5, 10);

                    temp2.push(parseInt([result[i].countu]));
                    temp3.push([_monthDate]);
                    //   temp4.push([result[i].bpmin]);
                    //   temp5.push([result[i].bpmax]);
                }
                dataClone.labels = temp3;
                dataClone.datasets[0].data = temp2;
                // dataClone.datasets[1].data = temp4;
                // dataClone.datasets[2].data = temp5;
                self.setState({
                    isLoading: false,
                    data: dataClone,
                    // _list_fdData: data,
                });

            }
        }).catch((err) => {
            console.log(err);
        })

    }
    componentDidMount() {
        // this.getData();
    }
    saveData() {
        this.RBSheet.close();
        const _format = 'YYYY-MM-DD'
        const _selectedDay = moment(this.state.selectedDate).format(_format);

        let data = {
            // pId: this.state.pId,
            uDate: _selectedDay.toString(),
            uTime: moment().format(_formatTime),
            uText: this.state.TextInputdaValue

        }

        db.addUrination(this.state.dbs, data).then((result) => {
            this.listUrinationCountByDate();
            this.getaAllUrinationData();
            // this.getData();
            //   this.props.navigation.state.params.onNavigateBack;
            //   this.props.navigation.goBack();
        }).catch((err) => {
            console.log(err);
        })
    }
    deleteData(id) {

        this.setState({
            // isLoading: true
        });
        db.deleteUrination(this.state.dbs, id).then((result) => {

            this.getaAllUrinationData();
            this.listUrinationCountByDate();
            // this.getaAllClickData();

        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    getaAllUrinationData() {

        db.listAllUrination(this.state.dbs).then((results) => {
            result = results;
            this.setState({
                isLoading: false,
                _list_Urination_time: results,
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    emptyComponent = () => {
        return (
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text >oops! There's no data here!</Text>
          </View>);
      }
    keyExtractor = (item, index) => index.toString()
    render() {
        let { isLoading } = this.state
        const datas = {
            labels: ["s"],
            datasets: [
                {
                    data: [50, 30],
                    // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    // strokeWidth: 2 // optional
                }
            ],
            legend: ["Rainy Days"] // optional
        };
        const chartConfig = {
            backgroundGradientFrom: "#90caf9",
            backgroundGradientFromOpacity: 10,
            backgroundGradientTo: "#1565c0",
            backgroundGradientToOpacity: 0.8,
            color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 3, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
            fillShadowGradient: '#fafafa', // THIS
            fillShadowGradientOpacity: 0.2, // THIS
        };

        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                    <FlashMessage duration={1000} />
                    <CustomHeader bgcolor='#fbb146' title="" bcbuttoncolor='#ffc470' navigation={this.props.navigation} bdcolor='#fbb146' />
                    <ActionButton buttonColor="#f78a2c" onPress={() =>
                        this.RBSheet.open()
                    }
                        style={{ position: 'absolute', zIndex: 999 }}
                    >
                    </ActionButton>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1 }}>
                            <View style={{ marginTop: 0, marginLeft: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> Urination chart</Text>
                                {/* <Text style={{ color: 'white' }}>Pregnancy Due Date Calculator</Text> */}
                            </View>
                        </View>

                        <View style={styles.container}>

                            <Card style={[styles.card, { backgroundColor: 'white' }]} >

                                <View style={{ alignItems: "center" }} >

                                    <LineChart
                                        data={this.state.data}
                                        width={Dimensions.get("window").width - 20}
                                        // yAxisLabel={"$"}
                                        height={175}
                                        fromZero={true}
                                        // bezier
                                        verticalLabelRotation={-10}
                                        chartConfig={chartConfig}
                                        style={{
                                            marginVertical: 0,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            </Card>
                        </View>
                        {/* </View> */}

                        <View style={{ flex: 1, paddingHorizontal: 10, marginTop: -50 }}>
                            <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>
                            <SafeAreaView style={{ flex: 1 }}>
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
                                    ListEmptyComponent={this.emptyComponent}
                                    scrollEnabled={false}
                                    keyExtractor={this.keyExtractor}
                                    data={this.state._list_Urination_time}

                                    // renderItem={this.renderItem}

                                    renderItem={({ item }) => <ListItem
                                        style={{
                                            paddingTop: 10,

                                        }}
                                    >
                                        <Left>
                                            <View style={styles.iconMore}>

                                                <Icon
                                                    name='calendar'
                                                    type='font-awesome'
                                                    color='blue'
                                                    iconStyle={{ fontSize: 18, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e0f2f1', borderRadius: 8, }}
                                                    onPress={() => console.log('hello')} />
                                            </View>
                                        </Left>
                                        <Body style={{ marginLeft: -160 }}>
                                            <Text style={{ color: 'gray', fontSize: 12 }}>{item.uDate}</Text>
                                            <Text style={styles.dateText}>{item.uTime} <Text style={{ color: 'gray' }}>{item.uText}</Text></Text>
                                        </Body>
                                        <Right>
                                            <View style={styles.iconMore}>
                                                <Icon
                                                    type='font-awesome'
                                                    color='gray'
                                                    iconStyle={{ fontSize: 18, padding: 8 }}
                                                    name="trash-o" color="gray"
                                                    onPress={() => {
                                                        this.deleteData(item.uId); showMessage({

                                                            message: "Success",
                                                            description: "successfuly deleted " + `${item.uDate}`,
                                                            type: "success",
                                                        })
                                                    }}
                                                />
                                            </View>
                                        </Right>
                                    </ListItem>
                                    }
                                />
                            </SafeAreaView>
                        </View>

                        {/* </View> */}
                    </ScrollView>


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
                                <TextInput autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputdaValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="Enter comment" />
                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                                        <Text style={styles.buttonText}>Add </Text>
                                    </TouchableOpacity>
                                </View>
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
        paddingLeft: 5,
        paddingRight: 5,
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
        height: 175,
        // width: (Dimensions.get("window").width / 2) - 20,
        // width: "45%",
        backgroundColor: "white",
        borderRadius: 15,
        // padding: 10,
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
        alignItems:'center',
        width: 340,

        marginTop: 20
    }, buttonText: {
        fontSize: 15,
        color: '#fff',
    }
});