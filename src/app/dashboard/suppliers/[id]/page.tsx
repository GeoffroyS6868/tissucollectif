"use client"

import React from 'react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { Supplier } from '@/src/types/supplier';
import axios from 'axios';
import Link from 'next/link';

export default function Page() {
    const params = useParams<{id: string}>();
    const [supplier, setSupplier] = React.useState<Supplier | undefined>();

    React.useEffect(() => {
        const getSupplier = async () => {
            try {
                const response = await axios.get('/api/suppliers?id=' + params.id);

                setSupplier(response.data.supplier);

            } catch (error: any) {
                console.error(error.message);
            }
        };

        getSupplier();
    }, [params.id]);

    return (
        <div className={styles.supplierdiv}>
            { supplier !== undefined ? (
                <div className={styles.supplierheader}>
                    <div className={styles.supplierpageinfo}>
                        <div className={styles.supplierpagecontext}>
                            Supplier
                        </div>
                        <div className={styles.suppliername}>
                            { supplier.name }
                        </div>
                    </div>
                    <div className={styles.supplierpageinfo}>
                        <Link href="/dashboard/bales/add" className={styles.actionlink}>Add Bale</Link>
                    </div>
                </div>
                ) : (
                <div></div>
                )
            }
        </div>
    )
}