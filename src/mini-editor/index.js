import Vue from 'vue'
import CanvasWrapper from './wraper/canvas.js'
import PropsPanelWrapper from './wraper/props.js'
import Element from './models/element.js'
import PropsPanel from './panels/props.js'
import { getVM } from './utils.js'

// 引入自定义组件，并全局注册
// import LbpComponent from '../component/index.js'
import LbpComponent from '../component/entry.button.exmaple.js'

Vue.component(LbpComponent.name, LbpComponent)
export default {
  name: 'mini-editor',
  data: () => ({
    editingElement: null, // 当前编辑的对象
    isPreviewMode: false
  }),
  created () {
    const vm = getVM(LbpComponent.name)
    const props = vm.$options.props
    // 获取元素对象
    this.editingElement = new Element({ name: LbpComponent.name, editorConfig: props })
  },
  render (h) {
    const element = this.editingElement
    return (
      <a-layout class="canvas-editor-wrapper" id="components-layout-demo-top-side" style="height: 100%">
        <a-layout-header class="header">
          <div class="logo"><span class="text" style={{ color: 'white' }}>表单自定义组件开发脚手架</span></div>
        </a-layout-header>
        <a-layout>
          <CanvasWrapper>
            <a-radio-group
              slot="actions"
              size="small"
              value={this.isPreviewMode}
              onInput={isPreviewMode => {
                this.isPreviewMode = isPreviewMode
              }}
            >
              {/* 编辑模式、预览模式 */}
              <a-radio-button label={false} value={false}>编辑</a-radio-button>
              <a-radio-button label={true} value={true}>预览</a-radio-button>
            </a-radio-group>
            {
              this.isPreviewMode
                ? this.editingElement && h(LbpComponent.name, this.editingElement.getPreviewData({ mode: 'preview' }))
                : <lbs-shape
                  element={element}
                  defaultPosition={element.commonStyle}
                  active={this.editingElement === element}
                  style={element.getStyle({ position: 'absolute' })}
                  handlePointMoveProp={pos => {
                    this.editingElement.commonStyle = {
                      ...this.editingElement.commonStyle,
                      ...pos
                    }
                  }}
                  handleElementMoveProp={(pos) => {
                    this.editingElement.commonStyle = {
                      ...this.editingElement.commonStyle,
                      ...pos
                    }
                  }}
                  handleElementMouseUpProp={() => {
                  }}
                  handlePointMouseUpProp={() => {
                  }}
                  nativeOnContextmenu={e => {
                  }}
                  handleMousedownProp={() => {
                    // TODO
                  }}>
                  {
                    this.editingElement && h(LbpComponent.name, this.editingElement.getPreviewData({ mode: 'edit' }))
                  }
                </lbs-shape>
            }
          </CanvasWrapper>
          <PropsPanelWrapper>
            <PropsPanel editingElement={this.editingElement} />
          </PropsPanelWrapper>
        </a-layout>
      </a-layout>
    )
  }
}
