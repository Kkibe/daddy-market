import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { userState } from '../../recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartTotalSelector } from '../../recoil/selectors';
import Image from '../../assets/logo.png';
import { IoLogOut } from 'react-icons/io5';
import './Topnav.scss';

export default function Topnav() {
    const [opened, setOpened] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const { totalQuantity } = useRecoilValue(cartTotalSelector);

    const logout = () => setUser(null);

    const handleToggle = () => {
        setOpened(!opened);
        document.querySelector('nav').classList.toggle('active');
    };

    const handleOpenSearch = () => {
        document.querySelector('.search-form').classList.toggle('active');
    };

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            if (document.querySelector('nav')?.classList.contains('active')) {
                setOpened(false);
                document.querySelector('nav').classList.remove('active');
            }
        };
        document.body.onscroll = onScroll;
        return () => { document.body.onscroll = null; };
    }, []);

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <NavLink to="/" className="logo" title='Daddy Market'>
                <img src={Image} alt="Daddy Market" />
            </NavLink>
            <nav>
                <NavLink to="/" onClick={handleToggle} title='home'>Home</NavLink>
                <NavLink to="shop" onClick={handleToggle} title='store'>Store</NavLink>
                <NavLink to="about-us" end onClick={handleToggle} title='about us'>About Us</NavLink>
                <NavLink to="contact-us" end onClick={handleToggle} title='contact'>Contact Us</NavLink>
                {!user
                    ? <NavLink to="/get-started" className="btn nav-cta" title='register'>Get Started</NavLink>
                    : <button onClick={logout} className="btn nav-cta">Log out <IoLogOut /></button>}
            </nav>
            <div className="icons">
                <div className="icon" id='menu-bars' onClick={handleToggle}>
                    <AnimatePresence mode="wait">
                        {opened
                            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><FaXmark /></motion.span>
                            : <motion.span key="bars" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><FaBars /></motion.span>}
                    </AnimatePresence>
                </div>
                <div className="icon" id='search-icon' onClick={handleOpenSearch}><FaSearch /></div>
                <NavLink to='cart' className='icon' id='bars' title='my cart'>
                    {totalQuantity > 0 && <span className="badge-count">{totalQuantity}</span>}
                    <FaShoppingCart />
                </NavLink>
                {user && <NavLink to='favorites' className='icon' id='favorite' title='liked'><FaHeart /></NavLink>}
            </div>
        </header>
    );
}
