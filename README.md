
# 基础

## 创建一个应用
```
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```
## 模版语法

文本插值
```
<span>Message: {{ msg }}</span>

const msg = 'text'
```

插入html
```
<p>Using text interpolation: {{ rawHtml }}</p>
<p>
    Using v-html directive:
    <span v-html="rawHtml"></span>
</p>
const rawHtml = `<span style="color:red">This should be red.</span>`

```

Attribute
```
	
<!-- Attribute 如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除。 -->
<div :id="dynamicId">dynamicId: {{ dynamicId }}</div>
const dynamicId = '123'
```

动态绑定多个值
```
<div v-bind="objectOfAttrs"></div>
const objectOfAttrs = {
	id: 'container',
	class: 'wrapper',
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68366bd098f24f318175ce8197d6ab4d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1136&h=90&s=21462&e=png&b=fafafa)


js表达式
```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`">{{ `list-${id}` }}</div>


const number = 1
const ok = true
const message = '你好啊'
const id = 111

```
 
调用函数 绑定在表达式中的方法在组件每次更新时都会被重新调用
```
<time :title="toTitleDate(date)" :datetime="date">
    {{ formatDate(date) }}
</time>

const date = new Date().toLocaleDateString()
function toTitleDate(time: string) {
	return time
}
function formatDate(time: string) {
	return time
}
```

指令 Directives
```
<!-- 1、参数 -->
<p v-if="true">1、参数</p>
<!-- 2、事件 -->
<a @click="doSomething">2、事件</a>
<!-- 3、动态参数 -->
<a @[eventName]="doSomething">3、动态参数</a>
<!-- 修饰符 -->
<form @submit.prevent="doSomething">
    <input type="submit" value="button" />
</form>

const eventName = 'click'
function doSomething() {
	alert(message)
}
```


## 响应式

ref 
```
<button @click="count++">
    {{ count }}
</button>
<button @click="increment">increment: {{ count }}</button>

        
import { ref } from 'vue'
const count = ref(0)
function increment() {
    // 在 JavaScript 中需要 .value
    count.value++
}

<!-- ref具有深层响应性 -->
<button @click="mutateDeeply">mutateDeeply</button>

obj.value.nested.count: {{ obj.nested.count }}

obj.value.arr: {{ obj.arr }}

const obj = ref({
    nested: { count: 0 },
    arr: ['foo', 'bar'],
})

function mutateDeeply() {
    // 以下都会按照期望工作
    obj.value.nested.count++
    obj.value.arr.push('baz')
}

```

reactive

```
<button @click="state.count++">
    {{ state.count }}
</button>
```

1、ref 会在作为响应式对象的属性被访问或修改时自动解包，只有当嵌套在一个深层响应式对象内时，才会发生ref解包

```
const state = reactive({ count })

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

2、reactive 数组和集合的注意事项
```
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```



3、在模板中解包的注意事项 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。
```
const object = { id: ref(1) }
// {{ object.id + 1 }} 渲染结果是 [object Object]1
// {{ object.id  文本插值的最终计算值将被解包
```

## 计算属性

```
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

计算属性缓存 vs 方法

计算属性值会基于其响应式依赖被缓存

方法调用**总是**会在重渲染发生时再次执行函数

## 可写计算属性

```
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

## 类与样式绑定

绑定对象

```
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))

<div :class="classObject"></div>
```

绑定数组
```
const isActive = ref(true)
const activeClass = ref('active')
const errorClass = ref('text-danger')

<div :class="[isActive ? activeClass : '', errorClass]"></div>

```

绑定内联样式
```
const activeColor = ref('red')
const fontSize = ref(30)

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

//绑定对象样式更简洁

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
<div :style="styleObject"></div>

//绑定数组对象
<div :style="[baseStyles, overridingStyles]"></div>

//样式多值
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
//数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 `display: flex`。
```
## 条件渲染
v-if、v-else、v-else-if、v-show、v-for
## 列表渲染 v-for

1、Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：
-   `push()`
-   `pop()`
-   `shift()`
-   `unshift()`
-   `splice()`
-   `sort()`
-   `reverse()`

2、不会更改原数组的方法使用时 需要更新原数组，例如 filter,concat、slice

例如：

// `items` 是一个数组的 ref

items.value = items.value.filter((item) => item.message.match(/Foo/))

## 事件处理

1、**内联事件处理器**
```
const count = ref(0)
```
```
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```
2、**方法事件处理器**

```
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}
```

```
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
```

3、$event 在内联事件处理器中访问事件参数

4、事件修饰符
-   `.stop` 单击事件将停止传递
-   `.prevent` 阻止默认事件
-   `.self` 仅当 event.target 是元素本身时才会触发事件处理器
-   `.capture` 捕获模式、指向内部元素的事件，在被内部元素处理前，先被外部处理
-   `.once` 点击事件最多被触发一次
-   `.passive` 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成

5、按键修饰符
-   `.enter`
-   `.tab`
-   `.delete` (捕获“Delete”和“Backspace”两个按键)
-   `.esc`
-   `.space`
-   `.up`
-   `.down`
-   `.left`
-   `.right`

可以直接使用 [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的按键名称作为修饰符，但需要转为 kebab-case 形式。

```
<input @keyup.page-down="onPageDown" />
```
6、系统按键修饰符
-   `.ctrl`
-   `.alt`
-   `.shift`
-   `.meta` 在 Mac 键盘上，meta 是 Command 键 (⌘)。在 Windows 键盘上，meta 键是 Windows 键 (⊞)

```
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```
7、exact 
`.exact` 修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符。

```
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```
7、鼠标按键修饰符
-   `.left`
-   `.right`
-   `.middle`


## 表单输入绑定

## 生命周期

## 侦听器

## 模板引用

## 组件基础


# 深入组件

# 逻辑复用

# 内置组件

# 应用规模化

# 最佳实践

# typeScript

# 进阶主题

