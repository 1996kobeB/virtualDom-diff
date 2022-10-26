import { Element,render, setAttr } from '../creatElement'
import {REMOVE,TEXT,REPLACE,ATTR} from '../diff/diffTypes'


let finalPatch = {}
let index = 0

function doPatch(rDom,patch) {
  finalPatch = patch
  patchWalk(rDom)
  return rDom
}


function patchWalk(rNode){
  // 获取该节点对应的补丁
  let rnPatch = finalPatch[index++],
        childNodes = rNode.childNodes;
  // 遍历孩子
  [...childNodes].map(item=>{
    patchWalk(item)
  })
  if(rnPatch){
    // 给该节点打补丁
    patchAction(rNode,rnPatch)
  }
}

function patchAction(rNode,rnPatch) {

  rnPatch.forEach(item=>{
    switch (item.type){
      case REMOVE:
        rNode.parentNode.removeChild(rNode)
      break
      case TEXT:
        rNode.textContent = item.text
      break
      case REPLACE:
        const replaceDom = item.node instanceof Element ? 
        render(item.node) : document.createTextNode(item.node)
        rNode.parentNode.replaceChild(replaceDom,rNode)
      break
      case ATTR:
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