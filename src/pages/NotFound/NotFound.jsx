import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  return (
    <motion.div
      className='not-found'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="error-code">404</h1>
      <h2 className='sub-heading'>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <NavLink to="/" className='btn'>Go Home</NavLink>
    </motion.div>
  );
}
