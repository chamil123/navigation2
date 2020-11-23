import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { IMAGE } from '../constants/image';
import { TextInput } from 'react-native-paper';
import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment' // 2.20.1
import { extendMoment } from 'moment-range';
import RBSheet from "react-native-raw-bottom-sheet";
const moments = extendMoment(moment);
import Database from '../Database';
import *as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import { BarIndicator } from 'react-native-indicators';
const db = new Database();
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const screenWidth = Dimensions.get("window").width;



export class BreastFeeding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TextInpuBNValue: '',
            // TextInpuBWValue: '',
            _baby_name: '',
            _babybDate: '',
            _babyWeght: '',
            isLoading: true,
            date: new Date(),
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
    componentDidMount() {
        // this.loadData();
    }
    loadData() {
        db.listBabyDetails(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {
                this.setState({
                    isLoading: false,

                });
                this.RBSheet.open();

            } else {
                let { babyName, babybDate, babyWeght } = this.props
                for (var i = 0; i < result.length; i++) {
                    babyName = result[i].bName;
                    babybDate = result[i].bbDate;
                    babyWeght = result[i].bWeight;
                }

                this.setState({
                    isLoading: false,
                    _baby_name: babyName,
                    _babybDate: babybDate,
                    _babyWeght: babyWeght,
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    saveData() {
        var dates = this.state.date;
        var formattedDate = moment(dates).format("YYYY-MM-DD")

        this.RBSheet.close();

        

        db.listBabyDetails(this.state.dbs).then((data) => {
            let datas = {

                bName: this.state.TextInpuBNValue,
                // bWeight: this.state.TextInpuBWValue,
                bbDate: formattedDate,
            }
            let result = data;
            if (result == 0) {
                db.babyData(this.state.dbs, datas).then((result) => {
                    this.loadData();
                }).catch((err) => {
                })
            } else {
                let { bId } = this.props
                for (var i = 0; i < result.length; i++) {
                    bId = result[i].bId;
    
                }
                db.babyUpdateData(this.state.dbs, datas,bId).then((result) => {
                    this.loadData();
                }).catch((err) => {
                })
            }
        });


    }
    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <CustomHeader bgcolor='#fbb146' title="Breast Feeding" bcbuttoncolor='#ffc470' navigation={this.props.navigation} bdcolor='#fbb146' />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginTop: 25, marginLeft: 20 }}>
                                <View style={styles.brestposition3}>
                                </View>
                                <View style={styles.brestposition4}>
                                </View>
                                <View style={[styles.brestposition2, { backgroundColor: '#fce6d2' }]}>

                                    <Image source={IMAGE.ICON_BABY}
                                        style={{ height: 105, width: 110 }}>
                                    </Image>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: 40, marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', }}>{this.state._baby_name}</Text>
                                <Text style={{ color: 'white', paddingTop: 5 }}>Birth date :<Text style={{ fontWeight: 'bold', color: 'black' }}> {this.state._babybDate} </Text></Text>
                                {/* <Text style={{ color: 'white', paddingTop: 5 }}>Birth weight: <Text style={{ fontWeight: 'bold', color: 'black' }}>  {this.state._babyWeght} </Text> Kg</Text> */}
                                {/* <Text style={{ color: 'white', paddingTop: 5 }}>Age: <Text style={{ fontWeight: 'bold', color: 'black' }}> 1 </Text> year</Text> */}
                                <TouchableOpacity style={styles.button1} onPress={() => this.RBSheet.open()}>
                                    <Text style={styles.buttonText2}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.breadthPo1}>
                            {/* <View style={{ marginTop: 0, marginLeft: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Breastfeeding <Text style={{ color: 'gray', fontWeight: 'normal' }}>Atachment</Text></Text> */}
                            {/* <Text style={{ color: 'gray',fontSize: 12,marginTop:-4 }}>Atachment</Text> */}
                            {/* </View> */}
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={[styles.container, { marginLeft: -20 }]}>
                                    <View>
                                        <View style={styles.agentCircle}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0091ea' }}>1</Text>
                                        </View>
                                        <View style={[styles.brestposition, { backgroundColor: '#fce6d2' }]}>


                                            <Image source={IMAGE.ICON_BRESTPO1}
                                                style={{ height: 85, width: 80 }}>
                                            </Image>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.agentCircle}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0091ea' }}>2</Text>
                                        </View>
                                        <View
                                            style={[styles.brestposition, { backgroundColor: '#d5cdfe' }]}>
                                            <Image source={IMAGE.ICON_BRESTPO2}
                                                style={{ height: 85, width: 80 }}>
                                            </Image>
                                        </View>

                                    </View>
                                    <View>
                                        <View style={styles.agentCircle}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0091ea' }}>3</Text>
                                        </View>
                                        <View
                                            style={[styles.brestposition, { backgroundColor: '#cbf2fe' }]}>
                                            <Image source={IMAGE.ICON_BRESTPO3}
                                                style={{ height: 85, width: 80 }}>
                                            </Image>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.agentCircle}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0091ea' }}>4</Text>
                                        </View>
                                        <View
                                            style={[styles.brestposition, { backgroundColor: '#fcd7d3' }]}>
                                            <Image source={IMAGE.ICON_BRESTPO4}
                                                style={{ height: 85, width: 80 }}>
                                            </Image>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.agentCircle}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0091ea' }}>5</Text>
                                        </View>
                                        <View
                                            style={[styles.brestposition, { backgroundColor: '#d1fcf0' }]}>
                                            <Image source={IMAGE.ICON_BRESTPO5}
                                                style={{ height: 85, width: 80 }}>
                                            </Image>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.agentCircle}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0091ea' }}>6</Text>
                                        </View>
                                        <View
                                            style={[styles.brestposition, { backgroundColor: '#fce6d2' }]}>
                                            <Image source={IMAGE.ICON_BRESTPO6}
                                                style={{ height: 85, width: 80 }}>
                                            </Image>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        {/* <View style={{ marginTop: 0, marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Estimated Date of Delivery (EDD)</Text>
                        <Text style={{ color: 'white' }}>Pregnancy Due Date Calculator</Text>
                    </View> */}

                    </View>
                    <View style={styles.footer}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>
                            <View style={{ justifyContent: 'center', padding: 10, marginTop: 40 }}>

                                <View style={{ marginTop: 0, marginLeft: 5, paddingBottom: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Breastfeeding <Text style={{ color: 'gray', fontWeight: 'normal' }}>position</Text></Text>
                                    <View style={{ borderTopWidth: 6, borderTopColor: "#f78a2c", borderRadius: 3, width: 45, marginTop: 10 }}></View>
                                    {/* <Text style={{ color: 'gray',fontSize: 12,marginTop:-4 }}>Atachment</Text> */}
                                </View>
                                <View style={{}}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <View style={[styles.container, { marginLeft: -20 }]}>
                                            <LinearGradient style={[styles.card, { flexDirection: 'column', }]} colors={['#ffd49d', '#fba940']}
                                                start={{ x: 0, y: 0.6 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Cradle</Text>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: -5 }}>Position</Text>

                                                    <Image source={IMAGE.ICON_BRESTPO21}
                                                        style={{ height: 140, width: 140, marginLeft: 10, marginTop: 5 }}>
                                                    </Image>
                                                </View>

                                            </LinearGradient>
                                            <LinearGradient style={[styles.card, { flexDirection: 'column', }]} colors={['#b2f3ff', '#21dafc']}
                                                start={{ x: 0, y: 0.6 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                {/* <View style={[styles.card, { flexDirection: 'column', backgroundColor: '#a9dfe9' }]}> */}
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Cross Cradle</Text>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: -5 }}>Position</Text>

                                                    <Image source={IMAGE.ICON_BRESTPO22}
                                                        style={{ height: 140, width: 120, marginLeft: 10, marginTop: 5 }}>
                                                    </Image>
                                                </View>
                                                {/* </View> */}
                                            </LinearGradient>
                                            <LinearGradient style={[styles.card, { flexDirection: 'column', }]} colors={['#ecffa7', '#cdfb26']}
                                                start={{ x: 0, y: 0.6 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                {/* <View style={[styles.card, { flexDirection: 'column', backgroundColor: '#dff19d' }]}> */}
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Foodball</Text>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: -5 }}>Hold</Text>

                                                    <Image source={IMAGE.ICON_BRESTPO23}
                                                        style={{ height: 140, width: 140, marginLeft: -5, marginTop: 5 }}>
                                                    </Image>
                                                </View>
                                                {/* </View> */}
                                            </LinearGradient>
                                            <LinearGradient style={[styles.card, { flexDirection: 'column', }]} colors={['#ffa6c2', '#ff6c9b']}
                                                start={{ x: 0, y: 0.6 }}
                                                end={{ x: 0, y: 0 }}
                                            >

                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Laid Back</Text>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: -5 }}>Position</Text>

                                                    <Image source={IMAGE.ICON_BRESTPO24}
                                                        style={{ height: 100, width: 190, marginLeft: -50, marginTop: 35 }}>
                                                    </Image>
                                                </View>

                                            </LinearGradient>
                                            <LinearGradient style={[styles.card, { flexDirection: 'column', }]} colors={['#e3a9ff', '#d57fff']}
                                                start={{ x: 0, y: 0.6 }}
                                                end={{ x: 0, y: 0 }}
                                            >

                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Side</Text>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: -5 }}>Lying</Text>

                                                    <Image source={IMAGE.ICON_BRESTPO25}
                                                        style={{ height: 130, width: 170, marginLeft: -40, marginTop: 15 }}>
                                                    </Image>
                                                </View>

                                            </LinearGradient>
                                        </View>
                                    </ScrollView>

                                </View>
                            </View>


                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                closeOnDragDown={true}
                                // closeOnPressMask={false}
                                height={500}
                                openDuration={700}
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
                                        <Text style={{ paddingBottom: 5 }}>Select Baby's birthday</Text>
                                        <DatePicker
                                            mode="date"
                                            enableAutoDarkMode={true}
                                            date={this.state.date}
                                            onDateChange={(date) => { this.setState({ date: date }) }}
                                        />
                                        <TextInput autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInpuBNValue: TextInputValue })} style={{ backgroundColor: '#fff', marginTop: 0 }} label="Baby Name" />
                                        {/* <TextInput autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInpuBWValue: TextInputValue })} style={{ backgroundColor: '#fff', marginTop: 0 }} label="Baby Weight" /> */}

                                        <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                                            <Text style={styles.buttonText}>Save Baby' Data</Text>


                                        </TouchableOpacity>

                                    </View>
                                </ScrollView>
                            </RBSheet>

                        </ScrollView>

                    </View>

                </SafeAreaView >
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
        flex: 3,
        backgroundColor: 'white',
        zIndex: -1
    }, header: {
        flex: 2,
        backgroundColor: '#fbb146',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    }, backgroundImage: {
        position: "absolute",
        resizeMode: 'cover',
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingBottom: 15,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 25,
        width: 80,
        marginTop: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    }, cardHorizontal: {
        height: 120,
        backgroundColor: 'white',
        width: (Dimensions.get("window").width) - 230,
        borderRadius: 35,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        margin: 5
    }, brestposition: {
        width: 78,
        height: 78,
        marginLeft: 20,
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        overflow: 'hidden',
    }, brestposition2: {
        width: 108,
        height: 108,
        marginLeft: 20,
        borderRadius: 55,
        overflow: 'hidden',
    }, brestposition3: {
        width: 128,
        height: 128,
        marginLeft: 10,
        marginTop: -10,
        backgroundColor: 'rgba(252, 252, 252, 0.3)',
        borderRadius: 65,
        zIndex: -1,
        position: 'absolute'
    }
    , brestposition4: {
        width: 152,
        height: 152,
        marginLeft: -2,
        marginTop: -22,
        backgroundColor: 'rgba(252, 252, 252, 0.2)',
        borderRadius: 85,
        zIndex: -2,
        position: 'absolute'
    }
    , agentCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        backgroundColor: 'white',
        left: 15,
        bottom: -5,
        width: 25,
        height: 25,
        borderRadius: 15,
        position: 'absolute',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
    }, card: {
        height: 180,
        width: 130,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        marginLeft: 13,
        overflow: 'hidden',
    }, breadthPo1: {
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        bottom: -40,
        zIndex: 5,
        width: '92%',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    }, button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ff6d00",
        padding: 12,
        borderRadius: 25,
        width: 300,
        marginTop: 20
    },
    buttonText2: {
        fontSize: 15,
        color: '#fff',
        padding: 3
    }

});