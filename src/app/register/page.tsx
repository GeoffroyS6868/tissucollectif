"use client"

import React from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RegisterPage() {

    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    const onRegister = async () => {
        try {

            if (email === "" || password === "" || firstName === "" || lastName === "") {
                return;
            }

            await axios.post("/api/users/register", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            });

            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.registerpage}>
            <div className={styles.registerdiv}>
                <h1>Register</h1>
                <div>
                    <label>First name</label>
                    <input onChange={e => setFirstName(e.target.value)} type="text" placeholder="Enter your first name" className={styles.registerinput}></input>
                </div>
                <div>
                    <label>Last name</label>
                    <input onChange={e => setLastName(e.target.value)} type="text" placeholder="Enter your last name" className={styles.registerinput}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" className={styles.registerinput}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" className={styles.registerinput}></input>
                </div>
                <button onClick={onRegister} className={styles.registerbutton}>Register</button>
            </div>
        </div>
    )
}