import { useForm } from 'react-hook-form';
import { AuthUpdate, AuthUpdatePw } from '~auth/models';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePwValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { patchMeApi } from '~auth/apis';
import { PasswordInput } from '@/components/common/form-handle';
import { useAuthStore } from '~auth/store';

export const ChangePassword = () => {
  const { toast } = useToast();
  const { logout } = useAuthStore();

  const updatePwForm = useForm<AuthUpdatePw>({
    resolver: yupResolver(changePwValidateSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      re_password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updatePwForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<AuthUpdate>) => patchMeApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thay đổi mật khẩu thành công!',
      });
      logout();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Đổi mật khẩu thất bại',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <Form {...updatePwForm}>
      <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Đổi mật khẩu</h3>
        <Separator className="my-6" />

        <div className="flex flex-col gap-4">
          <PasswordInput<AuthUpdatePw> name="oldPassword" label="Mật khẩu cũ" />
          <PasswordInput<AuthUpdatePw> name="password" label="Mật khẩu mới" />
          <PasswordInput<AuthUpdatePw> name="re_password" label="Nhập lại mật khẩu" />
        </div>

        <div className="w-full flex justify-end mt-6">
          <Button type="submit" variant="red" isLoading={isSubmitting}>
            Xác nhận
          </Button>
        </div>
      </form>
    </Form>
  );
};
