import { useState } from 'react';
import '../assets/css/TeacherSignup.css'
import eye1 from '../assets/images/passeye1.png'
import eye2 from '../assets/images/passeye2.png'
import { useLocation } from 'react-router-dom';



function TeacherForm() {
    const location = useLocation();
    const userEmail = location.state && location.state.userEmail;
    const [newpass, setnewpass] = useState("");
    const [confirmpass, setconfirmpass] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [neweye, setneweye] = useState(eye2);
    const [confirmeye, setconfirmeye] = useState(eye2);
    const [isActive, setIsActive] = useState(false);
    const [pass, setPass] = useState("");
    const [ConfirmPassWarning, setConfirmPassWarning] = useState('');
    const newvision = () => {
        if (newpass === "password") {
            setnewpass("text")
            setneweye(eye1)
        }
        else {
            setnewpass("password")
            setneweye(eye2)
        }
    }

    const confirmvision = () => {
        if (confirmpass === "password") {
            setconfirmpass("text")
            setconfirmeye(eye1)
        }
        else {
            setconfirmpass("password")
            setconfirmeye(eye2)
        }
    }

    const handlePassword = (e) => {
        setPass(e.target.value);
    }

    const confirm = () => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false);
        }, 800);
    };

    let NameWarning = '';
    let MobileWarning = '';
    let NewPassWarning = '';

    const handleConfirmPasswordChange = (event) => {

        setconfirmpass(event.target.value);
        if (event.target.value !== pass) {
            setConfirmPassWarning("Passwords do not match");
            setPasswordMatch(false);
        } else {
            setConfirmPassWarning("");
            setPasswordMatch(true);
        }
    };

    const Registration = async (e) => {
        e.preventDefault();
        try {
            if (!passwordMatch) {
                console.log("Passwords do not match");
                return;
            }
            const userData = {
                Name: e.target.Name.value,
                Password: e.target.Password.value,
                MobileNumber: 1234567891,
                Email: userEmail,
                Subject: 'CA',
            }

            const response = await fetch("/api/v1/teacher/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log(response);
            if (response.ok) {
                const responseData = await response.json();
                console.log('Registered successfully');
                window.location.href = responseData.redirectTo;
            } else {
                console.log('Registered Unsuccessfully');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <div className='teacher title'>Welcome Teacher !</div>
            <form onSubmit={Registration}>
                <div className='flex'>
                    <h5 className='input-heading'>Name</h5>
                    <h1 className='req-field'>*</h1>
                </div>
                <div className='input flex'>
                    <input type='text' className='input-field' name='Name' placeholder='Enter your full name' required />
                    <div className="user img" />
                </div>

                <div className='warning'>{NameWarning}</div>
                <div className='flex'>
                    <h5 className='input-heading'>Mobile Number</h5>
                </div>
                <div className='input flex'>
                    <input type='number' className='input-field' name='MobileNumber' placeholder='Enter your contact number' />
                    <div className="mobile img" />
                </div>
                <div className='warning'>{MobileWarning}</div>
                <div className='flex'>
                    <h5 className='input-heading'>New Password</h5>
                    <h1 className='req-field'>*</h1>
                </div>
                <div className='input flex'>
                    <input type={newpass} className='input-field' name='Password' placeholder='Enter your password' required onChange={handlePassword} />
                    <img src={neweye} className="pass img" alt="imag" onClick={newvision} />
                </div>
                <div className='warning'>{NewPassWarning}</div>
                <div className='flex'>
                    <h5 className='input-heading'>Confirm Password</h5>
                    <h1 className='req-field'>*</h1>
                </div>
                <div className='input flex'>
                    <input type={confirmpass} className='input-field' name='ConfirmPassword' placeholder='Confirm your password' required onChange={handleConfirmPasswordChange} />
                    <img src={confirmeye} className="pass img" alt='imag' onClick={confirmvision} />
                </div>
                <div className='warning'>{ConfirmPassWarning}</div>
                <button type='submit' onClick={confirm} className={`acc btn trans ${isActive ? 'animate' : ''}`} disabled={!passwordMatch}>
                    Create Account
                </button>
            </form>
        </>
    );
}
export default TeacherForm;