import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Hind } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Tissu collectif',
    description: 'A tool to manage your sales',
}

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat'
});

const hind = Hind({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-hind'
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${montserrat.className} ${hind}`}>
            <body>
                {children}
            </body>
        </html>
    )
}
