import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { h, w } from '../constants'
import { useTheme } from '../../themes/ThemeManager'
import { useLocale } from '../../locale/LocaleManager'





const Subject = ({data, timetableMode}) =>{
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    console.log(timetableMode)
    const types = ['', [locale['lecture'], '#ef8531'], 
                [locale['laboratory_work'], 'rgb(190, 175, 85)'], 
                [locale['practice'], 'rgb(49, 151, 39)']]
    
    const subgroups = ['', locale['first_subgroup'], locale['second_subgroup']]
    return(
        <View style={[styles.box, styles.shadow2, {backgroundColor: theme.blockColor}]}>
            {data !== 'Нет пар' ? 
            <View>
                <Text style={[styles.time, {color: theme.labelColor}]}>{data.time}</Text>
                {data.subgroups.map(item => {
                    return(
                        <View key={item.teacher + item.place}>
                            <View style={styles.line}></View>
                            {
                                (item.num !== 0) ? <Text style={{fontSize: 14,
                                    fontFamily: 'roboto',
                                    color: 'rgb(154,158,159)',
                                    marginBottom: -5, marginRight: 10}}>{subgroups[Number(item.num)]}</Text> : <View></View>
                            }
                            <Text style={[styles.subject, {color: theme.blueColor}]}>{item.name}</Text>
                            <Text style={styles.type, {color: String(types[Number(item.type)][1]), fontSize: 16}}>{types[Number(item.type)][0]}</Text>
                            {timetableMode !== 1 ? <Text style={styles.professor}>{item.teacher}</Text> : null}
                            {timetableMode !== 0 ? <Text style={[styles.professor, timetableMode !== 1 ? {marginBottom: 3, marginTop: 3} : null]}>{item.group}</Text> : null}
                            {timetableMode !== 2 ? <Text style={styles.place}>{item.place}</Text> : null}
                        </View>
                    )
                })} 
            </View>: 
            <Text style={[styles.time, {color: 'gray'}]}>{locale['no_classes']}</Text>}
        </View>
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
    container: {
        height: 200,
        width: w * 0.9,
        paddingLeft: 15,
        paddingRight: 5,
        paddingTop: 7,
        paddingBottom: 5,
        marginTop: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowRadius: 4,
        alignItems: 'center'
    },

    time: {
        fontFamily: 'roboto',
        fontSize: 18,
        alignSelf: 'center'
    },

    line: {
        height: 1,
        width: w * 0.7,
        backgroundColor: 'rgb(154,158,159)',
        alignSelf: 'center'
    },

    subject: {
        marginTop: 4,
        fontSize: 16,
        fontFamily: 'roboto',
        fontWeight: 'bold'
    },

    type: {
        fontSize: 18,
        fontFamily: 'roboto',
    },

    professor: {
        fontSize: 16,
        fontFamily: 'roboto',
        color: 'rgb(154,158,159)',
        marginBottom: -5
    },

    place: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'roboto',
        width: w * 0.82,
        textAlign: 'right',
        marginBottom: 3
    },

    shadow2: elevationShadowStyle(10),
  box: {
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    width: w * 0.9,
    marginTop: 10,
  },
  centerContent: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})

export default Subject