const request = require("request");
const querystring = require("querystring");

function getData() {
  const options = {
    url: 'https://huaban.com/explore/guzhen?ji5pkpbo',
    method: 'GET',
    gzip: true,
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip,deflate,br',
      'Accept-Language': 'zh-CN,zh,q=0.9',
      Connection: 'keep-alive',
      Cookie: 'sid=KJect2K19yuAjBZTIS7qqUmMRY8.1B1UzWOCeQHle7DAyNuBo4D6aVc9ZW2GY0mKIRECKp4;_f=iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAYAAADPym6aAAABJElEQVRYR%2B1VOxYCIQwMF7KzsvFGXmW9kY2VnQfxCvgCRmfzCD9lnz53myWQAJOZBEfeeyIi7xz%2FyEXzZRPFhYbPc3hHXO6I6TbFixmfEyByeQQSxu6BcAXSkIGMazMjuBcz8pQcq44o0Iuyyc1p38C62kNsOdeSZDOQlLRQ80uOMalDgWCGMfsW2B5%2FATMUyGh2uhgptV9Ly6l5nNOa1%2F6zmjTqkH2aGEk2jY72%2B5k%2BNd9lBfLMh8GIP11iK95vw8uv7RQr4oNxOfbQ%2F7g5Z4meveyt0uKDEIiMLRC4jrG1%2FjkwKxCRE2e5lF30leyXYvQ628MZKV3q64HUFvnPAMkVuSWlEouLSiuV6dp2WtPBrPZ7uO5I18tbXWvEC27t%2BTcv%2Bx0JuJAoUm2L%2FQAAAABJRU5ErkJggg%3D%3D%2CWin32.1366.768.24;_uab_collina=152844628435608261516938;_ga=GA1.2.420248047.1528446285;__asc=9692d43e163de7f787e07aa911c;__auc=9692d43e163de7f787e07aa911c;UM_distinctid=163de7f7a12100-082612c77025ec-3c3c500d-100200-163de7f7a1345e;CNZZDATA1256903590=730893938-1528445361-%7C1528445361;_cnzz_CV1256903590=is-logon%7Clogged-out%7C1528446488467',
      Host: 'huaban.com',
      Referer: 'https://huaban.com/explore/guzhen/',
      'User-Agent': 'Mozilla/5.0(Windows NT 6.3;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko) Chrome/66.0.3359.181Safari/537.36',
      'X-Request': 'JSON',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: querystring.stringify({
      max: 755152815,
      limit: 20,
      wfl: 1,
    })
  }
  return new Promise((resolve, reject) => {
    request(options, function (error, res, body) {
      // console.log('---------------------------')
      // console.log(error)
      // console.log(res)
      // console.log('---------------------------')
      resolve(body)
    })
  })
}

module.exports = {
  async huaban(ctx, next) {
    const result = await getData()
    // result = result.decode()
    console.log('111111111111111111111111111111---------------------------')
    console.log(result)
    console.log('---------------------------')
    ctx.body = result
    next()
  }
}