import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from '../../translations/en.json';
import fr from '../../translations/zh.json';



export  class LanguagesSelect extends Component {
    state = {
        currentLanguage: RNLanguages.language
    };

    _changeLanguage = (language) => {
        this.setState({ currentLanguage: language });
    };

    render() {
        i18n.locale = this.state.currentLanguage;
        i18n.fallbacks = true;
        i18n.translations = { en, fr};

        return (
            <View style={styles.container}>
                <Text>{i18n.t('title')}</Text>
                <Text>{i18n.t('current', { language: i18n.currentLocale() })}</Text>
                <Button title={i18n.t('title')} onPress={() => this._changeLanguage('en')} />
                <Button title={i18n.t('title')} onPress={() => this._changeLanguage('fr')} />
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});