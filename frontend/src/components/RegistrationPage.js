import { React, useState, useEffect } from 'react';
import bgvideo from '../assets/video/bg.mp4';
import '../assets/css/Login.css';
import './Signup';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export default function RegistrationPage() {
    const [bar, setbar] = useState({ left: "0%" });
    const navigate = useNavigate();
    const location = useLocation();

    // Use the location.pathname to determine the current route and set the bar style accordingly
    const updateBarStyle = () => {
        if (location.pathname === '/login') {
            setbar({ left: "0%" });
        } else if (location.pathname === '/signup') {
            setbar({ left: "50%" });
        }
    };

    const login = () => {
        navigate('login');
        updateBarStyle();
    };

    const signup = () => {
        navigate('signup');
        updateBarStyle();
    };

    // Call updateBarStyle when the component mounts to set the initial style based on the current route
    useEffect(() => {
        updateBarStyle();
    }, []);

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
                            <button type='button' className='toggle login btn' onClick={login} href="/login">LOG IN</button>
                            <button type='button' className='toggle signin btn' onClick={signup} href="/signup">SIGN UP</button>
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
