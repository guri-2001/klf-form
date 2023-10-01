"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
    // const [mcnumber, setMcNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false,
            });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            console.log(res);

            router.replace("/");

        } catch (error) {
            console.log(error);
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

                    <div >
                        <h2 >Login Page</h2>
                    </div>
                    <div >

                        <form onSubmit={handleSubmit}>
                            {/* <div >
                                <input
                                    type='text'
                                    placeholder='Mc number'
                                    value={mcnumber}
                                    onChange={e => setMcNumber(e.target.value)}
                                />
                            </div> */}
                            
                            <div >
                                <input
                                    type='email'
                                    placeholder='Email'
                                    
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div >
                                <input
                                    type='password'
                                    placeholder='Password'
                                    
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                {error && (
                                    <div>
                                        {error}
                                    </div>
                                )}
                            </div>

                            <div >
                                <button >Login</button>
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
                                <p>Dont have an account?<Link href='/signup' >Signup.</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm