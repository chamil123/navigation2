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
                <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 80,marginBottom:10, color: 'black' }}> Welcome To

                
                </Text>
             
                <View style={{backgroundColor: 'rgba(252, 252, 252, 0.1)',padding:20,borderRadius:150}}>
                                    <View style={{backgroundColor: 'rgba(252, 252, 252, 0.2)',padding:15,borderRadius:120}}>
                                    <View style={{backgroundColor: 'rgba(252, 252, 252, 0.9)',padding:10,borderRadius:100}}>
                                        <Image style={{ width: 140, height: 140, marginLeft: 0 }}
                                            source={IMAGE.ICON_LOGO_MAIN}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    </View>
                                    </View>

              </View>
              <Animatable.View animation="fadeInLeft">
            

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
                  titleStyle={{ color: 'white' }}
                  buttonStyle={styles.submitText, { borderRadius: 25, borderColor: 'white', color: '#ccc', padding: 12, borderWidth: 1,marginBottom:20 }}
                  onPress={() => this.props.navigation.navigate('Register')}

                />
              </Animatable.View>

            </View>
          </ScrollView>



        </LinearGradient>
      </View>

    
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
