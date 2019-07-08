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
      <div>开始挑选啦</div>
    </template>
    <div v-if="notEnough" @click="onClickAdd" class="theme-button">Go To Add --></div>
  </div>
</template>

<script>
import AV from '../../utils/request'

export default {
  data () {
    return {
      currentUser: null,
      foodList: [],
      notEnough: true,
      text: '你需要先添加三个以上的食物, 才能够帮你挑选'
    }
  },
  created () {
    this._getUser()
    this.$nextTick(this._getFoods())
  },
  methods: {
    onClickAdd () {
      this.$router.push({ path: '/addFood' })
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
    .emptyBox {
      margin-left: -30px;
      .emptyImg {
        display: block;
        margin: 20px auto;
      }
    }
  }
</style>
