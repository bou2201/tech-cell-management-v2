'use client';

import { DialogDisplay } from '@/components/common/display';
import { UserRoundSearch } from 'lucide-react';

export const Profile = () => {
  return (
    <DialogDisplay
      trigger={
        <button
          type="button"
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <UserRoundSearch size={18} />
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-sm font-bold">
            Thông tin cá nhân
          </span>
        </button>
      }
      title="Thông tin cá nhân"
      classNameTrigger="w-full"
    >
      <></>
    </DialogDisplay>
  );
};