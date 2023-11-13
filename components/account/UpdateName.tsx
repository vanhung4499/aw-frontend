import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { Button, Input } from 'react-daisyui';

import type { ApiResponse } from '@/types';
import { Card } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { IUser } from '@/models';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

const UpdateName = ({ user }: { user: Partial<IUser> }) => {
    const { t } = useTranslation('common');
    const { update } = useSession();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: user.name,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async (values) => {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: defaultHeaders,
                body: JSON.stringify(values),
            });

            const json = (await response.json()) as ApiResponse<IUser>;

            if (!response.ok) {
                toast.error(json.error.message);
                return;
            }

            await update({
                name: json.data.name,
            });

            router.replace('/settings/account');
            toast.success(t('successfully-updated'));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <Card.Body>
                    <Card.Header>
                        <Card.Title>{t('name')}</Card.Title>
                        <Card.Description>{t('name-appearance')}</Card.Description>
                    </Card.Header>
                    <Input
                        type="text"
                        name="name"
                        placeholder={t('your-name')}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="w-full max-w-md"
                        required
                    />
                </Card.Body>
                <Card.Footer>
                    <Button
                        type="submit"
                        color="primary"
                        loading={formik.isSubmitting}
                        disabled={!formik.dirty || !formik.isValid}
                        size="md"
                    >
                        {t('save-changes')}
                    </Button>
                </Card.Footer>
            </Card>
        </form>
    );
};

export default UpdateName;
