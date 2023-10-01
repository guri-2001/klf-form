"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CarrerInfo = () => {

    const [mcnumber, setMcNumber] = useState();

    const router = useRouter();

    const newObj = {
        mcnumber,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(newObj);
        try {

            const res = axios.post('/api/carrerInfo', newObj)
                .then(() => {
                    alert('New note Added successfully')
                })

            if (res.ok) {
                router.push('/signup')
                setMcNumber("")
                alert('Added successfully')
            }

        } catch (error) {
            console.log(error);
        }



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Mc Number</label>
                <input type='text' value={mcnumber} onChange={(e) => setMcNumber(e.target.value)} />
                <div >
                    <button >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CarrerInfo