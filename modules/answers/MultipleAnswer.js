import React, { useState } from 'react'
import {View, Text, TouchableOpacity } from 'react-native'

import {useTheme} from '../../themes/ThemeManager'

const MultipleAnswer = ({responses, onChange}) => {
    const {mode, theme, toggle} = useTheme()
    const [checkedIDs, setIDs] = useState([])

    const changeOptions = (id) =>{
        let ids = []
        checkedIDs.map(item => ids.push(item))
        checkedIDs.includes(id) ? 
            ids.splice(ids.indexOf(id), 1) : 
            ids.push(id)  

        setIDs(ids)
        onChange(ids)
    }

    return(
        <View>
            {responses.map(item => {
                return(
                    <TouchableOpacity onPress={() => changeOptions(item.id)}>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <View style={{ width: 20, height: 20, borderRadius: 5, borderWidth: 1, borderColor: theme.labelColor, alignItems: 'center', justifyContent: 'center'}}>
                                {checkedIDs.includes(item.id) ? <View style={{width: 10, height: 10, borderRadius: 2, backgroundColor: theme.labelColor}}></View> : null}
                            </View>
                            <Text style={{ fontFamily: 'roboto', fontSize: 15, color: theme.labelColor, marginLeft: 10}}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>)
            })}
        </View>
    )
}

export default MultipleAnswer