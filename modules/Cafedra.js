import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useTheme } from '../themes/ThemeManager'
import { useLocale } from '../locale/LocaleManager' 
import { h, w } from './constants'

const Cafedra = (props) => {
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const [show, setShow] = useState(false)

    return(
        <TouchableWithoutFeedback onPress={() => setShow(!show)}>
            <View style={[styles.box, styles.shadow2, {backgroundColor: theme.blockColor}]}>  
                <View style={{ minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.view}>{props.name}</Text>
                </View>
                {show ? 
                    <View style={{ borderLeftWidth: 2, borderLeftColor: '#006AB3', paddingLeft: 10, marginLeft: 10 }}>
                        <Text style={styles.text}>{locale['head']}: {props.fio}{'\n'}{locale['address']}: {props.address}{'\n'}{locale['phone']}: {props.phone}{'\n'}{locale['email']}: {props.email}</Text>
                    </View> : null}
            </View>
        </TouchableWithoutFeedback>
    )
}

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }


const styles = StyleSheet.create({
    view: { 
        textAlignVertical: 'center',
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 14, 
        flexWrap:'wrap', 
        marginLeft: 10
    },

    text: {
        height: 'auto', 
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 14, 
        flexWrap:'wrap',
    },

    shadow2: elevationShadowStyle(5),
    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        marginTop: 10,
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 19,
        paddingLeft: 15,
        alignSelf: 'center',
        minHeight: 50,
    },
})

export default Cafedra