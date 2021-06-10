import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'

import {useTheme} from '../../themes/ThemeManager'
import {useLocale} from '../../locale/LocaleManager'

const TextAnswer = ({onChange}) => {
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const [text, setText] = useState('')

    const changeText = (text) => {
        setText(text)
        onChange(text)
    }

    return(
        <View>
            <TextInput 
            value={text} 
            style={{ borderWidth: 1, borderColor: theme.labelColor, borderRadius: 10, textAlignVertical: 'top', marginTop: 5, color: theme.labelColor, padding: 5}} 
            multiline 
            onChangeText={value => changeText(value)}
            numberOfLines={10}
            placeholder={'Введите ответ..'}
            placeholderTextColor={'gray'}/>
        </View>
    )
}

export default TextAnswer