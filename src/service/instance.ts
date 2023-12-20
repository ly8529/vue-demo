import axios, { AxiosInstance } from 'axios'
import { useRouter } from 'vue-router'
import { handelError } from './handleError'
import AxRequestError from './error'
import { getProcessEnv } from '@/global/env'

function createRequestInstance(url: string): AxiosInstance {
	const instance = axios.create({
		timeout: 1000 * 60 * 10,
		withCredentials: false,
		baseURL: `${url}/`,
	})
	return instance
}
//创建一个axios实例
const request = createRequestInstance(getProcessEnv('APP_API_BASE') || '')

//伪方法 具体根据业务逻辑实现
const getToken = () => {
	return localStorage.token || ''
}
//请求拦截器
request.interceptors.request.use(config => {
	const token = getToken()
	const headers = config.headers || {}
	//@ts-ignore
	config.headers = {
		...headers,
		Authorization: `${headers.Authorization || token || ''}`,
		language: 'zh', //适用于多语言环境,
	}
	return config
})

export function noAuthAction() {
	const router = useRouter()
	//退出登录
	router.push({
		name: 'login',
	})
}

//响应拦截器
request.interceptors.response.use(undefined, (err: AxRequestError) => {
	err = handelError(err)
	if (err.isUnAuthorized) {
		noAuthAction()
	}
	//其他错误处理

	return Promise.reject(err)
})

export default request
