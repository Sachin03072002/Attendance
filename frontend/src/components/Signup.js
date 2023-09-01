import React, { useState, useEffect } from 'react';
import '../assets/css/Signup.css';

import { useNavigate } from 'react-router-dom';
import { hasNumber } from '../utils/additionaHelper';
function SignupForm() {
    const [isActiveOtp, setIsActiveOtp] = useState(false);
    const [isResendOtp, setIsResendOtp] = useState(false);
    const [otpsend, setOtpSend] = useState(false);
    const [signupWarning, setSignupWarning] = useState("");
    const [role, setRole] = useState("");
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();


    const SendOTP = () => {
        setIsActiveOtp(true);
        setTimeout(() => {
            setIsActiveOtp(false);
        }, 800);
    };

    const ResendOTP = () => {
        setIsResendOtp(true);
        setTimeout(() => {
            setIsResendOtp(false);
        }, 800);
    };

    const ConfirmOTP = () => {
        setIsActiveOtp(true);
        setTimeout(() => {
            setIsActiveOtp(false);
        }, 800);
    };

    const sendEmail = async (email) => {
        try {

            if (hasNumber(email)) {
                setRole('student');
            } else {
                setRole('teacher');
            }

            const response = await fetch("/api/send-email/validateEmail/otpUserRecognition", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: email
                })
            });
            if (response.ok) {
                console.log('Email sent successfully');

                setOtpSend(true); // Update state to indicate OTP was sent
                setSignupWarning(""); // Clear any previous warnings
            } else {
                console.log('Failed to send email');
                setSignupWarning("Failed to send email");
                setOtpSend(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setSignupWarning("An error occurred");
            setOtpSend(false);
        }
    };
    const verifyOTP = async (enteredOTP, email) => {
        try {
            const response = await fetch('/api/send-email/validateEmail/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    enteredOTP: enteredOTP
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('OTP verification successful:', data.message);
                setUserEmail(data.email);

            } else {
                const data = await response.json();
                console.log('OTP verification failed:', data.message);
                setSignupWarning("Invalid OTP. Retry!");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (otpsend) {
            const otp = event.target.OTP.value;
            verifyOTP(otp);
        } else {
            const email = event.target.Email.value;
            if (!email.includes('@nsec.ac.in')) {
                setSignupWarning("Please Enter Your College Email...");
                sendEmail(email);
            } else {
                sendEmail(email);
            }
        }
    };





    useEffect(() => {
        if (userEmail) {
            if (role === 'teacher') {
                navigate('teachers', { state: { userEmail: userEmail } });
            } else {
                navigate('students');
            }
        }
    }, [userEmail, role, navigate]);


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='title'>Here are the steps to get you started...!</div>
                <div className='signpage'>
                    {otpsend ? (
                        <>
                            <h5 className='input-heading'>Enter OTP</h5>
                            <div className='input flex'>
                                <input type='number' name='OTP' className='input-field' placeholder='Enter OTP' required />
                                <div className="user img" />
                            </div>
                            <div className='warning'>{signupWarning}</div>
                            <div className='otp-container flex'>
                                <button type='submit' onClick={ResendOTP} className={`otp btn trans ${isResendOtp ? 'animate' : ''}`}>
                                    Resend OTP
                                </button>
                                <button type='submit' onClick={ConfirmOTP} className={`otp btn trans ${isActiveOtp ? 'animate' : ''}`}>
                                    Confirm OTP
                                </button>
                            </div>

                        </>
                    ) : (
                        <>
                            <h5 className='input-heading'>Enter Email</h5>
                            <div className='input flex'>
                                <input type='email' name='Email' className='input-field' placeholder='Enter your college email' required />
                                <div className="user img" />
                            </div>
                            <div className='warning'>{signupWarning}</div>
                            <button type='submit' onClick={SendOTP} className={`send btn trans ${isActiveOtp ? 'animate' : ''}`}>
                                Send OTP
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}

export default SignupForm;
