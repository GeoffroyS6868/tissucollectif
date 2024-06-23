"use client"

import React from 'react';
import styles from './page.module.css';
import axios from 'axios';
import { Bale } from '@/src/types/bale';
import Link from 'next/link';

export default function Clothes() {

    const [clothes, setClothes] = React.useState<Bale[]>([]);

    React.useEffect(() => {
        const getClothes = async () => {
            try {
                const response = await axios.get('/api/clothes');

                setClothes(response.data.clothes);

            } catch (error: any) {
                console.error(error.message);
            }
        };

        getClothes();
    }, [clothes]);

    return (
        <div className={styles.clothes}>
            <div className={styles.clothesheader}>
                <h1 className={styles.title}>Clothes</h1>
                <Link href="/dashboard/clothes/add" className={styles.actionlink}>Add Cloth</Link>
            </div>
            <div className={styles.clothestable}>
                {
                    //clothes.map((bale: Bale) => (
                    //    <ClothesRow key={bale._id} bale={bale} />
                    //))
                }
            </div>
        </div>
    )
}