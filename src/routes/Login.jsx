import { useState } from 'react';
import styles from '@/styles/routes/Login.module.css';
import { useAuthStore, useDBAuthStore } from '@/context/authStore'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/basic/Header';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [ showPassword, setShowPassword ] = useState(false)
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.pathname || '/';

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;
        login({
            email: email,
            password: password
        })
        .then(() => {
            navigate(from, { replace: true });
        })
        // console.log(username);
    };

    return (
        <div className="wrapper">
            <Header>
                <h1>Login</h1>
            </Header>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <input 
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className={styles.passwordContainer}>
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword
                            ? <FaEyeSlash className={styles.faEye} onClick={handleToggleShowPassword}/>
                            : <FaEye className={styles.faEye} onClick={handleToggleShowPassword}/>
                        }
                    </div>
                    <button>Login</button>
                    <p>{"Don't have an account yet? "}
                    <NavLink 
                        to={'/register'}
                    >
                        {"Register"}
                    </NavLink></p>
                </form>
            </div>
        </div>
    )
};
export default Login;