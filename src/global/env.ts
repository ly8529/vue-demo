import { isUndef } from '@/utils/is'

// 正式环境
export const ENV = {
	APP_API_BASE: 'http://10.10.24.58:3000',
	IS_DEV: '',
	NODE_ENV: 'production',
	IS_TEST: '',
}

// 测试环境
export const ENV_DEV = {
	...ENV,
	APP_API_BASE: 'http://10.10.24.58:3001',
	IS_DEV: 'true',
	NODE_ENV: 'development',
	IS_TEST: 'true',
}

export type EnvKey = keyof typeof ENV

const isTestEnv = process.env.NODE_ENV === 'development' || ['test.xxx.com'].includes(location.host)

// const isTestEnv = false
export function getProcessEnv(key: EnvKey): string | void {
	if (isTestEnv) {
		if (!isUndef(ENV_DEV[key])) {
			return ENV_DEV[key]
		}
		return ''
	}
	if (!isUndef(ENV[key])) {
		return ENV[key]
	}
}
