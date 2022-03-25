<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/views/Home/ListContainer/index.vue'
import Recommend from '@/views/Home/Recommend/index.vue'
import Rank from '@/views/Home/Rank/index.vue'
import Like from '@/views/Home/Like/index.vue'
import Floor from '@/views/Home/Floor/index.vue'
import Brand from '@/views/Home/Brand/index.vue'
import {mapState} from 'vuex'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // 获取floor的数据
    this.$store.dispatch("getFloorList")
  },
  computed: {
    ...mapState({
      floorList: state=>state.home.floorList
    })
  }
}
</script>

<style>

</style>