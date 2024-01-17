"use client"

import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../public/logo.png'
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.logodiv}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src={logo}
                        width={50}
                        height={50}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className={styles.linklist}>
                <Link href="#about-section" className={`${styles.navbarlink} ${styles.pagelink}`}>About</Link>
                <Link href="#product-section" className={`${styles.navbarlink} ${styles.pagelink}`}>Product</Link>
                <Link href="/login" className={`${styles.navbarlink} ${styles.login}`}>Login</Link>
            </div>
        </header>
    )
}
