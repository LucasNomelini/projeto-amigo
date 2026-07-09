import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB1Ncbmgz6EYjMc7cDHUA_OdTh9vgnnoC0',
  authDomain: 'projeto-amigo-34f8b.firebaseapp.com',
  projectId: 'projeto-amigo-34f8b',
  storageBucket: 'projeto-amigo-34f8b.firebasestorage.app',
  messagingSenderId: '124901909146',
  appId: '1:124901909146:web:bc1680b7f6598f061eb523'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db =
  getFirestore(app)

export default app