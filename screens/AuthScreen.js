import React from 'react'
import { View , Text, Image, TextInput, ScrollView, StyleSheet, ToastAndroid, AsyncStorage, TouchableOpacity, ActivityIndicator} from 'react-native'
import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'
import { h, w } from '../modules/constants'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function AuthScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [fetching, setFetching] = React.useState(0)

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground,}}>
            <ScrollView contentContainerStyle={{flex: 1, marginTop: 100}}>
                <View>
                    <Image source={require('../assets/header_logo.png')} style={{height: 100, alignSelf: 'center', width: 100,}} />
                    <View style={{ width: w * 0.8, borderRadius: 15, elevation: 6, backgroundColor: theme.blockColor, alignSelf: 'center', marginTop: 40}}>
                        <View style={{flexDirection: 'row', }}>
                            <Ionicons name='md-person' size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10}}/>
                            <TextInput value={login} onChangeText={value => setLogin(value)} placeholderTextColor={'gray'} placeholder={locale['login']} numberOfLines={1} style={{ width: w * 0.7, fontFamily: 'roboto', color: theme.labelColor}}/>
                        </View>
                        <View  style={{alignSelf: 'center', width: w * 0.7, height: 1, backgroundColor: 'gray', opacity: 0.5}}/>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name="key" size={26} color={'gray'} style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', marginLeft: 10, marginRight: 10}} />
                            <TextInput value={password} onChangeText={value => setPassword(value)} placeholderTextColor={'gray'} placeholder={locale['password']} numberOfLines={1} secureTextEntry={true} style={{ width: w * 0.7, fontFamily: 'roboto', color: theme.labelColor}}/>
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
                                if (!json.error){
                                    console.log(json)
                                    AsyncStorage.setItem('User', JSON.stringify(json))
                                    AsyncStorage.setItem('AuthData', JSON.stringify({
                                        username: login,
                                        password: password
                                    }))
                                    props.navigation.navigate('Bottom')
                                }
                                else{
                                    console.log(json)
                                    ToastAndroid.show(
                                        locale['wrong_login'],
                                        ToastAndroid.LONG,
                                      );
                                }
                            })
                    }}>
                        <View style={styles.okay_button}>
                            <Text style={styles.okay_button_text}>{locale['sign_in']}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Bottom')}>
                        <Text style={{ alignSelf: 'center', fontFamily: 'roboto', marginTop: 20, color: 'gray'}}>{locale['sign_in_as_guest']}</Text>
                    </TouchableOpacity>
                </View>
                <ActivityIndicator style={{ opacity: fetching }} color={'#006AB3'} size={'large'}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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