import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import { FaArrowUp } from 'react-icons/fa';
import { authState } from './recoil/atoms';

import Topnav from './components/Topnav/Topnav';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order/Order';
import Single from './components/Single/Single';
import Product from './pages/Product/Product';
import Store from './pages/Store/Store';
import { authService } from '../firebase';
import ThanksModal from './components/ThanksModal/ThanksModal';

const Layout = () => {
  return (
    <>
      <Topnav />
      <Search />
      <Outlet />
      <Single />
      {/*<ShareSocial
        url={window.location.href}
        socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
        title={'share this page'}
      />*/}
      <Footer />
      <button
        className="btn-top"
        onClick={() => { window.scrollTo(0, 0); }}
      >
        <FaArrowUp />
      </button>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Store />
      },
      {
        path: "/shop/:id",
        element: <Product />
      },
      {
        path: "/about-us",
        element: <About />
      },
      {
        path: "/contact-us",
        element: <Contact />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <Order />
      },
    ]
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/get-started",
    element: <RegisterForm />
  },
  {
    path: "/profile/:username",
    element: <Profile />
  },
  {
    path: "/profile/:username/edit",
    element: <EditProfile />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const AppWrapper = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);


  useEffect(() => {
    setTimeout(() => {
      console.log("hello world!")
  });

    // Set up auth state listener
    const unsubscribe = authService.onAuthChange((user) => {
      setAuth({
        user,
        isLoading: false,
        error: null
      });
      setLoading(false);
    });

    // Initial loading timeout
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      unsubscribe();
      clearTimeout(loadingTimer);
    };
  }, [setAuth]);

  return (
    <>
      {loading && <Loader />}
      {!loading && <RouterProvider router={router} />}
    </>
  );
}

export default AppWrapper;