import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, SafeAreaView, ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import Icon from 'react-native-vector-icons/Fontisto';
export class IdentifyPregnancy extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffcce8' }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffcce8" />
                <CustomHeader bgcolor='#ffcce8' bcbuttoncolor='#fff' title="Identify Pregnancy" navigation={this.props.navigation} bdcolor='#ffcce8' />
                <View style={styles.header}>
                    <Image style={{ width: 450, height: 260, marginLeft: -40, marginTop: -40 }}
                        source={IMAGE.ICON_IDENTY_PREGNANCY_BACK}
                        resizeMode="contain"
                    />

                </View>
                <View style={styles.footer}>
                    <Text style={styles.cardHeading}> How to identify the pregnancy?</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <View style={{ padding: 2 }}>

                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_MORNING_SICK} />
                                    <Text style={styles.cardName}>Morning sickness with nausea and vomiting</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_URINE_TEST} />
                                    <Text style={styles.cardName}>Urine test</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_SERUM_TEST} />
                                    <Text style={styles.cardName}>Serum test (identify HCG level)</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_SCANING} />
                                    <Text style={styles.cardName}>Scanning (identify gestation age)</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </ScrollView>

                </View>


            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    footer: {
        flex: 4,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20
    }, header: {
        flex: 1,
        backgroundColor: '#ffcce8'
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
        padding: 10,

    }, cardAvatar: {
        height: 50,
        width: 50,
        backgroundColor: '#ffcce8',
        borderRadius: 60,
    }, cardBody: {
        padding: 5,
        flexDirection: "row",
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingBottom: 10,
    },
    iconMore: {
        position: 'absolute',
        bottom: 20,
        right: 10
    }
});


