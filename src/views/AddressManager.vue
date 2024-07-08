<script setup lang="ts">
import { request } from '@/api'
import { onMounted, ref } from 'vue'

// 列表数据
const addressList = ref<AddressItem[]>([])

onMounted(async () => {
  const res = await request<MkResponse<AddressItem[]>>({
    url: '/member/address'
  })
  console.log(res.data)
  addressList.value = res.data.result
})
</script>

<template>
  <div class="address-manager-page">
    <van-swipe-cell v-for="item in addressList" :key="item.id">
      <div class="item">
        <div class="item-wrapper">
          <div class="item-area">
            <!-- isDefault为 0 是默认，反之不是 -->
            <span v-if="item.isDefault == 0" class="item-tag">默认</span>
          </div>
          <div class="item-address">{{ item.address }}</div>
          <div class="item-connect">{{ item.receiver }} {{ item.contact }}</div>
        </div>
        <div class="item-edit">
          <van-icon name="edit" size="20" color="var(--mk-gray)"></van-icon>
        </div>
      </div>
      <template #right>
        <van-button square type="primary" style="height: 100%"> 设为<br />默认 </van-button>
        <van-button square type="danger" style="height: 100%" text="删除" />
      </template>
    </van-swipe-cell>

    <div class="submit">
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
