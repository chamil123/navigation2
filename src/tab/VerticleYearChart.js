import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ListView } from 'react-native';
import PushNotification from 'react-native-push-notification';
import StepIndicator from 'react-native-step-indicator';
import { CustomHeader } from '../index';

import dummyData from './data';

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fe7013',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 10,
    currentStepLabelColor: '#fe7013'
}

export class VerticleYearChart extends Component {
    constructor() {
        super();

        this.state = {
            currentPage: 0
        };
        this.viewabilityConfig = { itemVisiblePercentThreshold: 0 }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        customStyles={stepIndicatorStyles}
                        stepCount={5}
                        direction='vertical'
                        currentPosition={this.state.currentPage}
                        labels={dummyData.data.map(item => item.title)}
                    />
                </View>
                <FlatList
                    style={{ flexGrow: 1 }}
                    data={dummyData.data}
                    renderItem={this.renderPage}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                />
            </View>
        );
    }

    renderPage = (rowData) => {
        const item = rowData.item
        return (
            <View style={styles.rowItem}>
                <Text style={styles.titleMain}>{item.title}</Text>
                
                 
                
                
                {
                    item.subtitle1 ? <Text style={styles.title}>{item.subtitle1}
                       <Text style={styles.body}>{item.body1}</Text>
                    </Text> : <Text></Text>
                }
                {
                    item.subtitle2 ? <Text style={styles.title}>{item.subtitle2}
                    <Text style={styles.body}>{item.subbody1}</Text>
                    </Text> : <Text></Text>
                }
                {
                    item.subtitle3 ? <Text style={styles.title}>{item.subtitle3}
                    <Text style={styles.body}>{item.subbody2}</Text>
                    </Text> : <Text></Text>
                }{
                    item.subtitle4 ? <Text style={styles.title}>{item.subtitle4}
                    <Text style={styles.body}>{item.subbody3}</Text>
                    </Text> : <Text></Text>
                }{
                    item.subtitle5 ? <Text style={styles.title}>{item.subtitle5}y
                    
                    <Text style={styles.body}>{item.subbody4}</Text>
                    </Text> : <Text style={{marginBottom:-90}}></Text>
                }
  <Text style={styles.body}>{item.body}</Text>
            </View>
        )
    }

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        const visibleItemsCount = viewableItems.length;
        if (visibleItemsCount != 0) {
            this.setState({ currentPage: viewableItems[visibleItemsCount - 1].index })
        };
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    stepIndicator: {
        marginVertical: 50,
        paddingHorizontal: 20
    },
    rowItem: {
        flex: 3,
        paddingVertical: 0
    },
    titleMain: {
        flex: 1,
        fontSize: 15,
        color: '#fe7013',
        paddingVertical: 10,
        fontWeight: 'bold'
    },
    title: {
        // flex: 1,
        fontSize: 14,
        color: '#333333',
        paddingVertical: 0,
        fontWeight: 'bold'
    },
    body: {
        // flex: 1,
        fontSize: 12,
        color: '#606060',
        lineHeight: 18,
        marginRight: 0,
        fontWeight:'normal'
    }
});