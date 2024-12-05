import firebase from 'firebase/app';
import 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1P5P2TPkBg3uHHaT-jWbOVebfdjpIGpY",
    authDomain: "recording-app-f4e28.firebaseapp.com",
    projectId: "recording-app-f4e28",
    storageBucket: "recording-app-f4e28.firebasestorage.app",
    messagingSenderId: "399599698615",
    appId: "1:399599698615:web:fd45c3611dd4dbb81f8332"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

export default firebase;