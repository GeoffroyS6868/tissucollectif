"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './DashboardNavbar.module.css';
import stats from '@/public/icon/stats.png';
import box from '@/public/icon/box.png';
import shop from '@/public/icon/shop.png';
import truck from '@/public/icon/truck.png';

export default function DashboardNavbar() {
    return (
        <header className={styles.sidebar}>
            <div className={styles.nav}>
                <Link href={'/dashboard'} className={styles.navdiv}>
                    <Image src={stats} alt="Stats icon" className={styles.navicon}/>
                    <h1 className={styles.navtitle}>Dashboard</h1>
                </Link>
                <Link href={'/dashboard/clothes'} className={styles.navdiv}>
                    <Image src={shop} alt="Shop icon" className={styles.navicon}/>
                    <h1 className={styles.navtitle}>Clothes</h1>
                </Link>
                <Link href={'/dashboard/bales'} className={styles.navdiv}>
                    <Image src={box} alt="Stats icon" className={styles.navicon}/>
                    <h1 className={styles.navtitle}>Bales</h1>
                </Link>
                <Link href={'/dashboard/suppliers'} className={styles.navdiv}>
                    <Image src={truck} alt="Truck icon" className={styles.navicon}/>
                    <h1 className={styles.navtitle}>Suppliers</h1>
                </Link>
            </div>
        </header>
    )
}
