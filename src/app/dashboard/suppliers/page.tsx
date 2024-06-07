"use client"

import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Suppliers() {
    return (
        <div className={styles.suppliers}>
            <div className={styles.suppliersheader}>
                <h1 className={styles.title}>Suppliers</h1>
                <Link href="/dashboard/suppliers/add" className={styles.actionlink}>Add Suppliers</Link>
            </div>
            <div className={styles.supplierstable}>
                <div className={styles.tableheader}>
                    <div className={styles.tableheadercolumn}>
                        Name
                    </div>
                    <div className={styles.tableheadercolumn}>
                        Email
                    </div>
                    <div className={styles.tableheadercolumn}>
                        Country
                    </div>
                    <div className={styles.tableheadercolumn}>
                        Actions
                    </div>
                </div>
            </div>
        </div>
    )
}