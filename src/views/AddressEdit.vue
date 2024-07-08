<script setup lang="ts">
import { request } from '@/api'
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义数据对象 绑定数据
const addressData = ref({} as AddressItem)

// 控制所在地组件的显示
const showAreaPop = ref(false)
const areaData = ref({} as AreaColumns)
onMounted(async () => {
  // 通过注入的对象中的方法 获取数据 并设置给 状态变量
  // 默认的数据格式有误，需要调整 鸿蒙项目中
  // commons/basic/src/main/ets/plugins/LocationPlugin.ets 这个文件的代码
  const res = await mk.getAreaColumns()
  // console.log(res)
  areaData.value = res
})
const selectedArea = (data: { selectedValues: string[] }) => {
  // console.log(data.selectedIndexes)
  showAreaPop.value = false
  console.log(data)
  const pName = areaData.value.province_list[parseInt(data.selectedValues[0])]
  const cityName = areaData.value.city_list[parseInt(data.selectedValues[1])]
  const countyName = areaData.value.county_list[parseInt(data.selectedValues[2])]

  addressData.value.fullLocation = `${pName} ${cityName} ${countyName}`

  // 省市区的编码
  addressData.value.provinceCode = parseInt(data.selectedValues[0])
  addressData.value.cityCode = parseInt(data.selectedValues[1])
  addressData.value.countyCode = parseInt(data.selectedValues[2])
}

// 获取路由对象
const router = useRouter()

// 提交数据
const submitAddress = async () => {
  // 提交数据
  await request({
    url: '/member/address',
    method: 'post',
    // isDefault:0 默认，1 不默认
    data: {
      // 展开运算符
      // 把对象的属性和值 摊开到这里
      ...addressData.value,
      isDefault: addressData.value.isDefault ? 0 : 1
    }
  })
  showToast('新增成功')
  router.back()
}
</script>

<template>
  <!-- {{ addressData }} -->
  <div class="address-edit-page">
    <van-cell-group>
      <van-field
        v-model="addressData.receiver"
        label="收货人"
        placeholder="请输入收货人"
      ></van-field>
      <van-field
        v-model="addressData.contact"
        label="手机号码"
        placeholder="请输入手机号码"
      ></van-field>
      <van-field
        v-model="addressData.fullLocation"
        label="所在地区"
        placeholder="请输入所在地区"
        readonly
        @click="showAreaPop = true"
      ></van-field>
      <van-field
        v-model="addressData.address"
        label="详细地址"
        type="textarea"
        placeholder="请输入详细地址"
      >
      </van-field>
      <van-field label="设为默认地址" readonly>
        <template #extra>
          <van-checkbox
            v-model="addressData.isDefault"
            :icon-size="20"
            checked-color="var(--mk-red)"
          ></van-checkbox>
        </template>
      </van-field>
    </van-cell-group>
    <div class="submit">
      <van-button @click="submitAddress" round block type="primary"> 保存 </van-button>
    </div>
  </div>
  <!-- 省市区的弹框 
    van-popup:实现了弹出效果
    支持让开发者用插槽传递进去：目前的写法是 默认插槽
    类比于鸿蒙 尾随闭包 
  -->
  <van-popup v-model:show="showAreaPop" position="bottom" :style="{ paddingBottom: '20px' }">
    <van-area
      title="标题"
      :area-list="areaData"
      @cancel="showAreaPop = false"
      @confirm="selectedArea"
    />
  </van-popup>
</template>

<style lang="css" scoped>
.address-edit-page {
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

.geo {
  width: 250px;
  height: 250px;
  overflow-y: auto;
}

.geo-title {
  font-size: 14px;
  color: var(--mk-gray);
  padding: 8px;
}

.geo-item {
  border-top: 0.5px solid var(--mk-under);
  padding: 8px;
}

.geo-item-label {
  font-size: 14px;
  color: var(--mk-red);
}

.geo-item-value {
  font-size: 12px;
  color: var(--mk-gray);
}
</style>
