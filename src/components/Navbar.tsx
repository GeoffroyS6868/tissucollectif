"use client"

import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.linklist}>
                <Link href="#about-section" className={`${styles.navbarlink} ${styles.pagelink}`}>About</Link>
                <Link href="#product-section" className={`${styles.navbarlink} ${styles.pagelink}`}>Product</Link>
            </div>
            <div className={styles.linklist}>
                <Link href="/login" className={`${styles.navbarlink} ${styles.login}`}>Login</Link>
            </div>
        </header>
    )
}
