
import {
    Auth,
    AuthError,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    UserCredential,
  } from 'firebase/auth';
  import { useCallback, useState } from 'react';

  
  type SignInWithEmailLinkHook = [
    (email: string, password: string) => Promise<UserCredential | undefined>,
    UserCredential | undefined,
    boolean,
    AuthError | undefined
  ];

  export default (
    auth: Auth
  ): SignInWithEmailLinkHook => {
    const [error, setError] = useState<AuthError>();
    const [registeredUser, setRegisteredUser] = useState<UserCredential>();
    const [loading, setLoading] = useState<boolean>(false);
  
    const createUserWithEmailAndPassword = useCallback(
      async (email: string, password: string) => {
        setLoading(true);
        setError(undefined);
        try {
          const user = await firebaseCreateUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          setRegisteredUser(user);
          return user;
        } catch (error) {
          setError(error as AuthError);
        } finally {
          setLoading(false);
        }
      },
      [auth]
    );
  
    return [createUserWithEmailAndPassword, registeredUser, loading, error];
  };