"use client"

import CookieChecker from "@/src/components/CookieChecker"
import DashboardNavbar from "@/src/components/DashboardNavbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CookieChecker>
            <DashboardNavbar/>
            {children}
        </CookieChecker>
    )
}