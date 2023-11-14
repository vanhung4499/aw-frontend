import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { Button, Input } from 'react-daisyui';

import type { ApiResponse } from '@/types';
import { Card } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import type { IUser } from '@/models';
import {useAuthStore} from "@/store/useAuthStore";

const schema = Yup.object().shape({
    email: Yup.string().required(),
});

interface UpdateEmailProps {
    allowEmailChange: boolean;
}

const UpdateEmail = ({ allowEmailChange }: UpdateEmailProps) => {
    const { t } = useTranslation('common');
    const user = useAuthStore((state) => state.user);

    const formik = useFormik({
        initialValues: {
            email: user!.email,
        },
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

            toast.success(t('successfully-updated'));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <Card.Body>
                    <Card.Header>
                        <Card.Title>{t('email-address')}</Card.Title>
                        <Card.Description>
                            {t('email-address-description')}
                        </Card.Description>
                    </Card.Header>
                    <Input
                        type="email"
                        name="email"
                        placeholder={t('your-email')}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="w-full max-w-md"
                        required
                        disabled={!allowEmailChange}
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

export default UpdateEmail;
