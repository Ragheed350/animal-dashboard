// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyDJrTfROVbSxzlGWhZLz9QiIfx3u7jkLV0',
  authDomain: 'animals-tag-87b89.firebaseapp.com',
  projectId: 'animals-tag-87b89',
  storageBucket: 'animals-tag-87b89.appspot.com',
  messagingSenderId: '1065517190526',
  appId: '1:1065517190526:web:e63fabab6897968d1bf72f',
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
