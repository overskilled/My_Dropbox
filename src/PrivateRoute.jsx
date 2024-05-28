import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from './Store/authStore'

export default function PrivateRoute() {
    const { user } = useAuthStore()

    return user ? <Outlet /> : <Navigate to="/auth" />
}