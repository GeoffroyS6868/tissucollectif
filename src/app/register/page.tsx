"use client"

import React from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const onRegister = async () => {
        try {
            await axios.post("/api/users/register", user);

            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <label>
                Email
                <input onChange={e => setUser({email: e.target.value, password: user.password, firstName: user.firstName, lastName: user.lastName})}>
                </input>
            </label>
            <label>
                Password
                <input onChange={e => setUser({email: user.email, password: e.target.value, firstName: user.firstName, lastName: user.lastName})}>
                </input>
            </label>
            <label>
                Firstname
                <input onChange={e => setUser({email: user.email, password: user.password, firstName: e.target.value, lastName: user.lastName})}>
                </input>
            </label>
            <label>
                Lastname
                <input onChange={e => setUser({email: user.email, password: user.password, firstName: user.firstName, lastName: e.target.value})}>
                </input>
            </label>
            <button onClick={onRegister}>Register</button>
        </div>
    )
}