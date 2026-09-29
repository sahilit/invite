import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyCLd-PJVspZmljn-wZ_j_XBCLB4NIyaRe8',
  authDomain: 'leap-393508.firebaseapp.com',
  projectId: 'leap-393508',
  storageBucket: 'leap-393508.appspot.com',
  messagingSenderId: '759315932342',
  appId: '1:759315932342:web:d015ef85f68a68f86a7217'
}

const app = initializeApp(firebaseConfig)

const firestore = getFirestore(app)

export default firestore
