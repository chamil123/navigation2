import PushNotification from 'react-native-push-notification';

export default class CustomPushNotification {

    testPush(data) {
        // let { _title, _message, _ticker, _bigText, _subText} = this.props
        PushNotification.localNotificationSchedule({

            title: data._title, // (optional, for iOS this is only used in apple watch, the title will be the app name in other devices)
            message: "My Notification Message",// (required)

            ticker: "My Notification Ticker", // (optional)

            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: data._bigText, // (optional) default: "message" prop
            subText: "Reminder from MyApp", // (optional) default: none


            date: new Date(Date.now()) // in 60 secs

        });
    }

}