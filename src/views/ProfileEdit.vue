<script setup lang="ts">
import type { ActionSheetAction } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'

// 控制 头像选择
const showAvatarSheet = ref(false)
const selectItem = (data: ActionSheetAction) => {
  // console.log(data.name)
  if (data.name == '相册') {
    console.log('从相册选择')
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
// 选择职业
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
const showProfessionPopup = ref(false)
const onChangeProfession = (data: { selectedValues: string[] }) => {
  console.log(data)
  showProfessionPopup.value = false
}
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
        src="https://foruda.gitee.com/avatar/1716533299289369832/5539886_yjh8866_1716533299.png"
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
      <van-field label="账号" readonly></van-field>
      <van-field label="昵称" placeholder="请输入昵称"></van-field>
      <van-cell title="性别" class="gender">
        <!-- 单选 -->
        <van-radio-group :icon-size="16">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
          <van-radio name="未知">未知</van-radio>
        </van-radio-group>
      </van-cell>
      <!--  readonly 只读 -->
      <van-field
        @click="showDatePop = true"
        label="生日"
        readonly
        placeholder="请选择日期"
      ></van-field>
      <van-field
        @click="showAreaPop = true"
        label="所在地"
        readonly
        placeholder="请选择所在地"
      ></van-field>
      <van-field
        @click="showProfessionPopup = true"
        label="职业"
        readonly
        placeholder="请选择职业"
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

  <!-- 省市区的弹框 -->
  <van-popup v-model:show="showAreaPop" position="bottom" :style="{ paddingBottom: '20px' }">
    <van-area
      title="标题"
      :area-list="areaData"
      @cancel="showAreaPop = false"
      @confirm="selectedArea"
    />
  </van-popup>

  <!-- 打开选择职业弹层 -->
  <van-popup v-model:show="showProfessionPopup" round position="bottom">
    <van-picker
      :columns="columns"
      @confirm="onChangeProfession"
      @cancel="showProfessionPopup = false"
    />
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
