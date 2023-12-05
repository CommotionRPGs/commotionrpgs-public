import Header from "@/components/Header";
import styles from '@/styles/Login.module.css';
import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "@/context/authStore";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
    const [ showPassword, setShowPassword ] = useState(false)
    const [ loginDetails, setLoginDetails ] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        referralCode: ""
    })
    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault()
        register({
            username: loginDetails.username,
            email: loginDetails.email,
            password: loginDetails.password,
            referral_code: loginDetails.referralCode,
        })
        .then(() => {
            navigate(from, { replace: true });
        })
    }

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLoginDetails = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="wrapper">
            <Header>
                <h1>Register</h1>
            </Header>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <input
                        name="username"
                        type="text"
                        placeholder="username"
                        value={loginDetails.username}
                        onChange={handleLoginDetails}
                    />
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        value={loginDetails.email}
                        onChange={handleLoginDetails}
                    />
                    <div className={styles.passwordContainer}>
                        <input
                            className={loginDetails.password && (loginDetails.passwordConfirm !== loginDetails.password ? styles.noMatch : styles.match)}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            value={loginDetails.password}
                            onChange={handleLoginDetails}
                        />
                        {showPassword
                            ? <FaEyeSlash className={styles.faEye} onClick={handleToggleShowPassword}/>
                            : <FaEye className={styles.faEye} onClick={handleToggleShowPassword}/>
                        }
                    </div>
                    {loginDetails.password.length > 0 && <div 
                        className={`${styles.passwordContainer}`}
                    >
                        <input
                            className={loginDetails.passwordConfirm !== loginDetails.password ? styles.noMatch : styles.match}
                            name="passwordConfirm"
                            type={showPassword ? "text" : "password"}
                            placeholder="confirm password"
                            value={loginDetails.passwordConfirm}
                            onChange={handleLoginDetails}
                        />
                        {showPassword
                            ? <FaEyeSlash className={styles.faEye} onClick={handleToggleShowPassword}/>
                            : <FaEye className={styles.faEye} onClick={handleToggleShowPassword}/>
                            }
                    </div>}
                    <input 
                        name="referralCode"
                        type="text"
                        placeholder="referral code"
                        value={loginDetails.referralCode}
                        onChange={handleLoginDetails}
                    />
                    <button>Register</button>
                    <p>{"Already have an account? "}
                    <NavLink 
                        to={'/login'}
                    >
                        {"Login"}
                    </NavLink></p>
                </form>
            </div>
        </div>
    )
}
export default Register;