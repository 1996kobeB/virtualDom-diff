import {REMOVE,TEXT,REPLACE,ATTR} from './diffTypes'

function domDiff(oldVDom, newVDom) {
  // 返回的补丁
  const patches = {}
  // 初始的树id
  const index = 0
  diffWalk(oldVDom, newVDom, index)
  return patches
}

function diffWalk(oldVDom, newVDom, index) {
  let patchList = []
  if (!newVDom) {
    patchList.push({
      type: REMOVE
    })
  }
}

export {
  domDiff
}