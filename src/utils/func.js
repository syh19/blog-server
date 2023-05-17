/** 评论数据列表转为二层树状结构 */
const commentsListToTree = (list) => {
  const newList = JSON.parse(JSON.stringify(list)) // 避免影响外层的数组
  const map = new Map()
  const result = []

  newList.forEach((comment) => {
    comment.children = null
    map.set(comment.id, comment)

    if (comment.parentId) {
      // 楼中楼的评论
      const parentComment = map.get(comment.parentId) // 回复的该评论，该评论是一定存在的

      if (!parentComment.children) {
        parentComment.children = [] // 通过对象引用，可以直接修改之前的数据
      }
      if (comment.parentId !== comment.replyId) {
        comment.replyUser = map.get(comment.replyId).user
      }
      parentComment.children.push(comment)
    } else {
      result.push(comment)
    }
  })
  return result
}

/** 分类数据转为无限嵌套树状结构 */
const categroyListToTree = (list) => {
  const newList = JSON.parse(JSON.stringify(list))
  const map = new Map()
  const result = []

  newList.forEach((category) => {
    map.set(category.id, category)
    if (category.parentId) {
      const parentCategory = map.get(category.parentId)
      if (!parentCategory.children) {
        parentCategory.children = []
      }
      parentCategory.children.push(category)
    } else {
      result.push(category)
    }
  })
  return result
}

module.exports = {
  commentsListToTree,
  categroyListToTree
}