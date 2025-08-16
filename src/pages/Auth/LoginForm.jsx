import { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './Auth.scss';
import { authService } from '../../../firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Simple user state

  // Basic auth state listener
  useEffect(() => {
    const unsubscribe = authService.onAuthChange((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email && password) {
      if (email.match(mailformat)) {
        try {
          const result = await authService.signInUser(email, password);
          if (result.success) {
            setSuccess("Login successful!");
            setError(null);
          } else {
            setError(result.error || "Failed to log in. Please try again.");
            setSuccess(null);
          }
        } catch (err) {
          setError("Failed to log in. Please try again.");
          setSuccess(null);
        }
      } else {
        setError("You have entered an invalid email address!");
        return;
      }
    } else {
      setError("Both fields are required.");
      return;
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
      <form onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <input
          type="text"
          id="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit" title="submit">
          Login
        </button>

        {error && <p className="error">{error}!</p>}
        {success && <p className="success">{success}!</p>}
        <p>
          Don&apos;t have an account? <NavLink to="/get-started">get started</NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;