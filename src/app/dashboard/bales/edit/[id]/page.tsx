"use client"

import { useParams } from 'next/navigation'

export default function Page() {
    const params = useParams<{id: string}>();

    const id = params.id;

    return <p>Post: {id}</p>
}