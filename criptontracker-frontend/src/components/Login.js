import React, { useState } from 'react';
import "../style/Login.css"

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="form-container">
            <ul className="tabs-list">
                <li className={`tab-item ${isLogin ? 'active' : ''}`}>
                    <button onClick={toggleForm}>Login</button>
                </li>
                <li className={`tab-item ${!isLogin ? 'active' : ''}`}>
                    <button onClick={toggleForm}>Sing Up</button>
                </li>
            </ul>

            <div className="tab-content">
                <div className={isLogin ? "active" : ""} id="login">
                    <br/>
                    <br/>
                    <form action="#" method="post">
                        <div className="input-wrapper">
                            <label> <span className="req"></span></label>
                            <input type="text" className='mycolor' placeholder='Username' required />
                        </div>
                        <div className="input-wrapper">
                            <label><span className="req"></span></label>
                            <input type="password"  className='mycolor' placeholder='Password' required />
                        </div>
                        <p className="forgot-password"><a href="#">Forgot Password?</a></p>
                        <input type="submit" className="submit-button button-block" value="Login" />
                    </form>
                </div>

                <div className={isLogin ? "" : "active"} id="register">
                    <br/>
                    <br/>
                    <form action="#" method="post">
                        
                        <div className="input-wrapper">
                            <label> <span className="req"></span></label>
                            <input type="text" className='mycolor' placeholder='Username' required />
                        </div>
                        <div className="input-wrapper">
                            <label> <span className="req"></span></label>
                            <input type="email" className='mycolor' placeholder='Email' required />
                        </div>
                        <div className="input-wrapper">
                            <label> <span className="req"></span></label>
                            <input type="password" className='mycolor'  placeholder='Password' required />
                        </div>
                        <div className="input-wrapper">
                            <label><span className="req"></span></label>
                            <input type="Password"  className='mycolor' placeholder='Repeat Password'required />
                        </div>
                        <input type="submit" className="submit-button button-block" value="Sing Up" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
