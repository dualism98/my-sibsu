import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, AsyncStorage, TouchableOpacity} from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'
// import {API_URL} from '@env'


export default function TopicsScreen(props){
    const [topics, setTopics] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [UUID, setUUID] = useState('')
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            let uuid = ''
            AsyncStorage.getItem('UUID')
            .then(res => {
                setUUID(res)
                uuid = res})
            .then(() => {
                fetch('https://mysibsau.ru/v2/surveys/all/?uuid=' + uuid, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(json => {
                        setTopics(json)
                        setLoaded(true)
                    })
                    .catch(err => console.log(err))
            })
        });
    
        return unsubscribe;
      }, [props.navigation]);

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={locale['feedback']} onPress={() => props.navigation.goBack()}/>
            <ScrollView>
                {!loaded ? 
                <View style={{ height: h, width: w, justifyContent: 'center', paddingBottom: 120,}}>
                    <ActivityIndicator size="large" color='#006AB3' />
                </View> : 
                <View style={{minHeight: h - 120, width: w, alignItems: 'center', paddingBottom: 120}}>
                    {Array.isArray(topics) ? 
                    topics.map(item => {
                        return(
                            <TouchableOpacity style={[styles.list, styles.shadow, {backgroundColor: theme.blockColor}]} onPress={() => props.navigation.navigate('Poll',{
                                id: item.id, 
                                uuid: UUID,
                            })}>
                                <Text style={[styles.listText, {color: theme.labelColor}]}>{item.name.length > 30 ? item.name.slice(0,30) + '...' : item.name}</Text>
                            </TouchableOpacity>
                        )
                    }) : null}
                </View>}
                
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
        minHeight: h,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    },

    product_view: {
        paddingBottom: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    shadow: elevationShadowStyle(6),
    list: {
        width: w * 0.9,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    listText: {
        fontFamily: 'roboto',
        fontSize: 15
    }
})
