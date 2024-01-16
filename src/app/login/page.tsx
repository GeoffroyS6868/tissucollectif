"use client";

import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onLogin = async () => {
        try {

            console.log({email: email, password: password});

            const response = await axios.post("/api/users/login", {email: email, password: password});

            console.log(response.data);

            router.push("/dashboard");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.loginpage}>
            <div className={styles.logindiv}>
                <h1>Login</h1>
                <div>
                    <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" className={styles.logininput}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" className={styles.logininput}></input>
                </div>
                <button onClick={onLogin} className={styles.loginbutton}>Login</button>
            </div>
        </div>
    );
};

export default Login;