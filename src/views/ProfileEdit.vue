<script setup lang="ts">
import type { ActionSheetAction } from 'vant'
import { ref } from 'vue'

// 1. 修改头像
// 1.1 控制修改头像弹层的显示/隐藏
const showAvatarSheet = ref(false)
// 1.2 打开相册/相机
const onSelectAvatar = (item: ActionSheetAction, i: number) => {
  if (i === 0) {
    // 相册上传
    console.log('相册上传')
  } else if (i === 1) {
    // 拍照上传
    console.log('拍照上传')
  }
}
</script>

<template>
  <div class="profile-edit-page">
    <!-- 头像部分 -->
    <div class="avatar">
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
    <van-action-sheet
      v-model:show="showAvatarSheet"
      :actions="[{ name: '相册' }, { name: '拍照' }]"
      @select="onSelectAvatar"
      cancel-text="取消"
      :style="{ paddingBottom: '20px' }"
    ></van-action-sheet>
    <!-- 中间表单部分 -->
    <van-cell-group>
      <van-field label="账号" readonly></van-field>
      <van-field label="昵称" placeholder="请输入昵称"></van-field>
      <van-cell title="性别" class="gender">
        <van-radio-group :icon-size="16">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
          <van-radio name="未知">未知</van-radio>
        </van-radio-group>
      </van-cell>
      <van-field label="生日" readonly placeholder="请选择日期"></van-field>
      <van-field label="所在地" readonly placeholder="请选择所在地"></van-field>
      <van-field label="职业" readonly placeholder="请选择职业"></van-field>
    </van-cell-group>

    <div class="submit">
      <van-button round block type="primary"> 保存资料 </van-button>
    </div>
  </div>
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
