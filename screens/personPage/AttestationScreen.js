import React from 'react'
import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'
import Header from '../../modules/Header'
import {h, w } from '../../modules/constants'


export default function AttestationScreen(props){
    const [attestation, setAttestation] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    React.useEffect(() => {
        fetch('https://mysibsau.ru/v2/user/attestation/', {
            method: 'POST',
            body: JSON.stringify(props.route.params.data)})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setAttestation(json)
                setLoaded(true)
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['attestation']} onPress={() => props.navigation.goBack()} />
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                <ActivityIndicator size='large' color='#006AB3' />
            </View> :
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                {attestation.map(item => {
                    return(
                        <View style={{width: w * 0.9, borderRadius: 15, backgroundColor: theme.blockColor, elevation: 5, alignSelf: 'center', marginTop: 15, padding: 10}}>
                            <Text style={{fontFamily: 'roboto', fontSize: 15, color: '#006AB3', borderBottomWidth: 1, borderColor: '#CCC'}}>{item.name} <Text style={{color: 'gray'}}>({item.type})</Text></Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 3}}>
                                <View style={{flexDirection: 'column', width: w * 0.2, alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'roboto', color: 'gray'}}>I</Text>
                                    <Text style={{fontFamily: 'roboto', color: theme.labelColor, marginTop: 3}}>{item.att1}</Text>
                                </View>
                                <View style={{flexDirection: 'column', width: w * 0.2, alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'roboto', color: 'gray'}}>II</Text>
                                    <Text style={{fontFamily: 'roboto', color: theme.labelColor, marginTop: 3}}>{item.att2}</Text>
                                </View>
                                <View style={{flexDirection: 'column', width: w * 0.2, alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'roboto', color: 'gray'}}>III</Text>
                                    <Text style={{fontFamily: 'roboto', color: theme.labelColor, marginTop: 3}}>{item.att3}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>}
        </View>
    )

}