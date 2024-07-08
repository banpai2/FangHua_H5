<script setup lang="ts">
import { request } from '@/api'
import { closeToast, showLoadingToast, type ActionSheetAction } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'

import b64ToBlob from 'b64-to-blob'

// 控制 头像选择
const showAvatarSheet = ref(false)
const selectItem = async (data: ActionSheetAction) => {
  // console.log(data.name)
  if (data.name == '相册') {
    console.log('从相册选择')
    // 格式：base64
    const res = await mk.pickerPhoto()
    // console.log(res)

    // base64 转 blob
    const blob = b64ToBlob(res, 'image/jpeg')
    // console.log(blob)

    // 创建 FormData 对象 添加图片信息 为提交做准备
    const formData = new FormData()
    // 参数 1：key 根据接口文档来设置
    // 参数 2：提交的图片
    // 参数 3：图片的文件名  Date.now()防止聪明
    formData.append('file', blob, Date.now() + '.jpeg')

    // 提交数据
    const uploadRes = await request<MkResponse<{ avatar: string }>>({
      url: '/member/profile/avatar',
      method: 'post',
      // formData直接将 formData 对象设置给 data 即可
      // formData 中默认就是键值对
      data: formData
    })

    // console.log(uploadRes.data.result.avatar)

    // 本地更新
    profile.value.avatar = uploadRes.data.result.avatar

    // 获取 用户信息-》更改-》同步给鸿蒙端
    const user = mk.queryUser()
    user.avatar = uploadRes.data.result.avatar
    mk.updateUser(user)

    // console.log(res)
  } else if (data.name == '拍照') {
    console.log('从相机拍照')
  }
}

// 控制生日选择
const showDatePop = ref(false)
const currentDate = ref(['1982', '02', '02'])
const selectedDate = (data: { selectedValues: string[] }) => {
  console.log(data.selectedValues)
  showDatePop.value = false
}

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
const selectedArea = (data: { selectedIndexes: number[] }) => {
  console.log(data.selectedIndexes)
  showAreaPop.value = false
}

// 控制职业的弹层
// 这个职业列表不用改，可以不用 ref 定义为状态变量
// 不定义为状态变量，性能的消耗 小一丢丢
const columns = [
  { text: '软件工程师', value: '软件工程师' },
  { text: '医生', value: '医生' },
  { text: '教师', value: '教师' },
  { text: '律师', value: '律师' },
  { text: '会计师', value: '会计师' },
  { text: '销售经理', value: '销售经理' },
  { text: '市场营销专员', value: '市场营销专员' },
  { text: '建筑师', value: '建筑师' },
  { text: '护士', value: '护士' },
  { text: '机械工程师', value: '机械工程师' }
]
const showJobPop = ref(false)
const selectedJob = (data: { selectedValues: string[] }) => {
  console.log(data.selectedValues)
  showJobPop.value = false
}

// 获取用户信息
const profile = ref<ProfileInfo>({} as ProfileInfo)
onMounted(async () => {
  // 开启 loading
  showLoadingToast({
    message: '拼命加载中',
    // 点击 蒙版不关闭
    forbidClick: true
  })
  // get可以省略请求方法不写
  const res = await request<MkResponse<ProfileInfo>>({
    url: '/member/profile'
  })
  // console.log(res.data.result)
  profile.value = res.data.result

  // 关闭loading
  closeToast()
})
</script>

<template>
  <div class="profile-edit-page">
    <!-- 头像部分 -->
    <div class="avatar">
      <!-- vant 组件库中的 图片组件 -->
      <van-image
        round
        width="100"
        height="100"
        class="avatar-img"
        :src="profile.avatar"
        @click="showAvatarSheet = true"
      >
      </van-image>
      <div class="avatar-btn">
        <span @click="showAvatarSheet = true">修改头像</span>
      </div>
    </div>

    <!-- 中间表单部分 -->
    <van-cell-group>
      <!-- 输入框 readonly 只读 -->
      <van-field v-model="profile.account" label="账号" readonly></van-field>
      <van-field v-model="profile.nickname" label="昵称" placeholder="请输入昵称"></van-field>
      <van-cell title="性别" class="gender">
        <!-- 单选 -->
        <van-radio-group v-model="profile.gender" :icon-size="16">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
          <van-radio name="未知">未知</van-radio>
        </van-radio-group>
      </van-cell>
      <!--  readonly 只读 -->
      <van-field
        @click="showDatePop = true"
        v-model="profile.birthday"
        label="生日"
        readonly
        placeholder="请选择日期"
      ></van-field>
      <van-field
        @click="showAreaPop = true"
        label="所在地"
        readonly
        placeholder="请选择所在地"
        v-model="profile.fullLocation"
      ></van-field>
      <van-field
        @click="showJobPop = true"
        label="职业"
        readonly
        placeholder="请选择职业"
        v-model="profile.profession"
      ></van-field>
    </van-cell-group>

    <div class="submit">
      <!-- round圆角   block 占一行-->
      <van-button round block type="primary"> 保存资料 </van-button>
    </div>
  </div>

  <!-- 拍照的弹框 -->
  <van-action-sheet
    v-model:show="showAvatarSheet"
    :actions="[{ name: '相册' }, { name: '拍照' }]"
    cancel-text="取消"
    close-on-click-action
    @select="selectItem"
  />

  <!-- 生日的弹框 -->
  <van-popup v-model:show="showDatePop" position="bottom" :style="{ paddingBottom: '20px' }">
    <!-- cancel取消事件 -->
    <van-date-picker
      @cancel="showDatePop = false"
      @confirm="selectedDate"
      v-model="currentDate"
      :min-date="new Date(1980, 1, 1)"
    />
  </van-popup>

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

  <van-popup v-model:show="showJobPop" position="bottom" :style="{ paddingBottom: '20px' }">
    <van-picker :columns="columns" @cancel="showJobPop = false" @confirm="selectedJob" />
  </van-popup>
</template>

<style lang="css" scoped>
.avatar {
  padding: 30px;
  text-align: center;
  background-color: var(--mk-white);
}

.avatar-img {
  box-shadow: 0 0 5px var(--mk-gray);
}

.avatar-btn {
  color: var(--mk-linear_end);
  margin-top: 10px;
}

.gender ::v-deep(.van-cell__title) {
  width: 100px;
  flex: none;
}

.van-radio-group {
  display: flex;
  justify-content: space-between;
  height: 36px;
  width: 180px;
}

.submit {
  padding: 16px;
}
</style>
