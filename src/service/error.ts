import { AxiosError } from 'axios'

//自定义错误返回类型(具体可以跟后端同学商量决定)
export type ErrorResponse = {
	status: number
	code: number
	msg: string
}

class AxRequestError extends Error {
	data: ErrorResponse | undefined

	raw: AxiosError

	isUnAuthorized = false

	isServerError = false

	errCode?: number

	isNetError = false

	message: string

	constructor(status: number, message: string, raw: AxiosError, data?: ErrorResponse) {
		super(message) // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
		this.data = data
		this.raw = raw
		this.isUnAuthorized = status === 401 //一般是身份验证不通过，token过期
		this.isServerError = status >= 500
		this.errCode = data?.code
		this.message = `${message || raw?.message || data?.msg || ''}`
		if (message.includes('getaddrinfo ENOTFOUND') || message === 'Network Error') {
			this.message = 'network error'
			this.isNetError = true
		} else if (['no token present in request'].includes(message)) {
			this.message = 'login expired'
		}
	}
}

export default AxRequestError
