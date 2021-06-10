import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {h, w} from './constants'
import {useTheme} from '../themes/ThemeManager'

const ServiceElement = ({name, image, onPress}) => {
    const {mode, theme, toggle} = useTheme()
    return(
        <TouchableOpacity style={[styles.box, styles.shadow, {backgroundColor: theme.blockColor}]} onPress={onPress}>
          {image}
          <Text numberOfLines={2} style={{ flex: 1,height: w * 0.15, width: w * 0.28, paddingLeft: 5, paddingRight: 5, paddingTop: 10, fontFamily: 'roboto', alignSelf: 'center', position: 'absolute', top: 0, textAlignVertical: 'center', textAlign: 'center', fontSize: 15, color: theme.headerTitle}}>{name}</Text>
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
    shadow: elevationShadowStyle(6),
    box: {
      borderRadius: 15,
      backgroundColor: 'white',
      justifyContent: 'flex-end',
      width: w * 0.28,
      height: w * 0.3,
      marginTop: w * 0.16 / 4,
      overflow: 'hidden',
      marginLeft: w * 0.16 / 4,
    },
})

export default ServiceElement