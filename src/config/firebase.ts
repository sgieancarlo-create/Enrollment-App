import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXmZ9QK3vZ8xK5xK5xK5xK5xK5xK5xK5x",
  authDomain: "enrollment-system.firebaseapp.com",
  projectId: "enrollment-system",
  storageBucket: "enrollment-system.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);

// Export functions that return auth/db instances
// This delays initialization until they're actually used
export const getAuthInstance = (): Auth => getAuth(app);
export const getDbInstance = (): Firestore => getFirestore(app);

// For backward compatibility, export as properties
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
