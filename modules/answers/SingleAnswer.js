import React, { useState } from 'react'
import {View, Text, TouchableOpacity } from 'react-native'

import {useTheme} from '../../themes/ThemeManager'

const SingleAnswer = ({responses, onChange}) => {
    const {mode, theme, toggle} = useTheme()
    const [checkedID, setID] = useState([-1])

    const changeOption = (id) => {
        if (checkedID === id){
            setID([-1])
            onChange([])
        }
        else{
            setID([id])
            onChange([id])
        }
    }

    return(
        <View>
            {responses.map(item => {
                return(
                    <TouchableOpacity onPress={() => changeOption(item.id)}>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: theme.labelColor, alignItems: 'center', justifyContent: 'center'}}>
                                {checkedID[0] === item.id ? <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: theme.labelColor}}></View> : null}
                            </View>
                            <Text style={{ fontFamily: 'roboto', fontSize: 15, color: theme.labelColor, marginLeft: 10}}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>
            )})}
        </View>
    )
}

export default SingleAnswer