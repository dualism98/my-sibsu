import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { h, w } from './constants'
import {useTheme} from '../themes/ThemeManager'

const ProductBlock = ({name, image, theater, onPress}) => {
    const {mode, theme, toggle} = useTheme()

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <View>
                    <Image source={{uri: `https://mysibsau.ru/${image}`}} style={styles.image} />
                </View>
                <Text style={[styles.name, {color: theme.labelColor}]}>{name.slice(0, 25)}{name.length > 25 ? '...' : null}</Text>
                <Text style={styles.price}>{theater}</Text>
            </View>
        </TouchableOpacity>
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
    container:{
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.4,
        height: w * 0.68,
        marginTop: 20,
        marginLeft: w * 0.2 / 3,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    
    shadow: elevationShadowStyle(6),

    image: {
        height: w * 0.5,
        width: w * 0.4,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },

    name: {
        fontFamily: 'roboto',
        fontSize: 13,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },

    price: {
        fontSize: 13,
        fontFamily: 'roboto',
        marginLeft: 10,
        marginRight: 10,
        color: 'gray',
        alignSelf: 'flex-end'
    }
})

export default ProductBlock