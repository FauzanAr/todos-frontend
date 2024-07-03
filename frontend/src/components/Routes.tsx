import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

const Routes = () => {
  const { token } = useAuth()

  type AppRoute = {
    path: string;
    element: JSX.Element;
    children?: AppRoute[];
  };

  const routesForPublic: AppRoute[] = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const routesForAuthenticatedOnly: AppRoute[] = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        }
      ],
    },
  ];

  const routesForNotAuthenticatedOnly: AppRoute[] = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
