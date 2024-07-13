import { createBrowserRouter, } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import App from "../App";
import NotFound from "../pages/NotFound";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
import AddItem from "../pages/AddItem";
import SetDailyMeals from "../pages/SetDailyMeals";
import SetMyMeal from "../pages/SetMyMeal";
import Auth from "../layout/Auth";
import PrivateRoute from "./PrivateRoute";
import AllUser from "../pages/AllUser";
import AllItem from "../pages/AllItem";
import AllSetMeal from "../pages/AllSetMeal";
import AllSetMyMeal from "../pages/AllSetMyMeal";
import DashboardHome from "../pages/DashboardHome";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Auth />,
        children: [
            { path: '/login', element: <Login /> },
        ]
    },
    {
        path: "/",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            { path: "/", element: <AdminRoute> <DashboardHome /> </AdminRoute>  },
            { path: "/add-user", element: <AdminRoute> <AddUser /> </AdminRoute> },
            { path: "/all-user", element: <AdminRoute> <AllUser /> </AdminRoute> },
            { path: "/edit-user/:id", element: <AdminRoute> <AddUser /> </AdminRoute> },

            { path: "/add-item", element: <AdminRoute> <AddItem /> </AdminRoute> },
            { path: "/all-item", element: <AdminRoute> <AllItem /> </AdminRoute> },
            
            { path: "/set-meal", element: <AdminRoute> <SetDailyMeals /> </AdminRoute> },
            { path: "/edit-set-meal/:id", element: <AdminRoute> <SetDailyMeals /> </AdminRoute> },
            { path: "/all-set-meal", element: <AdminRoute> <AllSetMeal /> </AdminRoute> },


            { path: "/set-my-meal", element: <SetMyMeal /> },
            { path: "/edit-set-my-meal/:mealId", element: <SetMyMeal /> },
            { path: "/all-set-my-meal", element: <AllSetMyMeal /> },
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    },
]);