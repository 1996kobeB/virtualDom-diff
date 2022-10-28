import { Element,render, setAttr } from '../creatElement'
import {REMOVE,TEXT,REPLACE,ATTR} from '../diff/diffTypes'

// 大补丁
let finalPatch = {}
// 当前遍历dom的id
let index = 0

// 打补丁
function doPatch(rDom,patch) {
  finalPatch = patch
  patchWalk(rDom)
  return rDom
}

// 节点遍历，从根节点开始
function patchWalk(rNode){
  // 获取该节点对应的补丁
  let rnPatch = finalPatch[index++],
        childNodes = rNode.childNodes;
  // 遍历孩子
  [...childNodes].map(item=>{
    patchWalk(item)
  })
  // 若补丁存在
  if(rnPatch){
    // 给该节点打补丁
    patchAction(rNode,rnPatch)
  }
}

function patchAction(rNode,rnPatch) {

  rnPatch.forEach(item=>{
    switch (item.type){
      case REMOVE:
        // 去除
        rNode.parentNode.removeChild(rNode)
      break
      case TEXT:
        // 文本变化
        rNode.textContent = item.text
      break
      case REPLACE:
        // 节点代替
        const replaceDom = item.node instanceof Element ? 
        render(item.node) : document.createTextNode(item.node)
        rNode.parentNode.replaceChild(replaceDom,rNode)
      break
      case ATTR:
        // 属性更新
        for(let key in item.attr){
          setAttr(rNode,key,item.attr[key])
        }
      break
      default:
        break
    }
  })
}
export {
  doPatch
}