import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {h, w} from './constants'
import {useTheme} from '../themes/ThemeManager'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Hyperlink from 'react-native-hyperlink'

const FAQModule = (data) => {
    const {mode, theme, toggle} = useTheme()
    const [show, setShow] = useState(false)
    return(
        <>
            <View style={[styles.container, {backgroundColor: theme.blockColor}]}>
                <TouchableWithoutFeedback onPress={() => {
                setShow(!show)
                if(!show)
                    fetch('https://mysibsau.ru/v2/support/faq/' + data.data.id + '/', {method: 'POST'})}}>
                    <Text style={styles.question}>{data.data.question}</Text>
                </TouchableWithoutFeedback>
                {show ? 
                <Hyperlink linkStyle={ { color: theme.blueColor, fontSize: 16, } }
                linkDefault>
                    <Text style={[styles.answer, {color: theme.labelColor}]}>{data.data.answer}</Text>
                </Hyperlink> : null}
            </View>
        
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: w * 0.9, 
        padding: 10, 
        marginBottom: 7,
        marginTop: 5,
        borderRadius: 15, 
        elevation: 4, 
        alignSelf: 'center'
    },

    question: {
        fontFamily: 'roboto', 
        fontSize: 18, 
        color: '#0060B3'
    },

    answer: {
        fontFamily: 'roboto', 
        fontSize: 16, 
        marginTop: 10
    }
})

export default FAQModule