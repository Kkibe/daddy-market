import { useEffect, useState } from 'react';
import './Topnav.scss';
import { FaBars, FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { userState } from '../../recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartTotalSelector } from '../../recoil/selectors';
import Image from '../../assets/logo.png';
import { IoLogOut } from 'react-icons/io5';


export default function Topnav() {
    const [opened, setOpened] = useState(false)
    const [user, setUser] = useRecoilState(userState);
    const { totalQuantity } = useRecoilValue(cartTotalSelector);

    const logout = () => {
        setUser(null);
    };
    const handleToggle = () => {
        //document.querySelector('#menu-bars').classList.toggle('displayed');
        setOpened(!opened);
        document.querySelector('nav').classList.toggle('active');
    }

    const handleOpenSearch = () => {
        document.querySelector('.search-form').classList.toggle('active');
    }

    useEffect(() => {
        document.body.onscroll = () => {
            if (document.querySelector('nav').classList.contains('active')) {
                setOpened(false);
                document.querySelector('nav').classList.remove('active');
            }
        }
    }, [])

    return (
        <header>
            {/*<a href="/" className="logo">
            <img src={Logo} alt="" />
        </a>*/}
            <NavLink to="/" className="logo" title='Daddy Market'><img src={Image} className='icon'>{/*< HiShoppingBag className='icon' />Daddy Market*/}</img></NavLink>
            <nav>
                <NavLink to="/" onClick={handleToggle} title='home'>Home</NavLink>
                <NavLink to="shop" onClick={handleToggle} title='store'>Store</NavLink>
                <NavLink to="about-us" end onClick={handleToggle} title='about us'> About Us</NavLink>
                <NavLink to="contact-us" end onClick={handleToggle} title='contact'>Contact Us</NavLink>
                {!user ? <NavLink to="/get-started" className="btn" title='register'>Get Started</NavLink> : <NavLink onClick={logout} className="btn">Log out <IoLogOut /> </NavLink>}
            </nav>
            <div className="icons">
                <div className="icon" id='menu-bars' onClick={handleToggle}>
                    {opened ? <FaXmark /> : <FaBars />}
                </div>
                <div className="icon" id='search-icon' onClick={handleOpenSearch}><FaSearch /></div>
                <NavLink to='cart' className='icon' id='bars' title='my cart'><span>{totalQuantity}</span><FaShoppingCart /></NavLink>
                {user && <NavLink to='favorites' className='icon' id='favorite' title='liked'><FaHeart /></NavLink>}
            </div>
        </header>
    )
}
