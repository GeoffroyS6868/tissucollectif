"use client";

import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

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
        <div>
            <label>
                Email
                <input onChange={e => setEmail(e.target.value)}>
                </input>
            </label>
            <label>
                Password
                <input onChange={e => setPassword(e.target.value)}>
                </input>
            </label>
            <button onClick={onLogin}>Login</button>
        </div>
    );
};

export default Login;