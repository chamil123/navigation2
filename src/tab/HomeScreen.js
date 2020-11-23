import React, { Component } from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableHighlight, TouchableOpacity, StatusBar, Alert, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { IMAGE } from '../constants/image';
import moment from 'moment' // 2.20.1
import { Icon } from 'react-native-elements';
import Database from '../Database';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-community/async-storage';
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
const db = new Database();
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)


import { CustomHeader } from '../index';
export class HomeScreen extends Component {
  initialState = {
    [_today]: { disabled: false }
  }

  constructor() {
    super();
    this.state = {
      dbs: '',
      _markedDates: this.initialState,
      _member_id: '',
      _member_name: '',
      isLoading: true,
      reacl_next_p_dateCount: '',
      _next_period_date: '',
      _ovl_date: '',
      pName: '',
    }
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })

    this.loadDbVarable = this.loadDbVarable.bind(this);
  }

  loadDbVarable(result) {
    this.setState({
      dbs: result,
      isLoading: false,
    });
    db.listBag(this.state.dbs).then((data) => {
      result = data;
      if (result == 0) {

        db.addItemOfMother_bag(this.state.dbs).then((result) => {

        }).catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) => {
      console.log(err);
    })


    this.loadData();
  }
  loadData() {

    let products = [];
    let _pdate = '';

    let _pcatId;
    let _pParity_bit = 0;


    const start = moment(_today, 'YYYY-MM-DD');
    db.listProduct(this.state.dbs).then((data) => {
      products = data;
      for (var i = 0; i < products.length; i++) {
        _pdate = products[i].pName
        _pcatId = products[i].pCatId
        _pDescription = products[i].pDescription
        _pParity_bit = products[i].pParityBit
        if (_pcatId == 1) {

          this.setState({
            isLoading: false,
            pName: _pdate,
          });
        }
        if (_pcatId == 4) {
         
          this.setState({
            isLoading: false,
           
            _ovl_date: _pdate,
        });
        } if (_pcatId == 5) {
          const end = moment(_pdate, 'YYYY-MM-DD');
          const range = moment.range(start, end);

          const range2 = range.snapTo('day');
          this.setState({
            isLoading: false,
            reacl_next_p_dateCount: range2.diff('days'),
            _next_period_date: _pdate,
            
          });

        }

      }
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })

  }
  componentWillUnmount() {
    // Remove the event listener
    // this.focusListener.remove();
  }

  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('memberNames');
    const role_id = await AsyncStorage.getItem('memberId');
    db.initDB();
    const data = new FormData();
    data.append("get_about", "true");
    return fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/get_user_by_id.php?mname=' + myArray, {
      method: 'post',
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // role_id = "";
        // member_name = "";

        for (var i = 0; i < responseJson.length; i++) {
          // role_id = responseJson[i].member_role
          // member_name = responseJson[i].member_name

        }
        this.setState({
          isLoading: false,
          // dataSource: responseJson,
          _member_id: role_id,
          _member_name: myArray,


        }, function () {


        })

      }).catch((error) => {
        console.error(error)
      })

  }
  render() {
    let { isLoading } = this.state
    if (isLoading) {
      return (

        <BarIndicator color='#fbb146' />

      );
    } else {
      // const miniCardStyle = {
      //   padding: 5, margin: 5, elevation: 3,
      // };
      return (
        // <Text>sdasdasdasd</Text>

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.brestposition5}></View>
          <View style={styles.brestposition6}></View>
          <View style={styles.brestposition3}></View>
          <View style={styles.brestposition4}></View>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#fbb146" />
          <CustomHeader bgcolor='#fbb146' title="Main Menu" isHome={true} navigation={this.props.navigation} bdcolor='#fbb146' />
          <ScrollView style={styles.scrollContainer}>

            {/* <CustomHeader bgcolor='white' title="Home" isHome={true} navigation={this.props.navigation}   bdcolor='#f2f2f2'/> */}


            {
              this.state._member_id == 1 ?
                <View style={{ flex: 1, flexDirection: 'column',  }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 15 }}>Recommended for you</Text>
                  <ScrollView

                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={styles.container}>

                      {/* <Card > */}
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('VerticleYearChart')}>
                        <LinearGradient style={styles.cardHorizontal} colors={['#fbb146', '#f78a2c']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0.9 }}

                        >
                          <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Normal Healthy</Text>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", marginTop: -3 }}>Diet</Text>

                              </View>
                              <Text style={{ paddingTop: 65, fontSize: 12 }}>Food piramid</Text>
                            </View>
                            <View style={{ height: 70, marginLeft: -20, paddingTop: 15 }}>
                              <Image source={IMAGE.ICON_DIET_PLAN}
                                style={{ height: 120, width: 190 }}>
                              </Image>
                            </View>

                          </View>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate('IdentifyPregnancy')}>
                        <LinearGradient style={styles.cardHorizontal} colors={['#FDAD94', '#FC8386']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0.9 }}
                        >

                          <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Identify Pregnancy</Text>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", marginTop: -3 }}></Text>

                              </View>

                            </View>
                            <View style={{ height: 70, marginLeft: -50, paddingTop: 15 }}>
                              <Image source={IMAGE.ICON_IDENTY_PREGNANCY}
                                style={{ height: 124, width: 185 }}>
                              </Image>
                            </View>

                          </View>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate('RegularMenstruation')}>
                        <LinearGradient style={styles.cardHorizontal} colors={['#FD88AC', '#FD598B']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0.9 }}
                        >
                          <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Regular Mensturation</Text>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", marginTop: -3 }}>Period</Text>

                              </View>

                            </View>
                            <View style={{ height: 70, marginLeft: -50, paddingTop: 15 }}>
                              <Image source={IMAGE.ICON_MENSTRUAION}
                                style={{ height: 124, width: 185 }}>
                              </Image>
                            </View>

                          </View>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Investigation')}>
                        <LinearGradient style={styles.cardHorizontal} colors={['#b6fb96', '#71f3da']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0.9 }}

                        >
                          <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Investigation</Text>

                              </View>

                            </View>
                            <View style={{ height: 100, marginLeft: 20, paddingTop: 0 }}>
                              <Image source={IMAGE.ICON_INVESTIGATION}
                                style={{ height: 134, width: 169 }}
                              >
                              </Image>
                            </View>

                          </View>


                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Excercise')}>
                        <LinearGradient style={styles.cardHorizontal} colors={['#fde8b1', '#fbbe91']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0.9 }}

                        >


                          <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Excercise</Text>

                              </View>

                            </View>
                            <View style={{ height: 100, marginLeft: 20, paddingTop: 0 }}>
                              <Image source={IMAGE.ICON_INVESTIGATION}
                                style={{ height: 134, width: 169 }}
                              >
                              </Image>
                            </View>

                          </View>


                        </LinearGradient>
                      </TouchableOpacity>
          

                    </View>
                  </ScrollView>
        
                  <Text style={{  fontSize: 18, paddingLeft: 15, paddingTop: 5 }}>Before pregnancy</Text>

                  <View style={styles.container}>

                    <Card style={styles.card} >
                      {/* <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('PeriodCalandar', { */}
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('EDDCalculator', {
                        data: ''
                      })}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#ffe98c', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_EDD_DATE}
                              style={{ height: 47, width: 50 }}
                            >
                            </Image>
                          </View>

                          <Text style={{ marginTop: 0, color: 'black',fontWeight:'700' }}> Due Date Calculator</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>


                    <Card style={[styles.card]} >
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('ClinicManagement')}>
                      {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}> */}
                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                        <View style={[{ alignItems: "center" }, styles.touchableopacity]} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#fee8b6', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_CLINICK_MANAGEMENT}
                              style={{ height: 53, width: 50 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0, color: 'black',fontWeight:'700' }}>Clinic Management</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>
                    {/* <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('BMICalculator')}>
                        <View style={{ alignItems: "center",backgroundColor:'pink' }} >
                          <View style={{ height: 70, padding: 10 }}>
                            <Image source={IMAGE.ICON_MENU_METER}
                              style={{ height: 45, width: 45 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0 }}>Clinic Management</Text>

                        </View>
                      </TouchableOpacity>
                    </Card> */}



                  </View>
                  <View style={styles.container}>
                    <Card style={[styles.card]} >
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightGainDetailsAdd')}>
                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                        <View style={[{ alignItems: "center" }, styles.touchableopacity]} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#fbc1ff', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_WEIGHT_SCALE}
                              style={{ height: 42, width: 52 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0, color: 'black',fontWeight:'700' }}>Weight Gain chart</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>
                  

                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('BloodPresureDetailsAdd')}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#ffd6bc', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_BLOOD_PRESURE}
                              style={{ height: 55, width: 50 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0, color: 'black',fontWeight:'700' }}>Blood presure</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>

                  </View>
                  <View style={styles.container}>

                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('HospitalBag')}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#c2d2ff', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_HOSPITAL_BAG}
                              style={{ height: 50, width: 50 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0, color: 'black',fontWeight:'700' }}>Hospital Bag</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>

                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('KickCounter')}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#c7febe', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_BABY_FOOT}
                              style={{ height: 55, width: 53 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0,fontWeight:'700' }}>Kick Counter</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>

                  </View>

                  <Text style={{  fontSize: 15, paddingLeft: 15, paddingTop: 3 }}>After pregnancy</Text>
                  <View style={{ borderTopWidth: 6, borderTopColor: "#f78a2c", borderRadius: 3, marginHorizontal: 16, width: 45, marginTop: 8 }}></View>

                  <View style={styles.container}>

                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('BreastFeeding', {
                        data: ''
                      })}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#dffda7', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_FEEDING}
                              style={{ height: 55, width: 52 }}
                            >
                            </Image>
                          </View>

                          <Text style={{ marginTop: 0,fontWeight:'700' }}>Breast Feeding</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>


                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('VerticleYearChart2')}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#fee5ad', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_VACCINE}
                              style={{ height: 55, width: 52 }}
                            >
                              {/* ffe4e1 */}
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0,fontWeight:'700' }}>Vaccination</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>




                  </View>
                  <View style={[styles.container, { marginBottom: 20 }]}>

                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('BabyActivities', {
                        data: ''
                      })}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#e5fff9', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_BABY_ACTIVITY_MENU}
                              style={{ height: 65, width: 55 }}
                            >
                            </Image>
                          </View>

                          <Text style={{ marginTop: 0,fontWeight:'700' }}>Baby Activity</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>

                    {/* <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('TestChart', {
                        data: ''
                      })}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 70, padding: 10 }}>
                            <Image source={IMAGE.ICON_GROUTH_CHART_1}
                              style={{ height: 45, width: 45 }}
                            >
                            </Image>
                          </View>

                          <Text style={{ marginTop: 0 }}>Grouth tracker</Text>

                        </View>
                      </TouchableOpacity>
                    </Card> */}
                    <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('AddMesurement', {
                        data: ''
                      })}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 80, padding: 15, backgroundColor: '#f5ffe2', borderRadius: 50 }}>
                            <Image source={IMAGE.ICON_GROUTH_CHART_1}
                              style={{ height: 55, width: 55 }}
                            >
                            </Image>
                          </View>

                          <Text style={{ marginTop: 0,fontWeight:'700' }}>Grouth tracker</Text>

                        </View>
                      </TouchableOpacity>
                    </Card>
                    {/* <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('PrograssCircular', {
                        data: ''
                      })}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 70, padding: 10 }}>
                            <Image source={IMAGE.ICON_GROUTH_CHART_1}
                              style={{ height: 45, width: 45 }}
                            >
                            </Image>
                          </View>

                          <Text style={{ marginTop: 0 }}>Circular slider </Text>

                        </View>
                      </TouchableOpacity>
                    </Card> */}

                  </View>

                  <View style={styles.container}>




                    {/* <Card style={styles.card} >
                      <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('VerticleYearChart')}>
                        <View style={{ alignItems: "center" }} >
                          <View style={{ height: 70, padding: 10 }}>
                            <Image source={IMAGE.ICON_BABY_BOTTLE}
                              style={{ height: 45, width: 45 }}
                            >
                            </Image>
                          </View>
                          <Text style={{ marginTop: 0 }}>Diet chart</Text>

                        </View>
                      </TouchableOpacity>
                    </Card> */}
                  </View>

                </View>
                : this.state._member_id == 2 ?
                  <View>
                    <View style={styles.container}>
                      <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 7, marginTop: 10 }}>Hello {this.state._member_name}</Text>
                    </View>

                    {/* {
                      this.state.reacl_next_p_dateCount ?


                      <View style={styles.containerD}>

                      <Card style={[styles.periodcard]}>

                          <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5, paddingRight: 0 }}>


                              <View >
                                  <View style={{ marginLeft: 8, marginRight: 10, flexDirection: 'column' }}>
                                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                          <View style={{ marginTop: 0, marginBottom: -10 }}>
                                              <Text style={{ color: '#9e9e9e', fontSize: 12 }}>Last Period</Text>
                                              <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                                  <Icon
                                                      name='calendar'
                                                      type='font-awesome'

                                                      iconStyle={{ fontSize: 17, paddingRight: 0, paddingLeft: 0, marginTop: 5, color: 'green' }}
                                                  />

                                                  <Text style={{ color: 'green', paddingTop: 0, paddingLeft: 8, fontSize: 20, fontWeight: 'bold' }}>{this.state.pName}
                                                  </Text>
                                              </View>
                                          
                                          </View>


                                      </View>
                                      {
                                          // console.log(">>>>>>>>>>>>>>>>>>**************************** : "+parseInt(this.state._monthlyPeriod)/parseInt(this.state._reacl_next_p_date))
                                      }
                                      <Progress.Bar style={{ marginTop: 25, backgroundColor: '#e0e0e0', borderColor: 'white', }} color='#f78a2c' progress={1} height={5} borderRadius={5} width={250} />
                                      <View style={{ marginTop: 5 }}>
                                     
                                          <Text style={{ color: 'black', fontSize: 13, marginLeft: 0, marginTop: 4 }}>Next Period Date : <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red' }}>
                                            
                                          </Text>{this.state._next_period_date}</Text>
                                      </View>
                                  </View>
                              </View>
                              <View style={{ flexDirection: 'column', }}>
                                  <Text style={{ color: '#9e9e9e', fontSize: 12, marginLeft: 0, marginTop: 0 }}>Next Period</Text>
                                  <Text style={{ fontSize: 70, marginBottom: -10, marginTop: -18, color: '#424242' }}>
                                  {this.state.reacl_next_p_dateCount}
                                  </Text>
                                  <Text style={{ marginTop: -7, fontSize: 18 }}>Days left</Text>

                              </View>

                          </View>

                          <View style={styles.greenBar}>
                           
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <View>
                                      <Text style={{ color: 'white' }}>Ovulation Start Date <Text style={{ color: 'black', fontWeight: 'bold' }}> 
                                      </Text >{this.state._ovl_date}</Text>
                                  </View>
                                  <View>
                                      <View style={{ backgroundColor: 'white', padding: 4, borderRadius: 4, marginRight: 5 }}>
                                          <Icon
                                              name='calendar'
                                              type='font-awesome'
                                              color='red'
                                              iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: '#90a4ae' }}
                                          />
                                      </View>

                                  </View>
                              </View>

                          </View>


                      </Card>


                  </View>


                   
                         :
                        <View></View>
                    } */}


                    <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 10 }}>Menu</Text>
                    <View style={{ borderTopWidth: 6, borderTopColor: "#f78a2c", borderRadius: 3, marginHorizontal: 16, width: 45, marginTop: 8 }}></View>
                    <View style={styles.container}>

                      <Card style={[styles.card, { backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('PeriodCalandar', {
                          data: ''
                        })}>
                          <View style={{ alignItems: "center" }} >
                            <View style={{ height: 70, padding: 20, }}>
                              <Image source={IMAGE.ICON_PERIOD_CLANDAR}
                                style={{ height: 45, width: 45 }}
                              >
                              </Image>
                            </View>

                            <Text style={{ marginTop: 0,fontWeight:'700' }}>Period Tracker</Text>

                          </View>
                        </TouchableOpacity>
                      </Card>

                      <Card opacity={0.5} style={[styles.card, { backgroundColor: '#fff' }]}>
                        <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('BMICalculator', {
                          data: ''
                        })}>
                          <View style={{ alignItems: "center" }} >
                            <View style={{ height: 70, padding: 20, }}>
                              <Image source={IMAGE.ICON_SPEED_METER}
                                style={{ height: 45, width: 45 }}
                              >
                              </Image>
                            </View>

                            <Text style={{ marginTop: 0,fontWeight:'700' }}>BMI Calculator</Text>

                          </View>
                        </TouchableOpacity>
                      </Card>




                    </View>
                    <View style={styles.container}>

                      <Card style={[styles.card, { backgroundColor: '#fff' }]} >
                        <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('ClinicManagement')}>
                          <View style={{ alignItems: "center" }} >
                            <View style={{ height: 70, padding: 10 }}>
                              <Image source={IMAGE.ICON_BET_NOTES}
                                style={{ height: 50, width: 50 }}
                              >
                              </Image>
                            </View>
                            <Text style={{ marginTop: 0,fontWeight:'700' }}>Special Notes</Text>

                          </View>
                        </TouchableOpacity>
                      </Card>

                      <Card style={[styles.card, { backgroundColor: '#fff' }]} >
                        <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('HealthDietChart')}>
                          <View style={{ alignItems: "center" }} >
                            <View style={{ height: 70, padding: 10 }}>
                              <Image source={IMAGE.ICON_DIET}
                                style={{ height: 55, width: 55 }}
                              >
                              </Image>
                            </View>
                            <Text style={{ marginTop: 0,fontWeight:'700' }}>Diet plane</Text>

                          </View>
                        </TouchableOpacity>
                      </Card>

                    </View>
                  </View>
                  : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <WaveIndicator color='#fbb146' />
                  </View>
            }

          </ScrollView>

        </SafeAreaView>
      );
    }
  }
} const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },
  // card: {
  //     borderWidth: 1,
  //     padding: 25,
  //     marginTop: 25,
  //     shadowColor: "#000",
  //     shadowOffset: {
  //         width: 0,
  //         height: 0,
  //     },
  //     shadowOpacity:1,
  //     shadowRadius: 10,

  //     elevation: 11,
  // }
  card: {
    height: 115,
    // width: (Dimensions.get("window").width / 2) - 20,
    // width: "45%",
    backgroundColor: 'rgba(255, 255, 255,1)',
    borderRadius: 15,
    // padding: 10,
    elevation: 1,
    // shadowColor: '#fff',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',



    margin: 5
  }, cardHorizontal: {
    height: 150,
    backgroundColor: 'white',
    // width: 300,
    width: (Dimensions.get("window").width) - 55,
    // width: "90%",
    // backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    // alignItems: 'center',


    margin: 5
  }, scrollContainer: {
    flex: 1,
  }, container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  }, touchableopacity: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10
  },
  // periodcard: {
  //   height: 115,
  //   backgroundColor: 'rgba(255, 255, 255, 0.9)',
  //   borderRadius: 8,
  //   elevation: 1,
  //   // shadowColor: 'gray',
  //   shadowOffset: { width: 0, height: 0 },
  //   // shadowOpacity: 0.2,
  //   shadowRadius: 8,
  //   // alignItems: 'center',
  //   margin: 5,
  //   padding: 15

  // }, 
  brestposition3: {
    width: 260,
    height: 260,
    marginLeft: -80,
    marginTop: -30,
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(255, 224, 178, 0.8)',
    borderRadius: 130,
    // overflow: 'hidden',
    zIndex: -2,
    position: 'absolute'
  }, brestposition4: {
    width: 170,
    height: 170,
    // marginRight: 12,
    marginTop: 12,
    marginLeft: -42,
    backgroundColor: 'rgba(243, 242,242, 1)',
    borderRadius: 110,
    // overflow: 'hidden',
    zIndex: -1,

    position: 'absolute'
  }
  , brestposition5: {
    width: 260,
    height: 260,
    marginLeft: 280,
    marginTop: 390,
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(255, 224, 175, 0.5)',
    borderRadius: 130,
    // overflow: 'hidden',
    zIndex: -2,
    position: 'absolute'
  }, brestposition6: {
    width: 140,
    height: 140,
    // marginRight: 12,
    marginTop: 450,
    marginLeft: 338,
    backgroundColor: 'rgba(242, 242,242, 1)',
    borderRadius: 110,
    // overflow: 'hidden',
    zIndex: -1,

    position: 'absolute'
  }, periodcard: {
    height: 145,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    elevation: 3,

    // shadowColor: 'gray',
    shadowOffset: { width: 3, height: 5 },
    // shadowOpacity: 0.2,
    shadowRadius: 8,
    // alignItems: 'center',
    // margin: 5,
    // padding: 15

}, containerD: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center', alignItems: 'center'
}, greenBar: {
    backgroundColor: '#50cebb',
    height: 45,
    width: (Dimensions.get("window").width) - 30,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    top: 5,
    padding: 10
    // width: "90%",
}
});
