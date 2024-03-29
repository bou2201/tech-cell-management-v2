import LoadingPage from '@/app/loading';
import { ModeToggle } from '@/components/utils';
import { SignIn } from '@/modules/auth/components';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Đăng nhập - Techcell Dashboard',
  description: 'Đăng nhập - Techcell Dashboard',
};

const SignInPage = () => {
  return (
    <Suspense fallback={<LoadingPage loading />}>
      <section className="bg-gray-50 dark:bg-gray-900 w-full relative">
        <div className="absolute top-5 right-5">
          <ModeToggle />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-7">
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            style={{
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
              borderRadius: '10px',
            }}
          >
            <SignIn />
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default SignInPage;
