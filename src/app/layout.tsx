import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Hind } from 'next/font/google';
import styles from '../styles/component.module.css';  // Adjust the path as necessary

export const metadata: Metadata = {
    title: 'Tissu collectif',
    description: 'A tool to manage your sales',
}

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap'
});

export const hind = Hind({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-hind',
    display: 'swap'
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${hind.variable} ${montserrat.variable}`}>
            <body>
                {children}
            </body>
        </html>
    )
}
