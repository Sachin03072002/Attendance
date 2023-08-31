import React, { useState } from 'react';
import eye1 from '../assets/images/passeye1.png';
import eye2 from '../assets/images/passeye2.png';

export default function Login() {

    const [eye, seteye] = useState(eye2)
    const [pass, setpass] = useState("password")

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

    const [isActiveLogin, setIsActiveLogin] = useState(false);
    const [isActiveGoogle, setIsActiveGoogle] = useState(false);

    const loginadd = () => {
        setIsActiveLogin(true)
        setTimeout(() => {
            setIsActiveLogin(false)
        }, 800);
    }

    const googleadd = () => {
        setIsActiveGoogle(true)
        setTimeout(() => {
            setIsActiveGoogle(false)
        }, 800);
    }

    let emailWarning = "";
    let passWarning = "";
    const handleLoginForm = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('Email');
        const password = formData.get('Password');

        try {
            const response = await fetch('http://localhost:3000/api/v1/student/login', {
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
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <form method="post" onSubmit={handleLoginForm} >
            <h5 className='input-heading'>Email ID</h5>
            <div className='input flex'>
                <input type='email' className='input-field' placeholder='Enter your college email' name="Email" required />
                <div className="user img" />
            </div>
            <div className='warning'>{emailWarning}</div>
            <h5 className='input-heading'>Password</h5>
            <div className='input flex'>
                <input type={pass} className='input-field' placeholder='Enter your password' name='Password' required />
                <img src={eye} className="pass img" onClick={vision} />
            </div>
            <div className='warning'>{passWarning}</div>
            <div className='end-box'>
                <div className='flex'>
                    <input type='checkbox' className='check-box' /><span className='remember-me'>Remember me</span>
                    <button type='button' className='forgot-btn'>Forgot password ?</button>
                </div>
                <button type='submit' className={`Login btn trans ${isActiveLogin ? 'animate' : ''}`} onClick={loginadd} >Login</button>
                <div className='OR'>OR</div>
                <button type='button' className={`Google btn trans ${isActiveGoogle ? 'animate' : ''}`} onClick={googleadd}>
                    <span className='G'>G</span>
                    Continue with Google
                </button>
            </div>
        </form>

    );
}
