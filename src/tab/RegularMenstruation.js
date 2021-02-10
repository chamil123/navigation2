import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, SafeAreaView, ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
import *as Animatable from 'react-native-animatable';
import { CustomHeader } from '../index';
import Icon from 'react-native-vector-icons/Fontisto';
import i18n from 'i18n-js'; 
import AsyncStorage from '@react-native-community/async-storage';
export class RegularMenstruation extends Component {
    constructor() {
        super();
        this.state = {
            lan: '',
        }
    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffecb3' }}>
                  <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#F" />
                <CustomHeader bgcolor='#ffecb3' title={i18n.t('menstruation.title')}  bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#ffecb3' />
                <View style={styles.header}>
                    <Image style={{ width: 500, height: 350, marginLeft: -60, marginTop: -20 }}
                        source={IMAGE.ICON_REGULAR_MENSTRUATION_BACK}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.cardHeading}>{i18n.t('menstruation.subheadding')}</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <View style={{ padding: 2 }}>

                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_MONOPAUSE} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub1')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_EXCERSIZE} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub2')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_HORMONAL} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub3')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_PREGNANCY} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub4')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <Text style={{ paddingTop: 20 }}> {i18n.t('menstruation.tagline')}
</Text>
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20
    }, header: {
        flex: 1,
        backgroundColor: '#ffecb3'
    }, cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    cardHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardMore: {
        fontWeight: 'bold',
        color: 'gray',
    },
    cardName: {
        color: '#222',
        fontSize: 16,
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }, cardAvatar: {
        height: 42,
        width: 42,
        backgroundColor: '#ffe0b2',
        borderRadius: 60,
    }, cardBody: {
        padding: 5,
        flexDirection: "row",
        marginTop: 8,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingBottom: 5,
    },
    iconMore: {
        position: 'absolute',
        bottom: 20,
        right: 10
    }
});