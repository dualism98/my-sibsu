import React from 'react';
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import Header from '../../../modules/Header';
import { h, w } from '../../../modules/constants';
import {useTheme} from '../../../themes/ThemeManager';
import {useLocale} from '../../../locale/LocaleManager';


export default function ConcertsScreen(props){
    const [concerts, setConcerts] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const {mode, theme, toggle} = useTheme();
    const {localeMode, locale, toggleLang} = useLocale();

    React.useEffect(() => {
        fetch(`https://mysibsau.ru/v2/tickets/all_concerts/${props.route.params.id}/`, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setConcerts(json)
                setLoaded(true);
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['date_and_time']} onPress={() => props.navigation.goBack()}/>
            {!loaded ? 
                <View style={{flex: 1, justifyContent: 'center', paddingBottom: 100}}>
                    <ActivityIndicator size="large" color='#006AB3' />
                </View> :
                <FlatList 
                    data={concerts}
                    renderItem={({ item }) => 
                        <TouchableOpacity onPress={() => props.navigation.navigate('CurrentConcert', {id: item.id})} style={{width: w * 0.9, borderRadius: 15, padding: 10, backgroundColor: theme.blockColor, elevation: 5, alignSelf: 'center', marginTop: 10}}>
                            <Text style={{fontFamily: 'roboto', fontSize: 17, color: theme.labelColor}}>{locale['date']}: {item.date}</Text>
                            <Text style={{fontFamily: 'roboto', fontSize: 17, color: theme.labelColor}}>{locale['time']}: {item.time}</Text>
                            <Text style={{fontFamily: 'roboto', fontSize: 17, color: theme.labelColor}}>{locale['hall']}: {item.hall}</Text>
                        </TouchableOpacity>
                    }
                    // keyExtractor={item => item.name}
                    contentContainerStyle={{paddingBottom: 120}}
                    initialNumToRender={10}/>
            }
        </View>
    )
}