import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
//css增加浏览器前缀兼容
import autoprefixer from 'autoprefixer'
//js兼容旧版浏览器
import legacy from '@vitejs/plugin-legacy'
//svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'src'),
			},
		],
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer({
					overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
				}),
			],
		},
	},
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// Specify the icon folder to be cached
			iconDirs: [resolve(__dirname, 'src/assets/icons')],
		}),
		legacy({
			targets: ['cover 99.5%'],
		}),
	],
	// 引入第三方的配置,强制预构建插件包
	// optimizeDeps: {
	// 	include: [''],
	// },
})
