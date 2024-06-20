"use client"

import React from 'react';
import styles from './SupplierRow.module.css';
import Link from 'next/link';
import { Supplier } from '@/src/types/supplier';

export default function SupplierRow(props: {supplier: Supplier}) {

    return (
        <Link href={"/dashboard/suppliers/" + props.supplier._id} className={styles.suppliersrow}>
            <div className={`${styles.suppliersrowcomponent} ${styles.rowmid}`}>
                {props.supplier.name}
            </div>
            <div className={`${styles.suppliersrowcomponent} ${styles.rowmid}`}>
                {props.supplier.email}
            </div>
            <div className={`${styles.suppliersrowcomponent} ${styles.rowmid}`}>
                {props.supplier.website}
            </div>
        </Link>
    )
}
