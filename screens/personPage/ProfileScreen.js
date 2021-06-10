import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, AsyncStorage, ActivityIndicator } from 'react-native'
import { Octicons } from '@expo/vector-icons'; 
import { h, w } from '../../modules/constants'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'
import { MaterialIcons } from '@expo/vector-icons'; 


export default function PersonScreen(props){
    const {localeMode, locale, toggleLang} = useLocale()
    const {mode, theme, toggle} = useTheme()

    const [user, setUser] = React.useState({})

    const [authData, setAuthData] = React.useState({})

    const [loaded, setLoaded] = React.useState(false)
    const [fetching, setFetching] = React.useState(0)

    React.useEffect(() => {
        AsyncStorage.getItem('User')
        .then(res => {
            if(res !== null){
                setUser(JSON.parse(res))
                setLoaded(true)
            }
        })

        AsyncStorage.getItem('AuthData')
            .then(res => {
                if(res !== null){
                    setAuthData(JSON.parse(res))
                }
            })
      }, []);

    React.useEffect(() =>
          props.navigation.addListener('beforeRemove', (e) => {
            if(e.data.action.type === 'GO_BACK')
                e.preventDefault();
          }))


    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <View style={[styles.box, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <Image source={require('../../assets/header_logo.png')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10}} />
                <Text style={[styles.maintext, {color: theme.headerTitle}]}>{locale['personal_account']}</Text>
                <TouchableOpacity onPress={() => {
                    const modes = {"Default": 0, "Light": 1, "Dark": 2, null: 0}
                    AsyncStorage.getItem('Theme')
                        .then(res => props.navigation.navigate('Settings', {theme: modes[res], user: user}))}}>
                    <Octicons name="gear" size={24} color={theme.headerTitle}/>
                </TouchableOpacity>
            </View>
            <View style={{width: w, flex: 1, paddingLeft: w * 0.05, paddingRight: w * 0.05, paddingTop: w * 0.05,  paddingBottom: 120}}>
                <Text style={{ fontFamily: 'roboto', fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5}}>{locale['full_name']}</Text>
                <View style={{ padding: 10, width: w * 0.9, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5}}>
                    <Text style={{ textAlign: 'center', fontFamily: 'roboto', fontSize: 19, color: theme.labelColor}}>{user.FIO}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={{ fontFamily: 'roboto', fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15}}>{locale['group']}</Text>
                        <View style={{ paddingTop: 10, paddingBottom: 10, width: w * 0.425, marginRight: w * 0.05, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5}}>
                            <Text style={{width: w * 0.425, textAlign: 'center', fontFamily: 'roboto', fontSize: 19, color: theme.labelColor}}>{user.group}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'roboto', fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15}}>{locale['average']}</Text>
                        <View style={{ paddingTop: 10, paddingBottom: 10, width: w * 0.425, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5}}>
                            <Text style={{width: w * 0.425, textAlign: 'center',fontFamily: 'roboto', fontSize: 19, color: theme.labelColor}}>{user.averga}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ fontFamily: 'roboto', fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15}}>{locale['login']}</Text>
                <View style={{ padding: 10, width: w * 0.9, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5}}>
                    <Text style={{fontFamily: 'roboto', textAlign: 'center', fontSize: 19, color: theme.labelColor}}>{user.zachotka}</Text>
                </View>

                <Text style={{ fontFamily: 'roboto', fontSize: 19, fontWeight: 'bold', color: theme.blueColor, marginBottom: 5, marginTop: 15}}>{locale['perfomance']}</Text>
                <View style={{width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 5}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Attestation', {data: authData})}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text style={{fontFamily: 'roboto', color: theme.labelColor, fontSize: 19}}>{locale['attestation']}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#006AB3" />
                        </View>
                    </TouchableOpacity>
                    <View style={{width: w * 0.8, height: 1, backgroundColor: 'gray', alignSelf: 'center', opacity: 0.5}}/>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Marks', {data: authData})}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <Text style={{fontFamily: 'roboto', color: theme.labelColor, fontSize: 19}}>{locale['marks']}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#006AB3" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View> 
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
