import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator, Linking} from 'react-native'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'
import { h, w } from '../../../modules/constants'
import Header from '../../../modules/Header'


export default function LibrarySearch(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const [loaded, setLoaded] = React.useState(false)
    const [books, setBooks] = React.useState([])

    React.useEffect(() => {
        AsyncStorage.getItem('LibraryRequest')
            .then(res => {
                console.log(res)
                if(res !== null){
                    fetch(res, {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            setBooks(json)
                            setLoaded(true)
                        })
                }
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            {!loaded ? <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}><ActivityIndicator size={'large'} color={'#006AB3'}/></View> :
            <>
            {books.digital.length === 0 ? <Text style={{fontFamily: 'roboto', fontSize: 18, alignSelf: 'center', marginTop: 20, color: theme.labelColor}}>{locale['empty']}</Text> : null}
            <FlatList 
                data={books.digital}
                renderItem={({ item }) => 
                    <View style={{width: w * 0.9, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5, marginTop: 10, alignSelf: 'center', padding: 10}}>
                        <Text style={{color: theme.labelColor, fontFamily: 'roboto', fontSize: 16}}>{item.name}</Text>
                        <Text style={{color: 'gray', fontFamily: 'roboto', fontSize: 16}}>{item.author}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                            <Text style={{ alignSelf: 'flex-end', color: 'gray', marginTop: 5}}>Ссылка на исходный текст</Text>
                        </TouchableOpacity>
                        
                    </View>
                }
                keyExtractor={item => item.name}
                contentContainerStyle={{paddingBottom: 120}}
                initialNumToRender={10}/>
              
            </>}
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