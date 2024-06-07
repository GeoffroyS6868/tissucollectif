"use client"

import React from 'react';
import Link from 'next/link';
import styles from './DashboardNavbar.module.css';

export default function DashboardNavbar() {
    return (
        <header className={styles.sidebar}>
            <div className={styles.nav}>
                <Link href={'/dashboard'} className={styles.navdiv}>
                    <h1 className={styles.navtitle}>Dashboard</h1>
                </Link>
                <Link href={'/dashboard/clothes'} className={styles.navdiv}>
                    <h1 className={styles.navtitle}>Clothes</h1>
                </Link>
                <Link href={'/dashboard/bales'} className={styles.navdiv}>
                    <h1 className={styles.navtitle}>Bales</h1>
                </Link>
                <Link href={'/dashboard/suppliers'} className={styles.navdiv}>
                    <h1 className={styles.navtitle}>Suppliers</h1>
                </Link>
            </div>
        </header>
    )
}
