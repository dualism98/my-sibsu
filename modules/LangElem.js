import React from 'react'
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { h, w} from './constants'


const LangElem = ({name, current, first, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[{ width: w * 0.8, height: 35 }, !first ? {borderTopWidth: 1, borderColor: 'lightgray'} : null]}>
                <Text style={styles.small_text}>{name}</Text>
                {current ? <AntDesign name="check" size={20} color="#006AB3" style={styles.check}/> : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    small_text: {
        height: 35,
        fontFamily: 'roboto',
        fontSize: 18,
        color: '#006AB3',
        textAlignVertical: 'center'
    },

    check: {
        position: 'absolute',
        right: 0,
        bottom: 7
    }
})

export default LangElem