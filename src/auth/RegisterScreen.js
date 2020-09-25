import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, ScrollView, Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import *as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import { CustomHeader } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9100'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: 500

  }, title: {
    color: '#85375a',
    fontWeight: 'normal',
    fontSize: 18
  }, text: {
    color: 'gray',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  }, signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  }, textSign: {
    color: 'white',
    fontWeight: 'bold'
  }, linearGradient: {
    // flex: 1,
    // width: 280,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }


});

export class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: '',
      TextInputpassword: '',


      isLoading: true,

      PickerValueHolder: ''
    }
  }
  InputUsers = () => {
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputpassword } = this.state;
    const { PickerValueHolder } = this.state;
    // Alert.alert("sdsdsd");
    fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/insert.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_name: TextInputName,
        member_email: TextInputEmail,
        member_mobilenumber: TextInputPhoneNumber,
        member_password: TextInputpassword,
        member_role: PickerValueHolder,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        AsyncStorage.setItem('memberNames', TextInputName);
        Alert.alert(responseJson);
        this.props.navigation.navigate('HomeApp');
        Alert.alert(this.state.PickerValueHolder);

      }).catch((error) => {
        console.error(error);
      })
  }


  componentDidMount() {
    fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/view_role.php', {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

    }).then((response) => response.json())
      .then((responseJson) => {
        // var datas=JSON.stringify(responseJson);
        // Alert.alert(datas.id);
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      }).catch((error) => {
        console.error(error);
      })
  }


  render() {
    let { isLoading } = this.state

    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];
    if (isLoading) {
      return (

        <BarIndicator color='#fbb146' />

      );
    } else { 

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader bgcolor='#f2f2f2' title="" navigation={this.props.navigation} bdcolor='#f2f2f2' />

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{
            flex: 1, justifyContent: 'center', paddingHorizontal: 15,
            paddingVertical: 0,
          }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 0 }}> Create New Account </Text>

              <Text style={{ fontSize: 12, marginTop: -2, color: 'grey' }}>Use email to register</Text>
            </View>
            <Animatable.View animation="fadeInUp">

              <Picker
                selectedValue={this.state.PickerValueHolder}

                onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })}
              // onChangeText={itemValue => this.setState({ PickerValueHolder: itemValue })}
              >

                {this.state.dataSource.map((item, key) => (
                  <Picker.Item label={item.role_name} value={item.role_name} key={key} />)
                )}

              </Picker>
              {/* <Dropdown
                label='Favorite Fruit'
                data={this.state.dataSource.id}
              // data={data}
              /> */}

              <TextInput onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="User Name" />
              <TextInput onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Email address" />
              <TextInput onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Mobil number" />
              <TextInput secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10, }} label="Password" />
              <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('HomeApp')} onPress={this.InputUsers}>
                {/* <View style={{
                backgroundColor: '#ff9100', alignItems: 'center',
                justifyContent: 'center', borderRadius: 25,
                height: 50,
                marginTop: 50
              }}
              >
                <Text style={{ color: 'white' }}>Button</Text>
              </View> */}
                <LinearGradient colors={['#fbb146', '#f78a2c']}
                  // '#ffd600',
                  // locations={[1,0.3,0.5]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0.9 }}
                  // locations={[0.3, 0.6,1]} 
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>
                    Sign in
                </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>

          </View>
        </ScrollView>


        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Register!</Text>
                <TouchableOpacity style={{ marginTop: 20 }}
                  onPress={() => this.props.navigation.navigate('HomeApp')}
        
                >
                  <Text>Home</Text>
                </TouchableOpacity>
              </View> */}

      </SafeAreaView>
    );
  }
}
}