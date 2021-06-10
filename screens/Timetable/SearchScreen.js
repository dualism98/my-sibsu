import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, StatusBar, TextInput, AsyncStorage, TouchableOpacity, TouchableHighlight, FlatList, ToastAndroid } from 'react-native'
import MainHeader from '../../modules/MainHeader'
import Help from '../../modules/timetableFolder/Help'
import { useTheme } from '../../themes/ThemeManager'
import { useLocale } from '../../locale/LocaleManager'
import { h, w } from '../../modules/constants'
import SwitchSelector from "react-native-switch-selector";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

const URLs = ['https://mysibsau.ru/v2/timetable/all_groups/',
                'https://mysibsau.ru/v2/timetable/all_teachers/',
                'https://mysibsau.ru/v2/timetable/all_places/']

const last = ['LastGroups', 'LastTeachers', 'LastPlaces']


const fil = (fn, a) => {
    const f = []; //final
    for (let i = 0; i < a.length; i++) {
      if (fn(a[i])) {
        f.push(a[i]);
      }
    }
    return f;
};

const storeData = async (value, name, mode) => {
    try {
      AsyncStorage.setItem('@key', String(value))
      AsyncStorage.setItem('@name', String(name))
      AsyncStorage.setItem('@mode', String(mode))
    } catch (e) {
    }
}

export default function SearchScreen(props){
    const [group, setGroup] = useState('')
    const [timetableMode, setTimetableMode] = useState(-1)
    const [loaded, setLoaded] = useState(false)
    const [shown, setShown] = useState([])
    const [lastGroups, setLast] = useState([])
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [teacherList, setTeacherList] = useState([])
    const [placeList, setPlaceList] = useState([])
    const [groupList, setGroupList] = useState([])
    const lists = [groupList, teacherList, placeList]

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const modes = [
        { label: locale['groups'], value: 0 },
        { label: locale['professors'], value: 1 },
        { label: locale['places'], value: 2 }
    ];

    useEffect(() => {
        AsyncStorage.getItem('@mode')
            .then(res => {
                if (res !== null)
                    setTimetableMode(Number(res))
                else
                    setTimetableMode(0)
            })
        AsyncStorage.getItem('Favourite')
            .then(list => {
                if (list !== null)
                    setLast(JSON.parse(list))
                else
                    setLast([])
            })
    }, [])

    useEffect(() => {
        console.log('Получаем группы/преподавателей/места')
        getList('Groups', 'GroupsHash', 0, 'https://mysibsau.ru/v2/timetable/hash/groups/', setGroupList)
        getList('Teachers', 'TeachersHash', 1, 'https://mysibsau.ru/v2/timetable/hash/teachers/', setTeacherList)
        getList('Places', 'PlacesHash', 2, 'https://mysibsau.ru/v2/timetable/hash/places', setPlaceList)

        setLoaded(true)
    }, [])

    function getList(storageTypeName, storageHashName, urlNumber, hashURL, fun){
        AsyncStorage.getItem(storageHashName)
        .then(res => {
            console.log('Получаем хэш ' + storageTypeName)
            fetch(hashURL, {method: 'GET'})
                .then(response => response.json())
                .then(json => {
                    if(json.hash === res){
                        console.log('Хэш ' + storageTypeName + ' совпадает', json.hash, res)
                        AsyncStorage.getItem(storageTypeName)
                            .then(res => fun(JSON.parse(res)))
                    }
                    else{
                        console.log('Хэш ' + storageTypeName + ' не совпадает', json.hash, res)
                        AsyncStorage.setItem(storageHashName, json.hash)
                        fetch(URLs[urlNumber], {method: 'GET'})
                            .then(response => response.json())
                            .then(json => {
                                fun(json)
                                AsyncStorage.setItem(storageTypeName, JSON.stringify(json))
                            })
                    }
                })
                .catch(err => console.log('Не удалось получить хэш ' + storageTypeName ))
        })  
    }

    const renderHelp = ({ item }) => (
        <Help group={item} onPress={() => setCurrentGroup(item.name)} onPlus={() => {
            addFavourite(item)
            setShown([])
            ToastAndroid.show(locale['added_to_favourites'], ToastAndroid.SHORT)}}/>
    )

    function addFavourite(group){
        AsyncStorage.getItem('Favourite')
                    .then(res => {
                        let groups = []
                        let there_is = false
                        if (res !== null){
                            
                            groups = JSON.parse(res)
                            groups.map(item => {
                                if(item.name === group.name){
                                    there_is = true;
                                }
                            })
                            
                            if (!there_is){
                                group['mode'] = timetableMode;
                                groups.push(group);
                            }
                        }
                        else{
                            groups.push(group)
                        }
                        
                        if (groups.length > 10){
                            groups = groups.slice(1, 11)
                        }
                        
                        setLast(groups)
                        AsyncStorage.setItem('Favourite', JSON.stringify(groups))
                    })
    }

    function similarGroup(text){
        setGroup(text)
        if(text !== '' && text.length > 0){
            timetableMode === 0 ? 
            setShown(fil(e => e.name.slice(0, text.length) === text.toUpperCase(), lists[timetableMode])) :
            setShown(fil(e => e.name.slice(0, text.length) === text, lists[timetableMode]))
        }
        else{
            setShown([])
        }
    }

    function removeGroup(group){
        let groups = []
        AsyncStorage.getItem('Favourite')
            .then(res => {
                groups = JSON.parse(res)
                groups = groups.filter(item => {
                    if(item.name !== group.name){
                        return item
                    }
                })
                setLast(groups)
                AsyncStorage.setItem('Favourite', JSON.stringify(groups))
            })

    }

    function setCurrentGroup(name, mode){
        console.log(mode)
        setGroup(name)
        var choosed = ''
        var type = mode === undefined ? timetableMode : Number(mode)
        timetableMode === 0 ? 
            choosed = name
            .toUpperCase()
            .split(' ')[0] : choosed = name    

        lists[timetableMode].map(group => {
            if (group.name === choosed){
                storeData(group.id, group.name, timetableMode)
                setGroup('') 
                setShown([])
                    
                props.navigation.navigate('TimetableScreen', {group: group.id})
                    
            }
        })
    }
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
            <MainHeader title={locale['timetable']} onPress={() => props.navigation.goBack()}/>
            {timetableMode !== -1 ? <View>
            <View style={{ elevation: 6, marginTop: 10, borderRadius: 15}}>
                <SwitchSelector
                        options={modes}
                        initial={timetableMode}
                        borderRadius={15}
                        buttonColor={theme.blueColor}
                        style={{alignSelf: 'center', width: w * 0.9}}
                        textStyle={{fontFamily: 'roboto', height: 40, textAlignVertical: 'center', color: theme.labelColor}}
                        selectedTextStyle={{fontFamily: 'roboto', height: 40, textAlignVertical: 'center', color: 'white'}}
                        backgroundColor={theme.blockColor}
                        onPress={value => {
                            AsyncStorage.setItem('@mode', String(value))
                            setShown([])
                            setTimetableMode(value)}}
                        />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <TextInput style={[styles.input, {backgroundColor: theme.blockColor, color: theme.labelColor}]} placeholderTextColor={'lightgray'} value={group} onChangeText={text => similarGroup(text)} placeholder={locale['input_group_name']} />
                <TouchableHighlight style={{borderRadius: 15}} onPress={() => setCurrentGroup(group)}>
                    <View style={[styles.button, {backgroundColor: theme.blockColor}]}>
                        <Ionicons name="ios-search" size={24} color={theme.blueColor} />
                    </View>
                </TouchableHighlight>
            </View>
            {shown.length !== 0 ?
            <View style={[{ position: 'absolute', top: 120, height: 8 * 40, width: w * 0.9, marginTop: -5, flexDirection: 'column', borderRadius: 15, backgroundColor: theme.blockColor, zIndex: 3, elevation: 6}]}>
                <FlatList 
                    data={shown}
                    renderItem={renderHelp}
                    initialNumToRender={15}
                    keyExtractor={item => item.name}
                />
            </View> : null}
            {lastGroups.length !== 0 ?
            <View style={[{ shadowColor: "#000",
                            shadowOffset: {
                                width: 6,
                                height: 6,
                            },
                            zIndex: 0,
                            shadowOpacity: 0.30,
                            shadowRadius: 4.65,
                            elevation: 5,}, styles.shadow, { flex: 1, backgroundColor: theme.blockColor, width: w * 0.9, position: 'absolute', top: 115, zIndex: 0, borderRadius: 15, paddingBottom: 10}]}>
                {lastGroups.length !== 0 ? 
                <Text style={{ fontFamily: 'roboto', width: w, paddingLeft: 20, fontSize: 20, marginTop: 10, color: theme.blueColor}}>{locale['favourites']}</Text> : null}
                    {lastGroups.map(item => {
                        return(
                            <View style={{ height: 30, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => setCurrentGroup(item.name, item.mode)}>
                                    <View style={{ height: 30, width: w * 0.8, paddingLeft: 20 }}>
                                        <Text style={{ height: 30, textAlignVertical: 'center', fontFamily: 'roboto', fontSize: 15, color: 'gray'}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => removeGroup(item)}>
                                    <View style={{height: 30, width: w * 0.1, alignItems: 'center', justifyContent: 'center'}}>
                                        <FontAwesome name="trash-o" size={15} color={'gray'} />
                                    </View>
                                </TouchableOpacity>
                            </View>)
                    })}
            </View> : <Text style={{fontFamily: 'roboto', color: 'gray', alignSelf: 'center', width: w * 0.8, marginTop: 15}}>{locale['add_favourites']}</Text>}
            </View> : null}
            <Animated.View style={[{padding: 5, backgroundColor: 'white', borderRadius: 10, elevation: 6, position: 'absolute', bottom: 120, alignSelf: 'center'}, {opacity: fadeAnim}]}>
                <Text style={{fontFamily: 'roboto', textAlign: 'center'}}>{locale['timetable_isnt_available']}</Text>
            </Animated.View>  

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1
    },

    input: {
        width: w * 0.745,
        height: h * 0.06,
        borderRadius: 15,
        backgroundColor: 'white',
        paddingLeft: 10,
        fontSize: 15,
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: 'roboto',
        textAlignVertical: 'center',
        elevation: 4,
        marginRight: w * 0.01
    },

    button: {
        height: h * 0.06,
        width: w * 0.145,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 10,
        zIndex: 1,
    },
})