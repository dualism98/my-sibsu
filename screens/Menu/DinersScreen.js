import React from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator, AsyncStorage, FlatList} from 'react-native'
import MainHeader from '../../modules/MainHeader'
import { h, w } from '../../modules/constants'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'


export default function DinersScreen(props){
    const [menu, setMenu] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    React.useEffect(() => {
        fetch('https://mysibsau.ru/v2/menu/all/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setMenu(json)
                setLoaded(true)
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <MainHeader title={locale['canteens']} />
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> : 
            <View>
                {
                    menu.length === 0 ? 
                    <Text style={{fontFamily: 'roboto', fontSize: 18, alignSelf: 'center', marginTop: 20, color: theme.labelColor}}>{locale['canteens_dont_work']}</Text> : null
                }
                <FlatList 
                    data={menu}
                    renderItem={({ item }) => 
                        <TouchableOpacity 
                            onPress={() => {
                                AsyncStorage.setItem('Diner', String(item.name))
                                props.navigation.navigate('MenuScreen')
                            }}
                            style={{ width: w * 0.9, padding: 10, marginTop: 10, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5, alignSelf: 'center'}}>
                            <Text style={{fontFamily: 'roboto', fontSize: 16, color: theme.labelColor}}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.name}
                    contentContainerStyle={{paddingBottom: 120}}
                    initialNumToRender={5}/>
            </View>}
        </View>
    )
}