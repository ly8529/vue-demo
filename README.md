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
