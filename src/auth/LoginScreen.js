import React, { Component } from 'react';
import { Text, ScrollView, Image, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';

import *as Animatable from 'react-native-animatable';
export class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.checkToken();
  }
  checkToken = async () => {
    const token = await AsyncStorage.getItem('memberNames');
    if (token) {
      this.props.navigation.navigate('HomeApp');
    } else {
      this.props.navigation.navigate('Login2')
    }
  }
  render() {
    return (


      <View style={styles.container}>
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fbb448" />
        <LinearGradient colors={['#fbb448', '#f78a2c']} style={styles.gradient}>
   
                
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{
              flex: 1, justifyContent: 'center', paddingHorizontal: 15,
              paddingVertical: 0
            }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 80, color: 'black' }}> Welcome To

                
                </Text>
                {/* <Text style={{ color: 'red',fontSize: 35, fontWeight: "bold" }}> <Text style={{ color: 'white',fontSize: 35, fontWeight: "normal", }}>You and</Text>Me</Text> */}
                {/* <Text style={{ fontSize: 16, color: 'black',marginBottom:15 }}>Enjoy the experience</Text> */}

                <Image style={{ width: 190, height: 220, marginLeft: 0,marginVertical:30 }}
                  source={IMAGE.ICON_LOGO_MAIN}
                  resizeMode="contain"

                />

              </View>
              <Animatable.View animation="fadeInLeft">
                {/* <View style={{ borderBottomWidth: 0.6, paddingBottom: 5 }}>


                </View> */}

                <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('Login2')}>

                  <LinearGradient colors={['#fff', '#F2F2F2']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.9 }}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                      Sign in
            </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{paddingVertical:15}}>Don't have account? <Text style={{ color: 'white' }}>create new Account</Text> </Text>
                </View>

                <Button
                  title="Sign Up"
                  type="outline"

                  buttonStyle={styles.submitText, { borderRadius: 25, borderColor: 'white', color: '#ccc', padding: 12, borderWidth: 1,marginBottom:20 }}
                  onPress={() => this.props.navigation.navigate('Register')}

                />
              </Animatable.View>

            </View>
          </ScrollView>



        </LinearGradient>
      </View>

      //     <SafeAreaView style={{ flex: 1 ,justifyContent: 'center' , alignItems: 'center'}}>
      //        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#f2f2f2" />
      //       <ScrollView
      //         contentInsetAdjustmentBehavior="automatic"
      //         style={styles.scrollView}>

      //         <View style={{ flex:1, justifyContent: 'space-around' , alignItems: 'center'}}>
      //           <Text style={{ fontSize: 22, fontWeight: "bold", marginTop:50}}> Welcome To 

      //           <Text  style={{color:'#ff9100',}}>  App</Text>
      //           </Text>
      //           <Text style={{fontSize:14}}>Enjoy the experience</Text>

      //           <Image style={{ width: 210, height: 310, marginLeft: 0 }}
      //             source={IMAGE.ICON_LOGIN}
      //             resizeMode="contain"

      //           />


      //           <TouchableOpacity style={{ marginTop: 0}}
      //             onPress={() => this.props.navigation.navigate('Login2')}

      //           >
      //             <LinearGradient colors={['#fbb146', '#f78a2c']}

      //               start={{ x: 0, y: 1 }}
      //               end={{ x: 1, y: 0.9 }}

      //               style={styles.linearGradient}>
      //               <Text style={styles.buttonText}>
      //                 Sign in
      // </Text>
      //             </LinearGradient>
      //           </TouchableOpacity>
      //           <Text style={{marginTop:10}}>Don't have account? <Text   style={{color:'#ff9100'}}>create new Account</Text> </Text>
      //           <Button
      //             title="Sign Up"
      //             type="outline"
      //             buttonStyle={styles.submitText,{borderRadius:5,borderColor:'#f78a2c',marginTop:10,color:'#ccc',width: 280,borderWidth: 1,}}
      //             onPress={() => this.props.navigation.navigate('Register')}

      //           />




      //         </View>
      //       </ScrollView>
      //     </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  }, submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
  submitText: {
    paddingTop: 20,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    
  }, buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 14,
    color: 'black',
    backgroundColor: 'transparent',
  }


  , container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  }
  
});
