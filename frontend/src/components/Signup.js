import React, { useState, useEffect } from 'react';
import '../assets/css/Signup.css';
import { useNavigate, Outlet } from 'react-router-dom';

function SignupForm() {
    const [isActiveOtp, setIsActiveOtp] = useState(false);
    const [isResendOtp, setIsResendOtp] = useState(false);
    const [otpsend, setOtpSend] = useState(false);
    const [signupWarning, setSignupWarning] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    function hasNumber(email) {
        return /[0-9]/.test(email);
    }

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
            const response = await fetch('http://localhost:3000/api/send-email/validateEmail/otpUserRecognition', {
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
    const verifyOTP = async (enteredOTP) => {
        try {
            const response = await fetch('http://localhost:3000/api/send-email/validateEmail/verify-otp', {
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
                {role==='teacher' ? (
                    navigate('teachers')
                ):(
                    navigate('students')
                )}
                // navigate('teachers');
                // Handle success, e.g., navigate to the next step
            } else {
                const data = await response.json();
                console.log('OTP verification failed:', data.message);
                setSignupWarning("Invalid OTP. Retry!")
                // Handle failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(role);

    useEffect(() => {
        // You can do any initial setup here if needed
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (otpsend) {
            const otp = event.target.OTP.value;
            verifyOTP(otp);
        } else {
            const email = event.target.Email.value;
            if (!email.includes('@nsec.ac.in')) {
                setSignupWarning("Please Enter Your College Email...")
                sendEmail(email); // Delete this to pass NSEC email id only !
            } else {
                sendEmail(email);
            }
        }
    };

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
