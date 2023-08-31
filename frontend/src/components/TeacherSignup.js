import { useState } from 'react';
import '../assets/css/TeacherSignup.css'
import eye1 from '../assets/images/passeye1.png'
import eye2 from '../assets/images/passeye2.png'


export default function TeacherForm() {

    const [newpass, setnewpass] = useState("password");
    const [confirmpass, setconfirmpass] = useState("password");

    const [neweye, setneweye] = useState(eye2);
    const [confirmeye, setconfirmeye] = useState(eye2);

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

    const [isActive, setIsActive] = useState(false);

    const confirm= () => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false);
        }, 800);
    };

    let NameWarning = '';
    let MobileWarning = '';
    let NewPassWarning = '';
    let ConfirmPassWarning = '';

    return (
        <>
            <div className='teacher title'>Welcome Teacher !</div>
            <div className='flex'>
                <h5 className='input-heading'>Name</h5>
                <h1 className='req-field'>*</h1>
            </div>
            <div className='input flex'>
                <input type='text' className='input-field' placeholder='Enter your full name' required />
                <div className="user img" />
            </div>

            <div className='warning'>{NameWarning}</div>
            <div className='flex'>
            <h5 className='input-heading'>Mobile Number</h5>
            </div>
            <div className='input flex'>
                <input type='number' className='input-field' placeholder='Enter your contact number' />
                <div className="mobile img" />
            </div>
            <div className='warning'>{MobileWarning}</div>
            <div className='flex'>
                <h5 className='input-heading'>New Password</h5>
                <h1 className='req-field'>*</h1>
            </div>
            <div className='input flex'>
                <input type={newpass} className='input-field' placeholder='Enter your password' required />
                <img src={neweye} className="pass img" onClick={newvision} />
            </div>
            <div className='warning'>{NewPassWarning}</div>
            <div className='flex'>
                <h5 className='input-heading'>Confirm Password</h5>
                <h1 className='req-field'>*</h1>
            </div>
            <div className='input flex'>
                <input type={confirmpass} className='input-field' placeholder='Confirm your password' required />
                <img src={confirmeye} className="pass img" onClick={confirmvision} />
            </div>
            <div className='warning'>{ConfirmPassWarning}</div>
            <button type='submit' onClick={confirm} className={`acc btn trans ${isActive ? 'animate' : ''}`}>
                Create Account
            </button>
        </>
    );
}