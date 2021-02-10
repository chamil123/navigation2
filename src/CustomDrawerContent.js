import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { IMAGE } from './constants/image';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import { Avatar, Badge } from 'react-native-elements';
export class CustomDrawerContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      abc: '',
      lan: '',
    }
  }
  doLogout() {
    AsyncStorage.removeItem("memberNames").then(
      res => {
        this.props.navigation.navigate('Login');
        AsyncStorage.removeItem("memberId");
      }
    );
  }
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('memberNames');
    this.setState({
      userName: myArray,
      lan: await AsyncStorage.getItem('lang'),
    });

    const data = new FormData();
    data.append("get_about", "true");

    return fetch('https://youandmenest.com/tr_reactnative/get_user_by_id.php?mname=' + myArray, {
      method: 'post',
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        id = "";
        abc = "";

        for (var i = 0; i < responseJson.length; i++) {

          abc = responseJson[i].member_image;

        }
        // s
        this.setState({
          isLoading: false,
        
          abc: abc,

        })

      }).catch((error) => {
        console.error(error)
      })
  }
  render() {
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', opacity: 0.9 }}>

        <ScrollView>

          <ImageBackground
            source={require('./images/undraw_pilates_gpdb.png')}
            style={{ width: 300, paddingLeft: 30, paddingBottom: 10, paddingTop: 80, backgroundColor: '#fbb146' }}
          >
             
             <Avatar
                rounded
                showEditButton
                size={90}
                source={ { uri: "https://youandmenest.com/tr_reactnative/" + this.state.abc } 
                }
              
                onEditPress={() => console.log('edit button pressed')}
                onLongPress={() => console.log('component long pressed')}
                onPress={() => this.props.navigation.navigate('ProfileImageView')}
                editButton={{
                  name: 'edit'
                }}
            
              >
              
              </Avatar>

            {/* <Image onPress={() => this.props.navigation.navigate('ProfileImageView')} source={{ uri: "https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/" + this.state.abc }}
              style={{ height: 90, width: 90, borderRadius: 60, }}
            /> */}
            <Text style={{ color: "white", fontSize: 15, marginVertical: 8 }}>{this.state.userName}</Text>
          </ImageBackground>

          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Icon

              name='home'
              type='font-awesome'
              color='#f78a2c'
              iconStyle={{ fontSize: 25, fontWeight: 'normal', padding: 25 }}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>{i18n.t('drawer.home')} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('member')}>
            <Icon
              name='user'
              type='font-awesome'
              color='#f78a2c'
              iconStyle={{ fontSize: 25, fontWeight: 'normal', padding: 27 }}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>{i18n.t('drawer.profile')} </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('member')}>
            <Icon
              name='cog'
              type='font-awesome'
              color='#f78a2c'
              iconStyle={{ fontSize: 25, fontWeight: 'normal', padding: 25 }}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>Settings </Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.doLogout()}>
            <Icon
              name='sign-out'
              type='font-awesome'
              color='#f78a2c'
              iconStyle={{ fontSize: 25, fontWeight: 'normal', padding: 25 }}
            />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>{i18n.t('drawer.logut')} </Text>
          </TouchableOpacity>
        </ScrollView>
        {/* <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={IMAGE.ICON_Profile}
            style={{ height: 120, width: 120, borderRadius: 60 }}
          >

          </Image>

        </View> */}
        {/* <ScrollView style={{ marginLeft: 5 }}>

          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Notifications')}
          >
            <Text>Notifications</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView style={{ marginLeft: 5 }}>
          <TouchableOpacity style={{ marginTop: 20, marginLeft: 5 }}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Log out </Text>
          </TouchableOpacity>

        </ScrollView> */}

      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderWidth: 8,
    borderRadius: 40,
    borderColor: '#fff'
  }, FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    // backgroundColor: '#f78a2c',
    //borderWidth: .5,
    // borderColor: '#fff',
    height: 50,

    //borderRadius: 5,
    // margin: 5,

  }, ImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',

  }, TextStyle: {
    // color:'#fff'
  }
});