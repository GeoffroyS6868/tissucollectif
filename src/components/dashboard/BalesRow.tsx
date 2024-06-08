"use client"

import { BalesListRow } from '@/src/types/bale';
import React from 'react';
import styles from './BalesRow.module.css';
import Link from 'next/link';
import Image from 'next/image';
import edit from '@/public/icon/editblack.png';
import { typeToString, wearToString } from '@/src/utils/enumToString';

export default function BalesRow(props: {bale: BalesListRow}) {

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    return (
        <Link href={"/dashboard/bales/" + props.bale._id} className={styles.balesrow}>
            <div className={`${styles.balesrowcomponent} ${styles.rowlong}`}>
                {props.bale.supplierName}
            </div>
            <div className={`${styles.balesrowcomponent} ${styles.rowmid}`}>
                {props.bale.price.toFixed(2)+'€'}
            </div>
            <div className={`${styles.balesrowcomponent} ${styles.rowshort}`}>
                {typeToString(props.bale.type)}
            </div>
            <div className={`${styles.balesrowcomponent} ${styles.rowshort}`}>
                {wearToString(props.bale.wear)}
            </div>
            <div className={`${styles.balesrowcomponent} ${styles.rowshort}`}>
                {new Intl.DateTimeFormat('fr', dateOptions).format(new Date(props.bale.purchaseDate))}
            </div>
        </Link>
    )
}
