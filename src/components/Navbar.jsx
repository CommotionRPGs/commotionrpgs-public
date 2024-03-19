import React, { useState, useEffect, useRef, Fragment } from "react";
import { useOnClickOutside } from "@/useOnClickOutside";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'

const links = [
    { path: '/', text: 'Home' },
    //{ path: 'about', text: 'About' },
    { path: 'classes', text: 'Classes'},
    { path: 'spells', text: 'Spellbook' },
    { path: 'bestiary', text: 'Bestiary' },
    { path: 'profile', text: 'Profile' },
    { path: 'login', text: 'Login' },
    { path: 'admin', text: 'Admin', restricted: ["admin"] },
]

function Navbar() {
    /*console.log(useState(false))*/
    //const [dropdown, setDropdown] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()
    const ref = useRef();
    // console.log(ref)

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    //useOnClickOutside(ref, dropdown, () => setDropdown(false));
    useEffect(() => {
        const handler = (event) => {
            if (
                navbarOpen &&
                ref.current &&
                !ref.current.contains(event.target)
            ) {
                setNavbarOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler);
        };
    }, [navbarOpen])


    return (
        <>
            <nav ref={ref} className="navbar">
                <button
                    className="toggle"
                    onClick={() => setNavbarOpen((prev) => !prev)}
                >
                    {navbarOpen ? (
                        <MdClose 
                            style={{
                                width: '32px',
                                height: '32px'
                            }}
                        />
                    ) : (
                        <FiMenu
                            style={{
                                width: '32px',
                                height: '32px'
                            }}
                        />
                    )}
                </button>
                <ul className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>
                    {links.map((link) => {
                        if (!link.restricted || link.restricted.indexOf(user.account_type) !== -1)
                            return (
                                <Fragment key={link.text}>
                                    {link.path === 'login'? (
                                        !user && (
                                            <li>
                                                <NavLink 
                                                    to={link.path}
                                                    onClick={() => setNavbarOpen(false)}
                                                >
                                                    {link.text}
                                                </NavLink>
                                            </li>
                                        )
                                    ) : link.path === 'profile'? (
                                        user && (
                                            <li>
                                                <NavLink 
                                                    to={link.path}
                                                    onClick={() => setNavbarOpen(false)}
                                                >
                                                    {link.text}
                                                </NavLink>
                                            </li>
                                        )
                                    ) : (
                                        <li>
                                            <NavLink 
                                                to={link.path}
                                                onClick={() => setNavbarOpen(false)}
                                            >
                                                {link.text}
                                            </NavLink>
                                        </li>
                                    )}
                                </Fragment>
                            );
                    })}
                    {/*
                    <li>Home</li>
                    <li>About</li>
                    <li ref={ref}>
                        <button onClick={() => setDropdown((prev) => !prev)}>
                            Services <span>&#8595;</span>
                        </button>
                        {dropdown && (
                        <ul>
                            <li>Design</li>
                            <li>Development</li>
                        </ul>
                        )}
                    </li>
                    */}
                    {!user && (
                        <li className="log-in">
                            <span>Log in to edit to-dos</span>
                        </li>
                    )}
                </ul>
            </nav>
            {user && (
                <div className="logout">
                    {user.name}
                    {<button onClick={handleLogout}>Logout</button>}
                </div>
            )}
        </> 
    )
}
export default Navbar;