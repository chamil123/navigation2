import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LineChart, } from "react-native-chart-kit";
import Database from '../Database';
import FlashMessage, { showMessage } from "react-native-flash-message";

const db = new Database();
const w = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;
export class WeightChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            _list_bpData: [],





            data: {

                labels: ["45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "105", "110"],

                datasets: [
                    {
                        data: [1],
                        strokeWidth: 2,
                        // borderColor: "#80b6f4",
                        color: (opacity = 0.5) => `rgba(212,0,0,${0.8})`, // optional
                        backgroundColor: '#D50000',

                        fillShadowGradient: '#D50000', // THIS
                        fillShadowGradientOpacity: 0, // THIS

                    },
                    {
                        data: [1],

                        strokeWidth: 2,
                        color: (opacity = 1) => `rgba(255, 171, 0, ${0.8})`, // optional
                        fillShadowGradient: '#FFAB00', // THIS
                        backgroundColor: '#FFAB00',
                        fillShadowGradientOpacity: 2,

                    }, {
                        data: [1],
                        strokeWidth: 2,

                        color: (opacity = 2) => `rgba(51,105,30, ${0.8})`, // optional
                        fillShadowGradient: '#33691E', // THIS
                        fillShadowGradientOpacity: 2,
                    }, {
                        data: [1],
                        strokeWidth: 3,
                        color: (opacity = 2) => `rgba(255,255,255, ${10})`, // optional
                        fillShadowGradient: '#cfd8dc', // THIS
                        fillShadowGradientOpacity: 2,
                    }, {
                        data: [2],
                        strokeWidth: 3,
                        color: (opacity = 2) => `rgba(0,0,255, ${10})`, // optional
                        fillShadowGradient: 'red', // THIS
                        fillShadowGradientOpacity: 2,
                    },
                ]
            }
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData() {

        const self = this;
        db.listWeghtData().then((data) => {
            let result = data;
            if (result == 0) {

                this.setState({
                    isLoading: false,

                });
                // db.addItemOfBloodPresure().then((result) => {
                // }).catch((err) => {
                //   console.log(err);
                // })
            } else {
                var temp2 = [];
                var temp3 = [];
                var temp4 = [];
                var temp5 = [];
                var temp6 = [];
                var _monthDate;
                const dataClone = { ...self.state.data }
                for (var i = 0; i < result.length; i++) {
                    //   _monthDate = result[i].bpDate;


                    temp2.push([result[i].wlSam]);
                    //   temp3.push([_monthDate]);
                    temp4.push([result[i].wlMan]);
                    temp5.push([result[i].wlNw]);
                    temp6.push([result[i].wlOw]);

                }
                // dataClone.labels = temp3;
                dataClone.datasets[0].data = temp2;
                dataClone.datasets[1].data = temp4;
                dataClone.datasets[2].data = temp5;
                dataClone.datasets[3].data = temp6;

                self.setState({
                    isLoading: false,
                    data: dataClone,
                    _list_bpData: data,
                });

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const chartConfig = {

            backgroundGradientFrom: "#ffebee",
            // backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#ffebee",
            backgroundGradientToOpacity: 1,
            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 3, // optional, default 3
            decimalPlaces: 0,
            // barPercentage: 1,
            useShadowColorFromDataset: true,// optional
            // fillShadowGradient: 'red', // THIS
            // fillShadowGradientOpacity: 2, // THIS



        };
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View>
                        <View style={{ backgroundColor: '#fbb146', height: 150, zIndex: -1 }}>

                        </View>

                        <View style={styles.breadthPo1}>
                            <ScrollView

                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >

                                <LineChart
                                 withDots
                                  onDataPointClick={({value, dataset, getColor}) =>
                                //   Alert.alert("dsfsdf"+value)
                                  showMessage({
                                    message: `${value}`,
                                    description: "You selected this value",
                                    backgroundColor: getColor(1)
                                  })
                                }
                                    data={this.state.data}
                                    width={650}
                                    // yAxisLabel={"$"}
                                
                                    height={580}
                                    // bezier
                                    withDots={true}
                                    verticalLabelRotation={-10}
                                    chartConfig={chartConfig}
                                    fromZero={true}
                                    style={{
                                        marginVertical: 0,
                                        borderRadius: 16
                                    }}
                                    segments={10}
                                />

<FlashMessage duration={1000} />
                            </ScrollView>
                        </View>



                    </View>
                </ScrollView>




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
        backgroundColor: '#fbb146'
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

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        bottom: 130,
        zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,

        // padding: 12,
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
    }
});