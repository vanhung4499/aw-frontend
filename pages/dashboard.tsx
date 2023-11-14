import { Loading } from '@/components/shared';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/types';

const Dashboard: NextPageWithLayout = () => {
    const router = useRouter();
    // TODO: handle more case here
    return <Loading />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
    return {
        props: {
            ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
        },
    };
}

export default Dashboard;
