<template>
  <div class="loginPage">
    <div class="header">
      <div class="triangle"></div>
      <div class="lineOne">Welcome,</div>
      <div class="lineTwo">sign in to continue</div>
    </div>
    <div class="inputBox">
      <div class="label">username</div>
      <div><input type="text" v-model="username" placeholder="请使用邮箱作为账号"></div>

      <div class="label">password</div>
      <div><input type="password" v-model="password"></div>
    </div>
    <div class="theme-button" @click="login">Get Started --></div>
  </div>
</template>

<script>
import AV from '../../utils/request'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    console.log(AV)
  },
  methods: {
    login () {
      const { username, password } = this
      if (!username || !password) {
        this.$Message.error('请输入用户名和密码')
        return
      }
      const user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      user.setEmail(username)
      user.signUp().then((loggedInUser) => {
        console.log(loggedInUser)
        this.$Message.success('注册成功 登录成功')
      }, (error) => {
        this._logError('error', error)

        if (error.code === 125) {
          this.$Message.error('请填写正确的邮箱')
        } else if (error.code === 203) {
          AV.User.loginWithEmail(username, password).then((loggedInUser) => {
            this.$Message.success('登陆成功')
            console.log(loggedInUser)
          }, (loginError) => {
            this._logError('loginError', loginError)
            if (loginError.code === 210) {
              this.$Message.error('账号名密码不正确')
            } else {
              this.$Message.error(JSON.stringify(loginError))
            }
          })
        } else {
          this.$Message.error(JSON.stringify(error))
        }
      })
    },
    _logError (text, error) {
      console.log(text)
      console.log(error)
      console.log(`${text}.code`)
      console.log(error.code)
    }
  }
}
</script>

<style lang="less">
  .loginPage {
    padding: 0 30px;
    .header {
      .triangle {
        box-sizing: border-box;
        margin: 60px auto 30px 0;
        width: 60px; height: 60px;
        border: 30px solid transparent;
        border-bottom-color: rgb(40, 89, 174);
      }
      .lineOne {
        color: rgb(108, 110, 116);
        font-size: 32px;
      }
      .lineTwo {
        color: rgb(121, 129, 155);
        font-size: 32px;
      }
    }
    .inputBox {
      margin: 60px 0;
      div + .label {
        margin-top: 16px;
      }
      .label {
        font-size: 20px;
        color: rgb(121, 129, 155);
        margin-bottom: 8px;
      }
      input, input:active, input:hover, input {
        border: 0 none;
        outline: 0 none;
      }
      input {
        min-width: 240px;
        font-size: 16px;
        padding: 4px;
        color: rgb(121, 129, 155);
        transition: ease-in .3s;
        border-bottom: 2px solid rgb(242, 245, 248);
        background: linear-gradient(0, white 2px, white 2px) no-repeat,
        linear-gradient(0, white 2px, white 2px) no-repeat,
        linear-gradient(-90deg, rgb(108, 110, 116) 2px, rgb(108, 110, 116) 2px) no-repeat,
        linear-gradient(0, white 2px, white 2px) no-repeat;
        background-size: 0 2px, 2px 0, 0 2px, 2px 0;
        background-position: left top, right top, left bottom, left bottom;
        &:hover, &:active, &:focus {
          border-bottom: 2px solid transparent;
          background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
        }
      }
    }
  }
</style>
