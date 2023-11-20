import Link from 'next/link';
import React from "react";
import useTheme from "@/hooks/useTheme";
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    SunIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import env from '@/lib/env';
import {useAuthStore} from "@/store/useAuthStore";

interface HeaderProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
    const { toggleTheme } = useTheme();

    const redirectUrl = env.appUrl;

    if (status === 'loading') {
        return null;
    }

    const user = useAuthStore(state => state.user);
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
    const removeUser = useAuthStore(state => state.removeUser);
    const removeToken = useAuthStore(state => state.removeToken)
    const removeRefreshToken = useAuthStore(state => state.removeRefreshToken)

    function signOut() {
        setIsAuthenticated(false)
        removeUser();
        removeToken();
        removeRefreshToken();
        window.location.href = '/auth/login';
    }

    return (
        <div className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b px-4 sm:gap-x-6 sm:px-6 lg:px-8 bg-white">
            <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1"></div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <div className="dropdown dropdown-end">
                        <div className="flex items-center cursor-pointer" tabIndex={0}>
              <span className="hidden lg:flex lg:items-center">
                <button
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                >
                  {user?.username}
                </button>
                <ChevronDownIcon
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
              </span>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 border rounded w-40 space-y-1"
                        >
                            <li
                                onClick={() => {
                                    if (document.activeElement) {
                                        (document.activeElement as HTMLElement).blur();
                                    }
                                }}
                            >
                                <Link
                                    href="/settings/account"
                                    className="block px-2 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <UserCircleIcon className="w-5 h-5 mr-1" /> Account
                                    </div>
                                </Link>
                            </li>

                            {env.darkModeEnabled && (
                                <li>
                                    <button
                                        className="block px-2 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                                        type="button"
                                        onClick={toggleTheme}
                                    >
                                        <div className="flex items-center">
                                            <SunIcon className="w-5 h-5 mr-1" /> Change Theme
                                        </div>
                                    </button>
                                </li>
                            )}

                            <li>
                                <button
                                    className="block px-2 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                                    type="button"
                                    // TODO: Add signOut function
                                    onClick={() => signOut()}
                                >
                                    <div className="flex items-center">
                                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />{' '}
                                        Logout
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
