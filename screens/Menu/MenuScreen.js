import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage, FlatList} from 'react-native'
import { h, w } from '../../modules/constants' 
import MenuElement from '../../modules/MenuElement'
import Header from '../../modules/Header'
import moment from 'moment'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'

const url = 'https://mysibsau.ru/v2/menu/all/'

function food(count, theme, locale){
    if (count == 0){
        return(<Text style={{ color: theme.labelColor,fontSize: 20, fontFamily: 'roboto', marginTop: 20}}>{locale}</Text>)
    }
}

export default function MenuScreen(props){
    const [dayList, setDayList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        
        const unsubscribe = props.navigation.addListener(
            'state',
            payload => {
                console.log('Получаю меню')
                AsyncStorage.getItem('Diner')
                .then(res => {
                    if (res !== null){
                        fetch(url, {method: 'GET'})
                            .then(response => response.json())
                            .then(json => {
                                json.map(item => {
                                    if(item.name === res){
                                        console.log(item)
                                        setDayList(item)
                                    }
                                })
                                setLoaded(true)
                            })
                    }
                })
            }
        )
        
    }, [])

    return( 
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={dayList.name} onPress={() => {
                AsyncStorage.removeItem('Diner')
                props.navigation.navigate('DinersScreen')}}/>
                
            {!loaded ?
            <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size='large' color={theme.blueColor} />
            </View> :
            <View>
                {
                dayList.length === 0 ?
                <Text style={{fontFamily: 'roboto', fontSize: 18, alignSelf: 'center', marginTop: 20, color: theme.labelColor}}>{locale['no_menu']}</Text> : 
                <FlatList 
                    data={dayList.menu}
                    renderItem={({ item }) => 
                        {console.log(item)
                        return(
                            <View>
                                <Text style={{fontFamily: 'roboto', marginLeft: w * 0.05, fontSize: 18, color: '#006AB3', marginTop: 20}}>{item.type}</Text>
                                <MenuElement data={item.diners} />
                            </View>)
                        }
                    }
                    keyExtractor={item => item.diners}
                    contentContainerStyle={{paddingBottom: 120}}/>}
            </View>}
        </View>       
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: h,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },

})