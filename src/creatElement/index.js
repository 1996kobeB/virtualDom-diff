function createElement(tag, props, children) {
  return new Element(tag, props, children)
}

class Element {
  constructor(tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

function render(vDom) {
  
}
export {
  createElement
}