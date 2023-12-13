# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

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

1、tsconfig.json 设置

```
"baseUrl": "",
"paths": {
    "@": ["./src"] // 此处映射是相对于"baseUrl"
}
```

2、vite.config.ts 设置路径

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

3、找个模块测试一下

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

1、配置 .eslintrc.js
```
module.exports = {
	"root": true,
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"parser": "@typescript-eslint/parser"
	},
	"extends": ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
	"rules": {
		"vue/no-v-html": 0,
		"vue/v-on-event-hyphenation": 0,
		"vue/no-template-shadow": 0,
		"vue/multi-word-component-names": 0 
	}
}

```

2、配置 .eslintignore
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

3、配置.prettierrc.js
```
 module.exports = {
   
	"singleQuote": true, // 使用单引号代替双引号 
	"printWidth": 200, //超过最大值换行
	"semi": false, // 结尾不用分号
	"useTabs": true, // 缩进使用tab, 不使用空格
	"tabWidth": 4, // tab 样式宽度
	"bracketSpacing": true, // 对象数组, 文字间加空格 {a: 1} => { a: 1 }
	"arrowParens": "avoid", // 如果可以, 自动去除括号 (x) => x 变为 x => x
	"proseWrap": "preserve",
	"htmlWhitespaceSensitivity": "ignore",
	"trailingComma": "all" 
}

```
补充：配置.prettierrc.json时因为添加注释编器提示错误 “Comments are not permitted in JSON”
参考：[​解决Comments are not permitted in JSON​](https://juejin.cn/post/7124661302521233415)


4、配置.prettierignore
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

5、重启编辑器，格式化文件

```
pnpm eslint --fix ./src/*
```

6、在 package.json 中去掉 "type": "module", 因为 .eslintrc.js中 “module.exports=”导出方式不是module默认的export default