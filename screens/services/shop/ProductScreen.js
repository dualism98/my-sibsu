import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'

export default function ProductScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    let item = props.route.params.data
    console.log(item)
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={locale['online_catalog']} onPress={() => props.navigation.goBack()}/>
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                <Image source={{uri: `https://mysibsau.ru/${item.logo}`}} style={{width: w, height: w, resizeMode: 'contain',}}/>
                <Text style={{fontFamily: 'roboto', fontWeight: 'bold', fontSize: 20, color: '#006AB3', marginLeft: w * 0.05}}>{locale['name']}</Text>
                <View style={{width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 6, alignSelf: 'center', padding: 10, marginTop: 10}}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>

                <Text style={{fontFamily: 'roboto', fontWeight: 'bold', fontSize: 20, color: '#006AB3', marginLeft: w * 0.05, marginTop: 20}}>{locale['place']}</Text>
                <View style={{width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 6, alignSelf: 'center', padding: 10, marginTop: 10}}>
                    <Text style={[styles.name, {alignSelf: 'flex-start'}]}>{item.theatre}</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('Concerts', {id: item.id})} style={{width: w * 0.9, padding: 20, backgroundColor: '#006AB3', borderRadius: 15, alignSelf: 'center', marginTop: 30, elevation: 5}}>
                    <Text style={{ fontFamily: 'roboto', fontWeight: 'bold', fontSize: 18, alignSelf: 'center', color: 'white'}}>{locale['book_a_ticket']}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: h,
        flex: 1,
        width: w,
    },

    name: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
        alignSelf: 'center'
    },

    description: {
        fontSize: 15,
        fontFamily: 'roboto',
        color: '#5575A7',
        paddingLeft: 20,
        paddingRight: 20,
    }
})
