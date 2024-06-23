"use client"

import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { Supplier } from '@/src/types/supplier';
import axios from 'axios';
import SupplierRow from '@/src/components/rows/SupplierRow';

export default function Suppliers() {

    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);

    React.useEffect(() => {
        const getSuppliers = async () => {
            try {
                const response = await axios.get('/api/suppliers');

                setSuppliers(response.data.suppliers);

            } catch (error: any) {
                console.error(error.message);
            }
        };

        getSuppliers();
    }, [suppliers]);

    return (
        <div className={styles.suppliers}>
            <div className={styles.suppliersheader}>
                <h1 className={styles.title}>Suppliers</h1>
                <Link href="/dashboard/suppliers/add" className={styles.actionlink}>Add Suppliers</Link>
            </div>
            <div className={styles.supplierstable}>
                {
                    suppliers.map((supplier: Supplier) => (
                        <SupplierRow key={supplier._id} supplier={supplier} />
                    ))
                }
            </div>
        </div>
    )
}
