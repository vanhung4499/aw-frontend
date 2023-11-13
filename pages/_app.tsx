import app from '@/lib/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import colors from 'tailwindcss/colors';
import type { AppPropsWithLayout } from '@/types';

import '../styles/globals.css';
import { useEffect } from 'react';
import env from '@/lib/env';
import { Theme, applyTheme } from '@/lib/theme';
import { AccountLayout } from '@/components/layouts';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { session, ...props } = pageProps;

    const getLayout =
        Component.getLayout || ((page) => <AccountLayout>{page}</AccountLayout>);

    return (
        <>
            <Head>
                <title>{app.name}</title>
                <link rel="icon" href="https://boxyhq.com/img/favicon.ico" />
            </Head>
            <SessionProvider session={session}>
                <Toaster toastOptions={{ duration: 4000 }} />
                <>
                    {getLayout(<Component {...props} />)}
                </>
            </SessionProvider>
        </>
    );
}

export default appWithTranslation<never>(MyApp);
