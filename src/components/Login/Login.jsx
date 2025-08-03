import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [registerErrors, setRegisterErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [registrationMessage, setRegistrationMessage] = useState('');

    const [loginError, setLoginError] = useState('');





    // خليها دلوقتي
    // const handleRegister = (e) => {
    //     e.preventDefault();

    //     const { username, email, password } = registerData;

    //     if (username && email && password) {
    //         const user = { username, email, password };


    //         localStorage.setItem('user', JSON.stringify(user));

    //         alert("Registration Successful!");

    //         setIsRegistering(false); 

    //     } else {

    //         alert("Please fill all fields");

    //     }

    // };


    const handleRegister = (e) => {
        e.preventDefault();

        const { username, email, password } = registerData;

        const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/;

        //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/



        const errors = {
            username: '',
            email: '',
            password: ''
        };

        let isValid = true;

        if (!emailRegex.test(email)) {
            errors.email = "Email must be a valid format (e.g., example@gmail.com).";
            isValid = false;
        }

        // if (!passwordRegex.test(password)) {
        //     errors.password = "Password must be at least 5 characters.";
        //     isValid = false;
        // }

        if (password.length < 5) {
            errors.password = "Password must be at least 5 characters.";
            isValid = false;
        } else if (!/[A-Za-z]/.test(password)) {
            errors.password = "Password must contain at least one letter.";
            isValid = false;
        } else if (!/\d/.test(password)) {
            errors.password = "Password must contain at least one number.";
            isValid = false;
        } else if (!/[!@#$%^&*]/.test(password)) {
            errors.password = "Password must contain at least one special character (!@#$%^&*).";
            isValid = false;
        }

        setRegisterErrors(errors);

        if (!isValid) return;

        const user = { username, email, password };
        localStorage.setItem('user', JSON.stringify(user));

        setRegistrationMessage("Registration Successful ✅");
        setTimeout(() => {
            setRegistrationMessage('');
            setIsRegistering(false);
        }, 1500);

    };


    const navigate = useNavigate();

    // const handleLogin = (e) => {
    //     e.preventDefault();

    //     const { username, password } = loginData;
    //     const storedUser = JSON.parse(localStorage.getItem('user'));

    //     if (!storedUser) {
    //         alert("No registered user found. Please sign up first.");
    //         return;
    //     }

    //     if (
    //         username === storedUser.username &&
    //         password === storedUser.password
    //     ) {


    //         localStorage.setItem('isLoggedIn', 'true');
    //         localStorage.setItem('currentUser', username);

    //         navigate("/home");
    //     } else {
    //         alert("Invalid username or password.");
    //     }
    // };

    const handleLogin = (e) => {
        e.preventDefault();

        const { username, password } = loginData;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            setLoginError("No registered user found. Please sign up first.");
            return;
        }

        if (
            username === storedUser.username &&
            password === storedUser.password
        ) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            navigate("/home");
        } else {
            setLoginError("Invalid username or password.");
        }
    };





    return (
        <div className={`container ${isRegistering ? 'active' : ''}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required value={loginData.username}
                            onChange={(e) => {
                                setLoginData({ ...loginData, username: e.target.value });
                                setLoginError('');
                            }} />
                        <i className="bx bxs-user" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={loginData.password}
                            onChange={(e) => {
                                setLoginData({ ...loginData, password: e.target.value });
                                setLoginError('');
                            }} />
                        <i className="bx bxs-lock-alt" />
                    </div>
                    <div className="forgot-link">
                        <a href="#">Forgot your password?</a>
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                    {loginError && (
                        <p className="error-text">
                            {loginError}
                        </p>
                    )}
                    <p>Or sign in with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#"><i className="fa-brands fa-facebook-f" /></a>
                        <a href="#"><i className="fa-brands fa-github" /></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
                        <i className="bx bxs-user" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                        <i className="bx bxs-envelope" />
                        {registerErrors.email && <p className="error-text">{registerErrors.email}</p>}

                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
                        <i className="bx bxs-lock-alt" />
                        {registerErrors.password && <p className="error-text">{registerErrors.password}</p>}

                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    {registrationMessage && (
                        <p className='success-text'>
                            {registrationMessage}
                        </p>
                    )}
                    <p>Or sign up with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#"><i className="fa-brands fa-facebook-f" /></a>
                        <a href="#"><i className="fa-brands fa-github" /></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                    </div>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Friend!</h1>
                    <p>Don't have an account yet?</p>
                    <button className="btn register-btn" onClick={() => setIsRegistering(true)}>
                        Sign Up
                    </button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button className="btn login-btn" onClick={() => setIsRegistering(false)}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}







