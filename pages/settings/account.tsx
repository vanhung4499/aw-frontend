import type { NextPageWithLayout } from '@/types';
import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { UpdateAccount } from '@/components/account';
import env from '@/lib/env';
import {useAuthStore} from "@/store/useAuthStore";
import {InferGetServerSidePropsType} from "next";


const Account: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ allowEmailChange }) => {
    return <UpdateAccount allowEmailChange={allowEmailChange} />;
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { locale } = context;

    return {
        props: {
            ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
            allowEmailChange: !env.confirmEmail,
        },
    };
};

export default Account;
