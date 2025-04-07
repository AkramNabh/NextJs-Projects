// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: 'AIzaSyCmhDCa-LuVQRM4I4faQbT8RatQShMRfRA',
    authDomain: 'interview-app-20029.firebaseapp.com',
    projectId: 'interview-app-20029',
    storageBucket: 'interview-app-20029.firebasestorage.app',
    messagingSenderId: '666243581055',
    appId: '1:666243581055:web:81c70ea3c54196ecaf6b4a',
    measurementId: 'G-E5H87Y973K',
}

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
