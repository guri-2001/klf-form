"use client"
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterForm = () => {
    const [mcnumber, setMcNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter()

    console.log(mcnumber);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!name || !email || !password) {
    //         setError("All field are required");
    //         return;
    //     }


    //     try {

    //         const resUserExists = await fetch("api/userExists", {
    //             method: "POST",
    //             headers: {
    //                 "Content_type": "application/json",
    //             },
    //             body: JSON.stringify({ email })
    //         });

    //         const { user } = await resUserExists.json();

    //         if (user) {
    //             setError("User already Exists");
    //             return;
    //         }


    //         const res = await fetch("api/register", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 mcnumber, name, email, password
    //             })
    //         })

    //         if (res.ok) {
    //             setEmail("");
    //             setName("");
    //             setPassword("");

    //             router.push("/login")
    //         } else {
    //             console.log("User registeration failed");
    //         }




    //         console.log("response", res);
    //         // console.log("res", resUserExists);

    //     } catch (error) {
    //         console.log("Error during registeration", error);
    //     }
    // }

    const newObj = {
        mcnumber,
        name,
        email,
        password
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(newObj);
        try {

            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content_type": "application/json",
                },
                body: JSON.stringify({ mcnumber })
            });

            const { user } = await resUserExists.json();

            if (!user) {
                // setError("User already Exists");
                alert('First you have to set your Career Information')
                return;
            }else {
                router.push('/login')
            }

            console.log(resUserExists);

            const res = axios.post('/api/newNote', newObj)
                .then(() => {
                    alert('New note Added successfully')
                })
        } catch (error) {
            console.log(error);
        }

        // router.push('/login')
        setName("")
        setEmail("")
        alert('Added successfully')

    }

    return (
        <div style={{ background: "skyblue", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", fontFamily: "arial" }}>
            <div style={{ background: "#fff", borderRadius: "10px", display: "grid", gridTemplateColumns: "300px 400px" }}>
                <div style={{ padding: "50px" }}>
                    {/* <Image alt='' src="/facebook.png" height={250} width={250} /> */}
                    <h1 style={{ color: "rgb(31, 138, 220)", margin: "15px 0 0 35px" }}>FACEBOOK</h1>
                </div>
                <div>

                    <div>
                        <h2>Signup Page</h2>
                    </div>
                    <div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    value={mcnumber}
                                    type='text'
                                    placeholder='mc number'

                                    onChange={(e) => { setMcNumber(e.target.value) }}
                                />
                            </div>

                            <div>
                                <input
                                    value={name}
                                    type='text'
                                    placeholder='Username'

                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>

                            <div>
                                <input
                                    value={email}
                                    type='email'
                                    placeholder='Email'

                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>

                            <div >
                                <input
                                    value={password}
                                    type='password'
                                    placeholder='Password'

                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>

                            <div>
                                {error && (<div>
                                    {error}
                                </div>
                                )}
                            </div>

                            <div >
                                <button >register</button>
                            </div>
                            <div >
                                <p>Dont have an account?<Link href='/login' >Login.</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm