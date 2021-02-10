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
import i18n from 'i18n-js';
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
  },
  gradient: {
    flex: 1,
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
    marginBottom: 20,
    elevation: 3,
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
      // TextInputPhoneNumber: '',
      TextInputpassword: '',
      isLoading: true,

      PickerValueHolder: '',
      value: null,
      items: [],
      lan: '',
      // emailError: "",
    }
  }
  InputUsers = () => {
    // const emailError = validate("email", this.state.TextInputEmail)
    this.setState({
      // emailError: emailError,
      // passwordError: passwordError
    })

    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputpassword } = this.state;
    const { PickerValueHolder } = this.state;


    if (TextInputName == '' || TextInputEmail == '' || TextInputpassword == '' || PickerValueHolder == '') {
      if (PickerValueHolder == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          optionError: "Please select an option first",
          errorFound: "true",
        })
      } else {
        this.setState({
          optionError: "",
          errorFound: "",
        })
      }
      if (TextInputpassword == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          pwError: "Please enter password",
          errorFound: "true",
        })
      } else {
        this.setState({
          pwError: "",
          errorFound: "",
        })
      }
    
      if (TextInputEmail == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          emailError: "Please enter email",
          errorFound: "true",
        })
      } else {
        this.setState({
          emailError: "",
          errorFound: "",
        })
      }
      if (TextInputName == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          unameError: "Please enter user name",
          errorFound: "true",
        })
      } else {
        this.setState({
          unameError: "",
          errorFound: "",
        })
      }
    } else {
      this.setState({
        unameError: "",
        optionError: "",
        emailError: "",
        mobileError: "",
        pwError: "",
      })

      let emailValidateregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // let mobileValidateregex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
      if (emailValidateregex.test(TextInputEmail) == true) {
        this.setState({
          emailError: "",
          errorFound: "",
        })
        //email verification success. process continue for further validation
        
          //mobile verification success. process continue for further validation




          //start save data in the server
          if (this.state.errorFound != "false" && this.state.errorFound == "") {

            // if (PickerValueHolder !== '') {
            fetch('https://youandmenest.com/tr_reactnative/insert.php', {
              method: 'post',
              header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                member_name: TextInputName,
                member_email: TextInputEmail,
                // member_mobilenumber: TextInputPhoneNumber,
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


            this.state.errorFound = "false"
          }

          //end save data in the server
        

      } else {
        this.setState({
          emailError: "Invalid email",
          errorFound: "true",
        })
      }
    }





  }
  //   async componentDidMount() {
  //     const role_id = await AsyncStorage.getItem('lang');
  //     this.setState({
  //         lan: await AsyncStorage.getItem('lang'),
  //     });

  // }

  async componentDidMount() {

    fetch('https://youandmenest.com/tr_reactnative/view_role.php', {
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
    this.setState({
      lan: await AsyncStorage.getItem('lang'),
    });
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
                  <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 0, color: 'white',alignItems:'center' }}>{i18n.t('SignUp.headding')}</Text>

                  <Text style={{ fontSize: 12, marginTop: 2, color: 'black',textAlign:'center' }}>{i18n.t('SignUp.subtitle1')} </Text>
                  <Text style={{ fontSize: 12, marginTop: -2, marginBottom: 10, color: 'black' }}>{i18n.t('SignUp.subtitle2')}</Text>
                </View>
                <Animatable.View animation="fadeInLeft">
                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.role1')} :</Text>
                  <View style={{ bborderColor: '#F2F2F2', borderWidth: 0.2, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }}>

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
                      <RedPickerItem label={i18n.t('SignUp.pickerheading')} value="red" color='red' fontSize='15' value={0} />

                      {this.state.dataSource.map((item, key) => (

                        <Picker.Item label={item.role_name} value={item.id} key={key} />)
                      )}

                    </Picker>
                  </View>
                  <Text style={{ color: 'red' }}>{this.state.optionError}</Text>


                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.username')} :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_uname')} onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.unameError}</Text>


                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.email')} :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_email')} enter_email onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.emailError}</Text>

                  {/* <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.mobile')}  :</Text> */}
                  {/* <TextInput
                    onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })}
                    keyboardType="numeric"
                    maxLength={10}
                    style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_mobile')}  onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.mobileError}</Text> */}

                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.pw')} :</Text>
                  <TextInput secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.pwInner')} onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.pwError}</Text>

                  <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('HomeApp')} onPress={this.InputUsers}>

                    <LinearGradient colors={['#fff', '#e2e1e1']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.linearGradient}>
                      <Text style={styles.buttonText}>
                      {i18n.t('SignUp.signUp')}
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