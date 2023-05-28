"use client"

import { initializeApp } from 'firebase/app';
import {
    FirebaseAppProvider,
    AuthProvider,
    DatabaseProvider
} from 'reactfire';
import { initializeAuth, browserLocalPersistence, browserPopupRedirectResolver,inMemoryPersistence, browserSessionPersistence, indexedDBLocalPersistence, } from "firebase/auth";
import configuration from '~/configuration';
import { ReactNode } from "react"
import { getDatabase } from 'firebase/database';

interface FireBaseProviderProps {
    children: ReactNode;
}


const FireBaseProvider: React.FC<FireBaseProviderProps> = ({ children }) => {
    const app = initializeApp(configuration.firebase);
    const persistence = typeof window === undefined ? inMemoryPersistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]
    const auth = initializeAuth(app, {
        persistence,
        popupRedirectResolver: browserPopupRedirectResolver,
    });
    const database = getDatabase(app);

    return (
        <FirebaseAppProvider firebaseApp={app}>
            <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>

                {children}
                </DatabaseProvider>
            </AuthProvider>
        </FirebaseAppProvider>
    )


}

export default FireBaseProvider;