import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Animated, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { h, w } from '../../modules/constants'
import { AntDesign } from '@expo/vector-icons'
import Day from '../../modules/timetableFolder/Day'
import Swiper from 'react-native-swiper'


import {useTheme} from '../../themes/ThemeManager'
import {useLocale} from '../../locale/LocaleManager'
import {useWeek} from '../../week/WeekManager'

const URLs = ['group', 'teacher', 'place']


export default function TimetableScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const {week} = useWeek()

    const [group, setGroup] = useState(null)
    const [weekDay, setWeekDay] = useState('')
    const [currentWeek, setCurrentWeek] = useState(getIndex())
    const [textGroup, setTextGroup] = useState('')
    const [timetable, setTimetable] = useState({even_week: [], odd_week: []})
    const [loaded, setLoaded] = useState(false)
    const [index, setIndex] = useState(getIndex())
    const [first_dates, setFirstDates] = useState([])
    const [second_dates, setSecondDates] = useState([])
    const [timetableMode, setMode] = useState(0)
    const [y, setY] = useState(0)

    const f_scrollViewRef = useRef()
    const s_scrollViewRef = useRef()
    const swiper = useRef()
    
    const didFocusSubscription = props.navigation.addListener(
        'state',
        payload => {
            console.log('Определение группы')
            AsyncStorage.getItem('@mode').then((mode) => setMode(mode))
            AsyncStorage.getItem('@key').then((id) => setGroup(id))
            AsyncStorage.getItem('@name').then((name) => setTextGroup(name))
        }
      );

    useEffect(() => {
        if(group !== null){
            console.log('Получение расписания группы ' + textGroup )
            let uri = 'https://mysibsau.ru/v2/timetable/' + URLs[Number(timetableMode)] + '/' + String(group) + '/'
            console.log(uri)
            fetch(uri, {method: 'GET'})
                .then(response => {
                    if(response['status'] !== 200){
                        AsyncStorage.removeItem('@key')
                        AsyncStorage.removeItem('@group')
                        props.navigation.navigate('SearchScreen')
                        return {odd_week: [], even_week: []}
                    }
                    return response.json()})
                .then(json => {
                    console.warn(json)
                    setTimetable(json)
                    setLoaded(true)})
                .catch(err => console.log(err))
        }
    }, [group])

    useEffect(() => {
        console.log('Определение дат')
        var d = new Date();
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1)

        var now_week = []
        var next_week = []
        var monday = new Date(d.setDate(diff))
        now_week.push(monday)
        for (var i = 1; i < 6; i++)
            now_week.push(new Date(monday.getTime() + i * (24 * 60 * 60 * 1000)))

        for (var i = 7; i < 13; i++)
            next_week.push(new Date(monday.getTime() + i * (24 * 60 * 60 * 1000)))


        if (currentWeek === 1){
            setFirstDates(now_week)
            setSecondDates(next_week)
        }
        else{
            setFirstDates(next_week)
            setSecondDates(now_week)
        }
    }, [group])

    function getIndex(){
        if (((new Date() - new Date(2020, 9, 12, 0, 0, 0, 0))/1000/60/60/24)%14 <= 7){
            return 1
        }
        else
            return 2
    }


    useEffect(() => {
        console.log('Определяем день недели')
        let date = new Date()
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        setWeekDay(locale[days[date.getDay()]])
    }, [])

    function changeIndex(){
        index === 1 ? setIndex(2) : setIndex(1)
    }
 
    const TimetableHeader = ({}) =>{
        return(
            <View style={[{backgroundColor: 'white',
                            height: w / 8,
                            width: w,
                            elevation: 10,
                            position: 'relative',
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 4,}, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{ width: 60, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            setTextGroup(''); setTimetable({even_week: [], odd_week: []}); setLoaded(false); setGroup(null)
                            AsyncStorage.removeItem('@key')
                            AsyncStorage.removeItem('@group')
                            props.navigation.navigate('SearchScreen')
                        }}>
                            <AntDesign name="logout" size={20} color={theme.headerTitle} style={{transform:[{rotate: '180deg'}] }}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={[{
                        height: 40,
                        textAlignVertical: 'center',
                        fontSize: 25,
                        fontFamily: 'roboto',
                        color: theme.headerTitle}]}>{textGroup}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    index === 1 ?
                    swiper.current.scrollBy(1, true) : swiper.current.scrollBy(-1, true)}} style={[{
                                height: w / 12,
                                width: 100,
                                alignItems: 'center',
                                paddingLeft: 5,
                                paddingRight: 5,
                                borderRadius: 15,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 6,
                                    height: 6,
                                },
                                shadowOpacity: 0.30,
                                shadowRadius: 4.65,

                                elevation: 4,
                                position: 'absolute',
                                right: 10,
                                bottom: (w/8 - w/12)/2}, {backgroundColor: theme.headerColor}]}>
                    <Text style={[{height: w/12, textAlignVertical: 'center', fontFamily: 'roboto',
                                fontSize: 17,
                                color: 'gray'}, {color: theme.headerTitle}]}>{index} {locale['week']}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
                <TimetableHeader />
                <Swiper ref={swiper} style={styles.wrapper} loop={false} index={currentWeek - 1} onIndexChanged={() => changeIndex()} showsPagination={false} >
                <ScrollView ref={f_scrollViewRef}>
                {!loaded ? 
                        <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size='large' color={theme.blueColor}/>
                        </View> :
                    timetable.odd_week.map(item => {
                        const index = timetable.odd_week.indexOf(item)
                        return(
                            <View key={item.day} onLayout={(event) => {
                                var date = new Date()
                                if(date.getDay() - 1 === item.day && currentWeek === 1){
                                    const layout = event.nativeEvent.layout
                                    setY(layout.y)
                                    f_scrollViewRef.current.scrollTo({x: 0, y: layout.y - 20, animated: true})
                                }
                        }}>
                        <Day day={item} timetableMode={Number(timetableMode)} date={first_dates[index]} week={1} currentWeek={currentWeek} weekDay={weekDay} />
                    </View>
                )})}
                </ScrollView>
                <ScrollView ref={s_scrollViewRef}>
                    {!loaded ?  
                        <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size='large' color={theme.blueColor}/>
                        </View> :
                        timetable.even_week.map(item => {
                        const index = timetable.even_week.indexOf(item)
                        return(<View key={item.day} onLayout={(event) => {
                            var date = new Date()
                            if(date.getDay() - 1 === item.day && currentWeek === 2){
                                const layout = event.nativeEvent.layout
                                setY(layout.y)
                                s_scrollViewRef.current.scrollTo({x: 0, y: layout.y - 20, animated: true})
                            }
                        }}>
                        <Day day={item} timetableMode={Number(timetableMode)} date={second_dates[index]} week={2} currentWeek={currentWeek} weekDay={weekDay}/>
                    </View>) })}
                </ScrollView>
            </Swiper>
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
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 0,
    },
    shadow: elevationShadowStyle(5),

    

})

