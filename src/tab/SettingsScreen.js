import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { CustomHeader } from '../index';

export class SettingsScreen extends Component {
  constructor(props){
    super(props)

  }
  testPush() {

  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        {/* <CustomHeader bgcolor='white' title="Settinfgs" isHome={true} navigation={this.props.navigation}  bdcolor='#f2f2f2'/> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Setting!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>Go Settings Details</Text>
            {/* <Text onPress={() => this.testPush()}>Hello</Text> */}
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}