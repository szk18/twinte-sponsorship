<template>
  <div>
    <h1 class="title pagetitle">
      マイページ
    </h1>
    <div class="card">
      <div>
        <h1 class="title">
          ユーザ情報
        </h1>

        <b-button
          @click="isComponentModalActive = true"
          class="edit-button is-text"
          icon-left="pencil"
        >
          <span>編集する</span>
        </b-button>
      </div>

      <p>
        寄付者一覧に表示するお名前とリンクです。
      </p>

      <div>
        <section class="userinfo">
          <h2 class="has-text-primary has-text-weight-semibold">
            現在の表示名
          </h2>
          <p>{{ userName | unregisterd }}</p>
        </section>
        <section class="userinfo">
          <h2 class="has-text-primary has-text-weight-semibold">
            リンク
          </h2>
          <p>{{ userUrl | unregisterd }}</p>
        </section>
      </div>

      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <edit-modal v-on:edited="updateUserInfo" />
      </b-modal>
    </div>
    <div class="card">
      <h1 class="title">
        サブスクリプションの登録状況
      </h1>
      <h2 class="has-text-primary has-text-weight-semibold">
        ご利用中のプラン
      </h2>
      <div v-for="item in history" :key="item.subscription_id" class="history">
        <span style="line-height:36px" class="has-text-weight-semibold">
          {{ item.plan[0].name }}寄付
        </span>
        <!-- <li>登録日：{{ item.start_at | formatDate }}</li> -->

        <b-button
          v-on:click="deletePlan(item.subscription_id)"
          class="delete-button  is-danger"
          outlined
        >
          解約
        </b-button>
      </div>
    </div>
    <div class="card">
      <h1 class="title">
        寄付の履歴
      </h1>
      <div v-for="item in paymentItems" :key="item.id" class="history">
        <div v-if="item.status==='succeeded'" class="columns is-mobile">
          <div class="column is-5-mobile is-3-tablet is-2-desktop">
            {{ item.paid_at | formatDate }}
          </div>
          <div class="column">
            <div class="columns is-gapless">
              <div class="column is-5-mobile is-3-tablet is-1-desktop">
                <p>{{ item.amount }}円</p>
              </div>
              <div class="column">
                <p class="has-text-grey">
                  {{ item.type | type }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr class="is-marginless">
      </div>
      <b-button v-if="isShow && paymentItems.length !==0" @click="readMore" type="is-primary">
        もっとみる
      </b-button>
    </div>
  </div>
</template>

<script>
import EditModal from '@/components/EditModal'
export default {
  components: {
    EditModal
  },
  filters: {
    type (value) {
      return value === 'Subscription' ? 'サブスクリプションによる寄付' : '一回きりの決済による寄付'
    },
    unregisterd (value) {
      return value === null ? '未登録' : value
    }
  },
  data () {
    return {
      payments: [],
      userName: '',
      userUrl: '',
      history: null,
      displayItems: 3,
      isShow: true,
      isComponentModalActive: false
    }
  },
  computed: {
    paymentItems () {
      return this.payments.filter(e => e.status === 'succeeded').slice(0, this.displayItems) // paymentから成功のものを取り出し表示する分をpaymemtItemsへ
    }
  },
  async created () {
    try {
      await this.$store.dispatch('login')
      if (!this.$store.getters.authorized) { this.$router.push('/login') }
    } catch (err) {
      console.log(err)
    }
  },
  mounted () {
    this.$axios.get('/payment/')
      .then(response => (this.payments = response.data))
    this.$axios.$get('/payment/subscriptions')
      .then(response => (this.history = response))
    this.$axios.get('/payment/users/me')
      .then(response => (this.userName = response.data.nickname))
    this.$axios.get('/payment/users/me')
      .then(response => (this.userUrl = response.data.link))
  },
  methods: {
    updateUserInfo (editnickname, editlink) {
      this.$axios.patch('/payment/users/me', {
        nickname: editnickname,
        link: editlink
      }
      )
        .then(() => this.$buefy.toast.open({
          message: '正常に更新できました.',
          type: 'is-success'
        }))
        .then(() => this.$router.push('/'))
        .catch((response) => {
          console.log(response)
          this.$buefy.toast.open({
            message: '更新に失敗しました.',
            type: 'is-danger'
          })
        })
    },
    deletePlan (planId) {
      this.$swal({
        text: 'このサブスクリプリプションを解約しますか?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ'
      }).then((result) => {
        if (result.value) {
          this.$axios.$delete('/payment/subscriptions/' + planId)
            .then(
              this.$buefy.toast.open({
                message: '解約しました',
                type: 'is-success'
              })
            ).then(this.$router.push('/'))
        }
      })
    },
    readMore () {
      this.isShow = false
      this.displayItems = this.payments.filter(e => e.status === 'succeeded').length
    }
  }
}
</script>

<style scoped lang="scss">
.history {
  margin: 1em;
}
.userinfo {
  margin-top: 1rem
}
.edit-button {
  position:absolute;
  top: 2rem;
  right: 2rem;
  text-decoration: none
}
.delete-button {
  text-decoration: none
}
</style>
