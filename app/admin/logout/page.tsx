'use client'

import React from 'react'
import AdminLogout from "@/components/AdminLogout"
import { AuthProvider } from '@/app/context/AuthContext'; 

export default function Logout() {
  return (
    <AuthProvider>
        <AdminLogout/>
    </AuthProvider>
  )
}
