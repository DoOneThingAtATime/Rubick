<template>
  <div class="randomFoodPage">
    <div class="header">
      <div class="triangle"></div>
      <div class="lineTwo">{{text}}</div>
    </div>
    <div v-if="notEnough" class="emptyBox">
      <img class="emptyImg" src="./empty.png" alt="">
    </div>
    <template v-else>
      <div class="randomBox">
        <div class="label">今日菜品: </div>
        <div class="randomInput"> {{resultText}} </div>
        <div class="theme-button" @click="onClickRandom">{{btnText}}</div>
      </div>
    </template>
    <div @click="onClickAdd" class="theme-button">去添加 --></div>
  </div>
</template>

<script>
import AV from '../../utils/request'

export default {
  data () {
    return {
      currentUser: null,
      foodList: [],
      selectedIndex: 0,
      notEnough: true,
      text: '你需要先添加三个以上的食物, 才能够帮你挑选',
      resultText: '快快点击开始挑选叭~ ',
      press: false,
      timer: null
    }
  },
  computed: {
    btnText () {
      return this.press ? '选择 -->' : '开始挑选 Go -->'
    }
  },
  created () {
    this._getUser()
    this.$nextTick(this._getFoods())
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.timer = null
  },
  methods: {
    onClickRandom () {
      this.press = !this.press
      if (this.press) {
        this.timer = setInterval(() => {
          let n = this._getRandomIndex()
          this.resultText = this.foodList[n]
        }, 30)
      } else {
        this.resultText = this.foodList[this.selectedIndex]
        this.selectedIndex = this._getRandomIndex()
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    onClickAdd () {
      this.$router.push({ path: '/addFood' })
    },
    _getRandomIndex () {
      return Math.floor(Math.random() * this.foodList.length)
    },
    _getUser () {
      this.currentUser = AV.User.current()
    },
    _getFoods () {
      const query = new AV.Query('Food')
      query.equalTo('user', this.currentUser)
      query.find().then((response) => {
        console.log(response)
        if (response.length > 2) {
          this.notEnough = false
          this.text = '开始解决世界性大难题叭'
          this.foodList = response.map(item => item.attributes.foodName)
          this.selectedIndex = this._getRandomIndex()
        }
      }, (error) => {
        this.$Message.error(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .randomFoodPage {
    padding: 0 30px;
    .header {
      .triangle {
        box-sizing: border-box;
        margin: 30px auto 30px 0;
        width: 60px; height: 60px;
        border: 30px solid transparent;
        border-bottom-color: rgb(40, 89, 174);
      }
      .lineTwo {
        color: rgb(121, 129, 155);
        font-size: 20px;
      }
    }
    .randomBox {
      margin: 24px auto;
      .label {
        font-size: 20px;
        color: rgb(121, 129, 155);
        margin-bottom: 8px;
      }
      .randomInput {
        margin: 24px;
        font-size: 16px;
        color: rgb(121, 129, 155);
      }
    }
    .emptyBox {
      margin-left: -30px;
      .emptyImg {
        display: block;
        margin: 20px auto;
      }
    }
  }
</style>
