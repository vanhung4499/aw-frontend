import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { type ReactElement, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Register from '@/components/auth/Register';
import type { NextPageWithLayout } from '@/types';
import { authProviderEnabled } from '@/lib/auth';
import { AuthLayout } from '@/components/layouts';
import GoogleButton from '@/components/auth/GoogleButton';
import Head from 'next/head';
import { Loading } from '@/components/shared';
import env from '@/lib/env';

const Signup: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ authProviders }) => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const { error } = router.query as {
        error: string;
    };

    useEffect(() => {
        if (error) {
            toast.error(t(error));
        }
    }, [error]);

    // if (status === 'loading') {
    //     return <Loading />;
    // }
    //
    // if (status === 'authenticated') {
    //     router.push(env.redirectIfAuthenticated);
    // }

    return (
        <>
            <Head>
                <title>{t('sign-up-title')}</title>
            </Head>
            <div className="rounded p-6 border">
                <div className="flex gap-2 flex-wrap">
                    {authProviders.google && <GoogleButton />}
                </div>

                {(authProviders.google) &&
                    authProviders.credentials && <div className="divider">or</div>}

                {authProviders.credentials && (
                    <>
                        <Register />
                    </>
                )}
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
                {t('already-have-an-account')}
                <Link
                    href="/auth/login"
                    className="font-medium text-primary hover:text-primary-focus"
                >
                    &nbsp;{t('sign-in')}
                </Link>
            </p>
        </>
    );
};

Signup.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout heading="Get started" description="Create a new account">
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

export default Signup;
