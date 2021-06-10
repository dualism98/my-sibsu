import React, { PureComponent, useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import ListElement from '../../../modules/ListElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'


export default function InstitutesScreen(props){

    const [institutes, setInstitutes] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        fetch('https://mysibsau.ru/v2/campus/institutes/?language=' + String(localeMode), {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setInstitutes(json)
                setLoaded(true)
            })
    }, [loaded])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground, flexDirection: 'column' }} >
            <Header title={locale['institutes']} onPress={() => props.navigation.goBack()}/>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.back} source={require('../../../assets/rocket.png')} tintColor='gray'/>
                <ScrollView style={{}}>
                    {loaded ? 
                    <View style={styles.container}>
                        {institutes.map( institute => {
                            return( <ListElement onPress={() => props.navigation.navigate('IITK', {data: institute})} title={institute.short_name} prop={institute.name} key={institute.short_name}/>)
                        })}
                    </View> :
                    <View style={{ height: h, paddingBottom: 120, justifyContent: 'center'}}>
                        <ActivityIndicator size='large' color='#0060B3' />
                    </View>}
                </ScrollView> 
            </View>
        </View>         
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        flex: 1,
        marginBottom: 150,
        minHeight: h,
        justifyContent: 'center'
    },

    back: {
        height: h - 2*w/5,
        width: w/5,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 40,
        zIndex: -1,
    },
})
