import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, ScrollView, Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import *as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
// import ValidationComponent from 'react-native-form-validator';



import DropDownPicker from 'react-native-dropdown-picker';
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
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
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

      PickerValueHolder: '',
      value: null,
      items: [],

      // emailError: "",
    }
  }

  InputUsers = () => {
    // const emailError = validate("email", this.state.TextInputEmail)
    this.setState({
      // emailError: emailError,
      // passwordError: passwordError
    })

    // this.validate({
    //   TextInputName: { required: true},
    //   TextInputEmail: {email: true},
    //   TextInputPhoneNumber: {numbers: true},
    //   PickerValueHolder:{required: true},
    //   // date: {date: 'YYYY-MM-DD'}
    // });
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputpassword } = this.state;
    const { PickerValueHolder } = this.state;
    if (PickerValueHolder !== '') {
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
          this.setState({
            isLoading: false,
          }, function () {

          });
          if (responseJson == "Insert success") {
            AsyncStorage.setItem('memberNames', TextInputName).then(
              responseJson => {
                // this.props.navigation.navigate('HomeApp');
              }
            );
            AsyncStorage.setItem('memberId', PickerValueHolder);

          } else {
            showMessage({

              message: "Register Fail",
              description: "" + `${responseJson}`,
              backgroundColor: 'red'
            })
            this.props.navigation.navigate('Register')
          }
        }).catch((error) => {
          console.error(error);
        })


    } else {
      showMessage({
        message: "Please select an option first",
        backgroundColor: 'red'
      })
    }
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
        for (var i = 0; i < responseJson.length; i++) {
          role_id = responseJson[i].id
          role_name = responseJson[i].role_name
          console.warn(role_id);
        }

        console.log(responseJson);

        // var datas=JSON.stringify(responseJson);
        // Alert.alert(datas.id);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          _role_id: role_id,
          items: role_name,

        }, function () {
          // In this block you can do something with new state.
        });
      }).catch((error) => {
        console.error(error);
      })


  }

  handleChangeOption(itemValue) {
    if (itemValue !== 0) {
      this.setState({ PickerValueHolder: itemValue });

    }
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
          <FlashMessage duration={1000} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{
              flex: 1, justifyContent: 'center', paddingHorizontal: 15,
              paddingVertical: 0
            }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 0 }}> Create New Account </Text>

                <Text style={{ fontSize: 12, marginTop: -2, marginBottom: 20, color: 'grey' }}>Use email to register</Text>
              </View>
              <Animatable.View animation="fadeInLeft">
                <View style={{ borderBottomWidth: 0.6, paddingBottom: 5 }}>
                  <Picker

                    mode="dropdown"
                    // selectedValue={this.state.datasource[index].packselectedValue}
                    selectedValue={this.state.PickerValueHolder}
                    // style={{ borderBottomColor: 'red', borderWidth: 1 }}
                    // onValueChange={this.handleChangeOption}
                    prompt='Options'
                    onValueChange={

                      (itemValue, itemIndex) =>

                        this.setState(
                          { PickerValueHolder: itemValue },
                          (name, index) => {
                          }
                        )


                    }
                  >
                    <RedPickerItem label={'Please select an option'} value="red" color='red' fontSize='15' value={0} />

                    {this.state.dataSource.map((item, key) => (

                      <Picker.Item label={item.role_name} value={item.id} key={key} />)
                    )}

                  </Picker>
                </View>
                <TextInput onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="User Name" />
                <TextInput onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Email address" />
                <TextInput
                  onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })}
                  keyboardType="numeric"
                  maxLength={10}
                  style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Mobil number" />
                <TextInput secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10, }} label="Password" />
                <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('HomeApp')} onPress={this.InputUsers}>

                  <LinearGradient colors={['#fbb146', '#f78a2c']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.9 }}
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
} class RedPickerItem extends Component {
  render() {
    return (
      <Picker.Item {...this.props} style={{ color: '#fff', placeholderTextColor: '#fff' }} />
    )
  }
}