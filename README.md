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
