import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



export class VerticleYearChart2 extends Component {
    render() {
      
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View>
                        <View style={{ backgroundColor: '#fbb146', height: 150, zIndex: -1 }}>

                        </View>

                        <View style={styles.breadthPo1}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>FIRST YEAR OF LIFE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>0-4 weeks</Text>
                            <Text style={{ paddingLeft: 10 }}>BCG(Preferably within 24 hours of birth before leaving hospital)</Text>
                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>2 months</Text>
                            <Text style={{ paddingLeft: 10 }}>OPV & PENTAVALENT (DTP- Hep B-Hib) 1st dose fIPV (fractional IPV)1st dose</Text>
                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>4 months</Text>
                            <Text style={{ paddingLeft: 10 }}>OPV & PENTAVALENT (DTP- Hep B-Hib) 2nd dose fIPV (fractional IPV)2nd dose</Text>
                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>6 months</Text>
                            <Text style={{ paddingLeft: 10 }}>OPV & PENTAVALENT (DTP- HepB-Hib) 3rd dose</Text>
                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>9 months</Text>
                            <Text style={{ paddingLeft: 10 }}>MMR 1st dose</Text>
                        </View>
                        <View style={{ marginTop: -120 }}></View>

                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>SECOND YEAR OF LIFE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>


                            <Text style={{ paddingTop: 10, paddingBottom: 10 }}>12 months- live JE 18 months- OPV and DTP 4th dose</Text>

                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>PRE SCHOOL AGE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>


                            <Text style={{ paddingTop: 10, paddingBottom: 10 }}>3 years- MMR 2 nd dose</Text>

                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>SCHOOL GOING AGE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>


                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> 5 years- OPV and DT 5th dose</Text>
                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> 10 years (grade 6) – HPV 1st dose after 6 months HPV 2nd dose</Text>
                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> 11 years(grade 7)- aTd (adult tetanus diphtheria) 6th dose</Text>


                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>FEMALES IN THE CHILD BEARING AGE</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>


                            <Text style={{ paddingTop: 10, paddingBottom: 10 }}>15 - 44 Years- Rubella containing vaccine(MMR)</Text>

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