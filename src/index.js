import { createElement } from './creatElement'

// 创建虚拟dom
const vDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['周杰伦']),
  createElement('li', { class: 'item' }, ['林俊杰']),
  createElement('li',{class: 'item'},['王力宏'])
])
console.log(vDom)