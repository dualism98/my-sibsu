import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';

const ImageCard = ({onPress, title, link}) => {
    const { container, h1, cover } = styles

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>            
                    <Image style={cover} source={link} />
                    <Text style={h1}>{title}</Text> 
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        borderColor: 'rgb(125, 199, 28)',
        width: w/4,
        height: w * 0.27 + 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: w/15,
    },

    h1: {
        color: '#006CB5',
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        width: w/3.5,
        fontFamily: 'roboto'
        
    },

    cover: {
        width: w/6,
        height: w * 0.27,
        resizeMode: 'contain',
        marginTop: -10,
        marginBottom: -10,
    },

})

export default ImageCard  