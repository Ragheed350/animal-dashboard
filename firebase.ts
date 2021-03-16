import firebase from 'node_modules/firebase/app';
import 'node_modules/firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDJrTfROVbSxzlGWhZLz9QiIfx3u7jkLV0',
  authDomain: 'animals-tag-87b89.firebaseapp.com',
  projectId: 'animals-tag-87b89',
  storageBucket: 'animals-tag-87b89.appspot.com',
  messagingSenderId: '1065517190526',
  appId: '1:1065517190526:web:e63fabab6897968d1bf72f',
};

let messaging: firebase.messaging.Messaging;

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  (window as any).firebase = firebase;
  messaging = firebase.messaging();
}

export { firebase };
export const getToken = (setTokenFound: (str: string) => void) => {
  return messaging
    .getToken({
      vapidKey:
        'BC4O4hZfFnlOP0a6D4S5Pa48aLnidts-r74_JfjqDlJogQksUocWr-GfigPf0fRLW2C_juDXuy90Lm5dUC-XfDo',
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. \n', err);
      // catch error while creating client token
    });
};
export const onMessageListener = (): Promise<Message> =>
  new Promise((resolve) => {
    messaging.onMessage((payload: Message) => {
      resolve(payload);
    });
  });

interface Message {
  data: Data;
  from: string;
  priority: string;
  notification: Notification;
  collapse_key: string;
}

interface Notification {
  title: string;
  body: string;
  tag: string;
}

interface Data {
  'gcm.n.e': string;
  'google.c.a.ts': string;
  'google.c.a.udt': string;
  'google.c.a.e': string;
  'google.c.a.c_id': string;
  'google.c.a.c_l': string;
}
