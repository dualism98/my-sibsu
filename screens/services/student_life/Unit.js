import React, { PureComponent, useState } from 'react'
import { View, Text, Image, Linking, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, Alert, ScrollView, Platform } from 'react-native'
import call from 'react-native-phone-call'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'
import { Ionicons } from '@expo/vector-icons'; 


const url = 'https://mysibsau.ru'

export default function Ermak(props){

    const [onVisible, setVisible] = useState(false)
    const [fio, setFio] = useState('')
    const [institute, setInstitute] = useState('')
    const [group, setGroup] = useState('')
    const [vk, setVk] = useState('')
    const [hobby, setHobby] = useState('')
    const [reason, setReason] = useState('')

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    async function sendMessage(link){
        const uri = 'https://mysibsau.ru/v2/campus/unions/join/' + props.route.params.data.id + '/'
        let vk_page = vk.split('/')
        vk_page = vk_page[vk_page.length - 1]

        let data = new FormData()
        data.append('fio', fio)
        data.append('institute', institute)
        data.append('group', group)
        data.append('vk', vk_page)
        data.append('hobby', hobby)
        data.append('reason', reason)

        fetch(uri, {method: 'POST', body: data})
            .catch(err => console.log(err))
    }

    const data = props.route.params.data
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={data.short_name ? data.short_name : 
                data.name.length > 25 ? data.name.slice(0, 25) + '..' : data.name} onPress={() => props.navigation.goBack()}/>
            <ScrollView>

                <View style={{ borderBottomWidth: 2, borderColor: 'gray'}}>
                    <Image source={data.logo ? {uri: url + data.logo} : require('../../../assets/back.png')}  style={{ width: w, height: w / 2, resizeMode: 'cover', backgroundColor: 'white'}} blurRadius={data.logo ? 0.5 : 0}/>
                </View>
                {data.photo ?
                <View style={[styles.profile, styles.centerContent, styles.shadow1]}>
                    <Image source={{uri: url + data.photo}} style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'gray'}} />
                </View> : null}

                {data.about ?
                <View>
                    <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: data.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['description']}</Text>
                    <View style={[styles.box, styles.centerContent, styles.shadow2, {padding: 10, backgroundColor: theme.blockColor}]}>
                        <Text style={{fontFamily: 'roboto', fontSize: 15, color: '#5575A7', paddingLeft: 5}}>{data.about}</Text>
                    </View>
                </View> : null}

                {data.dates ? 
                <View>
                    <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: data.photo ? w * 0.2 + 20 : 20, marginLeft: 20, color: '#5575A7',}}>{locale['training_days']}</Text>
                    <View style={[styles.box, styles.centerContent, styles.shadow2, {padding: 10, backgroundColor: theme.blockColor}]}>
                        <Text style={{fontFamily: 'roboto', fontSize: 16, color: '#5575A7', paddingLeft: 5}}>{data.dates}</Text>
                    </View>
                </View> : null}
                
                <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: 15, marginLeft: 20, color: '#5575A7',}}>{data.leader_rank ? data.leader_rank : locale['active_head']}</Text>
                {data.fio !== '-' ? 
                    <View style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor, padding: 10}]}>
                        <Text style={{fontFamily: 'roboto', fontSize: 20, textAlign: 'center', color: '#5575A7'}}>{data.fio}</Text>
                    </View> : null}

                <View style={[styles.box, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                    <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="map-marker" size={24} color="rgb(115, 182, 28)" />
                    </View>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>{data.address}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'column', paddingBottom: 180}}>
                    {data.phone ?
                    <TouchableWithoutFeedback onPress={() => call({number: data.phone, prompt: false})}>
                        <View style={[styles.box, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                            <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="phone" size={24} color="rgb(115, 182, 28)" />
                            </View>
                            <View style={{ justifyContent: 'center'}}>
                                <Text style={styles.buttonText}>{locale['call']}</Text>
                            </View>
                            
                        </View>
                    </TouchableWithoutFeedback> : null}

                    {data.group_vk ? 
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(data.group_vk)}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                            <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                <Entypo name="vk-with-circle" size={24} color="rgb(115, 182, 28)" />
                            </View>
                            <View style={{ justifyContent: 'center'}}>
                                <Text style={styles.buttonText}>{locale['group_vk']}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback> : null}

                    {data.email ?
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${data.email}?subject==&`)}>
                    <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                        <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="mail" size={24} color="rgb(115, 182, 28)" />
                        </View>
                        <Text style={styles.buttonText}>{locale['write_email']}</Text>
                    </View>
                </TouchableWithoutFeedback> : null}

                    {data.page_vk ?
                    <TouchableWithoutFeedback onPress={() => setVisible(!onVisible)}>
                    <View style={[styles.box, styles.centerContent, styles.shadow2, { flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                        <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Entypo name="circle-with-plus" size={24} color="rgb(115, 182, 28)" />
                        </View>
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={styles.buttonText}>{locale['join']}</Text>
                        </View> 
                    </View>
                    </TouchableWithoutFeedback> : null}
            

                    <Modal animationType="slide" transparent={true} visible={onVisible}>
                        <ScrollView>
                        <View style={[styles.modal, styles.centerContent, styles.shadow2, {backgroundColor: theme.primaryBackground}]}>
                            <View style={{width: w * 0.8, height: 45}}>
                            <TouchableWithoutFeedback onPress={() => setVisible(!onVisible)}>
                                <Text style={{color: '#006AB3', fontSize: 50, marginLeft: 6}}>˟</Text>
                            </TouchableWithoutFeedback>
                            </View>

                            <Text style={{fontFamily: 'roboto', color: '#006AB3', fontSize: 24, marginBottom: 10}}>Заявка на вступление</Text>

                            <TextInput style={[styles.input, {color: theme.headerTitle}]} placeholderTextColor={'gray'} onChangeText={text => setFio(text)} placeholder={'ФИО'}/>
                            <TextInput style={[styles.input, {color: theme.headerTitle}]} placeholderTextColor={'gray'} onChangeText={text => setInstitute(text)} placeholder={'Институт'} />
                            <TextInput style={[styles.input, {color: theme.headerTitle}]} placeholderTextColor={'gray'} onChangeText={text => setGroup(text)} placeholder={'Группа'} />
                            <TextInput style={[styles.input, {color: theme.headerTitle}]} placeholderTextColor={'gray'} onChangeText={text => setVk(text)} placeholder={'ID в VK'} />
                            <TextInput style={[styles.input, {color: theme.headerTitle}]} placeholderTextColor={'gray'} onChangeText={text => setHobby(text)} placeholder={'Какие у вас есть увлечения?'} multiline scrollEnabled={true}/>
                            <TextInput style={[styles.input, {color: theme.headerTitle}]} placeholderTextColor={'gray'} onChangeText={text => setReason(text)} placeholder={'Почему хотите вступить?'} multiline scrollEnabled={true} selectTextOnFocus={true}/>

                            <TouchableWithoutFeedback onPress={() => 
                                {sendMessage(data.page_vk.split('id')[1])
                                setVisible(false)
                            }}>
                            <View style={{borderWidth: 1, borderColor: '#006AB3', borderRadius: 4, paddingBottom: 3, paddingTop: 3, paddingLeft: 5, paddingRight: 5, marginBottom: 10}}>
                                <Text style={{fontFamily: 'roboto', color: '#006AB3', fontSize: 15}}>ОТПРАВИТЬ</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                        </ScrollView>
                    </Modal>
                </View>
            </ScrollView>
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

    container:{
        width: w,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    icons: {
        width: w*0.08, 
        height:w*0.08, 
        resizeMode:"stretch", 
        marginLeft: 10, 
        marginRight: 10
    },

    modalView: {
        borderColor: '#006AB3', 
        borderWidth: 1, 
        borderRadius: 15, 
        backgroundColor: 'white', 
        width: w * 0.8, 
        alignSelf: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },

    input: {
        // height: 40,
        width: w * 0.75,
        borderBottomWidth: 1,
        borderColor: '#5575A7',
        marginBottom: 15,
        fontFamily: 'roboto',
        fontSize: 18
    },

    button: {
        height: w * 0.1, 
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-end',
    },

    buttonText: {
        width: w * 0.8,
        color: '#5575A7', 
        fontFamily: 'roboto', 
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10, 
    },
    shadow1: elevationShadowStyle(30),
    shadow2: elevationShadowStyle(10),

    profile: {
        borderRadius: w * 0.2,
        backgroundColor: 'white',
        width: w * 0.4,
        height: w * 0.4,
        alignSelf: 'center',
        position: 'absolute',
        top: w / 2 - 75,
    },

    modal: {
        borderRadius: 30,
        padding: 10,
        width: w * 0.9,
        marginTop: Platform.OS === 'android' ? 50 : 100,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        minHeight: 55,
        width: w * 0.9,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    centerContent: {
        alignItems: 'center'
    },
})