'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthLogin } from '@/modules/auth/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, useToast } from '@/components/ui';
import { FormReturn, PasswordInput, TextInput } from '@/components/common/form-handle';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/modules/auth/apis';
import { useAuthStore } from '@/modules/auth/store';
import { setOneSessionStorage } from '@/utilities/session.util';
import { ForgotPassword } from '../ForgotPassword';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enum';
import LoadingPage from '@/app/loading';
import { loginValidateSchema } from './validate-schema';

export const SignIn = () => {
  const { toast } = useToast();
  const { fetching, fetched, setUser, isSignedIn } = useAuthStore();
  const { theme } = useTheme();
  const { push } = useRouter();

  const signInForm = useForm<AuthLogin>({
    resolver: yupResolver(loginValidateSchema),
    defaultValues: new AuthLogin(),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
  } = signInForm;

  const formReturn: FormReturn<AuthLogin> = useMemo(() => {
    return {
      control,
      getValues,
      setValue,
      trigger,
    };
  }, [control, getValues, setValue, trigger]);

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-login'],
    mutationFn: (values: AuthLogin) => loginApi(values),
    onMutate: () => {
      fetching();
    },
    onSuccess: ({ data }) => {
      setUser(data);
      setOneSessionStorage('user', data);

      toast({
        variant: 'success',
        title: 'Đăng nhập thành công',
        description: 'Chào mừng bạn dến với Techcell Dashboard',
      });

      push(Routes.Dashboard);
    },
    onError: (error) => {
      console.log(error.message);
      fetched();
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: 'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!',
      });
    },
  });

  useEffect(() => {
    if (isSignedIn) {
      const timeout = setTimeout(() => {
        push(Routes.Dashboard);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSignedIn, push]);

  return isSignedIn ? (
    <LoadingPage loading />
  ) : (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <Image
        width={100}
        height={50}
        src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo-red.png'}
        alt="techcell-logo"
        priority
      />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-1">
        Đăng nhập
      </h1>
      <span className="text-[14px]">Tiếp tục để đến với trang quản trị Techcell</span>

      <Form {...signInForm}>
        <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
          <TextInput<AuthLogin>
            name="email"
            label="Email hoặc tên người dùng"
            className="mb-5"
            formReturn={formReturn}
          />

          <PasswordInput<AuthLogin>
            name="password"
            label="Mật khẩu"
            control={control}
            className="mb-4"
          />

          <Button type="submit" className="w-full mt-4" isLoading={isSubmitting} variant="red">
            Đăng nhập
          </Button>
        </form>
      </Form>

      <div className="w-full flex justify-center mt-0">
        <ForgotPassword />
      </div>

      <p className="text-center text-sm font-medium">
        Trang chủ:{' '}
        <Link href="https://techcell.cloud/" className="font-semibold underline">
          https://techcell.cloud/
        </Link>
      </p>
    </div>
  );
};
