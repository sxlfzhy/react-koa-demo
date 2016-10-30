
const base = '/app/'
const remoteUrl = {
  LOGIN: `${base}user/login`,

  CFG_INIT: `${base}config/getConfig`    // 获取配置信息
}

Object.freeze(remoteUrl)

export {remoteUrl}
