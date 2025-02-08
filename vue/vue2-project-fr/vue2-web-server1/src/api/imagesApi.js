import request from '@/utils/request'

export const getImageList = (params) => request.get('/images', params)