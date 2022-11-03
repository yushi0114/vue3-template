## Start up

``` bash
$ npm install
$ npm start

# 使用本地 clib-service
$ npm run start:local

```
## Structure

``` bash
- 
|- api/ # http 接口
|- assets/ # 图片及字体资源
|- common/ # 业务相关集合
|- components/ # 组件库
|- componsables/ # composition api
|- router/ # 静态路由定义
|- stores/  # 状态管理
|- style/ # 全局样式
|- types/ # 业务类型定义
|- utils/ # 全局通用函数
|- views/ # 静态路由视图
|- views-dynamic/ # 动态路由视图
	|- index.ts # 添加动态视图时需要在此文件中添加映射关系
|- App.vue # 根组件
|- main.ts # 软件入口文件
```

## 外部依赖

- [axios]()

### Denpendencies

- axios: 自带 .d.ts
- crypto-js: @types/crypto-js
- js-cookie @types/js-cookies
- [vue]()
- [vue-router]()
- [pinia](https://pinia.vuejs.org/): Vue3 状态管理库
- [@vueuse/core](https://vueuse.org/guide/) 常用 composition-api

### DevDependencies

- vite
- [eslint]() 如果受到TS影响，需要修改配置. e.g. `'@typescript-eslint/no-unused-vars': 'error',`
- postcss: Vite 自身支持此配置
	- autoprefixer
	- postcss-nesting: css 标准嵌套语法
- [unocss](https://uno.antfu.me/): 更快的 tailwindcss 实现
	- presetUno: css 预设字段
	- transformerDirectives: 支持在css中使用 `@apply`
- [vitest](https://vitest.dev/): 单元测试框架


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
