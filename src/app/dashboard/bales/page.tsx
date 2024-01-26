"use client"

import React from 'react';
import styles from './page.module.css';
import { Bale } from '@/src/types/bale';
import BalesRow from '@/src/components/dashboard/BalesRow';
import axios from 'axios';
import Link from 'next/link';

export default function Bales() {

    const [bales, setBales] = React.useState<Bale[]>([]);

    React.useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await axios.get('/api/bales');

                setBales(response.data.bales);

            } catch (error: any) {
                console.error(error.message);
            }
        };

        checkConnection();
    }, [bales]);

    return (
        <div className={styles.bales}>
            <div className={styles.balescard}>
                <div className={styles.balescardheader}>
                    <div className={styles.balescardheadertitlediv}>
                        <h1 className={styles.title}>Bales</h1>
                    </div>
                    <div className={styles.balescardheaderactions}>
                        <Link href="/dashboard/bales/add" className={styles.actionlink}>Add Bale</Link>
                    </div>
                </div>
                <div className={styles.balestable}>
                    <div className={styles.tableheader}>
                        <div className={styles.tableheadercolumn}>
                            Purchase date
                        </div>
                        <div className={styles.tableheadercolumn}>
                            Supplier
                        </div>
                        <div className={styles.tableheadercolumn}>
                            Price
                        </div>
                        <div className={styles.tableheadercolumn}>
                            Type
                        </div>
                        <div className={styles.tableheadercolumn}>
                            Wear
                        </div>
                        <div className={styles.tableheadercolumn}>
                            Actions
                        </div>
                    </div>
                    {
                        bales.map((bale: Bale) => (
                            <BalesRow key={bale._id} bale={bale} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}