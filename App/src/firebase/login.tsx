import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function FireLogin(email: string, password:string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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