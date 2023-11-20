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
import {register} from "@/services/auth";

const Register = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible((prev) => !prev);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(passwordPolicies.minLength),
            confirmPassword: Yup.string().required().min(passwordPolicies.minLength),
        }),
        onSubmit: async (values) => {
            const body = {
                password: values.password,
                confirmPassword: values.confirmPassword,
                user: {
                    username: values.username,
                    email: values.email,
                }
            }
            const response = await register(body);

            if (response.data.error) {
                toast.error(response.data.error);
                return;
            }

            formik.resetForm();

            if (response.data.confirmEmail) {
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
                    label={t('username')}
                    name="username"
                    placeholder={t('username')}
                    value={formik.values.username}
                    error={formik.touched.username ? formik.errors.username : undefined}
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
                        name="confirmPassword"
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
            <div className="mt-5 space-y-3">
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
