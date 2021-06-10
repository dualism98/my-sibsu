import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, FlatList, RefreshControl, AsyncStorage, StyleSheet, StatusBar} from 'react-native'
import { h, w } from '../modules/constants'
import EventModule from '../modules/EventModule'
import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'

const url = 'https://mysibsau.ru/v2/informing/all_events/?uuid='

export default function EventsScreen(props){
    const [eventList, setEventList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        AsyncStorage.getItem('UUID')
            .then(res => 
                {
                    fetch(url + res, {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            setEventList(json)
                            setLoaded(true)
                        })
                        .catch(err => console.log(err))
                })
    }, [loaded])

    
    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 120}}>
                <ActivityIndicator color={theme.blueColor} size='large' />
            </View> :
            <>
            {eventList.length === 0 ? 
                <Text style={{fontFamily: 'roboto', fontSize: 18, alignSelf: 'center', marginTop: 20, color: theme.labelColor}}>{locale['empty']}</Text> : null
            }
            <FlatList 
                data={eventList}
                renderItem={({ item }) => <EventModule data={item} />}
                keyExtractor={item => item.text}
                contentContainerStyle={{paddingBottom: 120}}
                initialNumToRender={4}/>
            </>}
        </View>
    )
}
