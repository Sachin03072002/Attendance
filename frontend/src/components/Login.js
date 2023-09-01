import React, { useState } from 'react';
import eye1 from '../assets/images/passeye1.png';
import eye2 from '../assets/images/passeye2.png';
import { hasNumber } from '../utils/additionaHelper';
export default function Login() {

    const [eye, seteye] = useState(eye2)
    const [pass, setpass] = useState("password");
    const [email, setEmail] = useState("");
    const [isActiveLogin, setIsActiveLogin] = useState(false);
    const [isActiveGoogle, setIsActiveGoogle] = useState(false);
    const [emailWarning, setEmailWarning] = useState("");
    const [role, setRole] = useState("");
    const [disabled, setDisabled] = useState(true);

    const vision = () => {
        if (pass === "password") {
            setpass("text")
            seteye(eye1)
        }
        else {
            setpass("password")
            seteye(eye2)
        }
    }

    const loginadd = () => {
        setIsActiveLogin(true)
        setTimeout(() => {
            setIsActiveLogin(false)
        }, 800);
    }

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch("/auth/google");
            if (response.status === 200) {
                const data = await response.json();
                window.location.href = data.redirectTo;

            } else {
                console.log('error', response.status, response.error);
            }
        } catch (err) {
            console.log('error', err);
        }

    }
    const googleadd = () => {
        setIsActiveGoogle(true)
        handleGoogleLogin();
        setTimeout(() => {
            setIsActiveGoogle(false)
        }, 800);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // if (!email.includes("@nsec.ac.in")) {
        //     setEmailWarning("Please Enter College Email");
        //     setDisabled(true);
        //     return;
        // } else {
        setEmailWarning("");
        setDisabled(false);
        if (hasNumber(email)) {
            setRole('student');
        } else {
            setRole('teacher');
        }
        // }


    };

    const handleLoginForm = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('Email');
        const password = formData.get('Password');

        try {
            const response = await fetch(`/api/v1/${role}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password
                })
            });

            const data = await response.json();
            window.location.href = data.redirectTo;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <form method="post" onSubmit={handleLoginForm} >
            <h5 className='input-heading'>Email ID</h5>
            <div className='input flex'>
                <input type='email' className='input-field' placeholder='Enter your college email' name="Email" required onChange={handleEmailChange} />
                <div className="user img" />
            </div>
            <div className='warning'>{emailWarning}</div>
            <h5 className='input-heading'>Password</h5>
            <div className='input flex'>
                <input type={pass} className='input-field' placeholder='Enter your password' name='Password' required />
                <img src={eye} className="pass img" alt="imag" onClick={vision} />
            </div>
            <div className='end-box'>
                <div className='flex'>
                    <input type='checkbox' className='check-box' /><span className='remember-me'>Remember me</span>
                    <button type='button' className='forgot-btn'>Forgot password ?</button>
                </div>
                <button type='submit' className={`Login btn trans ${isActiveLogin ? 'animate' : ''}`} onClick={loginadd} >Login</button>
                <div className='OR'>OR</div>
                <button type='button' className={`Google btn trans ${isActiveGoogle ? 'animate' : ''}`} onClick={googleadd} disabled={!disabled} >
                    <span className='G'>G</span>
                    Continue with Google
                </button>
            </div>
        </form>

    );
}
