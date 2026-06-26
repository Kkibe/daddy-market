import './Footer.scss';
import { appName, socialUrls } from '../../../data';
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="wrapper">
                    <h3>Quick Links</h3>
                    <NavLink to="/shop">Shop Now</NavLink>
                    <NavLink to="/cart">My Cart</NavLink>
                    <NavLink to="/get-started">Get Started</NavLink>
                    <NavLink to="/about-us">About Us</NavLink>
                </div>
                <div className="wrapper">
                    <h3>Locations</h3>
                    <NavLink to="#">Kangemi</NavLink>
                    <NavLink to="#">Ndumbuini</NavLink>
                    <NavLink to="#">Nairobi CBD</NavLink>
                    <NavLink to="#">Uthiru</NavLink>
                </div>
                <div className="wrapper">
                    <h3>Contact Us</h3>
                    <NavLink to="tel:+254797814027">+254 797 814 027</NavLink>
                    <NavLink to="mailto:daddymarket@gmail.com">daddymarket@gmail.com</NavLink>
                    <span className="socials">
                        {socialUrls.map(item => (
                            <Link to={item.url} title={item.title} target='_blank' key={item.id}>
                                {item.icon}
                            </Link>
                        ))}
                    </span>
                </div>
            </div>
            <div className="credit">
                &copy; {new Date().getFullYear()} <span>{appName}</span>. All rights reserved.
            </div>
        </footer>
    );
}
