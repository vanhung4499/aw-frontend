import { useState, useRef } from 'react';
import { InputWithLabel } from '@/components/shared';
import { defaultHeaders, passwordPolicies } from '@/lib/common';
import { IUser } from '@/models';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Button } from 'react-daisyui';
import toast from 'react-hot-toast';
import type { ApiResponse } from '@/types';
import * as Yup from 'yup';
import TogglePasswordVisibility from '../shared/TogglePasswordVisibility';
import AgreeMessage from './AgreeMessage';

interface RegisterProps {
    recaptchaSiteKey: string | null;
}

const Register = ({ recaptchaSiteKey }: RegisterProps) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');

    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleConfirmPasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(passwordPolicies.minLength),
            confirmPassword: Yup.string().required().min(passwordPolicies.minLength),
        }),
        onSubmit: async (values) => {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({
                    ...values,
                    recaptchaToken,
                }),
            });

            const json = (await response.json()) as ApiResponse<
                IUser & { confirmEmail: boolean }
            >;

            if (!response.ok) {
                toast.error(json.error.message);
                return;
            }

            formik.resetForm();

            if (json.data.confirmEmail) {
                router.push('/auth/verify-email');
            } else {
                toast.success(t('successfully-joined'));
                router.push('/auth/login');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-1">
                <InputWithLabel
                    type="text"
                    label={t('name')}
                    name="name"
                    placeholder={t('your-name')}
                    value={formik.values.name}
                    error={formik.touched.name ? formik.errors.name : undefined}
                    onChange={formik.handleChange}
                />
                <InputWithLabel
                    type="email"
                    label={t('email')}
                    name="email"
                    placeholder={t('email-placeholder')}
                    value={formik.values.email}
                    error={formik.touched.email ? formik.errors.email : undefined}
                    onChange={formik.handleChange}
                />
                <div className="relative flex">
                    <InputWithLabel
                        type={isPasswordVisible ? 'text' : 'password'}
                        label={t('password')}
                        name="password"
                        placeholder={t('password')}
                        value={formik.values.password}
                        error={formik.touched.password ? formik.errors.password : undefined}
                        onChange={formik.handleChange}
                    />
                    <TogglePasswordVisibility
                        isPasswordVisible={isPasswordVisible}
                        handlePasswordVisibility={handlePasswordVisibility}
                    />
                </div>
                <div className="relative flex">
                    <InputWithLabel
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        label={t('confirm-password')}
                        name="confirm-password"
                        placeholder={t('confirm-password')}
                        value={formik.values.confirmPassword}
                        error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
                        onChange={formik.handleChange}
                    />
                    <TogglePasswordVisibility
                        isPasswordVisible={isConfirmPasswordVisible}
                        handlePasswordVisibility={handleConfirmPasswordVisibility}
                    />
                </div>
            </div>
            <div className="mt-3 space-y-3">
                <Button
                    type="submit"
                    color="primary"
                    loading={formik.isSubmitting}
                    active={formik.dirty}
                    fullWidth
                    size="md"
                >
                    {t('create-account')}
                </Button>
                <AgreeMessage text="create-account" />
            </div>
        </form>
    );
};

export default Register;