import {createBrowserRouter, Navigate} from "react-router-dom"
import {MainLayout} from "../layouts/MainLayout.tsx";
import {PizzaPage} from "../pages/PizzaPage";
import {LoginPage} from "../pages/LoginPage.tsx";
import {RegisterPage} from "../pages/RegisterPage.tsx";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <Navigate to={"login"}/>
                },
                {
                    path: "pizzas",
                    element: <PizzaPage/>
                },
                {
                    path: "login",
                    element: <LoginPage/>
                },
                {
                    path: "register",
                    element: <RegisterPage/>
                }
            ]
        }
    ]
)