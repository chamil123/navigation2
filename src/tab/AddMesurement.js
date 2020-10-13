
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
const db = new Database();

export class AddMesurement extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      TextInpuPbValue: '',
      TextInpuLValue: '',
      isLoading: false,
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })

    this.loadDbVarable = this.loadDbVarable.bind(this);
  }
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    // this.getData();
    // this.viewListData();
  }
  componentDidMount() {

  }

  saveData() {


    let data = {

      _weight: parseInt(this.state.TextInpuPbValue),
      _month: this.state.TextInpuLValue
    }
    db.addGrouthTracker(this.state.dbs, data).then((result) => {

      //   this.getData();

    }).catch((err) => {
      console.log(err);

    })

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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
        <ScrollView style={styles.container}>
          {/* <View style={styles.breadthPo1}> */}

          <Text style={{ marginVertical: 10 }}> Weight Value </Text>
          <TextInput
            keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 }}
            autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} label="Weight" />


          <Text style={{ marginVertical: 10 }}> Month Value </Text>
          <TextInput
            keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 }}
            autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuLValue: TextInputValue })} label="Month" />
          {/* </View> */}



          <TouchableOpacity onPress={() => this.saveData()} activeOpacity={0.5} >
            <LinearGradient colors={['#fbb146', '#f78a2c']}

              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0.9 }}

              style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Add 
</Text>
            </LinearGradient>


          </TouchableOpacity>
          {/* <View style={styles.button}>
            <Button
              large
              leftIcon={{ name: 'save' }}
              title='Save'
              onPress={() => this.saveData()} />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }, breadthPo1: {

    justifyContent: 'center',
    alignSelf: 'center',
    // position: 'absolute',
    backgroundColor: 'white',
    // bottom: 100,
    zIndex: 5,
    width: '95%',
    borderRadius: 10,
    elevation: 2,
    padding: 20,
    paddingTop: 20,
    marginTop: 10,
    // shadowColor: '#30C1DD',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
  }, linearGradient: {
    marginTop: 40,
    width: 350,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
}, buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
}
})