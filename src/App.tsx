import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD32fBl_RMDgVTNqDTRyHG9GAJ6OnpwfFM",
  authDomain: "firechat-c3132.firebaseapp.com",
  projectId: "firechat-c3132",
  storageBucket: "firechat-c3132.appspot.com",
  messagingSenderId: "441203274389",
  appId: "1:441203274389:web:54dd1c849ecff481d2619c",
  measurementId: "G-D6S6PDDW2B"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth } 

function App() {
  const [user] = useAuthState(auth)
  return (
    <div>
           {user ? <Chat /> : <SignIn />}
    </div>
  );
}

export default App;
