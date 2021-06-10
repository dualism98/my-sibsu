import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, AsyncStorage, ToastAndroid} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'
import { h, w } from '../../../modules/constants'
import Header from '../../../modules/Header'


export default function LibrarySearch(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const [recent, setRecent] = React.useState([])
    const [search, setSearch] = React.useState('')

    function getBooks(){
        if(search !== '')
            AsyncStorage.setItem('LibraryRequest', 'https://mysibsau.ru/v2/library/all_books/?q=' + encodeURI(search))
                .then(() => {
                    props.navigation.navigate('LibraryResult', {screen: 'Digital'})  
                })
        else
            ToastAndroid.show(locale['input_is_empty'], ToastAndroid.SHORT)
    }

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['library']} onPress={() => props.navigation.goBack()} />
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
            <View style={{flexDirection: 'row', marginTop: 10, alignSelf: 'center'}}>
                <TextInput style={[styles.input, {backgroundColor: theme.blockColor, color: theme.labelColor}]} placeholderTextColor={'lightgray'} value={search} onChangeText={value => setSearch(value)} placeholder={locale['input_keywords']} />
                <TouchableOpacity style={[styles.button, {backgroundColor: theme.blockColor, borderRadius: 15}]} onPress={() => getBooks()}>
                    <Ionicons name="ios-search" size={24} color={theme.blueColor} />
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: w * 0.745,
        height: h * 0.06,
        borderRadius: 15,
        backgroundColor: 'white',
        paddingLeft: 10,
        fontSize: 15,
        fontFamily: 'roboto',
        textAlignVertical: 'center',
        elevation: 4,
        marginRight: w * 0.01
    },

    button: {
        height: h * 0.06,
        width: w * 0.145,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 10,
        zIndex: 1,
    },
})