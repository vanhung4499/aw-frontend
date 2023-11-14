import app from '@/lib/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import type { AppPropsWithLayout } from '@/types';

import '../styles/globals.css';
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
            <>
                <Toaster toastOptions={{ duration: 4000 }} />
                <>
                    {getLayout(<Component {...props} />)}
                </>
            </>
        </>
    );
}

export default appWithTranslation<never>(MyApp);
