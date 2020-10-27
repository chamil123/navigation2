import React, { Component } from 'react';
import { TextInput, StatusBar, Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, ScrollView, Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import LinearGradient from 'react-native-linear-gradient';
// import { TextInput } from 'react-native-paper';
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 13,
    color: 'black',
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
                this.props.navigation.navigate('HomeApp');
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
    if (isLoading) {
      return (
        <BarIndicator color='#fbb146' />
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fbb448" />
          <LinearGradient colors={['#fbb448', '#f78a2c']} style={styles.gradient}>
            <CustomHeader bgcolor='#fbb448' title="" navigation={this.props.navigation} bdcolor='#fbb448' />
            <FlashMessage duration={1000} />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={{
                flex: 1, justifyContent: 'center', paddingHorizontal: 15,
                paddingVertical: 0
              }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 0,color:'white' }}> Create New Account </Text>

                  <Text style={{ fontSize: 14, marginTop: -2, marginBottom: 20, color: 'black' }}>Use email to register</Text>
                </View>
                <Animatable.View animation="fadeInLeft">
                <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2,  }}>User Role :</Text>
                  <View style={{ bborderColor: '#F2F2F2', borderWidth: 0.2, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10  }}>
                  
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
                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2,  }}>User Name :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 }} placeholder="Enter User Name" onEndEditing={this.clearFocus} autoFocus={false}/>
                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>Email address :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 }} placeholder="Enter Email address" onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2,  }}>Mobil number :</Text>
                  <TextInput
                    onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })}
                    keyboardType="numeric"
                    maxLength={10}
                    style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffd595', paddingLeft: 10 }}placeholder="Enter Mobil number" onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2,  }}>Password :</Text>
                  <TextInput secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 }} placeholder="Enter Password" onEndEditing={this.clearFocus} autoFocus={false}/>
                  <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('HomeApp')} onPress={this.InputUsers}>

                    <LinearGradient colors={['#fff', '#ffeed5']}
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
          </LinearGradient>
        </View>
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