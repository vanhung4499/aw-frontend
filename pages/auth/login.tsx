import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next';

import * as Yup from 'yup';
import Link from 'next/link';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Button } from 'react-daisyui';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { type ReactElement, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import env from '@/lib/env';
import type { NextPageWithLayout } from '@/types';
import { AuthLayout } from '@/components/layouts';
import GoogleButton from '@/components/auth/GoogleButton';
import { Alert, InputWithLabel, Loading } from '@/components/shared';
import { authProviderEnabled } from '@/lib/auth';
import Head from 'next/head';
import TogglePasswordVisibility from '@/components/shared/TogglePasswordVisibility';
import AgreeMessage from '@/components/auth/AgreeMessage';
import { ComponentStatus } from 'react-daisyui/dist/types';
import {login} from "@/services/auth";
import {useAuthStore} from "@/store/useAuthStore";

interface Message {
    text: string | null;
    status: ComponentStatus | null;
}

const Login: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ authProviders }) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [message, setMessage] = useState<Message>({ text: null, status: null });
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

    const { error, success } = router.query as {
        error: string;
        success: string;
    };

    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    useEffect(() => {
        if (error) {
            setMessage({ text: error, status: 'error' });
        }

        if (success) {
            setMessage({ text: success, status: 'success' });
        }
    }, [error, success]);

    const redirectUrl = env.redirectIfAuthenticated;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            const { email, password } = values;

            const response = await login({email, password});

            if (response.data.error) {
                toast.error(t(response.data.error));
                return;
            }

            setIsAuthenticated(true);
            setUser(response.data.user);
            setToken(response.data.token);
            setRefreshToken(response.data.refreshToken);

            formik.resetForm();


        },
    });

    // if (isAuthenticated) {
    //     return <Loading />;
    // }

    if (isAuthenticated) {
        router.push(redirectUrl);
    }

    return (
        <>
            <Head>
                <title>{t('login-title')}</title>
            </Head>
            {message.text && message.status && (
                <Alert status={message.status}>{t(message.text)}</Alert>
            )}
            <div className="rounded p-6 border">
                <div className="flex gap-2 flex-wrap">
                    {authProviders.google && <GoogleButton />}
                </div>

                {(authProviders.google) &&
                    authProviders.credentials && <div className="divider">or</div>}

                {authProviders.credentials && (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="space-y-3">
                            <InputWithLabel
                                type="email"
                                label="Email"
                                name="email"
                                placeholder="Email"
                                value={formik.values.email}
                                error={formik.touched.email ? formik.errors.email : undefined}
                                onChange={formik.handleChange}
                            />
                            <div className="relative flex">
                                <InputWithLabel
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    label={
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                            <span className="label-text-alt">
                                            <Link
                                                href="/auth/forgot-password"
                                                className="text-sm text-primary hover:text-primary-focus"
                                            >
                                              {t('forgot-password')}
                                            </Link>
                                          </span>
                                        </label>
                                    }
                                    error={
                                        formik.touched.password ? formik.errors.password : undefined
                                    }
                                    onChange={formik.handleChange}
                                />
                                <TogglePasswordVisibility
                                    isPasswordVisible={isPasswordVisible}
                                    handlePasswordVisibility={handlePasswordVisibility}
                                />
                            </div>
                        </div>
                        <div className="mt-5 space-y-3">
                            <Button
                                type="submit"
                                color="primary"
                                loading={formik.isSubmitting}
                                active={formik.dirty}
                                fullWidth
                                size="md"
                            >
                                {t('sign-in')}
                            </Button>
                            <AgreeMessage text="sign-in" />
                        </div>
                    </form>
                )}

                {(authProviders.email) && (
                    <div className="divider"></div>
                )}
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
                {t('dont-have-an-account')}
                <Link
                    href="/auth/signup"
                    className="font-medium text-primary hover:text-primary-focus"
                >
                    &nbsp;{t('create-a-account')}
                </Link>
            </p>
        </>
    );
};

Login.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout heading="Welcome back" description="Log in to your account">
            {page}
        </AuthLayout>
    );
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { locale } = context;

    return {
        props: {
            ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
            authProviders: authProviderEnabled(),
        },
    };
};

export default Login;
