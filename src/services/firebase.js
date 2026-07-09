import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'projeto-amigo-34f8b.firebaseapp.com',
  projectId: 'projeto-amigo-34f8b',
  storageBucket: 'projeto-amigo-34f8b.firebasestorage.app',
  messagingSenderId: '124901909146',
  appId: '1:124901909146:web:bc1680b7f6598f061eb523'
}

const app = initializeApp(
  firebaseConfig
)

export const auth =
  getAuth(app)

export default app