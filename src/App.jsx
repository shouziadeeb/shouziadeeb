import { useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import Address from "./components/AddresBar/Address";
import { useSelector } from "react-redux";
import HomePage from "./components/Home/HomePage";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigation,
  useNavigationType,
} from "react-router-dom";
import Help from "./components/Help/Help";
import { LogInMobile } from "./components/SignIn/LogInMobile";
import Loader from "./components/Loder/Loader";

// Layout component to handle loading
const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Watch for changes in location to determine when loading starts/stops
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a delay (adjust as necessary)

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      {!loading && <div>{children}</div>}
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
    },
    {
      path: "/address",
      element: (
        <Layout>
          <Address />
        </Layout>
      ),
    },
    {
      path: "/help",
      element: (
        <Layout>
          <Help />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          {" "}
          <Layout>
            <LogInMobile />
            <Footer />
          </Layout>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
