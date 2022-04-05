import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAkk2WFyDM0Oxbj-y2c_DqokiYqOIArcg4',
  authDomain: 'contacts-b30d2.firebaseapp.com',
  projectId: 'contacts-b30d2',
  storageBucket: 'contacts-b30d2.appspot.com',
  messagingSenderId: '623117528773',
  appId: '1:623117528773:web:8be75f96dfa3fcef910aac',
};

const app = initializeApp(firebaseConfig);


export const database = getDatabase(app);
export const auth = getAuth(app);
