export function getRedirectPath({type, avatar}) {
  // 根据用户信息 返回跳转地址
	// user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo 
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  console.log(url)
  return url
}


/**
 * 获取用户聊天的唯一id，对信息进行过滤
 * @param {String} userid 用户的id
 * @param {String} targetid 用户聊天的id
 * @return {String} 返回一个拼接字符串
 */
export function getChatId(userid, targetid) {
  return [userid, targetid].sort().join('_')
}