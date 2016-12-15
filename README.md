# RNN-RNPN-BUG
`npm install`

Replace https://github.com/Crash--/RNN-RNPN-BUG/blob/master/src/screens/FirstTabScreen.js#L60 

And 

https://github.com/Crash--/RNN-RNPN-BUG/blob/master/bin/sendGCM.js#L4

https://github.com/Crash--/RNN-RNPN-BUG/blob/master/bin/sendGCM.js#L8 (you will have your token logged when launching the app for the first time)
`react-native run-android` (to have access to your token) 

close the app (not just background) 

`node bin/sendGCM.js` 
