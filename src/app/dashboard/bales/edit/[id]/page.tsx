"use client"

import React from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Image from 'next/image';
import { Clothes } from '@/src/enum/clothes';
import { Wear } from '@/src/enum/wear';
import { Supplier } from '@/src/types/supplier';
import { typeToString, wearToString } from '@/src/utils/enumToString';
import { useRouter, useParams } from 'next/navigation';
import trash from '@/public/icon/trash.png';
import { Bale } from '@/src/types/bale';

export default function Page() {

    const router = useRouter();

    const [supplier, setSupplier] = React.useState<string>("");
    const [supplierSearch, setSupplierSearch] = React.useState("");
    const [suppliersOptions, setSuppliersOptions] = React.useState<Supplier[]>([]);
    const [price, setPrice] = React.useState<number | string>(0);
    const [purchaseDate, setPurchaseDate] = React.useState("");
    const [wear, setWear] = React.useState<Wear>(0);
    const [clothesType, setClothesType] = React.useState<Clothes>(0);
    const [isSetup, setIsSetup] = React.useState<boolean>(false);
    const supplierOptionDiv = React.useRef<HTMLDivElement>(null);
    const params = useParams<{id: string}>();

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

    const editBale = async () => {
        try {

            return;

            const response = await axios.put("/api/bales", {
                id: params.id,
                wear: wear,
                type: clothesType,
                purchaseDate: purchaseDate,
            });

            const data = response.data as {success?: boolean};

            if (data.success) {
                router.push("/dashboard/bales");
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getBale = async () => {

        if (isSetup) {
            return;
        }

        const id = params.id;

        try {

            const response = await axios.get("/api/bales?id=" + id);

            if (response.data.bale === undefined) {
                return;
            }

            const bale: Bale = response.data.bale as Bale;

            setIsSetup(true);
            setSupplier(bale.supplier);
            setSupplierSearch(bale.supplierName);
            setWear(bale.wear);
            setClothesType(bale.type);
            setPurchaseDate(new Date(bale.purchaseDate).toISOString().slice(0, 10));
            setPrice(bale.price);

        } catch (error: any) {
            console.log(error.message);
        }
    }

    getBale();

    return (
        <div className={styles.bales}>
            <div className={styles.balescard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Edit bale</h1>
                    <button onClick={editBale} className={styles.deletebutton}><Image src={trash} alt="Delete" className={styles.icon}/></button>
                </div>
                <div className={styles.supplierdiv}>
                    <label className={styles.subtitle} htmlFor='suppliersearch'>Supplier</label>
                    <div className={styles.suppliersearchdiv}>
                        <input type='text' id='suppliersearch' disabled value={supplierSearch} onChange={(e) => setSupplierSearch(e.target.value)} className={styles.textinput} onFocus={() => {supplierToggleFocus(true)}}/>
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
                    <label className={styles.subtitle} htmlFor='wear-select'>Wear</label>
                    <select name='wear' value={wear.toString()} id='wear-select' onChange={(e) => {setWear(Number(e.target.value))}} className={styles.selectinput}>
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
                    <label className={styles.subtitle} htmlFor='clothes-type-select'>Type of clothing</label>
                    <select name='clothes-type' value={clothesType.toString()} id='clothes-type-select' onChange={(e) => {setClothesType(Number(e.target.value))}} className={styles.selectinput}>
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
                    <input id='purchase-date' value={purchaseDate} disabled type='date' onChange={(e) => {setPurchaseDate(new Date(e.target.value).toISOString())}} className={styles.dateinput}></input>
                </div>
                <div className={styles.pricediv}>
                    <label className={styles.subtitle}>Price</label>
                    <input id='price' value={price} type='number' onChange={(e) => {setPrice(e.target.value !== "" ? Number(e.target.value) : "")}} className={styles.priceinput}></input>
                </div>
                <button onClick={editBale} className={styles.editButton}>Edit</button>
            </div>
        </div>
    )
}

