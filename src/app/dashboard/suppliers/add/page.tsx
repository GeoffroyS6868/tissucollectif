"use client"

import React from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();
    const [name, setName] = React.useState<string>("");
    const [website, setWebsite] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    const createBale = async () => {
        try {

            if (name === "" || website === "" || email === "") {
                return;
            }

            const response = await axios.post("/api/suppliers", {
                name: name,
                website: website,
                email: email,
            });

            const data = response.data as {message?: string, id?: string};

            if (data.message && data.id) {
                router.push("/dashboard/suppliers");
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.suppliers}>
            <h1 className={styles.title}>Create a Supplier</h1>
            <div className={styles.inputdiv}>
                <label className={styles.subtitle}>Name</label>
                <input id='price' type='text' onChange={(e) => {setName(e.target.value)}} className={styles.textinput}></input>
            </div>
            <div className={styles.inputdiv}>
                <label className={styles.subtitle}>Website</label>
                <input id='price' type='text' onChange={(e) => {setWebsite(e.target.value)}} className={styles.textinput}></input>
            </div>
            <div className={styles.inputdiv}>
                <label className={styles.subtitle}>Email</label>
                <input id='price' type='text' onChange={(e) => {setEmail(e.target.value)}} className={styles.textinput}></input>
            </div>
            <div>
                <button onClick={createBale} className={styles.createButton}>Create</button>
            </div>
        </div>
    )
}

