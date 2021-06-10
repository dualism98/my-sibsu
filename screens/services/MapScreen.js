import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, ScrollView, Image } from 'react-native'
import Header from '../../modules/Header'
import { h, w } from '../../modules/constants'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'

export default function MapScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const [buildings, setBuildings] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch('https://mysibsau.ru/v2/campus/buildings/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setBuildings(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [buildings])

    return(
        <View style={{backgroundColor:'white', flex: 1, paddingBottom: 0}}>         
            <Header title={locale['buildings']} onPress={() => props.navigation.goBack()}/>  
            <ScrollView>
                {loaded ?
                <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>               
                    <View style={styles.right}>
                        <Text style={[styles.head]}>{locale['educational_facilities_r']}</Text>
                        {buildings.map( map => {
                            if (map.coast === 1){
                            return(<TouchableOpacity style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor}]} onPress={() => Linking.openURL(map.link)} key={map.name}>
                                        <View style={{ width: w * 0.1}}>
                                            <Text style={[styles.number, {color: theme.labelColor}]}>{map.name}</Text>
                                        </View>
                                        <View style={{borderLeftWidth: 2, borderLeftColor: '#006AB3',}}>
                                            <Text style={[styles.text, {color: theme.labelColor}]}>{map.type}{'\n'}{map.address}</Text>
                                        </View>
                                    </TouchableOpacity>)
                            }})}
                    </View>
                    <View style={styles.left}>
                        <Text style={styles.head}>{locale['educational_facilities_l']}</Text>
                        {buildings.map( map => {
                            if (map.coast === 0){
                            return(<TouchableOpacity style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor}]} onPress={() => Linking.openURL(map.link)} key={map.name}>
                                        <View style={{ width: w * 0.1}}>
                                            <Text style={[styles.number, {color: theme.labelColor}]}>{map.name}</Text>
                                        </View>
                                        <Text style={[styles.text_left, {color: theme.labelColor}]}>{map.type}{'\n'}{map.address}</Text>
                                    </TouchableOpacity>)
                            }})}    
                    </View>
                </View> : 
                <View style={[styles.container, {justifyContent: 'center', height: h, paddingBottom: 120, backgroundColor: theme.primaryBackground}]}>
                    <ActivityIndicator size='large' color='#0060B3' />
                </View>}
            </ScrollView>
    </View>)
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: w,
        paddingTop: 10,
        backgroundColor: 'white'
    },

    right: {
        width: w * 0.94,
        marginBottom: 10,
        flex: 1
    },

    left: {
        width: w * 0.94,
        paddingBottom: 120,
        marginTop: 10,
    },

    head: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: 'grey',
        width: w * 0.94,
        marginBottom: 8,
        marginLeft: 7
    },

    text: {
        height: '100%',
        fontSize: 13,
        fontFamily: 'roboto',
        alignSelf: 'flex-start',
        color: 'black',
        paddingBottom: 0,
        paddingLeft: 11,
    },

    number: {
        height: '100%',
        fontSize: 15,
        fontFamily: 'roboto',
        color: 'black',
        textAlignVertical: 'center',
        textAlign: 'center',
    },  

    text_left: {
        height: '100%',
        borderLeftWidth: 2,
        borderLeftColor: 'rgb(125, 199, 28)',
        fontSize: 13,
        fontFamily: 'roboto',
        alignSelf: 'flex-start',
        color: 'black',
        paddingBottom: 0,
        paddingLeft: 11,
        textAlignVertical: 'center'
    },

    changeText: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
    },

    shadow2: elevationShadowStyle(5),
    box: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        marginTop: 10,
        paddingRight: 19,
        alignSelf: 'center'
    },
})