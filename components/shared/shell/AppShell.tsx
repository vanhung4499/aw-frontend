import { useState } from 'react';
import { Loading } from '@/components/shared';
import React from 'react';
import Header from './Header';
import Drawer from './Drawer';
import {useAuthStore} from "@/store/useAuthStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <p>Access Denied</p>;
    }

    return (
        <div>
            <Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="lg:pl-64">
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="py-5">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
