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
        <div className={styles.balesrow}>
            <div className={styles.balesrowcomponent}>
                {new Intl.DateTimeFormat('fr', dateOptions).format(new Date(props.bale.purchaseDate))}
            </div>
            <div className={styles.balesrowcomponent}>
                {props.bale.supplierName}
            </div>
            <div className={styles.balesrowcomponent}>
                {props.bale.price.toFixed(2)+'€'}
            </div>
            <div className={styles.balesrowcomponent}>
                {typeToString(props.bale.type)}
            </div>
            <div className={styles.balesrowcomponent}>
                {wearToString(props.bale.wear)}
            </div>
            <div className={styles.balesrowcomponent}>
                <Link href={"/dashboard/bales/edit/" + props.bale._id} className={styles.editlink}>
                    <Image src={edit} alt="Edit icon" className={styles.editicon}/>
                </Link>
            </div>
        </div>
    )
}
