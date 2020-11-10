import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Database from '../Database';
import moment from 'moment' // 2.20.1
const db = new Database();

export class VerticleYearChart2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _markedDates: this.initialState,
            items: {},
            dbs: '',
            _babybDate: '',
            _bcg: '',
            _opv: '',
            _opvp: '',
            _opvp2: '',
            _mmr: '',
            _je: '', _opvdt: '', _mmr2: '', _opvdt5: '', _hpv1: '', _hpv2: '', _atd: '',
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

        let updatedMarkedDates = '';
        let products = [];
        let _pdate = '';
        let bcg, opv, opvp, opvp2, mmr, je, opvdt, mmr2, opvdt5, hpv1, hpv2, atd = 0;
        db.listProduct(this.state.dbs).then((data) => {
            products = data;

            for (var i = 0; i < products.length; i++) {
                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription



                if (_pcatId == 3) {
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : " + _pDescription + "  /  " + _pdate);

                    var babayBirgDay = this.state._babybDate;
                    if (babayBirgDay != "") {

                        let nextVaaccination = moment(babayBirgDay).add(_pdate, 'day').format('YYYY-MM-DD');
                        if (_pdate == 14) {
                            bcg = nextVaaccination;
                        } if (_pdate == 60) {
                            opv = nextVaaccination;
                        } if (_pdate == 120) {
                            opvp = nextVaaccination;
                        } if (_pdate == 180) {
                            opvp2 = nextVaaccination;
                        } if (_pdate == 270) {
                            mmr = nextVaaccination;
                        }

                        if (_pdate == 360) {
                            je = nextVaaccination;
                        } if (_pdate == 540) {
                            opvdt = nextVaaccination;
                        }
                        if (_pdate == 1095) {
                            mmr2 = nextVaaccination;
                        } if (_pdate == 1825) {
                            opvdt5 = nextVaaccination;
                        }
                        if (_pdate == 3650) {
                            hpv1 = nextVaaccination;
                        }
                        if (_pdate == 3830) {
                            hpv2 = nextVaaccination;
                        } if (_pdate == 4015) {
                            atd = nextVaaccination;
                        }


                        je, opvdt, mmr2, opvdt5, hpv1, hpv2, atd
                        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : " + nextVaaccination);


                        this.setState({
                            isLoading: false,
                            _bcg: bcg,
                            _opv: opv,
                            _opvp: opvp,
                            _opvp2: opvp2,
                            _mmr: mmr,

                            _je: je,
                            _opvdt: opvdt,
                            _mmr2: mmr2,
                            _opvdt5: opvdt5,
                            _hpv1: hpv1,
                            _hpv2: hpv2,
                            _atd: atd


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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View>

                        <View style={{ backgroundColor: '#fbb146', height: 175, zIndex: -1 }}>
                            <View style={{ marginTop: 0, marginLeft: 20 }}>
                               
                                <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Vaccination Chart</Text>
                                {/* <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text> */}
                            </View>
                        </View>

                        <View style={styles.breadthPo1}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>FIRST YEAR OF LIFE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>0-4 weeks</Text>
                            <Text style={{ paddingLeft: 10 }}>BCG(Preferably within 24 hours of birth before leaving hospital)</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._bcg}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>2 months</Text>
                            <Text style={{ paddingLeft: 10 }}>OPV & PENTAVALENT (DTP- Hep B-Hib) 1st dose fIPV (fractional IPV)1st dose</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opv}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>4 months</Text>
                            <Text style={{ paddingLeft: 10 }}>OPV & PENTAVALENT (DTP- Hep B-Hib) 2nd dose fIPV (fractional IPV)2nd dose</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvp}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>6 months</Text>
                            <Text style={{ paddingLeft: 10 }}>OPV & PENTAVALENT (DTP- HepB-Hib) 3rd dose</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvp2}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>9 months</Text>
                            <Text style={{ paddingLeft: 10 }}>MMR 1st dose</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._mmr}</Text>
                        </View>
                        <View style={{ marginTop: -120 }}></View>

                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>SECOND YEAR OF LIFE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>
                            <Text style={{ paddingTop: 10, }}>12 months- live JE 18 months- OPV and DTP 4th dose</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._je}</Text>
                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>PRE SCHOOL AGE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>
                            <Text >3 years- MMR 2 nd dose</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._mmr2}</Text>
                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>SCHOOL GOING AGE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>


                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> 5 years- OPV and DT 5th dose</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvdt5}</Text>

                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> 10 years (grade 6) – HPV 1st dose after 6 months HPV 2nd dose</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._hpv1}</Text>

                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> 11 years(grade 7)- aTd (adult tetanus diphtheria) 6th dose</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._hpv2}</Text>

                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>FEMALES IN THE CHILD BEARING AGE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>
                            <Text style={{ paddingTop: 10, paddingBottom: 10 }}>15 - 44 Years- Rubella containing vaccine(MMR)</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._atd}</Text>

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
    }
});