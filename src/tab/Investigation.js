import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { List, ListItem, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';
import { CustomHeader } from '../index';

export class Investigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { "Begin": "Blood grouping and Rh typing", End: "To identify the blood group. Rh status and red cell antibodies." },
                { "Begin": "Full Blood count", End: "To observe the women’s general blood condition and includes hemoglobin" },
                { "Begin": "WDRL test ( Venereal disease research laboratory )", End: "For syphilis not all position results indicate active syphilis. Early testing will allowa women to be treated in order prevent infection of the fetus." },
                { "Begin": "HIV Antibodies", End: "Routine screening to detect HIV infections." },
                { "Begin": "Urinalysis", End: "To performed at every visit to exclude protein urine." },
                { "Begin": "Ultrasound", End: "To identify gestational age" },
                { "Begin": "RBS / PPBS / OGTT", End: "To identify glucose level" },
            ]


        }
    }

    componentDidMount() {

        console.log("aSSASDASD:" + this.state._list_Data);
    }
    _keyExtractor = (item, index) => item.Begin.toString();
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fbb146" />
                <CustomHeader bgcolor='#fbb146' title="Investigation" bcbuttoncolor='#ffc470' navigation={this.props.navigation} bdcolor='#fbb146' />
                <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1, }}>

                </View>
                <View style={styles.footer}>
                    {/* <Text>Setting!</Text> */}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <FlatList
                            style={{ backgroundColor: 'white' }}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={({ item }) =>
                                // <Text></Text>
                                <ListItem
                                    style={{ paddingTop: 5 }}

                                >

                                    <Body >
                                        <Text >{item.Begin}</Text>
                                        <Text >{item.End}</Text>
                                    </Body>
                                    <Right style={{ width: 5 }}>
                                        <View style={styles.iconMore}>
                                            <Icon name="angle-right" color="gray" />
                                        </View>
                                    </Right>
                                </ListItem>
                            }
                        />
                    </View>

                    {/* <FlatList

                        style={{ backgroundColor: 'white' }}
                        keyExtractor={this.keyExtractor}
                        data={this.state._list_Data}
                        // renderItem={this.renderItem}

                        renderItem={({ item }) => <ListItem
                            style={{ paddingTop: 15 }}

                        >

                            <Body style={{ marginLeft: -150 }}>
                                <Text style={{ color: 'gray', fontSize: 12 }}>{item.Begin}</Text>
                                <Text style={styles.dateText}>{item.bpValue} mm hg</Text>
                            </Body>

                        </ListItem>
                        }
                    /> */}
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
        bottom: 80,
        paddingVertical: 20,

        //  paddingHorizontal: 20
    }
});