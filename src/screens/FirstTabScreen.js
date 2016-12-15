import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import {Navigation} from 'react-native-navigation';

var PushNotification = require('react-native-push-notification');


export default class FirstTabScreen extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/navicon_menu.png'),
      id: 'menu'
    }],
    rightButtons: [
      {
        title: 'Edit',
        id: 'edit'
      },
      {
        icon: require('../../img/navicon_add.png'),
        id: 'add'
      }
    ]
  };
  static navigatorStyle = {
    navBarBackgroundColor: '#4dbce9',
    navBarTextColor: '#ffff00',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount(){
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          console.log( 'TOKEN:', token );
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
      senderID: "YOUR_SENDER_ID",      
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }
  onNavigatorEvent(event) {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
    if (event.id === 'edit') {
      Alert.alert('NavBar', 'Edit button pressed');
    }
    if (event.id === 'add') {
      Alert.alert('NavBar', 'Add button pressed');
    }
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <TouchableOpacity onPress={ this.onPushPress.bind(this) }>
          <Text style={styles.button}>Push Plain Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onPushStyledPress.bind(this) }>
          <Text style={styles.button}>Push Styled Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onModalPress.bind(this) }>
          <Text style={styles.button}>Show Modal Screen</Text>
        </TouchableOpacity>

        {
          Platform.OS === 'ios' ?
            <TouchableOpacity onPress={ this.onLightBoxPress.bind(this) }>
              <Text style={styles.button}>Show LightBox</Text>
            </TouchableOpacity> : false
        }

        {
          Platform.OS === 'ios' ?
            <TouchableOpacity onPress={ this.onInAppNotificationPress.bind(this) }>
              <Text style={styles.button}>Show In-App Notification</Text>
            </TouchableOpacity> : false
        }

        <TouchableOpacity onPress={ this.onStartSingleScreenApp.bind(this) }>
          <Text style={styles.button}>Show Single Screen App</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onPushPress() {
    this.props.navigator.push({
      title: "More",
      screen: "example.PushedScreen"
    });
  }

  onPushStyledPress() {
    this.props.navigator.push({
      title: "Styled",
      screen: "example.StyledScreen"
    });
  }

  onModalPress() {
    this.props.navigator.showModal({
      title: "Modal",
      screen: "example.ModalScreen"
    });
  }

  onLightBoxPress() {
    this.props.navigator.showLightBox({
      screen: "example.LightBoxScreen",
      style: {
        backgroundBlur: "dark"
      },
      passProps: {
        greeting: 'hey there'
      },
    });
  }

  onInAppNotificationPress() {
    this.props.navigator.showInAppNotification({
      screen: "example.NotificationScreen"
    });
  }

  onStartSingleScreenApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'example.FirstTabScreen'
      },
      drawer: {
        left: {
          screen: 'example.SideMenu'
        }
      }
    });
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
});
