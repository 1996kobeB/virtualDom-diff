import {REMOVE,TEXT,REPLACE,ATTR} from './diffTypes'
  // 遍历dom的id
  let diffIndex = 0
function domDiff(oldVDom, newVDom) {
  // 返回的补丁
  const patches = {}
  // 初始的树id
  let index = 0
  // 遍历函数
  diffWalk(oldVDom, newVDom, index, patches)
  return patches
}

function diffWalk(oldVDom, newVDom, index, patches) {
  let patchList = []
  if (!newVDom) {
    // 新节点被删除(无子节点)
    patchList.push({
      type: REMOVE,
      index
    })
    if(oldVDom.children) {
      oldVDom.children = []
    }
  }else if(isString(newVDom)&&isString(oldVDom)){
    // 文本替换(无子节点)
    if(newVDom !== oldVDom){
      patchList.push({
        type: TEXT,
        text: newVDom
      })
    }
  }else if(newVDom.tag === oldVDom.tag){
    // 生成diff属性对象
    let props = diffAttr(oldVDom.props,newVDom.props)
    if(Object.keys(props).length>0){
      patchList.push({
        type: ATTR,
        attr: props
      })
    }
    // 遍历子节点
    diffChildren(oldVDom.children,newVDom.children,patches)
  }else {
    // 标签不一致，被新节点替代
    patchList.push({
      type: REPLACE,
      node: newVDom
    })
  }
  if(patchList.length >0){
    // 若存在不定数组，则将其放进大补丁
    patches[index] = patchList
  }
}


function isString(str){
  return typeof str === 'string'
}
// 属性修改
function diffAttr(oldProps,newProps){
  // 目的：生成一个dom属性改变部分的对象
  const attr = {}
  for(let key in oldProps){
    // 修改：同key不同value则更新
    if(oldProps[key] !== newProps[key]){
      attr[key] = newProps[key]
    }
  }
  for(let key in newProps){
    // 新增
    if(!oldProps.hasOwnProperty(key)){
      attr[key] = newProps[key]
    }
  }
  return attr
}
// 子节点遍历
function diffChildren(oldNode,newNode,patches){
  oldNode.map((item,idx)=>{
    diffWalk(item,newNode[idx],++diffIndex,patches)
  })
}
export {
  domDiff
}