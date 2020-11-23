
import React, { Component } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
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

      _weight: parseFloat(this.state.TextInpuPbValue),
      _month: this.state.TextInpuLValue
    }
    db.addGrouthTracker(this.state.dbs, data).then((result) => {

      this.props.navigation.navigate('AreaChart');
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
        <CustomHeader bgcolor='#fbb146' title="" bcbuttoncolor='#ffc470' navigation={this.props.navigation} bdcolor='#fbb146' />
        <ScrollView style={styles.container}>
          <View style={{ backgroundColor: '#fbb146', height: 135, zIndex: -1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
            <View style={{ marginTop: 0, marginLeft: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>Hello {this.state.userName}</Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Weight vs Length chart</Text>
              {/* <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
              {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('AgendaHistory')} style={[styles.buttonh, { backgroundColor: '#ED1B26', width: 120 }]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                    <Icon
                      name='bar-chart'
                      type='font-awesome'
                      color='red'
                      iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'gray' }}
                    />
                  </View>
                  <Text style={{ color: 'white', padding: 7 }}>History</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AreaChart')} style={[styles.buttonh, { backgroundColor: 'green', width: 140 }]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                    <Icon
                      name='area-chart'
                      type='font-awesome'
                      color='red'
                      iconStyle={{ fontSize: 13, color: 'gray' }}
                    />
                  </View>
                  <Text style={{ color: 'white', padding: 7 }}>Chart View</Text>

                </View>
              </TouchableOpacity>
            </View>

          </View>
          {/* <View style={styles.breadthPo1}> */}
          <View style={styles.breadthPo1}>
            <Text style={{ marginVertical: 8 }}> Weight Value </Text>
            <TextInput
              keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 }}
              autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} placeholder="Enter Weight value"  />


            <Text style={{ marginVertical: 8 ,marginTop:25}}> Month Value </Text>
            <TextInput
              keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 }}
              autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuLValue: TextInputValue })} placeholder="Enter Month value" />
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20
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
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    padding: 3,
  }, buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }, buttonh: {
    backgroundColor: "#AF1E8F",
    padding: 5,
    borderRadius: 25,
    marginTop: 18,
    width: 120,
    elevation: 10,
    shadowColor: '#30C1DD',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginHorizontal: 20,
  }, breadthPo1: {
    zIndex: 5,
    padding: 18,
    marginTop: 10,

  }
})