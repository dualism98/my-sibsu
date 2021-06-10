import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, ToastAndroid, AsyncStorage, ActivityIndicator } from 'react-native'
import { Octicons } from '@expo/vector-icons'; 
import { h, w } from '../../modules/constants'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PersonScreen(props){
    const {localeMode, locale, toggleLang} = useLocale()
    const {mode, theme, toggle} = useTheme()

    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [fetching, setFetching] = React.useState(0)

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <View style={[styles.box, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <Image source={require('../../assets/header_logo.png')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10}} />
                <Text style={[styles.maintext, {color: theme.headerTitle}]}>{locale['personal_account']}</Text>
                <TouchableOpacity onPress={() => {
                    const modes = {"Default": 0, "Light": 1, "Dark": 2, null: 0}
                    AsyncStorage.getItem('Theme')
                        .then(res => props.navigation.navigate('Settings', {theme: modes[res], user: {}}))}}>
                    <Octicons name="gear" size={24} color={theme.headerTitle}/>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={{ width: w, marginTop: 100}}>
                    <View style={{ width: w * 0.8, borderRadius: 15, elevation: 6, backgroundColor: theme.blockColor, alignSelf: 'center', marginTop: 40}}>
                        <View style={{flexDirection: 'row', }}>
                            <Ionicons name='md-person' size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10}}/>
                            <TextInput value={login} onChangeText={value => setLogin(value)} placeholderTextColor={'gray'} placeholder={locale['login']} numberOfLines={1} style={{width: w * 0.7, fontFamily: 'roboto', color: theme.labelColor}}/>
                        </View>
                        <View  style={{alignSelf: 'center', width: w * 0.7, height: 1, backgroundColor: 'gray', opacity: 0.5}}/>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name="key" size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10}} />
                            <TextInput value={password} onChangeText={value => setPassword(value)} placeholderTextColor={'gray'} placeholder={locale['password']} numberOfLines={1} secureTextEntry={true} style={{width: w * 0.7, fontFamily: 'roboto', color: theme.labelColor}}/>
                        </View>
                        
                    </View>
                    <TouchableOpacity onPress={() => {
                        setFetching(1)
                        fetch('https://mysibsau.ru/v2/user/auth/', {method: 'POST',
                            body: JSON.stringify({
                                username: login,
                                password: password
                            })})
                            .then(response => response.json())
                            .then(json => {
                                setFetching(0)
                                if(!json.error){
                                    setLogin('')
                                    setPassword('')
                                    AsyncStorage.setItem('User', JSON.stringify(json))
                                    AsyncStorage.setItem('AuthData', JSON.stringify({
                                        username: login,
                                        password: password
                                    }))
                                    console.log(json)
                                    props.navigation.navigate('Profile')
                                }
                                else{
                                    ToastAndroid.show(
                                        locale['wrong_login'],
                                        ToastAndroid.LONG
                                      );
                                }
                                
                            })
                    }}>
                        <View style={styles.okay_button}>
                            <Text style={styles.okay_button_text}>{locale['sign_in']}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{width: w * 0.8, fontFamily: 'roboto', marginTop: 20, alignSelf: 'center', textAlign: 'center', color: 'gray'}}>{locale['sign_in_tip']}</Text>
                </View>
                <ActivityIndicator style={{ opacity: fetching }} color={'#006AB3'} size={'large'}/>
            </ScrollView>
            
        </View>
    )
}

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: h,
        flex: 1,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    },

    shadow: elevationShadowStyle(5),
    box: {
        backgroundColor: 'white',
        height: w/8,
        width: w,
        paddingLeft: 10,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 4,
    },

    maintext: {
        height: w / 8,
        width: w * 0.75,
        fontSize: 25,
        color: 'grey',
        textAlignVertical: 'center',
        fontFamily: 'roboto',
        textAlign: 'left',
    },

    okay_button: { 
        height: 40, 
        width: w * 0.66, 
        borderRadius: 25, 
        backgroundColor: '#006AB3', 
        elevation: 5, 
        alignSelf: 'center',
        marginTop: 20,
    },

    okay_button_text: {
        color: 'white',
        fontFamily: 'roboto',
        alignSelf: 'center',
        height: 40,
        textAlignVertical: 'center',
        fontSize: 20,
    }
})
