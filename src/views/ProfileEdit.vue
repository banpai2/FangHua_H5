<script setup lang="ts"></script>

<template>
  <div class="profile-edit-page">
    用户信息页
    <p>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
    </p>
    <p>
      <van-button loading type="primary" />
      <van-button loading type="primary" loading-type="spinner" />
      <van-button loading type="success" loading-text="加载中..." />
    </p>
  </div>
</template>

<style lang="css" scoped></style>
