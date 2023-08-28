import React, { useState } from 'react';
import bgvideo from '../assets/viedo/bg.mp4';
import '../assets/css/Login.css';
import '../assets/css/Signup.css';
import { useNavigate, Outlet } from 'react-router-dom';

export default function RegistrationPage() {
    const [bar, setbar] = useState({ left: "0%" })
    const navigate = useNavigate();
    const login = () => {
        setbar({ left: "0%" })
        navigate('login')
    }
    const signup = () => {
        setbar({ left: "50%" })
        navigate('signup')
    }

    return (
        <>
            <div id='wrapper'>
                <video className='video' autoPlay loop muted playsInline>
                    <source src={bgvideo} type='video/mp4' />
                </video>
                <div className='nsec-img' />
                <div className='form-box'>
                    <div className='btn-box'>
                        <div className='btn-shadow' style={bar}></div>
                        <div className="btn-container flex">
                            <button type='button' className='toggle login btn animate__animated animate__fadeInRight' onClick={login} href="/login">LOG IN</button>
                            <button type='button' className='toggle signin btn animate__animated animate__fadeInLeft' onClick={signup} href="/signup">SIGN UP</button>
                        </div>
                    </div>
                    <div className='input-group'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
};
