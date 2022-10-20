
// 创建虚拟dom
function createElement(tag, props, children) {
  return new Element(tag, props, children)
}

// 创建元素类
class Element {
  constructor(tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

// 创建真实dom
function render(vDom) {
  const {tag,props,children} = vDom
  const dom = document.createElement(tag)
  for(let key in props){
    // 赋予属性
    setAttr(dom,key,props[key])
  }
  if(children&&children.length){
    children.forEach(child=>{
      const childDom = child instanceof Element?render(child):document.createTextNode(child)
      // 将创建的节点放置
      dom.appendChild(childDom)
    })
  }
  return dom
}

// 赋予属性
function setAttr(dom,key,value){
  const tagName = dom.tagName.toLowerCase()
  switch (key){
    // 输入框的值
    case 'value':
      if(agName === 'input'||tagName === 'textarea'){
        dom.value = value
      }else {
        dom.setAttribute(key,value)
      }
    break
    // 样式
    case 'style':
      dom.style.cssText = value
    break
    // 默认设置属性
    default: 
    dom.setAttribute(key,value)
  }
}

// 渲染dom
function renderDom(el,target){
  target.appendChild(el)
}
export {
  createElement,
  render,
  renderDom
}