import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = JSON.parse(process.env.REACT_APP_NEXT_PUBLIC_FIREBASE_CONFIG);

const app = firebase.initializeApp(firebaseConfig)

export function getFirestore () {
    return firebase.firestore(app)
}