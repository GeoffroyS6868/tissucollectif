"use client"

import React from 'react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { Bale } from '@/src/types/bale';
import axios from 'axios';
import Link from 'next/link';
import { typeToString } from '@/src/utils/enumToString';
import { convertDbDateToString } from '@/src/utils/dates';

export default function Page() {
    const params = useParams<{id: string}>();
    const [bale, setBale] = React.useState<Bale | undefined>();

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

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
                    <div className={styles.cardrow}>
                        <div className={styles.cardtitle}>
                            Bale from<div className={styles.cardsupplier}>{bale.supplierName}</div>
                        </div>
                        <div className={styles.cardtitle}>
                            Buy price<div className={styles.cardsupplier}>{bale.price.toString()}€</div>
                        </div>
                    </div>
                    <div className={styles.cardrow}>
                        <div className={styles.cardtitle}>
                            Type<div className={styles.cardsupplier}>{typeToString(bale.type)}</div>
                        </div>
                        <div className={styles.cardtitle}>
                            Date<div className={styles.cardsupplier}>{convertDbDateToString(bale.purchaseDate)}</div>
                        </div>
                    </div>
                </div>
                ) : (
                <div></div>
                )
            }
        </div>
    )
}