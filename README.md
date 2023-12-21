# 基于vite新建一个vue—ts 项目


# github 上新建一个项目 vue-ts-init

克隆到本地

```
git clone https://github.com/name/vue-ts-init.git
```

# 使用 pnpm 初始化项目

```
pnpm create vite vue-ts-init --template vue-ts
```

可以运行起来看看

```
cd vue-init-ts-2
pnpm install
pnpm run dev

```

# 工程化插件

## 增加.nvmrc 用来设置 node 版本 不用再执行 nvm use 切换 node 版本

## 设置路径别名

```
pnpm i @types/node -D
```

### 1、tsconfig.json 设置

```
"baseUrl": "",
"paths": {
    "@/*": ["./src/*"] // 此处映射是相对于"baseUrl"
}
```

### 2、vite.config.ts 设置路径

```
import { resolve } from "path";

resolve: {
    alias: [
        {
            find: "@",
            replacement: resolve(__dirname, "src"),
        },
    ],
},

```

### 3、找个模块测试一下

```
import HelloWorld from "@/components/HelloWorld.vue";
```

## 找不到模块“./App.vue”或其相应的类型声明

在 vite-env.d.ts 文件里新增以下对 vue 的声明

```
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
```

## 安装 prettier + eslint

```
pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-vue -D

```

![安装 prettier + eslint](https://img-blog.csdnimg.cn/direct/ca998e17f52c4a2eade41758d8ec595c.png)

### 1、配置 .eslintrc.js
```
module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    rules: {
        'vue/no-v-html': 0,
        'vue/v-on-event-hyphenation': 0,
        'vue/no-template-shadow': 0,
        'vue/multi-word-component-names': 0,
    },
}

```

### 2、配置 .eslintignore
```
/dist
/node_modules
tsconfig.json
*.svg
*.png
*.jpg
*.jpeg
*.scss
*.gif
*.webp
*.ttf
index.html
*.md
```

### 3、配置.prettierrc.js
```
module.exports = {
    singleQuote: true, // 使用单引号代替双引号
    printWidth: 200, // 超过最大值换行
    semi: false, // 结尾不用分号
    useTabs: true, // 缩进使用tab, 不使用空格
    tabWidth: 4, // tab 样式宽度
    bracketSpacing: true, // 对象数组, 文字间加空格 {a: 1} => { a: 1 }
    arrowParens: 'avoid', // 如果可以, 自动去除括号 (x) => x 变为 x => x
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'ignore',
    trailingComma: 'all',
}

```

### 4、配置.prettierignore
```
/dist
/node_modules
/deploy
*.yml
*.yaml
tsconfig.json
*.svg
*.png
*.jpg
*.jpeg
*.scss
*.gif
*.webp
*.ttf
index.html
*.md
```

### 5、重启编辑器，格式化文件

```
pnpm eslint --fix ./src/*
```

### 6、在 package.json 中去掉 "type": "module", 因为 .eslintrc.js中 “module.exports=”导出方式不是module默认的export default

## 使用 vue-router 
### 1、安装
```
pnpm i vue-router
```
### 2、配置路由

#### 1、在src目录下新建 router/index.ts
```
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    { path: '/', component: ()=> import('@/components/HelloWorld.vue') },
    { path: '/login', component: ()=> import('@/pages/login.vue') },
    { path: '/account', component: ()=> import('@/pages/account.vue') },
    { path: '/:pathMatch(.*)', redirect: '/'  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//导航守卫
router.beforeEach((_to, _from, next)=>{
    next()
})
export default router

```
#### 2、在main.ts 引入路由并使用
```
import router from "@/router"
app.use(router)
```

##### 3、在app.vue页面中加入
```
<router-view></router-view>
```

##### 4、新增pages/account.vue
```
<template>
	<h1>account 页面</h1>
	<button @click="toLogin">toLogin</button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toLogin() {
	router.push({
		path: '/login',
	})
}
</script>

```
##### 5、新增pages/login.vue
```
<template>
	<h1>login 页面</h1>
	<button @click="toAccount">toAccount</button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toAccount() {
	router.push({
		path: '/account',
	})
}
</script>

```

## 使用状态管理器 pinia

### 安装 
```
pnpm i pinia
```

### main.ts 中使用
```
import { createPinia } from 'pinia'

app.use(createPinia())
```

### 新建stores/index.ts

```
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('counter', {
	state: () => {
		return { count: 0 }
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	getters: {
		double: state => state.count * 2,
	},
	actions: {
		increment() {
			this.count++
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}

```

## 使用sass
```
pnpm install sass -D

```

## 使用 autoprefiexer 给 web 项目自动增加 css 前缀，兼容各种浏览器
安装
```
pnpm install autoprefixer -D
pnpm install postcss -D
```
在vite.config.ts 中配置

、、、
import autoprefixer from 'autoprefixer'
 
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        })
      ]
    }
  },
  plugins: [vue()],
})
、、、

在页面中测试一下
```
.filter-1 {
	filter: blur(1px);
}

运行结果：
.filter-1[data-v-e17ea971] {
    -webkit-filter: blur(1px);
    filter: blur(1px);
}
```

## 使用 @vitejs/plugin-legacy 兼容旧版浏览器js

安装
```
pnpm i @vitejs/plugin-legacy terser@^5.4.0 -D
```

在vite.config.js中新增以下配置
```
import legacy from '@vitejs/plugin-legacy'

plugins: [
    legacy({
        targets: ['cover 99.5%'],
    }),
],
```

## 使用组件库 ant-design-vue

安装
```
pnpm i ant-design-vue

```
使用
```
import { Button as AButton } from 'ant-design-vue'

<a-button type="primary">Primary Button</a-button>

```

备注：这里安装的版本是 ant-design-vue 4.0.7
然后按钮点击的时候报错：
```
useConfigInject.js:64 Uncaught TypeError: Cannot read properties of undefined (reading 'value')
    at ReactiveEffect.fn (useConfigInject.js:64:83)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at get value [as value] (reactivity.esm-bundler.js:1140:33)
    at showWave (useWave.js:7:21)
    at HTMLButtonElement.onClick (index.js:51:13)
```
升级一下就可以了 这个问题ant-design-vue已经修复了
```
pnpm i ant-design-vue@next
```
然后安装的这个版本啊 是"ant-design-vue": "4.0.0-rc.6"

在软件开发中，版本号通常由三个部分组成：主版本号、次版本号和修订版本号。有时，还会包括预发布版本号或构建元数据。在你提到的版本号 "4.0.0-rc.6" 中，"rc.6" 表示预发布版本，其中 "rc" 代表 "Release Candidate"，意味着这是一个发布候选版本。数字 "6" 表示该候选版本的第六个构建或修订。

## 使用 tailwindcss 快速添加样式

安装
```
pnpm install -D tailwindcss postcss autoprefixer
pnpx tailwindcss init
```
在根目录得到一个 tailwind.config.js配置文件

配置
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
在common.scss添加以下代码
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 使用husky和lint-staged进行代码提交前的检查
安装
```
pnpm dlx husky-init && pnpm install

pnpm install --save-dev lint-staged

```

在.husky/per-commit 中添加
```
npx lint-staged

```
在package.json
```
"lint-staged": {
    "*.{vue,ts}": "eslint --cache --fix",
    "*.md": "prettier --list-different"
}
```
执行命令观察结果
```
git add . 
git commot -m 'husky'
```

## 基于axios封装请求

### 安装
```
pnpm i axios
```

### 创建实例
```
import axios, { AxiosError, AxiosInstance } from 'axios'

function createRequestInstance(url: string): AxiosInstance {
	const instance = axios.create({
		timeout: 1000 * 60 * 10,
		withCredentials: false,
		baseURL: `${url}/`,
	})
	return instance
}
//创建一个axios实例
const request = createRequestInstance('http://10.10.24.58:3000')

export default request
```

### 新增错误class
新建error.ts
```
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

```
新增错误处理器 handleError.ts

```
import { AxiosError } from 'axios'
import AxRequestError, { ErrorResponse } from './error'

export function handelError(error: AxiosError | AxRequestError): AxRequestError {
	const err = error instanceof AxRequestError ? error : new AxRequestError(error.response?.status || 1, error.message, error, error.response?.data as ErrorResponse)
	return err
}

```

### 请求拦截器

在instance.ts 实例文件中新增请求拦截器，添加用户身份验证、多语言、自定义headers等设置

```
//伪方法 具体根据业务逻辑实现
const getToken = () => {
	return ''
}
//请求拦截器
request.interceptors.request.use(config => {
	const token = getToken() 
	const headers = config.headers || {}
	config.headers = {
		...headers,
		Authorization: `${headers.Authorization || token || ''}`,
		language: 'zh', //适用于多语言环境,
	} 
	return config
})
```

### 响应拦截器

```
//响应拦截器
request.interceptors.response.use(undefined, (err: AxRequestError) => {
	err = handelError(err)
	if (err.isUnAuthorized) {
		//todo退出登录
	}
	//其他错误处理

	return Promise.reject(err)
})

```
### 公共请求方法

```
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

```

### 在main.ts绑定公共请求方法
```
import $api from '@/service/requestList'

app.config.globalProperties.$api = $api
```

### 配置生产环境和开发环境

新增env.ts
```
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

```
在instance.ts中引入
```
import { getProcessEnv } from '@/global/env'
const request = createRequestInstance(getProcessEnv('APP_API_BASE') || '')

```

### 测试一下
```
import $api from '@/service/request'

$api.get('/test').then(res => {
	console.info('res:', res)
})
$api.test().then(res => {
	console.info('res:', res)
})
```

## 使用vite-plugin-svg-icons插件展示svg矢量图


### 安装 
```
pnpm install vite-plugin-svg-icons -D

```

### 在vite.config.ts 中配置

```
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
 plugins: [
	createSvgIconsPlugin({
			// Specify the icon folder to be cached
			iconDirs: [resolve(__dirname, 'src/assets/icons')],
		}),
    ],
```

### 在main.ts 中引用
```
import 'virtual:svg-icons-register'
```
### 新建svgIcon公共组件
```
<template>
	<svg aria-hidden="true" :width="width" :height="height">
		<use :href="symbolId" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: '#333',
	},
	size: {
		type: String,
		default: '',
	},
})
const symbolId = computed(() => `#icon-${props.name}`)

const size = props.size.split(' ')

let width: string
let height: string
if (size.length === 1) {
	;[width] = size
	height = width
} else if (size.length === 2) {
	;[width, height] = size
} else {
	throw new Error(`invalid size for svg: ${props.name}`)
}
</script>

```
### 新建global/allGlobalComponents.ts 注册全局组件

```
// 引入项目中的全部全局组件
import SvgIcon from '@/components/svgIcon.vue'

// 组装成一个对象
const allGlobalComponents: any = { SvgIcon }

// 对外暴露插件对象，在main.ts中引入后，直接自动调用install方法 注册插件
export default {
	install(app: any) {
		// 循环注册所有的全局组件
		Object.keys(allGlobalComponents).forEach(componentName => {
			app.component(componentName, allGlobalComponents[componentName])
		})
	},
}

```

### 在main.ts 中使用
```
import allGlobalComponents from '@/global/allGlobalComponents'

app.use(allGlobalComponents)

```

### 测试一下 在icons中新增一个bold.svg

```
<SvgIcon name="bold" color="blue" size="100"></SvgIcon>
```
# i18n添加多语言

## 安装
```
pnpm i vue-i18n@9
```

新建global/i18n

en.ts
```
export default {
	test: 'Hello',
}
```
zh.ts
```
export default {
	test: '你好',
}
```

index.ts
```
import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import { SystemLang } from '@/global/enum'

const localLang = localStorage.SYSTEM_LANG

let curSystemLang
if (localLang) {
	curSystemLang = ['zh', 'zh-cn'].includes(localLang) ? SystemLang.ZH : SystemLang.EN
}

const defaultLang = curSystemLang ? curSystemLang : ['zh', 'zh-cn'].includes(window.navigator.language.toLocaleLowerCase()) ? SystemLang.ZH : SystemLang.EN

const messages = {
	en,
	zh,
}

const i18n = createI18n({
	messages,
	locale: defaultLang,
	//fallbackLocale: 'en', // 设置回退语言环境
})

export function setCurSystemLang(curSystemLang: SystemLang) {
	i18n.global.locale = curSystemLang
}

export const curLang = i18n.global.locale

export const $i18n = i18n.global.t.bind(i18n.global)

export default i18n

```

在main.ts中引入并使用
```
import i18n, { $i18n } from '@/global/i18n'

app.use(i18n)

app.config.globalProperties.$t = $i18n
```

在页面中使用
```
<h1 class="text-3xl font-bold underline">{{ i18n.global.locale }}: {{ $t('test') }} </h1>
<h1 class="text-3xl font-bold underline">{{ test }}</h1>

import i18n, { $i18n, setCurSystemLang } from '@/global/i18n'
import { SystemLang } from '@/global/enum'

const test = computed(() => $i18n('test'))

function changeLang() {
	setCurSystemLang(SystemLang.EN)
}
```
