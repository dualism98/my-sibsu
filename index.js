import { registerRootComponent } from 'expo';

import App from './App';

// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging()
  .subscribeToTopic('allUsers_android')
  .then(() => console.log('Subscribed to topic!'));

AppRegistry.registerComponent('main', () => App);

registerRootComponent(App)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
