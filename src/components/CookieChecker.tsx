"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface CookieCheckerProps {
    children: ReactNode;
}

const CookieChecker: React.FC<CookieCheckerProps> = ({ children }) => {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await axios.get('/api/users/me'); 

                if (response.status === 200) {
                    setIsConnected(true);
                } else {
                    router.push("/login");
                }

            } catch (error) {
                router.push("/login");
            }
        };

        checkConnection();
    }, [isConnected]);

    return (
        <>
            {isConnected ? children : <p>Loading...</p>}
        </>
    );
};

export default CookieChecker;
