import { createElement,render,renderDom } from './creatElement'
import { domDiff } from './diff'
import { doPatch } from './patch'
// 创建虚拟dom
const vDom1 = createElement('ul', { class: 'list',
  style: "width: 300px;height: 300px;background-color: orange"
}, [
  createElement('li', { class: 'item','data-index':0 },
   [createElement('p',{class: 'text'},['第一个列表项'])
  ]),
  createElement('li', { class: 'item','data-index': 1 }, 
  [createElement('p',{class: 'text'},[
    createElement('span',{class:'title'},[])])
  ]),
  createElement('li',{class: 'item','data-index': 2 },['第三个列表项'])
])



const vDom2 = createElement('ul', { class: 'list-wrap',
  style: "width: 300px;height: 300px;background-color: orange"
}, [
  createElement('li', { class: 'item','data-index':0 },
   [createElement('p',{class: 'title'},['特殊列表项'])
  ]),
  createElement('li', { class: 'item','data-index': 1 }, 
  [createElement('p',{class: 'text'},[])]),
  createElement('div',{class: 'item','data-index': 2 },['第三个列表项'])
])
// 虚拟dom-->真实dom
const rdom = render(vDom1)
// 获取补丁
const p = domDiff(vDom1,vDom2)
// 打补丁
const patchDom = doPatch(rdom,p)
console.log(patchDom)
// 将虚拟dom渲染成真实dom
renderDom(patchDom, document.getElementById('app'))
//domDiff

