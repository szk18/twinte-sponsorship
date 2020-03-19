<template>
  <section class="section">
    <h1 class="title">
      ありがとうございました。
    </h1>
    <span class="has-text-primary amount">
      ¥{{ amount }}
    </span>
    <span>の寄付をいただきました。</span>
    <p>寄付していただきたお金はTwin:teの運用や開発に使用します</p>
    <br>
    <p>
      <nuxt-link to="/mypage">
        マイページ
      </nuxt-link>からユーザー情報の編集や寄付の履歴が確認できます。
    </p>
  </section>
</template>

<script>
export default {
  data () {
    return {
      // type: '',
      amount: 0
    }
  },
  created () {
    // this.type = this.$route.query.type
    this.amount = this.$route.query.amount
  }
}
</script>
<style lang="scss" scoped>
.amount {
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 72px;
}
</style>
