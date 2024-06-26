import { axiosInstance } from '@/lib/axios';
import { Sku, SkuCreateNew, SkuCreateSerialNum } from '../models';
import { ApiTags } from '@/constants/enum';
import { PaginationResponse } from '@/common/model';
import { AddSerialNumberResponseDto, SerialNumber, UpdateSkuDto } from '@techcell/node-sdk';

export const postOneSkuApi = (payload: SkuCreateNew) => axiosInstance.post(ApiTags.SkuMnt, payload);

export const getListSkuApi = (params: string) =>
  axiosInstance.get<PaginationResponse<Sku>>(ApiTags.SkuMnt + '?' + params);

export const getOneSkuApi = (id: string) => axiosInstance.get<Sku>(ApiTags.SkuMnt + '/' + id);

export const patchOneSkuApi = (id: string, payload: Partial<UpdateSkuDto>) =>
  axiosInstance.patch(ApiTags.SkuMnt + '/' + id, payload);

export const getListSkuSerialNumbersApi = (id: string, params: string) =>
  axiosInstance.get<PaginationResponse<SerialNumber>>(`${ApiTags.SkuMnt}/${id}/serial-numbers?${params}`);

export const postOneSkuSerialNumApi = (id: string, payload: SkuCreateSerialNum) =>
  axiosInstance.post<AddSerialNumberResponseDto>(`${ApiTags.SkuMnt}/${id}/serial-numbers`, payload);
