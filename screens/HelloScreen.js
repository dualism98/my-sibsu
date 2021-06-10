import React, { useRef, useState, useCallback } from 'react'
import {View, StyleSheet, Text, Image, TouchableWithoutFeedback} from 'react-native'
import {useLocale} from '../locale/LocaleManager'
import {useTheme} from '../themes/ThemeManager'
import { h, w } from '../modules/constants'
import Swiper from 'react-native-swiper'
import HelloModule from '../modules/HelloModule'

import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'


export default function HelloScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const swiper_ref = useRef()

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Swiper ref={swiper_ref} loop={false} showsPagination={false}>
                <View style={{flex: 1, backgroundColor: theme.primaryBackground, justifyContent: 'center', paddingBottom: 60}}>
                    <View>
                        <Text style={{width: w, padding: 20, fontFamily: 'roboto', fontSize: 30, color: theme.labelColor, fontWeight: 'bold'}}>{locale['welcome_to_application']}</Text>
                        <View style={{flexDirection: 'row', paddingLeft: 25}}>
                            <Image source={require('../assets/header_logo.png')} style={{height: 100, width: 100}} />
                            <Text style={{ height: 100, textAlignVertical: 'center', fontFamily: 'roboto', fontWeight: 'bold', fontSize: 30, color: theme.labelColor}}>Мой СибГУ</Text>
                        </View>
                        <Text style={{fontFamily: 'roboto', fontSize: 20, color: theme.labelColor, fontWeight: 'bold', padding: 20}}>{locale['lets_tell']}</Text>
                    </View>
                </View>
                <HelloModule what={locale['hello_feed_what']} how={locale['hello_feed_how']} color={'#006AB3'} name={locale['feed']} image={<MaterialCommunityIcons name="timetable" size={86} style={{position: 'absolute', right: 0, bottom: 0, opacity: 0.5}} color={'white'}  />}/>
                <HelloModule what={locale['hello_canteens_what']} how={locale['hello_canteens_how']} color={'#7DC71C'} name={locale['menu']} image={<MaterialIcons name="restaurant-menu" size={86} style={{position: 'absolute', right: 0, bottom: 0, opacity: 0.5}} color={'white'} />}/>
                <HelloModule what={locale['hello_timetable_what']} how={locale['hello_timetable_how']} color={'#ef8531'} name={locale['timetable']} image={<MaterialCommunityIcons name="calendar-text" size={86} style={{position: 'absolute', right: 0, bottom: 0, opacity: 0.5}} color={'white'} />}/>
                <HelloModule what={locale['hello_services_what']} how={locale['hello_services_how']} color={'#77787B'} name={locale['services']} image={<AntDesign name="appstore-o" size={86} style={{position: 'absolute', right: 0, bottom: 0, opacity: 0.5}} color={'white'} />}/>
                <HelloModule what={locale['hello_profile_what']} how={locale['hello_profile_how']} color={'red'} name={locale['profile']} image={<Ionicons name='md-person' size={86} style={{position: 'absolute', right: 0, bottom: 0, opacity: 0.5}} color={'white'} />}/>
            </Swiper>
            <TouchableWithoutFeedback onPress={() => {
                if(swiper_ref.current.state.index === 5)
                    props.navigation.navigate('Auth')
                swiper_ref.current.scrollBy(1, true)}}>
                <View style={styles.okay_button}>
                    <Text style={styles.okay_button_text}>{locale['okay']}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    okay_button: { 
        height: 50, 
        width: w * 0.66, 
        borderRadius: 25, 
        backgroundColor: '#006AB3', 
        elevation: 5, 
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 40
    },

    okay_button_text: {
        color: 'white',
        fontFamily: 'roboto',
        alignSelf: 'center',
        fontSize: 20
    }
})