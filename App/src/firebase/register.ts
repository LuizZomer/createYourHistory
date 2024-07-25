import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Register(email: string, password:string){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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