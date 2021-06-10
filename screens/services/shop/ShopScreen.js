import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import ProductBlock from '../../../modules/ProductBlock'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useLocale} from '../../../locale/LocaleManager'
import {useTheme} from '../../../themes/ThemeManager'

export default function ShopScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const [perfomances, setPerfomances] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        fetch('https://mysibsau.ru/v2/tickets/all_perfomances/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setPerfomances(json)
                setLoaded(true)
            })
    }, [])

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={locale['tickets']} onPress={() => props.navigation.goBack()}/>
            {!loaded ? 
                <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                    <ActivityIndicator size="large" color='#006AB3' />
                </View> :
                <FlatList 
                    data={perfomances}
                    renderItem={({ item }) => <ProductBlock onPress={() => props.navigation.navigate('Product', {data: item})} name={item.name} image={item.logo} theater={item.theatre}/>}
                    keyExtractor={item => item.name}
                    contentContainerStyle={{paddingBottom: 120}}
                    initialNumToRender={10}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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
    }
})
