import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';
import {useTheme} from '../themes/ThemeManager'


const ListElement = ({onPress, title, prop}) => {
    const {mode, theme, toggle} = useTheme()

    return(
        <TouchableOpacity style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor}]} onPress={onPress}>
          <Text style={[styles.text, {color: theme.blueColor}]} >{title}</Text>
          <Text style={[styles.down, {color: theme.blueColor}]} >{prop}</Text>
        </TouchableOpacity>
    );
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
        width: w * 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 15,
        marginRight: w * 0.03,
        borderRadius: 10,
        textAlignVertical: 'bottom',
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 4,
    },

    text: {
        paddingTop: 5,
        fontSize: 24,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginBottom: -5,
        textAlign: 'center',
    },

    down: {
        width: w * 0.7 * 0.94,
        fontFamily: 'roboto',
        color: '#006AB3',
        marginBottom: 5,
        textAlign: 'center',
    },

  shadow2: elevationShadowStyle(10),
  box: {
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    width: w * 0.7,
    marginTop: 20,
    marginRight: 10,
  },
  centerContent: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})

export default ListElement