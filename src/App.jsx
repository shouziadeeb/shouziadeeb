import { useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import Address from "./components/AddresBar/Address";
import { useSelector } from "react-redux";
import HomePage from "./components/Home/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Help from "./components/Help/Help";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/address",
      element: <Address />,
    },
    {
      path: "/help",
      element: <Help />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
