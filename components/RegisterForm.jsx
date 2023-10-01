"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All field are required");
            return;
        }


        try {

            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content_type": "application/json",
                },
                body: JSON.stringify({ email })
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already Exists");
                return;
            }


            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok) {
                setEmail("");
                setName("");
                setPassword("");

                router.push("/login")
            } else {
                console.log("User registeration failed");
            }




            console.log("response", res);
            // console.log("res", resUserExists);

        } catch (error) {
            console.log("Error during registeration", error);
        }
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

                            {/* <div className={style.signIn_div} onClick={() => { signIn('google') }}>
                                        <p>Sign in with Google</p>
                                        <Image alt='' src="/g.jpg" width={25} height={25} />
                                    </div>

                                    <div className={style.signIn_div} onClick={() => { signIn('github') }}>
                                        <p>Sign in with Github</p>
                                        <Image alt='' src="/github.png" width={25} height={25} />
                                    </div> */}

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