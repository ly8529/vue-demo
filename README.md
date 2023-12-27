
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
文本
```
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```
多行文本
```
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

复选框 
```
<input type="checkbox" id="checkbox" v-model="checked" true-value="yes" false-value="no" />
<label for="checkbox">{{ checked }}</label>
```

多个复选框
```
const checkedNames = ref([])
```
```
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```
单选按钮
```
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

选择器
```
<div>Selected: {{ selected }}</div>

//multiple 多选
<select v-model="selected" multiple>
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

修饰符
-   `.lazy`
    ```
    <!-- 在 "change" 事件后同步更新而不是 "input" -->
    <input v-model.lazy="msg" />
    ```
-   `.number`
    ```
    // 用户输入自动转换为数字,如果该值无法被 parseFloat() 处理，那么将返回原始值。
    <input v-model.number="age" />
    ```
-   `.trim`
    ```
    //默认自动去除用户输入内容中两端的空格
    <input v-model.trim="msg" />
    ```
## 生命周期
-   `setup`
-   `beforeCreate`
-   `created`
-   `beforeMount`
-   `mounted`
-   `beforeUpdate`
-   `updated`
-   `beforeUnmount`
-   `unmounted`
## 侦听器
侦听数据源类型

- 单个 ref
- getter 函数
- 多个来源组成的数组
```
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

reactive的属性值不能直接被侦听，需要用一个返回该属性的 getter 函数
```
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})

// 正确，提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```
深层监听器

响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

```
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++


watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  },
  { deep: true }, //加上后强制转成深层侦听器 谨慎使用，开销很大
  { immediate: true } // 立即执行，且当 `state.someObject` 改变时再次执行
)
```

watchEffect() 自动跟踪回调的响应式依赖

回调会立即执行，不需要指定 immediate: true。在执行期间，它会自动追踪 todoId.value 作为依赖（和计算属性类似）。每当 todoId.value 变化时，回调会再次执行
```
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```
   `watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。`

侦听器回调中能访问被 Vue 更新之后的 DOM
```
const num = ref(1)
const numRef = ref<HTMLElement | null>(null)

watch(
	num,
	news => {
		console.log(news)
        // 不加 {flush: 'post'} textContent=1 data更新-执行watch-执行render update 获取到旧数据
		// 加 {flush: 'post'} textContent=2 data更新-执行render update-执行watch
        console.log(numRef.value?.textContent, 'textContent')
        
	},
	{ flush: 'post' }, //dom更新 和数据news 更新同步了
)

const onToggle = () => {
	num.value = 2
}
```
后置刷新的别名 watchPostEffect()

停止侦听器
```
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```
同步创建的侦听器 会在组件卸载时自动停止，异步创建的侦听器需要使用unwatch来停止防止内存泄漏，`不建议使用异步侦听器`

如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：
```
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```
## 模板引用
访问模版引用
```
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
只能在组件挂载后访问
```
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```
v-for 中的模板引用

```
<script setup>
import { ref, onMounted } from 'vue'

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in 10" :key="item" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>

```
`itemRefs.value：` ref 数组**并不**保证与源数组相同的顺序

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79fc44b6e6f2456981a542ce08a382c5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1306&h=628&s=62800&e=png&b=ffffff)

函数模板引用
```
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```

组件上的 ref
```
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

注意⚠️：使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：

## 组件基础

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/549f19ec0d1542e1a25e047fcfb7c590~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1498&h=530&s=19576&e=png&b=ffffff)

单文件组件(SFC)

