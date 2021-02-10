// import React, { Component } from 'react';
// import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ListView, Image } from 'react-native';
// import { IMAGE } from '../constants/image';
// import AsyncStorage from '@react-native-community/async-storage';
// import i18n from 'i18n-js';
// // const lan=AsyncStorage.getItem('lang');

// export default class extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: [
//         {
//           title: '5 % ',

//           body:
//             i18n.t('food.5'),
//           src: IMAGE.ICON_DIET_5,


//         },
//         {
//           title: '20 %',

//           body:
//             i18n.t('food.20'),
//           src: IMAGE.ICON_DIET_20,

//         },
//         {
//           title: '35 %',

//           body:
//             i18n.t('food.35'),
//           src: IMAGE.ICON_DIET_35,

//         },
//         {
//           title: '40 %',

//           body:
//             i18n.t('food.40'),
//           src: IMAGE.ICON_DIET_40,

//         }

//       ]


//     }

//   }
//   componentDidMount() {
//     console.log("sdasdadasd");
//     const lan = AsyncStorage.getItem('lang');
//   }

// };