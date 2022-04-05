import { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  ref,
  set,
  onValue,
  get,
  getDatabase,
  remove,
  update,
  serverTimestamp,
} from 'firebase/database';
import { auth, database } from '../firebase/firebase-config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = onAuthStateChanged(auth, (fireBaseUser) => {
      setUser(fireBaseUser);
    });

    return () => {
      currentUser();
    };
  }, []);

  const createAccount = async (mail, password) => {
    await createUserWithEmailAndPassword(auth, mail, password);
  };

  const logIn = async (mail, password) => {
    await signInWithEmailAndPassword(auth, mail, password);
  };

  const addContact = async (id, name, lastName, date) => {
    await set(ref(database, `contacts/${id}`), {
      id: id,
      name,
      lastName,
      date,
      favContact: false,
    });
  };

  const updateContact = async (id, name, lastName, date) => {
    await update(ref(database, `contacts/${id}`), {
      id: id,
      name,
      lastName,
      date,
      favContact: false,
    });
  };

  const deleteContact = async (id) => {
    await remove(ref(database, `contacts/${id}`));
  };

  const favContact = async (id) => {
    await update(ref(database, `contacts/${id}`), {
      favContact: !favContact,
    });
  };

  const linkToDetailPage = async (id) => {
    await get(ref(database, `contacts/${id}`));
  };

  return (
    <UserContext.Provider
      value={{
        createAccount,
        logIn,
        user,
        addContact,
        signOut,
        onValue,
        ref,
        get,
        getDatabase,
        deleteContact,
        favContact,
        updateContact,
        linkToDetailPage,
        serverTimestamp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
