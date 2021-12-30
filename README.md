# mini-luban-h5

- 低代码平台研究
- 移动端的 h5 参考方案，快速生成 h5
- 通过 `JSON => createElement => UI`
- 参考项目 [luban-h5]

[luban-h5]: (https://ly525.github.io/luban-h5/zh/plugin-development/quick-start.html)

## mini-editor 核心代码

```js
import App from "./mini-editor/index";
import "./mini-editor/plugins/ant-design-vue.js";
import "./mini-editor/plugins/font.js";
import "./mini-editor/support/index";
import "./mini-editor/styles/index.scss";
```

- App 编辑器核心页面
- ant-design-vue 注册 ant-design 组件库
- font 引入 font-awesome 字体库
- support 自定义属性编辑器
- styles/index 全局样式

```js
// 中间画布区域
<CanvasWrapper>
  <lbs-shape>
  { this.editingElement && h(LbpComponent.name, this.editingElement.getPreviewData({ mode: 'edit' })) }
  </lbs-shape>
</CanvasWrapper>
// 右边属性区域
<PropsPanelWrapper></PropsPanelWrapper>
```

- CanvasWrapper 中间画布内容区域
- lbs-shape 组件外面操作区域 包含操作点，以及拖拽事件
- h() 渲染组件内容

- PropsPanelWrapper 属性面板操作区域
- PropsPanel 属性面板，这里分常用属性和自定义属性
- `src/common/props` 定义了常用属性编辑器

## 新增自定义组件及测试

1. 在`src/component`下面编写自定义组件
2. 在`src/mini-editor/index.js`，如下引入组件，并注册

```js
// 引入自定义组件，并全局注册
// import LbpComponent from '../component/index.js'
import LbpComponent from '../component/entry.button.exmaple.js'

Vue.component(LbpComponent.name, LbpComponent)
```
