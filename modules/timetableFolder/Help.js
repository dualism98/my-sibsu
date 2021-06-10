import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { h, w} from '../constants'
import { useTheme } from '../../themes/ThemeManager'

const Help = ({group, onPress, onPlus}) => {
    const {mode, theme, toggle} = useTheme()
    return(
        <>
        <View style={{ height: 40, width: w * 0.9, justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity onPress={onPress}>
                <Text allowFontScaling={false} style={{ height: 40, textAlignVertical: 'center', fontFamily: 'roboto', fontSize: 18, backgroundColor: 'transparent', color: theme.labelColor, zIndex: 2, paddingLeft: 10, paddingTop: 4, paddingBottom: 4}}>{group.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlus}>
                <Text style={{height: 40, textAlignVertical: 'center', color: '#006AB3', fontWeight: 'bold', width: 40, fontSize: 20}}>+</Text>
            </TouchableOpacity>   
        </View>
        <View style={{ width: w * 0.9, height: 1, backgroundColor: 'gray', opacity: 0.5}} />
        </>
    )
}


export default Help