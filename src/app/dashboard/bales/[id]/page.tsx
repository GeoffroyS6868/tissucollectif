"use client"

import React from 'react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { Bale } from '@/src/types/bale';
import axios from 'axios';
import Link from 'next/link';

export default function Page() {
    const params = useParams<{id: string}>();
    const [bale, setBale] = React.useState<Bale | undefined>();

    React.useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await axios.get('/api/bales?id=' + params.id);

                setBale(response.data.bale);

            } catch (error: any) {
                console.error(error.message);
            }
        };

        checkConnection();
    }, [params.id]);

    return (
        <div className={styles.balediv}>
            { bale !== undefined ? (
                <div className={styles.infocard}>
                    <div className={styles.cardtitle}>
                        Bale from {bale.supplierName}
                    </div>
                    <div>
                        {bale.price.toString()}
                    </div>
                </div>
                ) : (
                <div></div>
                )
            }
        </div>
    )
}