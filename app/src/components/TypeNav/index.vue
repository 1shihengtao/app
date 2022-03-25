<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="one" @mouseleave="two">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派和编程式实现路由跳转传参 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div class="item" v-for="(c1, index) in categoryList.slice(0, 15)" :key="c1.categoryId" :class="{ cur: current == index }">
                <!-- 一级分类名称 -->
                <h3 @mouseenter="changeIndex(index)" @mouseleave="leaveIndex">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <!-- 二级分类 -->
                  <div class="subitem" v-for="(c2) in c1.categoryChild.slice(0, 8)" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <!-- 二级分类名称 -->
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash
import _ from 'lodash'
export default {
  name: 'TypeNav',
  data() {
    return {
      current: -1,
      show: true,
    }
  },
  // 组件挂载完毕 向服务器发请求
  mounted() {
    // 当组件挂载完毕 show的属性变为false
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList
      },
    }),
  },
  methods: {
    // 鼠标进入添加背景颜色
    changeIndex(index) {
      this.current = index
    },
    // 鼠标移出移出背景颜色
    leaveIndex() {
      this.current = -1
    },
    one() {
      // 鼠标移入显示
      this.show = true
    },
    two() {
      this.current = -1
      // 鼠标离开隐藏
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    goSearch(event) {
      // 编程式导航 + 事件委派
      // 缺点：会给每个子节点绑定事件
      // 怎么确定点击的是a标签？？ 即使能确定，又怎么区分一二三级分类？？
      // 解决：给每个a标签加一个自定义属性
      let element = event.target
      // 带有categoryName一定是a标签
      let { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        // 整理路由参数
        let loction = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          loction.query = query
          loction.params = this.$route.params
          if (this.$route.path != '/home') {
            this.$router.replace(loction)
          } else {
            this.$router.push(loction)
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: rgb(231, 143, 205);
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .cur {
          background-color: rgb(153, 0, 133);
        }
        //给每个item加一个背景颜色 （第一种方式）
        // .item:hover {
        //   background-color: pink;
        // }
      }
    }
    // 过渡动画样式
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 2.5s;
    }
  }
}
</style>
