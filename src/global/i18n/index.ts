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
