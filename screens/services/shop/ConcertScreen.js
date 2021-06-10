import React from 'react';
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import Header from '../../../modules/Header';
import { h, w } from '../../../modules/constants';
import {useTheme} from '../../../themes/ThemeManager';
import {useLocale} from '../../../locale/LocaleManager';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


export default function ConcertScreen(props){
    const [tickets, setTickets] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const {mode, theme, toggle} = useTheme();
    const {localeMode, locale, toggleLang} = useLocale();

    React.useEffect(() => {
        fetch(`https://mysibsau.ru/v2/tickets/concert/${props.route.params.id}/`, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setTickets(json)
                setLoaded(true);
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['tickets']} onPress={() => props.navigation.goBack()}/>
            {!loaded ? 
                <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                    <ActivityIndicator size="large" color='#006AB3' />
                </View> :
                <View style={{height: h / 2}}>
                    <ReactNativeZoomableView
                        maxZoom={1.5}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={0.8}
                        bindToBorders={false}
                        style={{
                        backgroundColor: theme.primaryBackground,
                    }}>
                        {tickets.map(line =>{
                            return(
                                <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                                    {line.map(place => {
                                        if(place === null)
                                            return(<View style={{ height: 15, width: 15, backgroundColor: theme.primaryBackground, margin: 3}}/>)
                                        else if(place.price < 0)
                                            return(
                                                <View style={{ height: 15, width: 15, backgroundColor: 'gray', margin: 3, borderRadius: 4}}/>
                                            )
                                        else
                                            return(
                                                <TouchableOpacity style={{ height: 15, width: 15, backgroundColor: '#006AB3', margin: 3, borderRadius: 4}} />
                                            )
                                    })}
                                </View>
                            )
                        })}
                    </ReactNativeZoomableView>
                </View>
            }
        </View>
    )
}