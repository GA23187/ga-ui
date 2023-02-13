- 使用`pnpm`初始化一个monorepo仓库

  - `pnpm init`

  - 新建一个`pnpm-workspace.yaml`文件

    这个文件就是用来描述下面有几个仓库的

    ```yaml
    packages:
      - packages/* # ui库、工具库等相关库
      - docs # 组件库文档(单个项目就不需要/*了)
      - apps/* # 应用
    ```

- 创建对应的文件夹

  > packages/docs/apps

- 首先来完善`packages`文件夹，下面存放了`ui` `utils` `component`三个文件夹(仓库)

  - 分别用`pnpm init`初始化一下

    - 目前我是进入对应文件夹来执行的命令，其实应该有命令可以直接在根目录执行来初始化？？

  - `component`仓库下添加依赖

    ```
    pnpm i vue sass
    ```

    然后就是编写代码

    最后注意package.json文件`name`属性不知道为啥不能是`ga-components`，这样写后面在`ui`库中引入`import { GaButton } from 'ga-components/components/button'`时提示找不到

     指定入口文件`main` 

    ```
    {
      "name": "@ga23187/components",
      "version": "1.0.0",
      "description": "",
      "main": "index.ts",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "sass": "^1.58.0",
        "vue": "^3.2.47"
      }
    }
    ```

  - `ui`下

    ```
    pnpm i typescript vite
    pnpm i vue @vitejs/plugin-vue sass vite-plugin-dts(负责生成ts声明文件)
    ```

    `devDependencies`下手动添加`"@ga23187/components": "workspace:*"`，然后`pnpm i`下就会看到`node_modules`下有了这个包，是一个软连接到咋们上面写的`component`库中。

    > 也可以通过`pnpm install @ga23187/components -rD --filter ga-ui`
    >
    >  得到 "@ga23187/components": "workspace:^1.0.0"

  - 123

- 然后就是测试了，来到apps文件及下创建一个`vue3-demo`项目

  ```bash
  npm init vite
  ```

  - 添加我们上面编写`ui`库到项目中，进入到`vue3-demo`文件夹下运行`pnpm add ga-ui`

  - 在`main.ts`引入

    ```ts
    import { createApp } from 'vue'
    import './style.css'
    import App from './App.vue'
    // 引入组件库
    import GaUi from 'ga-ui'
    // 引入组件库css
    import 'ga-ui/styles/button.scss'
    
    createApp(App).use(GaUi).mount('#app')
    ```

    ```vue
    <template>
      <div>
        <ga-button>sdsd</ga-button>
       ....
      <HelloWorld msg="Vite + Vue" />
    </template>
    ```

  - 运行就可以了

- 安装Turborepo来优化构建`pnpm add turbo -Dw` 会安装在根目录依赖中

  - 项目根目录新建 turbo.json

    ```json
    {
      "$schema": "https://turbo.build/schema.json",
      "pipeline": {
        "build": {
          "dependsOn": ["^build"],
          "outputs": ["dist/**"]
        },
        "lint": {
          "dependsOn": ["build"]
        },
        "test": {
          "dependsOn": ["build"],
          "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
        }
        "dev": {
          "dependsOn": ["lint"]
        }
      }
    }
    
    $schema：定义了 json 的类型，类似于 ts 对于 js 的约束
    pipeline.build：表示当执行 turbo build 时会预先执行 ^build， ^build 就是所有项目的 package.json 里的那个 build 脚本，^ 是一个标记。如果像 lint 中的 build，他就指的是 pipeline 中的第一个 build 命令。
    dependsOn：表示当前命令所依赖的相关流程
    outputs：指定缓存输出目录
    inputs： 配置的目录下文件有变化，才会重新执行此命令
    ```

  - `package.json`添加`script:{"build":"turbo build" }`

  - 运行就欧克了

- 继续就是文档库啦，安装vitepress

  ```
  pnpm init
  ```

  ```
  pnpm add -D vitepress vue
  ```

  > `@docsearch/js` 的peer dependencies存在某些问题。 如果你看到某些命令由于它们而失败，您现在可以尝试以下解决方法：
  >
  > 如果使用pnpm，在`package.json`添加以下代码：
  >
  > json
  >
  > ```
  > "pnpm": {
  >   "peerDependencyRules": {
  >     "ignoreMissing": [
  >       "@algolia/client-search"
  >     ]
  >   }
  > }
  > ```

  - 修改下`script`

    ```
     "scripts": {
        "dev": "vitepress dev . --port 8088",
        "build": "vitepress build .",
      },
    ```
    
- 这时候就可以运行起来了，但是页面404,并且会自动在docs下生成一个.vitepress的文件夹里面有个cache文件夹不用管他
  
- 添加index.md文件 就是首页，再启动下就有东西了。
  
  ```
    ---
    layout: home
    
    hero:
      name: ga-ui
      text: 学习使用的组件库 
      tagline: 练习、完善、使用 
      actions: 
        - theme: brand # 主题色 'brand' | 浅色 'alt'
          text: 快速开始 
          link: /guide/ 
        - theme: alt
          text: 去官网
          link: https://vitepress.vuejs.org/
    
    features: 
      - icon: ⚡️ 
        title: 标题一
        details: 标题一的描述信息
      - icon: 🖖
        title: 标题二
        details: 标题二的描述信息
    ---
    ```
  
- 新增配置文件`dosc/.vitepress/config.js`
  
  ```js
    import { defineConfig } from 'vitepress'
    
    export default defineConfig({
      base: '/ga-ui/',
      title: 'ga-ui文档',
      layout: 'home',
      themeConfig: {
        nav: getNav(),
        socialLinks: [{ icon: 'github', link: 'https://github.com/ga23187/ga-ui' }],
        sidebar: getSidebar(),
      },
    })
    
    function getNav() {
      return [
        { text: '指南', link: '/guide/' },
        { text: '组件', link: '/components/button' },
      ]
    }
    
    function getSidebar() {
      return {
        '/guide/': [
          {
            text: '指南',
            items: [
              { text: '介绍', link: '/guide/' }, // /guide/index.md
              { text: '快速上手', link: '/guide/install' }, // /guide/one.md
            ],
          },
        ],
        '/components/': [
          {
            text: '基本组件',
            items: [{ text: 'Button 按钮', link: '/components/button' }],
          },
        ],
      }
    }
    
    ```
  
- 新增`docs/guide/index.md`等等这些都是`sidebar`配置页面，路径对应好就行
  
- 然后就是核心了，来引入我们写的组件库并展示出来
  
  - 将我们写的组件库安装下`pnpm install ga-ui -r --filter docs`
  
  - 新增代码显示插件` pnpm add vitepress-theme-demoblock`，修改config.js文件
  
    ```js
      import { demoBlockPlugin } from 'vitepress-theme-demoblock'
      
      export default defineConfig({
        base: '/ga-ui/',
        // ...
        markdown: {
          config: (md) => {
            md.use(demoBlockPlugin)
          },
        },
      })
      ```
  
  - 新增`docs/.vitepress/theme/index.js`来注册全局组件
  
    ```js
      import DefaultTheme from 'vitepress/theme'
      // ga-ui引入
      import Gaui from 'ga-ui'
      import 'ga-ui/styles/button.scss'
      
      // 插件的组件，主要是demo组件
      // import './styles/index.css'
      import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
      import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
      import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
      
      export default {
        ...DefaultTheme,
        enhanceApp({ app }) {
          app.use(Gaui)
          app.component('Demo', Demo)
          app.component('DemoBlock', DemoBlock)
        },
      }
      ```
  
  - 最后就可以在md文件中使用啦
  
    ```md
      # Button
      
      :::demo 使用 `type` 属性来定义 Button 的样式。
      
      ​```vue
      <template>
        <ga-button>Default</ga-button>
        <ga-button type="primary">Primary</ga-button>
        <ga-button type="success">Success</ga-button>
        <ga-button type="danger">Danger</ga-button>
      </template>
      ​```
      
      :::
      
      ```
  
    
  
  



