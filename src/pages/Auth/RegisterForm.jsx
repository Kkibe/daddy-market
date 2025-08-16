import { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './Auth.scss';
import { authService } from '../../../firebase';

const RegisterForm = ({ user }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (!email || !password || !repeatPassword) {
            setError('All fields are required');
            return;
        }

        if (!email.match(mailformat)) {
            setError('You have entered an invalid email address!');
            return;
        }

        if (!password.match(passw)) {
            setError('Password must contain 6-20 characters with at least one numeric digit, one uppercase and one lowercase letter');
            return;
        }

        if (password !== repeatPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const result = await authService.createUser(email, password);

            if (result.success) {
                // Save additional user data to Firestore
                await authService.setUser(result.user.uid, {
                    username,
                    email,
                    createdAt: new Date().toISOString()
                });

                setSuccess('Registration successful!');
                setError(null);
                window.history.back(); // Redirect to previous page
            } else {
                setError(result.error || 'Registration failed. Please try again.');
                setSuccess(null);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
            setSuccess(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            error && setError(null);
            success && setSuccess(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [success, error]);

    return (
        <div className='auth'>
            {user && <Navigate to="/profile" replace={true} />}
            <form onSubmit={handleRegister}>
                <h1>Get Started</h1>
                <input
                    type="text"
                    id='username'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id='repeat-password'
                    placeholder='Repeat Password'
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
                <button className='btn' type='submit' title='submit'>
                    Register
                </button>
                {error && <p className='error'>{error}!</p>}
                {success && <p className='success'>{success}</p>}
                <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
            </form>
        </div>
    );
};

export default RegisterForm;