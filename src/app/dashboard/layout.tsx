"use client"

import CookieChecker from "@/src/components/CookieChecker";
import DashboardNavbar from "@/src/components/DashboardNavbar";
import styles from "./layout.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.dashboardlayout}>
            <CookieChecker>
                <DashboardNavbar/>
                {children}
            </CookieChecker>
        </div>
    )
}