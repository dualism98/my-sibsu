// LIBS
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View,  Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Animated, {Easing} from 'react-native-reanimated'

// SCREENS
  // Hello
  import HelloScreen from './HelloScreen'
  import AuthScreen from './AuthScreen'
  // Feed
  import EventsScreen from './EventsScreen'
  import NewsScreen from './NewsScreen'

  // Menu
  import MenuScreen from './Menu/MenuScreen'
  import DinersScreen from './Menu/DinersScreen'

  // Timetable
  import SearchScreen from './Timetable/SearchScreen'
  import TimetableScreen from './Timetable/TimetableScreen'

  // Services 
  import ServiceScreen from './ServiceScreen'
    // Institutes
    import InstitutesScreen from './services/Institutes/InstitutesScreen'
    import IITK from './services/Institutes/Institute'
    // Student Life
    import ActiveScreen from './services/student_life/ActiveScreen'
    import SportScreen from './services/student_life/SportScreen'
    import DesignScreen from './services/student_life/DesignScreen'
    import Ermak from './services/student_life/Unit'
    //Map
    import MapScreen from './services/MapScreen'
    // Online Catalog (tickets)
    import ShopScreen from './services/shop/ShopScreen'
    import ProductScreen from './services/shop/ProductScreen' 
    import ConcertsScreen from './services/shop/ConcertsScreen'
    import ConcertScreen from './services/shop/ConcertScreen'
    // Vacancies
    import VacanciesScreen from './services/vacancies/VacanciesScreen'
    import Vacancy from './services/vacancies/Vacancy'
    // Feedback
    import TopicsScreen from './services/poll/TopicsScreen'
    import PollScreen from './services/poll/PollScreen'
    // FAQ
    import FAQScreen from './services/FAQScreen'
    // Library
    import LibrarySearchScreen from './services/library/LibrarySearchScreen'
    import DigitalScreen from './services/library/DigitalScreen'
    import PhysicalScreen from './services/library/PhysicalScreen'
  
// Person
import PersonScreen from './personPage/PersonScreen'
import ProfileScreen from './personPage/ProfileScreen'
import SettingsScreen from './personPage/SettingsScreen'
import AttestationScreen from './personPage/AttestationScreen'
import MarksScreen from './personPage/MarksScreen'

// MODULES
import { useTheme } from '../themes/ThemeManager'
import { useLocale } from '../locale/LocaleManager'

// ICONS
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

function LibraryTabBar({ state, descriptors, navigation, position }) {
  const {mode, theme, toggle} = useTheme()
  const inputRange = state.routes.map((_, i) => i);
  const translateX = Animated.interpolate(position, {
    inputRange,
    outputRange: inputRange.map(i => i * Dimensions.get('window').width / 4)
  })
  
  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.blockColor, elevation: 6}}>
      <TouchableOpacity onPress={() => navigation.navigate('LibrarySearch')}>
        <View style={{ height: Dimensions.get('window').width / 8, width: Dimensions.get('window').width / 4 , justifyContent: 'center'}}>
          <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 10, paddingLeft: 15}}/>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
            style.slider,
            {
                left: Dimensions.get('window').width / 4,
                transform: [{translateX}],
                width: Dimensions.get('window').width / 4,
                height: 2,
                backgroundColor: theme.blueColor
            },
        ]}
          />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width: Dimensions.get('window').width / 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <Animated.Text style={{ textTransform: 'uppercase', fontFamily: 'roboto', color: theme.labelColor, fontSize: 13, opacity }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const LibraryTab = createMaterialTopTabNavigator();

function LibraryTabs({route}){
  const {localeMode, locale, toggleLang} = useLocale()
  const {mode, theme, toggle} = useTheme()
  return (
    <LibraryTab.Navigator 
      tabBar={props => <LibraryTabBar {...props} />} 
      tabBarOptions={{
        activeTintColor: theme.labelColor,
        allowFontScaling: false,
      }}
    >
      <LibraryTab.Screen options={ ({route}) => ({ title: locale['digital'], data: route.params })} name="Digital" component={DigitalScreen} />
      <LibraryTab.Screen options={ ({route}) => ({ title: locale['printed'], data: route.params })} name="Physical" component={PhysicalScreen} />
    </LibraryTab.Navigator>
  );
}

const FeedTab = createMaterialTopTabNavigator();

function FeedTabs() {
  const {localeMode, locale, toggleLang} = useLocale()
  const {mode, theme, toggle} = useTheme()
  return (
    <FeedTab.Navigator tabBarOptions={{
      labelStyle: {
        fontFamily: 'roboto',
        fontSize: 13,
      },
      tabStyle: {
        height: Dimensions.get('window').width / 8,
        width: Dimensions.get('window').width / 4,
      },
      style: {
        backgroundColor: theme.blockColor,
        paddingLeft: Dimensions.get('window').width / 4,
        elevation: 6
      },
      indicatorStyle: {
        marginLeft: Dimensions.get('window').width / 4,
        color: theme.blueColor
      },
      activeTintColor: theme.labelColor,
      allowFontScaling: false,
    }}>
      <FeedTab.Screen  options={{ title: locale['events'] }} name="Events" component={EventsScreen} />
      <FeedTab.Screen options={{ title: locale['news'] }} name="News" component={NewsScreen} />
    </FeedTab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, position }) {
  const {mode, theme, toggle} = useTheme()
  const inputRange = state.routes.map((_, i) => i);
  const translateX = Animated.interpolate(position, {
    inputRange,
    outputRange: inputRange.map(i => i * Dimensions.get('window').width / 4)
  })
  
  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.blockColor, elevation: 6}}>
      <TouchableOpacity onPress={() => navigation.navigate('Service')}>
        <View style={{ height: Dimensions.get('window').width / 8, width: Dimensions.get('window').width / 8 , justifyContent: 'center'}}>
          <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 10, paddingLeft: 15}}/>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
            style.slider,
            {
                transform: [{translateX}],
                width: Dimensions.get('window').width / 4,
                height: 2,
                backgroundColor: theme.blueColor
            },
        ]}
          />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width: Dimensions.get('window').width / 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <Animated.Text style={{ textTransform: 'uppercase', fontFamily: 'roboto', color: theme.labelColor, fontSize: 13, opacity }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const StudentLifeTab = createMaterialTopTabNavigator();

function StudentLifeTabs(){
  const {localeMode, locale, toggleLang} = useLocale()
  const {mode, theme, toggle} = useTheme()
  return(
    <StudentLifeTab.Navigator tabBar={props => <MyTabBar {...props} />} tabBarOptions={{
      indicatorStyle: {
        marginLeft: Dimensions.get('window').width / 8
      },
      activeTintColor: theme.labelColor,
    }}>
      <StudentLifeTab.Screen listeners={{state: e => console.log(e)}} options={{ title: locale['unions']}} name="Unions" component={ActiveScreen} />
      <StudentLifeTab.Screen listeners={{state: e => console.log(e)}} options={{ title: locale['sport']}} name="Sport" component={SportScreen} />
      <StudentLifeTab.Screen listeners={{state: e => console.log(e)}} options={{ title: locale['sdo']}} name="Design" component={DesignScreen} />
    </StudentLifeTab.Navigator>
  )
}

const Tabs = createBottomTabNavigator();

function BottomTab(){
  const {localeMode, locale, toggleLang} = useLocale()
  
    return (
      <Tabs.Navigator initialRouteName={'Timetable'} tabBar={(props) => <MainTabBar {...props} />}>
        <Tabs.Screen name={'Feed'} component={FeedTabs}
        options={{
          headerShown: false,
          title: locale['feed']
        }}/>
        <Tabs.Screen name={'Menu'} component={MenuStackScreen} 
        options={{
          headerShown: false,
          title: locale['menu']
        }}/>
        <Tabs.Screen name={'Timetable'} component={TimetableStackScreen}
        options={{
          headerShown: false,
          title: locale['timetable']
        }}
        />
        <Tabs.Screen name={'Services'} component={ServiceStackScreen} 
        options={{
          headerShown: false,
          title: locale['services']
        }}/>
        <Tabs.Screen name={'Profile'} component={PersonStackScreen}
        options={{
          headerShown: false,
          title: locale['profile']
        }}/>
      </Tabs.Navigator>
  )
}

const HelloStack = createStackNavigator();

export default function Navigation({firstLaunch}){
  var initialName = firstLaunch === true ? 'Hello' : 'Bottom' 
  console.log(initialName, firstLaunch)
  return(
    <NavigationContainer>
      <HelloStack.Navigator initialRouteName={initialName} headerMode='none'>
        <HelloStack.Screen name='Hello' component={HelloScreen} />
        <HelloStack.Screen name='Auth' component={AuthScreen} />
        <HelloStack.Screen name='Bottom' component={BottomTab} />
      </HelloStack.Navigator>
    </NavigationContainer>
  )
}

const MenuStack = createStackNavigator();

function MenuStackScreen(){
  const [screen, setScreen] = useState('')

  const Layout = (initialName) => {
    if(initialName === '')
      return(<View></View>)
    else
      return(
        <MenuStack.Navigator initialRouteName={initialName} headerMode='none'>
          <MenuStack.Screen name='DinersScreen' component={DinersScreen} />
          <MenuStack.Screen name='MenuScreen' component={MenuScreen} />
        </MenuStack.Navigator>
      )
  }

  useEffect(() => {
    AsyncStorage.getItem('Diner')
      .then(res => {
        if(res !== null)
          setScreen('MenuScreen')
        else
          setScreen('DinersScreen')
      })
  })

  return(Layout(screen))
}

const TimetableStack = createStackNavigator();


function TimetableStackScreen(){
  const [screen, setScreen] = useState('')

  const Layout = (initialName) => {
    if(initialName === '')
      return(<View></View>)
    else
      return(
        <TimetableStack.Navigator initialRouteName={initialName} headerMode='none'>
          <TimetableStack.Screen 
            listeners={{
              tabPress: e => {
                e.preventDefault();
              },
            }} 
            name='SearchScreen' 
            component={SearchScreen} />
          <TimetableStack.Screen 
            listeners={{
              tabPress: e => {
                e.preventDefault();
              },
            }} 
            name='TimetableScreen' 
            component={TimetableScreen} />
        </TimetableStack.Navigator>
      )
  }

  useEffect(() => {
    AsyncStorage.getItem('@key')
    .then(res => {
      if (res !== null)
        setScreen('TimetableScreen')
      else
        setScreen('SearchScreen')
    })
  }, [])

  return(
    Layout(screen)
  )
}

const PersonStack = createStackNavigator();
  

function PersonStackScreen(){
  const [screen, setScreen] = useState('')

  const Layout = (initialName) => {
    if(initialName === '')
      return(<View></View>)
    else
      return(
        <PersonStack.Navigator initialRouteName={initialName} headerMode='none'>
          <PersonStack.Screen name='Account' component={PersonScreen} />
          <PersonStack.Screen name='Profile' component={ProfileScreen} 
          listeners={{
            tabPress: e => {
              e.preventDefault();
            },
          }}/>
          <PersonStack.Screen name='Settings' component={SettingsScreen} />
          <PersonStack.Screen name='Attestation' component={AttestationScreen} />
          <PersonStack.Screen name='Marks' component={MarksScreen} />
        </PersonStack.Navigator>
      )
  }

  useEffect(() => {
    AsyncStorage.getItem('User')
    .then(res => {
      if (res !== null)
        setScreen('Profile')
      else
        setScreen('Account')
    })
  }, [])

  return(
    Layout(screen)
  )
}

const ServiceStack = createStackNavigator();

function ServiceStackScreen(){
  return(
    <ServiceStack.Navigator initialRouteName='Service' headerMode='none'>
      <ServiceStack.Screen name="Service" component={ServiceScreen} />
      <ServiceStack.Screen name="Active" component={StudentLifeTabs} />
      <ServiceStack.Screen name='Ermak' component={Ermak} />
      <ServiceStack.Screen name="Institutes" component={InstitutesScreen} />
      <ServiceStack.Screen name="IITK" component={IITK} />
      <ServiceStack.Screen name="Map" component={MapScreen} />
      <ServiceStack.Screen name='Shop' component={ShopScreen} />
      <ServiceStack.Screen name='Product' component={ProductScreen} />
      <ServiceStack.Screen name='Concerts' component={ConcertsScreen} />
      <ServiceStack.Screen name='CurrentConcert' component={ConcertScreen} />
      <ServiceStack.Screen name='Vacancies' component={VacanciesScreen} />
      <ServiceStack.Screen name='Vacancy' component={Vacancy} />
      <ServiceStack.Screen name='Topics' component={TopicsScreen} />
      <ServiceStack.Screen name='Poll' component={PollScreen} />
      <ServiceStack.Screen name='FAQ' component={FAQScreen} />
      <ServiceStack.Screen name='LibrarySearch' component={LibrarySearchScreen} />
      <ServiceStack.Screen name='LibraryResult' component={LibraryTabs} />
    </ServiceStack.Navigator>
  )
}

const BottomMenuItem = ({ iconName, label, isCurrent }) => {
  const {mode, theme, toggle} = useTheme()

  const icons = {
    'Feed': <MaterialCommunityIcons name="timetable" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'}  />, 
    'Menu': <MaterialIcons name="restaurant-menu" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />, 
    'Timetable': <MaterialCommunityIcons name="calendar-text" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />, 
    'Services': <AntDesign name="appstore-o" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />,
    'Profile': <Ionicons name='md-person' size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />}

  const color = isCurrent ? theme.blueColor : 'gray'
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icons[iconName]}
      <Text style={{ fontFamily: 'roboto', fontSize: 10, color: color }}>{label}</Text>
    </View>
  );
};


const MainTabBar = ({state, descriptors, navigation}) => {
  const {mode, theme, toggle} = useTheme()
  const totalWidth = Dimensions.get("window").width;
  return (
    <View style={[style.tabContainer, { width: totalWidth, backgroundColor: theme.blockColor}]}>
      <View style={{ flexDirection: "row" }}>
          {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
          if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
          }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
          });
          };

return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                iconName={route.name}
                label={options.title}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })
      }
      </View>
    </View> 
  )
}

const style = StyleSheet.create({
  tabContainer: {
    height: 50,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    position: "absolute",
    bottom: 0,
    left: Dimensions.get('window').width / 8,
    borderRadius: 10,
},
});