import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";



export default async function FireLogin(email: string, password:string){
    const auth = getAuth();
    const retencao = initializeAuth(firebaseApp,{
        persistence:getReactNativePersistence(ReactNativeAsyncStorage),
    })
    return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        return true
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false

    });
}