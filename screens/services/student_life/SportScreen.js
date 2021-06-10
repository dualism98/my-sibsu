import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../../../modules/ActiveElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useLocale} from '../../../locale/LocaleManager'
import { useTheme } from '../../../themes/ThemeManager'


export default function SportScreen(props){
    const [unions, setUnions] = useState([])
    const [loaded, setLoaded] = useState(false)
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    useEffect(() => {
        fetch('https://mysibsau.ru/v2/campus/sport_clubs/?language=' + String(localeMode), {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setUnions(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [loaded])

    useEffect(() => {
        const backAction = () => {
          props.navigation.navigate('Service')
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {loaded ? 
                    unions.map( item => {
                        return(<ActiveElement onPress={() => props.navigation.navigate('Ermak', {data: item})} title={item.name} source={item.logo} key={item[0]} />)
                }) : <View style={{height: h, justifyContent: 'center', paddingBottom: 120}}><ActivityIndicator size='large' color='#0060B3' /></View>}   
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingBottom: 150, 
        width: w,
        flex: 1,
    },

    text: {
        fontSize: 25,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },
})
