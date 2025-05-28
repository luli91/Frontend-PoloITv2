import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import LoginPage from "../pages/portal/auth/LoginPage";
import HomePage from "../pages/landing/HomePage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProfilePage from "../pages/dashboard/DashboardProfile.jsx";
import PrivateRoute from "./PrivateRoute";
import SettingsPage from "../pages/dashboard/DashboardSettings.jsx";
import RegisterPage from "../pages/portal/RegisterPage";
import DashboardManageUsers from "../pages/admin/DashboardManageUsers.jsx";
import Donaciones from  "../pages/portal/Donaciones.jsx"
export default function AppRouter() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Route>

            <Route path="/dashboard" element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
            }>
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="user-admin" element={<DashboardManageUsers />} />
                <Route path="donations" element={<Donaciones />} />

            </Route>

            <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}