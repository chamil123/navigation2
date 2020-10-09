
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';

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
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} style={{ backgroundColor: '#fff', marginTop: 0 }} label="Weight" />

        </View>
        <View style={styles.subContainer}>
          <TextInput autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuLValue: TextInputValue })} style={{ backgroundColor: '#fff', marginTop: 0 }} label="Month" />
        </View>



        <View style={styles.button}>
          <Button
            large
            leftIcon={{ name: 'save' }}
            title='Save'
            onPress={() => this.saveData()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
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
  }
})