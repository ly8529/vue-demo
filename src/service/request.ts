import { AxiosResponse, AxiosRequestConfig } from 'axios'
import request from './instance'

/* 导出封装的请求方法以及公共方法 */
const $api = {
	get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return request.get(url, config)
	},
	post<T = any, R = AxiosResponse<T>>(url: string, data?: object, config?: AxiosRequestConfig): Promise<R> {
		return request.post(url, data, config)
	},
	put<T = any, R = AxiosResponse<T>>(url: string, data?: object, config?: AxiosRequestConfig): Promise<R> {
		return request.put(url, data, config)
	},
	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return request.delete(url, config)
	},
	patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
		return request.patch(url, data, config)
	},

	async test(): Promise<AxiosResponse> {
		const res = await request.get('/test')
		return res
	},
}

export default $api
