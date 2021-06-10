import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class PassScreen extends PureComponent {
    render(){
        const { container, text } = styles
        return(
            <View style={container}>
                <Text style={text}>Здесь будет пропуск (маловероятно)</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontSize: 24
    }
})
