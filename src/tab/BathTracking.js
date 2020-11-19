
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, View, TextInput, TouchableHighlight, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment' // 2.20.1
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { Avatar } from 'react-native-elements';
import Database from '../Database';
const db = new Database();
const _formatTime = 'HH:mm:ss';

// const time = moment().format(_formatTime);

// const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    // backgroundColor: '#000',
    // padding: 5,
    // borderRadius: 5,
    // width: 220,
  },
  text: {
    fontSize: 45,
    color: 'black',
    marginLeft: 7,
  }
};

export class BathTracking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
      _times: '',
      dbs: '',
      _start_Time: '',
      _end_time: '',
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })

    // this.toggleTimer = this.toggleTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.toggleStartwatch = this.toggleStartwatch.bind(this);
  }
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });


  }
  toggleStartwatch() {
    var start_Time = this.getFormattedTime();
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
      _start_Time: start_Time
    });



    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ;" + start_Time);
  }
  toggleStopwatch() {
    var end_time = this.getFormattedTime();
    this.setState({
      // stopwatchStart: !this.state.stopwatchStart,
      // stopwatchReset: false,
      stopwatchStart: false,
      stopwatchReset: true,
      _end_time: end_time
    });
  
    let data = {
      date:moment().format("YYYY-MM-DD"),
      startTime: this.state._start_Time,
      endtime: end_time
    }
    db.addPBathTime(this.state.dbs, data).then((result) => {
      this.props.navigation.navigate('BathTrackingHistroy');

    }).catch((err) => {
      console.log(err);

    })

    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ;" + this.state._end_time);
  }

  resetStopwatch() {
    this.setState({
      stopwatchStart: false,
      stopwatchReset: true
    });

  }

  getFormattedTime() {
    var times = moment().format(_formatTime);
    // this.setState({ 
    //   _times:times
    // });
    return times;
  };

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
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Stopwatch laps msecs start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={options}
            // getTime={this.getFormattedTime} />
            getTime={this.getFormattedTime} />
        </View>
        <View>
          {!this.state.stopwatchStart ?
            // <TouchableHighlight onPress={this.toggleStopwatch}>
            //   <Text style={{ fontSize: 30 }}>startd</Text>
            // </TouchableHighlight>
            <Avatar
              rounded
              showEditButton
              size={62}

              icon={{ name: 'play', type: 'font-awesome', color: 'white' }}
              containerStyle={{
                //  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                shadowOffset: { height: 3, width: 8 },
                borderWidth: 1, borderColor: 'white', // IOS
                shadowOpacity: 3, // IOS
                shadowRadius: 5, elevation: 2,
                backgroundColor: '#388e3c',


              }}
              onPress={this.toggleStartwatch}

            />
            :

            <Avatar
              rounded
              showEditButton
              size={62}
              icon={{ name: 'stop', type: 'font-awesome', color: 'white', }}
              containerStyle={{
                //  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                shadowOffset: { height: 3, width: 8 },
                borderWidth: 1, borderColor: 'white', // IOS
                shadowOpacity: 3, // IOS
                shadowRadius: 5, elevation: 2,
                backgroundColor: 'red'
              }}
              onPress={this.toggleStopwatch}
            />
            // <TouchableHighlight onPress={this.toggleStopwatch}>
            //   <Text style={{ fontSize: 30 }}>stop</Text>
            // </TouchableHighlight>
          }

          <Avatar
            rounded
            showEditButton
            size={62}
            icon={{ name: 'undo', type: 'font-awesome', color: 'white' }}
            containerStyle={{
              //  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
              shadowOffset: { height: 3, width: 8 },
              borderWidth: 1, borderColor: 'white', // IOS
              shadowOpacity: 3, // IOS
              shadowRadius: 5, elevation: 2,
              backgroundColor: '#fbb146'
            }}
            onPress={this.resetStopwatch}
          />
          {/* <TouchableHighlight onPress={this.resetStopwatch}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableHighlight> */}
          {/* <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
            reset={this.state.timerReset}
            options={options}
            handleFinish={handleTimerComplete}
            getTime={this.getFormattedTime} /> */}
          {/* <TouchableHighlight onPress={this.toggleTimer}>
            <Text style={{ fontSize: 30 }}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetTimer}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableHighlight> */}
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