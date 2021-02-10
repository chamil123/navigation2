
import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Image, Text, View, TouchableOpacity, TextInput, DrawerLayoutAndroidBase, StatusBar } from 'react-native';
import Database from '../Database';
import { IMAGE } from '../constants/image';
import Slider from "react-native-slider";
import { CustomHeader } from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
const db = new Database();

export class BMICalculator extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',

      isLoading: false,
      value: 140,
      weight: 40,
      lan: '',
    };
  }
  async componentDidMount() {
    db.loadDB();
    this.setState({
      lan: await AsyncStorage.getItem('lang'),
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveProduct() {
    this.setState({
      isLoading: false,
    });
    let data = {
      prodId: this.state.prodId,
      prodName: this.state.prodName,
      prodDesc: this.state.prodDesc

    }
    db.addProduct(data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });

    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }

  calculateBmi = async () => {

    const height = this.state.value / 100;
    const weight = this.state.weight;
    const _Bmi_val = (weight / (height * height)).toFixed(2);

    try {
      const items = [['bmi_value', _Bmi_val], ['height', "" + height.toFixed(2)], ['weight', "" + weight.toFixed(2)]]
      await AsyncStorage.multiSet(items, () => { });
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.navigate('BMIMeter');
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#F2F2F2" />

        <CustomHeader bgcolor='#F2F2F2' bcbuttoncolor='#fff' title={i18n.t('bmi.hedding')}navigation={this.props.navigation} bdcolor='#F2F2F2' />
        {/* <View style={styles.innerCircle} /> */}
        <View style={{ flex: 1 }}>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingLeft: 20, paddingEnd: 20 }}>


            <Image style={{ width: this.state.weight + 100, height: this.state.value + 150, alignSelf: "center", }}
              source={IMAGE.ICON_FEMALE}
              resizeMode="stretch"


            />
            <Slider
              value={this.state.value}
              onValueChange={value => this.setState({ value })}
              minimumValue={0}
              maximumValue={200}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#f78a2c"

            />
            <Text>
            {i18n.t('bmi.height')} : {this.state.value.toFixed(0)}.cm
            </Text>

            <Slider
              value={this.state.weight}
              onValueChange={weight => this.setState({ weight })}
              minimumValue={0}
              maximumValue={150}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#f78a2c"

            />
            <Text>
            {i18n.t('bmi.weight')} : {this.state.weight.toFixed(2)}.kg
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.calculateBmi}>
              {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BMIMeter')}> */}
              <Text style={styles.buttonText}> {i18n.t('bmi.trans')} </Text>
            </TouchableOpacity>


            <Text>

              {/* BMI:{this.state.weight.toFixed(2)*this.state.value.toFixed(0)} */}
            </Text>

          </View>





        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    //  flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }, button: {
    backgroundColor: "#6a1b9a",
    padding: 10,
    borderRadius: 25,
    // width:'200',
    // width: 150,

    marginTop: 15,
    //marginLeft: 18,
    // marginVertical: 5
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',

  }, innerCircle: {
    borderRadius: 105,
    width: 150,
    height: 150,
    marginLeft: 105,
    marginTop: 90,
    backgroundColor: '#c8e6c9',
    position: 'absolute',
  },
})