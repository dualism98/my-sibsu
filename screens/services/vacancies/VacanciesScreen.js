import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'


export default function VacanciesScreen(props){

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const [vacanciesList, setVacanciesList] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log('Получаем список вакансий')
        fetch('https://mysibsau.ru/v2/work/vacancies/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setVacanciesList(json)
                setLoaded(true)
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['vacancies']} onPress={() => props.navigation.goBack()} />
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 120}}>
                <ActivityIndicator color='#006AB3' size='large' />
            </View> : 
            <FlatList
                data={vacanciesList}
                renderItem={item => 
                    <TouchableOpacity style={[styles.list,{backgroundColor: theme.blockColor}]} onPress={() => props.navigation.navigate('Vacancy',{data: item})}>
                        <Text style={[styles.listText, {color: theme.labelColor}]}>{item.item.name}</Text>
                    </TouchableOpacity>}
                keyExtractor={item => item.id}
                contentContainerStyle={{alignItems: 'center'}} 
                style={{width: w}}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: w * 0.9,
        borderRadius: 15,
        minHeight: 50,
        padding: 10,
        justifyContent: 'center',
        marginTop: 20,
        elevation: 6,
    },

    listText: {
        fontFamily: 'roboto',
        fontSize: 15
    }
})