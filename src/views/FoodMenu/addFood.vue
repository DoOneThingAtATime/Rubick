<template>
  <div class="addFoodPage">
    <div class="header">
      <div class="triangle"></div>
      <div class="lineTwo">添加一个你喜欢的食物</div>
    </div>
    <div class="form">
      <div class="label">食物名称</div>
      <input type="text" v-model="foodName">
    </div>
    <div class="buttonBox" @click="onClickAdd">Add --></div>
  </div>
</template>

<script>
import AV from '../../utils/request'

export default {
  created () {
    this._getUser()
    this.$nextTick(this._getFoods())
  },
  data () {
    return {
      currentUser: null,
      foodName: ''
    }
  },
  methods: {
    _getFoods () {
      const query = new AV.Query('DataTypeTest')
      query.equalTo('user', this.currentUser)
      query.find().then((response) => {
        console.log(response)
        // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      }, (error) => {
        this.$Message.error(error)
      })
    },
    _getUser () {
      this.currentUser = AV.User.current()
    },
    onClickAdd () {
      // 该语句应该只声明一次
      const AFood = AV.Object.extend('Food')
      const { currentUser, foodName } = this
      const food = new AFood()
      food.set('foodName', foodName)
      food.set('user', currentUser)
      food.save().then(function (testObject) {
        // 成功
        this.$Message.success('添加成功')
      }, (error) => {
        // 失败
        this.$Message.error(JSON.stringify(error))
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .addFoodPage {
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
    .form {
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
    .buttonBox {
      padding: 16px;
      border-radius: 4px;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      background: rgb(242, 245, 248);
      color: rgb(108, 110, 116);
    }
  }
</style>
