<script setup lang="ts">
import { request } from '@/api'
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 列表数据
const addressList = ref<AddressItem[]>([])

const getData = async () => {
  const res = await request<MkResponse<AddressItem[]>>({
    url: '/member/address'
  })
  // console.log(res.data)
  addressList.value = res.data.result
}

onMounted(async () => {
  getData()
})

// 设置为默认
// 点击事件-》调用接口-》更新服务器数据-》更新页面数据
const setDefault = async (id: string) => {
  await request({
    url: '/member/address/' + id,
    method: 'put',
    data: {
      isDefault: 0 // 0默认
    }
  })
  showToast('修改完毕')
  getData()
}

// 删除数据
const delItem = async (id: string) => {
  await request({
    url: '/member/address/' + id,
    method: 'delete'
  })
  showToast('删除成功')
  getData()
}

// 下拉刷新
const isRefresh = ref(false)
const onRefresh = async () => {
  // setTimeout(() => {
  // isRefresh.value = false
  // }, 3000)
  // 获取数据
  await getData()
  // 关闭加载效果
  isRefresh.value = false
  showToast('刷新完毕~')
}

// 去编辑页
const router = useRouter()
const toEdit = (id: string) => {
  // console.log(id)
  router.push({
    path: '/address/edit/' + id
  })
}
</script>

<template>
  <div class="address-manager-page">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-swipe-cell v-for="item in addressList" :key="item.id">
        <!-- 默认的内容（默认插槽） -->
        <div class="item">
          <div class="item-wrapper">
            <div class="item-area">
              <!-- isDefault为 0 是默认，反之不是 -->
              <span v-if="item.isDefault == 0" class="item-tag">默认</span>
              {{ item.fullLocation }}
            </div>
            <div class="item-address">{{ item.address }}</div>
            <div class="item-connect">{{ item.receiver }} {{ item.contact }}</div>
          </div>
          <div class="item-edit">
            <van-icon
              @click="toEdit(item.id)"
              name="edit"
              size="20"
              color="var(--mk-gray)"
            ></van-icon>
          </div>
        </div>
        <!-- 设置给滑动区域的内容（插槽有名字--具名插槽） -->
        <template #right>
          <van-button @click="setDefault(item.id)" square type="primary" style="height: 100%">
            设为<br />默认
          </van-button>
          <van-button
            @click="delItem(item.id)"
            square
            type="danger"
            style="height: 100%"
            text="删除"
          />
        </template>
      </van-swipe-cell>
    </van-pull-refresh>

    <div class="submit">
      <!-- to 可以实现路由的跳转效果 -->
      <van-button round block type="primary" to="/address/edit"> 新建地址 </van-button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.address-manager-page {
  padding: 8px;
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.submit {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px;
  height: 80px;
}

.item {
  min-height: 108px;
  width: 100%;
  background-color: var(--mk-white);
  border-radius: 2px;
  display: flex;
  margin-bottom: 8px;
}

.item-wrapper {
  padding: 16px;
  flex: 1;
}

.item-area {
  font-size: 14px;
  color: var(--mk-text);
  margin-bottom: 5px;
}

.item-tag {
  display: inline-block;
  border-radius: 4px;
  width: 40px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: var(--mk-white);
  text-align: center;
  background-image: linear-gradient(90deg, var(--mk-linear_begin), var(--mk-linear_end));
  margin-right: 4px;
}

.item-address {
  font-size: 16px;
  color: var(--mk-black);
  font-weight: 500;
  margin-bottom: 5px;
}

.item-connect {
  font-size: 12px;
  color: var(--mk-text);
}

.item-edit {
  width: 48px;
  display: flex;
  align-items: center;
}

.btn-group {
  height: 100%;
  width: 100px;
  display: flex;
}
</style>
