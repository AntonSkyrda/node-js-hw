import { Outlet } from "react-router-dom";
import {HeaderComponent} from "../components/header-component/HeaderComponent.tsx";

export const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    )
}