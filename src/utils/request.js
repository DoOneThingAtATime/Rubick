import AV from 'leancloud-storage'
import config from '../lcApp'
localStorage.setItem('debug', 'leancloud*,LC*')

const { APP_ID, APP_KEY } = config

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV
