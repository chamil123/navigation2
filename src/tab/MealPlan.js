import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import Unorderedlist from 'react-native-unordered-list';
import Steps from 'react-native-step-indicator';


// import Steps from 'react-native-steps';

import ViewPager from '@react-native-community/viewpager';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 5', 'Page 5'];

const firstIndicatorConfigs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fbb146',
    separatorFinishedColor: '#fbb146',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fbb146',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 11,
    currentStepLabelColor: '#fbb146'
};





export class MealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fbb146' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />

                <View style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Meal Plan</Text>
                        {/* <Text style={{ color: 'white' }}>press on foot after kick</Text> */}
                    </View>
                </View>

                <View style={styles.footer}>

                    <View style={styles.container}>
                        <View style={styles.stepIndicator}>
                            <Steps
                                customStyles={firstIndicatorConfigs}
                                stepCount={7}
                                direction='horizontal'
                                currentPosition={this.state.currentPage}
                                labels={['Early Morning', 'Breakfast', 'Mid\nMorning', 'Lunch', 'Evening', 'Dinner', 'Bed\nTime']}
                            />
                        </View>

                        <ViewPager
                            style={{ flexGrow: 1 }}
                            ref={(viewpager) => { this.viewpager = viewpager }}
                            initialPage={this.state.currentPage}
                            onPageSelected={(eventDate) => this.handleHorizontalScroll(eventDate.nativeEvent)}
                        >
                            {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
                        </ViewPager>

                    </View>

                </View>

            </SafeAreaView>
        );
    }
    handleHorizontalScroll = ({ position }) => {
        this.setState({ currentPage: position })
    };
    renderViewPagerPage = (data, index) => {
        return (

            <View style={styles.page} key={index}>
                {
                    index == 0 ?
                        <View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentInsetAdjustmentBehavior="automatic"
                                style={styles.scrollView}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Early Morning</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                    <Image source={IMAGE.ICON_EARLY_MORNING}
                                        style={{ height: 240, width: 390 }}>
                                    </Image>
                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Tea or coffee 1 cup</Text></Unorderedlist>
                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Biscuit 2 pcs</Text>
                                    </Unorderedlist>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        index == 1 ?
                            <View>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentInsetAdjustmentBehavior="automatic"
                                    style={styles.scrollView}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Breakfast</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                        <Image source={IMAGE.ICON_EARLY_MORNING2}
                                            style={{ height: 200, width: 390 }}>
                                        </Image>
                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Chapattis 2 pcs</Text></Unorderedlist>
                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Egg 1 poaches or, Vegetables 1 cup</Text>
                                        </Unorderedlist>
                                    </View>
                                </ScrollView>
                            </View>
                            : index == 2 ?
                                <View>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        contentInsetAdjustmentBehavior="automatic"
                                        style={styles.scrollView}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mid Morning</Text>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                            <Image source={IMAGE.ICON_MID_MORNING}
                                                style={{ height: 290, width: 350 }}>
                                            </Image>
                                            <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Milk 250 ml or 1 glass</Text></Unorderedlist>
                                            <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>  Biscuit 2 pcs</Text></Unorderedlist>
                                            <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>  Apple or Orange</Text></Unorderedlist>
                                        </View>
                                    </ScrollView>
                                </View>
                                : index == 3 ?
                                    <View>
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            contentInsetAdjustmentBehavior="automatic"
                                            style={styles.scrollView}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lunch</Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                <Image source={IMAGE.ICON_MID_LUNCH}
                                                    style={{ height: 340, width: 390 }}>
                                                </Image>
                                                <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Cooked rice 4 cup</Text></Unorderedlist>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    :
                                    index == 4 ?
                                        <View>
                                            <ScrollView
                                                showsVerticalScrollIndicator={false}
                                                contentInsetAdjustmentBehavior="automatic"
                                                style={styles.scrollView}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Evening</Text>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                    <Image source={IMAGE.ICON_EVENING}
                                                        style={{ height: 340, width: 390 }}>
                                                    </Image>
                                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>Biscuits 2 pcs</Text></Unorderedlist>
                                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Fruits on choice </Text>
                                                    </Unorderedlist>
                                                </View>
                                            </ScrollView>
                                        </View>
                                        :
                                        index == 5 ?
                                            <View>
                                                <ScrollView
                                                    showsVerticalScrollIndicator={false}
                                                    contentInsetAdjustmentBehavior="automatic"
                                                    style={styles.scrollView}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dinner</Text>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                        <Image source={IMAGE.ICON_DINNER}
                                                            style={{ height: 260, width: 380 }}>
                                                        </Image>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Cooked rice 3 cup</Text></Unorderedlist>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> Meat or fish 3 pcs </Text></Unorderedlist>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>  Cooked dhal 2 cup </Text></Unorderedlist>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>  Vegetable 1 cup </Text></Unorderedlist>
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            :

                                            <View>
                                                <ScrollView
                                                    showsVerticalScrollIndicator={false}
                                                    contentInsetAdjustmentBehavior="automatic"
                                                    style={styles.scrollView}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bed Time</Text>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                        <Image source={IMAGE.ICON_BET_TIME}
                                                            style={{ height: 340, width: 240 }}>
                                                        </Image>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text> On glass of milk</Text></Unorderedlist>

                                                    </View>
                                                </ScrollView>
                                            </View>



                }
            </View>
        )
    };

}
const styles = StyleSheet.create({

    stepIndicator: {
        // marginVertical: 50
        marginTop: 20
    },
    page: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 30
        // justifyContent: 'center',
        // alignItems: 'center'
    }, button6: {
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
        // zIndex: -1
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 3,
        backgroundColor: '#fbb146'
        // justifyContent: 'center',
        // alignItems: 'center',
    }, container: {
        flex: 1,
        //  flexDirection: 'row',
        //  flexWrap: 'wrap',
        // paddingTop: 5,
        //  paddingLeft: 10,
        // paddingRight: 10
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
        // shadowOffset: {width: 0, height: 3 },
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
        // shadowOffset: {width: 0, height: 3 },
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
    }, header: {
        flex: 0,
    }, footer: {
        flex: 6,
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingRight: 10,
        paddingTop: 10

    },
});