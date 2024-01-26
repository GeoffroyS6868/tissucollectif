"use client"

import React from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { Clothes } from '@/src/enum/clothes';
import { Wear } from '@/src/enum/wear';
import { Supplier } from '@/src/types/supplier';
import { typeToString, wearToString } from '@/src/utils/enumToString';
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const [supplier, setSupplier] = React.useState<string>("");
    const [supplierSearch, setSupplierSearch] = React.useState("");
    const [suppliersOptions, setSuppliersOptions] = React.useState<Supplier[]>([]);
    const [price, setPrice] = React.useState(0);
    const [purchaseDate, setPurchaseDate] = React.useState("");
    const [wear, setWear] = React.useState<Wear>(0);
    const [clothesType, setClothesType] = React.useState<Clothes>(0);
    const supplierOptionDiv = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        fetchOptions(supplierSearch);
    }, [supplierSearch]);

    const fetchOptions = async (name: string) => {
        try {

            let searchString = "/api/suppliers?name=" + name;

            if (name === "") {
                searchString = "/api/suppliers";
            }

            const response = await axios.get(searchString);

            if (response.data.suppliers === undefined || response.data.suppliers.length === 0) {
                setSuppliersOptions([]);
                return;
            }

            setSuppliersOptions(response.data.suppliers);

        } catch (error: any) {
            console.log(error.message);
        }
    }

    const updateSupplier = async (id: string, name: string) => {
        setSupplier(id);
        setSupplierSearch(name);
    }

    const supplierToggleFocus = (focus: boolean) => {
        const elem = supplierOptionDiv.current;

        if (elem === null || elem === undefined) {
            return;
        }
        elem.style.display = focus ? "block" : "none";
    }

    const createBale = async () => {
        try {

            if (supplier === "" || purchaseDate === "") {
                return;
            }

            const response = await axios.post("/api/bales", {
                supplier: supplier,
                wear: wear,
                type: clothesType,
                purchaseDate: purchaseDate,
                price: price
            });

            const data = response.data as {message?: string, id?: string};

            if (data.message && data.id) {
                router.push("/dashboard/bales");
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.bales}>
            <div className={styles.balescard}>
                <h1 className={styles.title}>Create a Bale</h1>
                <div className={styles.supplierdiv}>
                    <label className={styles.subtitle}>Supplier</label>
                    <div className={styles.suppliersearchdiv}>
                        <input type='text' value={supplierSearch} onChange={(e) => setSupplierSearch(e.target.value)} className={styles.textinput} onFocus={() => {supplierToggleFocus(true)}}/>
                        <div ref={supplierOptionDiv} className={styles.supplieroptions}>
                            {
                                suppliersOptions.map((option) => {
                                    return (<button onClick={(e) => updateSupplier(option._id!, option.name).then(() => {supplierToggleFocus(false)})} key={option._id} className={styles.supplieroption}>{option.name}</button>)
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.selectdiv}>
                    <label className={styles.subtitle}>Wear</label>
                    <select name='wear' id='wear-select' onChange={(e) => {setWear(Number(e.target.value))}} className={styles.selectinput}>
                        {
                            Object.values(Wear).map((wear) => {
                                if (typeof wear === 'string') {
                                    return;
                                }
                                return <option value={wear.toString()} key={wearToString(wear)}>{wearToString(wear)}</option>
                            })
                        }
                    </select>
                </div>
                <div className={styles.selectdiv}>
                    <label className={styles.subtitle}>Type of clothing</label>
                    <select name='clothes-type' id='clothes-type-select' onChange={(e) => {setClothesType(Number(e.target.value))}} className={styles.selectinput}>
                        {
                            Object.values(Clothes).map((clothesType) => {
                                if (typeof clothesType === 'string') {
                                    return;
                                }
                                return <option value={clothesType.toString()} key={typeToString(clothesType)}>{typeToString(clothesType)}</option>
                            })
                        }
                    </select>
                </div>
                <div className={styles.purchasedatediv}>
                    <label className={styles.subtitle}>Purchase date</label>
                    <input id='purchase-date' type='date' onChange={(e) => {setPurchaseDate(e.target.value)}} className={styles.dateinput}></input>
                </div>
                <div className={styles.pricediv}>
                    <label className={styles.subtitle}>Price</label>
                    <input id='price' type='number' onChange={(e) => {setPrice(Number(e.target.value))}} className={styles.priceinput}></input>
                </div>
                <div>
                    <button onClick={createBale} className={styles.createButton}>Create</button>
                </div>
            </div>
        </div>
    )
}

