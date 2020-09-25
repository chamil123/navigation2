import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ListView } from 'react-native';
export default {
  data: [
    {
      title: 'FIRST YEAR \n OF LIFE',
      subtitle1: '0-4 weeks\n',
      subtitle2: '2 months\n',
      subtitle3: '4 months\n',
      subtitle4: '6 months\n',
      subtitle5: '9 months\n',
      body1:
        'BCG(Preferably within 24 hours of birth before leaving hospital)',
      subbody1: 'OPV & PENTAVALENT (DTP- Hep B-Hib) 1st dose\nfIPV (fractional IPV)1st dose',
      subbody2: 'OPV & PENTAVALENT (DTP- Hep B-Hib) 2nd dose\nfIPV (fractional IPV)2nd dose',
      subbody3: 'OPV & PENTAVALENT (DTP- HepB-Hib) 3rd dose',
      subbody4: 'MMR 1st dose',
      
    },
    {
      title: 'SECOND YEAR\nOF LIFE',

      body:
        '12 months- live JE\n18 months- OPV and DTP 4th dose',
    },
    {
      title: 'PRE SCHOOL\n AGE',

      body:
        '3 years- MMR 2 nd dose',
    },
    {
      title: 'SCHOOL GOING\n AGE',

      body:
        '# 5 years- OPV and DT 5th dose\n# 10 years (grade 6) – HPV 1st dose \n    after 6 months HPV 2nd dose\n# 11 years(grade 7)- aTd (adult tetanus diphtheria) 6th dose',
    },
    {
      title: 'FEMALES IN\n THE CHILD\n BEARING AGE',
      body:
        'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.',
    },
    {
      title: 'About',
      body:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
    },
  ],
};