import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Localization from 'expo-localization'
import {getLocale} from './locale'

let lang = ''

AsyncStorage.getItem('Locale')
    .then(res => {
        switch(res){
            case 'ru':
                lang = 'ru'
                break
            case 'en':
                lang = 'en'
                break
            default:
                Localization.locale.includes('en') ? lang = 'en' : lang = 'ru'
                AsyncStorage.setItem('Locale', lang)
        }
    })


export const ManageLocaleContext = React.createContext({
    localeMode: lang.slice(0,1),
    theme: getLocale(lang.slice(0,1)),
    toggleLang: () => { }
  });

export const useLocale = () => React.useContext(ManageLocaleContext);

export class LocaleManager extends React.Component {

    state = {
      localeMode: lang
    };
  
    componentDidUpdate () {
      console.log('locale updated');
    }
  
    toggleLocale = async () => {
      this.state.localeMode === 'ru'
        ? this.setState({
          localeMode: 'en'
        })
        : this.setState({
          localeMode: 'ru'
        })
    }
  
    render () {
      return (
        <ManageLocaleContext.Provider value={{
          localeMode: this.state.localeMode,
          locale: getLocale(this.state.localeMode),
          toggleLang: this.toggleLocale
        }}>
          {this.props.children}
        </ManageLocaleContext.Provider>
      )
    }
  }
  
  export default LocaleManager;
