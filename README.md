## Start up

``` bash
$ npm install
$ npm start

# 使用本地 clib-service
$ npm run start:local

```
## Structure

``` bash
- .vscode/ # 推荐插件安装
- public/ # 静态文件目录
- src/
	|- api/ # http 接口
	|- assets/ # 图片及字体资源
		|- fonts/
		|- images/
	|- components/ # 组件库
	|- componsables/ # composition api
	|- router/ # 静态路由定义
	|- stores/  # 状态管理
	|- style/ # 全局样式
	|- types/ # 业务类型定义
	|- utils/ # 全局通用函数
	|- views/ # 路由视图
		|- index.ts # 添加动态视图时需要在此文件中添加映射关系
	|- App.vue # 根组件
	|- main.ts # 软件入口文件

|- .eslintrc-auto-import # vite自动导入插件生成的全局eslint 规则，需要在.eslintrc.cjs 中配置 `extends`
|- .eslintrc.cjs # eslintrc 配置文件
|- .gitignore
|- auto-imports.d.ts # vite自动导入插件生成的TS全局规则，需要在 tsconfig.app.json 中配置 `include`
- components.d.ts # vite vue组件生成 TS全局规则，需要在 tsconfig.app.json 中配置 `include`
- env.d.ts 
- index.html # app 的 html 入口
- package-lock.json
- package.json
- README.md
- tsconfig.app.json
- tsconfig.config.json
- tsconfig.json # tsconfig 主文件
- tsconfig.vitest.json
- vite.config.ts # vite 配置文件
```

## Denpendencies

- axios: 自带 .d.ts
- crypto-js: @types/crypto-js
- js-cookie @types/js-cookies
- [vue]()
- [vue-router]()
- [pinia](https://pinia.vuejs.org/): Vue3 状态管理库
- [@vueuse/core](https://vueuse.org/guide/) 常用 composition-api
- [element-plus](https://element-plus.org/zh-CN/) 组件库

## DevDependencies

- vite
- [eslint]() 如果受到TS影响，需要修改配置. e.g. `'@typescript-eslint/no-unused-vars': 'error',`
- scss:
- postcss: Vite 自身支持此配置
	- autoprefixer
	- postcss-nesting: css 标准嵌套语法
- [vitest](https://vitest.dev/): 单元测试框架




<!-- - [unocss](https://uno.antfu.me/): 更快的 tailwindcss 实现
	- presetUno: css 预设字段
	- transformerDirectives: 支持在css中使用 `@apply` -->

## 添加动态路由流程 


### 菜单栏路由

菜单栏路由数据由数据库管理，必须保证 `RESPONSE.component` 路径字段对应一个 `.vue` 组件，否则侧边栏则不会展示此路由


### 前端动态路由

#### 添加动态路由

1. 在 `RESPONSE.component` 路径字段对应的地方新建同名ts文件 `${RESPONSE.component}.ts`。e.g. `/product/manage/index` -> `src/views/product/manage/index.ts`

2. 在文件中导出 `routes` 字段, e.g:

``` ts
export const routes = [
	{ path: '/create', component: CreateProduct }
]
```

3. 使用 

``` ts
router.push(route.path + '/create')

<router-link :to="route.path + '/create'" />
```

#### 解析原理

在动态添加菜单栏时，同时查询对应目录的 `.ts` 文件是否导出了`routes`.


## 图标使用方法

### Use

1. 具名图标 `<i-ep-fold>`

2. 动态图标 `<Icon name="ep-folder" />` Icon 组件在 `src/components/Icon.vue`

### Install

1. 如果使用具名图标，vite会在运行是自动添加图标集依赖。e.g. Element Plus 图标集 `package.json.devDependencies.@iconify-json/ep`
2. 如果使用动态图标，前往 `https://icon-sets.iconify.design/` 找到图标集的名称手动安装依赖。e.g. Bootstrap Icon `$npm i @iconify-json/bi -D`

## 关于 VSCode 

### VSCide 插件

打开 VSCode 时会根据 /.vscode 中的配置提示安装插件。如果没提示请进行手动安装

``` json
{
    "recommendations": [
		// Vue官方插件
        "Vue.volar", 
		// Vue TypeScript 支持
        // 最好选择 workspace enable 否则用之前的项目会有语法提示
        "Vue.vscode-typescript-vue-plugin", 
		// 支持 Vue 文件的跳转
		"antfu.goto-alias",
		// postcss 语法高亮
        "cpylua.language-postcss",
		// tailwindcss 语法提示
        "antfu.unocss",
    ]
}
```


### Vue3+TypeScript+VSCode User Snippet

这个 `snippets` 会帮助你创建一个Vue单文件组件的样板代码. 新建`.vue`文件后，输入 `$sfc`

将下面这段json 添加到

- `ctrl` + `shift` + `p`
- `>snippets: Configure User Snippets`
- `vue.json(vue)`

``` json
{
	// ...
  	"insert vue sfc": {
		"prefix": "$sfc",
		"body": [
			"<script lang=\"ts\" setup>",
			"",
			"</script>",
			"",
			"<template>",
  			"  <div class=\"$1\">",
			"    <!-- -->",
  			"  </div>",
			"</template>",
			"",
			"<style lang=\"postcss\">",
			".$1 {",
  			"  @apply;",
			"}",
			"</style>",
			""
		]
	}
}
```


## 其他资源

### 动态路由 Ref

- <https://learnku.com/articles/68577>
- <https://blog.csdn.net/ViFong/article/details/118020928>
- <https://segmentfault.com/a/1190000040631051>
