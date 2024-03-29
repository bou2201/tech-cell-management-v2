import { Roles } from '@/constants/enum';

export const convertRoleViVN: { [key: string]: string } = {
  [Roles.Customer]: 'Khách hàng',
  [Roles.Staff]: 'Nhân viên',
  [Roles.Manager]: 'Quản lý',
  [Roles.Accountant]: 'Kế toán',
  [Roles.DataEntry]: 'Nhân viên nhập liệu',
  [Roles.Sales]: 'Nhân viên bán hàng',
  [Roles.Warehouse]: 'Nhân viên kho',
};
