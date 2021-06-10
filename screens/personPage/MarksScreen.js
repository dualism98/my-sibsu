import React from 'react'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'
import Header from '../../modules/Header'
import {h, w} from '../../modules/constants'


export default function MarksScreen(props){
    const [marks, setMarks] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    React.useEffect(() => {
        fetch('https://mysibsau.ru/v2/user/marks/', {
            method: 'POST',
            body: JSON.stringify(props.route.params.data)})
            .then(response => response.json())
            .then(json => {
                setMarks(json.reverse())
                setLoaded(true)
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['marks']} onPress={() => props.navigation.goBack()} />
            {!loaded ? 
            <View style={{flex: 1, paddingBottom: 100, justifyContent: 'center'}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> : 
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                {marks.map(item => {
                    return(
                        <>
                        <Text style={{ fontFamily: 'roboto', fontSize: 18, color: '#006AB3', marginBottom: 5, marginTop: 15, paddingLeft: w * 0.05}}>{item.term} {locale['term']}</Text>
                        <View style={{ width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 5, alignSelf: 'center', paddingTop: 10, paddingBottom: 10}}>
                        {item.items.map(subject => {
                            return(
                            <>
                            <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                <Text style={{width: w * 0.7, paddingLeft: 10, fontFamily: 'roboto', color: theme.labelColor}}>{subject.name} <Text style={{color: 'gray'}}>({subject.type})</Text></Text>
                                <Text style={{width: w * 0.2, textAlign: 'center', textAlignVertical: 'center', fontFamily: 'roboto', color: theme.labelColor}}>{subject.mark}</Text>
                            </View>
                            {item.items.indexOf(subject) !== item.items.length - 1 ? 
                            <View style={{width: w * 0.9, height: 1, backgroundColor: 'gray', opacity: 0.5, alignSelf: 'center'}}/> : null}
                            </>
                        )})}
                        </View>
                        </>
                    )
                })}
            </ScrollView>}
        </View>
    )

}