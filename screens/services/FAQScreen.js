import React, { useState } from 'react'
import { useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Modal, ToastAndroid} from 'react-native'
import Header from '../../modules/Header'
import {useTheme} from '../../themes/ThemeManager'
import {useLocale} from '../../locale/LocaleManager'
import FAQModule from '../../modules/FAQModule'
import {h, w} from '../../modules/constants'


export default function FAQScreen(props){

    const [questions, setQuestions] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ownQuestion, setOwnQuestion] = useState('')
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        console.log('Получаем список вопросов')
        fetch("https://mysibsau.ru/v2/support/faq/?language=" + String(localeMode), {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setQuestions(json)
                setLoaded(true)
            })
    }, [])


    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={'FAQ'} onPress={() => props.navigation.goBack()}/>
            <Modal animationType="slide" transparent={true} visible={visible}>
                <View style={[styles.modal, {backgroundColor: theme.blockColor}]}>
                    <View style={styles.cancel}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{color: '#006AB3', fontSize: 50, marginLeft: 6}}>˟</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput 
                        placeholderTextColor={'gray'} 
                        onChangeText={text => setOwnQuestion(text)} 
                        placeholder={locale['input_question']} 
                        multiline 
                        numberOfLines={5} 
                        style={[styles.input, {color: theme.labelColor}]} 
                        scrollEnabled={true}/>
                    <TouchableOpacity onPress={() => {
                        ownQuestion.length !== 0 ?
                        fetch('https://mysibsau.ru/v2/support/ask/', {
                            method: 'POST',
                            body: JSON.stringify({question: ownQuestion})})
                        :
                        ToastAndroid.show('Текстовое поле пусто', ToastAndroid.LONG)
                        setVisible(false)
                    }}>
                        <View style={styles.send_button}>
                            <Text style={styles.send_text}>{locale['send']}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            {loaded ? 
                <ScrollView contentContainerStyle={{paddingTop: 10, paddingBottom: 100}}>
                    <View style={{marginBottom: 20}}>
                    {questions.map(item => {
                        return(<FAQModule data={item} />)
                    })}
                    </View>
                    {props.route.params.token !== '' ?
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <View style={[styles.ask, {backgroundColor: theme.blockColor}]}>
                            <Text style={{fontFamily: 'roboto', fontSize: 18, color: '#0060B3'}}>{locale['ask']}</Text>
                        </View>
                    </TouchableOpacity> : null }
                </ScrollView>
                : 
                <View style={{flex: 1, justifyContent: 'center', }}>
                    <ActivityIndicator color={'#006AB3'} size={'large'}/>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%', 
    },

    modal: {
        borderRadius: 30, 
        borderWidth: 1, 
        borderColor: '#0060B3', 
        borderRadius: 15, 
        elevation: 5, 
        marginTop: 100, 
        padding: 10, 
        width: w * 0.9, 
        alignSelf: 'center', 
        justifyContent: 'center', 
        marginBottom: 20,
    },

    cancel: {
        width: w * 0.8, 
        height: 45
    },

    input: {
        textAlignVertical: 'top', 
        borderWidth: 1, 
        borderColor: '#0060B3', 
        borderRadius: 15, 
        padding: 10
    },

    send_button: {
        width: w * 0.4, 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#006AB3', 
        borderRadius: 15, 
        padding: 10, 
        margin: 10, 
        alignSelf: 'center'
    },

    send_text: {
        fontFamily: 'roboto', 
        color: '#006AB3', 
        fontSize: 15
    },

    ask: {
        width: w * 0.6, 
        padding: 10, 
        borderRadius: 15, 
        elevation: 4, 
        alignSelf: 'center', 
        marginBottom: 140, 
        alignItems: 'center'
    }

})