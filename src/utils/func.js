const listToTree = (list) => {
  const newList = JSON.parse(JSON.stringify(list)); // 避免影响外层的数组
  const map = new Map();
  const result = [];

  newList.forEach((comment) => {
    comment.children = null
    map.set(comment.id, comment);

    if (comment.parentId) {
      // 楼中楼的评论
      const parentComment = map.get(comment.parentId); // 回复的该评论，该评论是一定存在的

      if (!parentComment.children) {
        parentComment.children = []; // 通过对象引用，可以直接修改之前的数据
      }
      if (comment.parentId !== comment.replyId) {
        comment.replyUser = map.get(comment.replyId).user;
      }
      parentComment.children.push(comment);
    } else {
      result.push(comment);
    }
  });
  return result;
};

module.exports = {
  listToTree
}