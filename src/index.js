import { createElement,render,renderDom } from './creatElement'
import { domDiff } from './diff'
// 创建虚拟dom
const vDom1 = createElement('ul', { class: 'list',
  style: "width: 300px;height: 300px;background-color: orange"
}, [
  createElement('li', { class: 'item','data-index':0 },
   [createElement('p',{class: 'text'},['第一个列表项'])
  ]),
  createElement('li', { class: 'item','data-index': 1 }, 
  [createElement('p',{class: 'text'},[
    createElement('span',{class:'title'}),'第二个列表项'])
  ]),
  createElement('li',{class: 'text','data-index': 2 },['第三个列表项'])
])



const vDom2 = createElement('ul', { class: 'list-wrap',
  style: "width: 300px;height: 300px;background-color: orange"
}, [
  createElement('li', { class: 'item','data-index':0 },
   [createElement('p',{class: 'title'},['特殊列表项'])]),
  createElement('li', { class: 'item','data-index': 1 }, 
  [createElement('p',{class: 'text'},[])]),
  createElement('div',{class: 'text','data-index': 2 },['第三个列表项'])
])
// render函数-->虚拟dom
// const rdom1 = render(vDom1)
// 将虚拟dom渲染成真实dom
// renderDom(rdom1, document.getElementById('app'))
//domDiff
const p = domDiff(vDom1,vDom2)
console.log(p)