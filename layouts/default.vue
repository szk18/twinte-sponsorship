<template>
  <div>
    <section class="main-content">
      <aside :class="{'active-menu': MenuFlg}">
        <div id="menu-contents">
          <p class="logotitle">
            <a href="https://sponsorship.twinte.net">
              <img src="~/assets/twinte-sponsor-title.png" alt="Twin:te_Logo">
            </a>
          </p>
          <ul class="menu-list">
            <li
              v-for="(item, key) of items"
              :key="key"
              @click="MenuFlg = false"
            >
              <nuxt-link
                :to="item.to"
                exact-active-class="is-active"
              >
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div id="menu-footer" class="has-text-white">
          <p><span class="has-text-weight-bold">WEB SITE</span><br><a href="https://www.twinte.net">www.twinte.net</a></p>
          <p><span class="has-text-weight-bold">Twitter</span><br><a href="https://twitter.com/te_twin">@te_twin</a></p>
          <p><span class="has-text-weight-bold">E-mail</span><br><a href="mailto:info@twinte.net?subject=お問い合わせ">info@twinte.net</a></p>
        </div>
      </aside>
      <div v-if="this.MenuFlg" @click="openDrawerMenu" class="menu-background" />
      <div class="container nuxt-contents">
        <section class="section">
          <header class="header">
            <div id="header-left">
              <div id="humberger" @click="openDrawerMenu">
                <div />
                <div />
                <div />
              </div>
              <img src="~/assets/twinte-sponsor-title.png" alt="Twin:te_Logo">
            </div>
            <div class="has-text-right header-button-container">
              <button
                @click="login()"
                v-if="!this.$store.getters.authorized"
                exact-active-class="is-active"
                class="button is-primary is-outlined has-text-weight-bold header-button"
              >
                ログイン
              </button>
              <button @click="logout" v-else class="button is-primary is-outlined has-text-weight-bold header-button">
                ログアウト
              </button>
            <!-- <p>{{ state }}</p> -->
            </div>
            <b-modal
              :active.sync="isComponentModalActive"
              has-modal-card
              trap-focus
              aria-role="dialog"
              aria-modal
            >
              <login-alert />
            </b-modal>
          </header>
          <main>
            <nuxt />
          </main>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      MenuFlg: false,
      items: [
        {
          title: '寄付のお願い',
          to: { name: 'index' }
        },
        {
          title: '寄付・サブスク登録',
          to: { name: 'register' }
        },
        {
          title: 'マイページ',
          to: { name: 'mypage' }
        }
      ],
      isComponentModalActive: false
    }
  },
  created () {
    this.$store.dispatch('login')
  },
  methods: {
    openDrawerMenu () {
      this.MenuFlg = !this.MenuFlg
    },
    login () {
      this.$swal({
        title: 'どのアカウントでログインしますか?',
        html: `
      <div>
          <a href="https://api.twinte.net/v1/auth/google?redirect-to=https://sponsorship.twinte.net">
            <img
              width="250"
              src="authing/sign-in-with-google.png"
              alt="sign in with google"
            >
          </a>
        </div>
        <div>
          <a href="https://api.twinte.net/v1/auth/apple?redirect-to=https://sponsorship.twinte.net">
            <img
              width="250"
              src="/authing/sign-in-with-apple.png"
              alt="sign in with apple"
            >
          </a>
        </div>
        <div>
          <a href="https://api.twinte.net/v1/auth/twitter?redirect-to=https://sponsorship.twinte.net">
            <img
              width="250"
              src="/authing/sign-in-with-twitter.png"
              alt="sign in with twitter"
            >
          </a>
        </div>
      `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '閉じる'
      })
    },
    logout () {
      this.$swal({
        title: 'ログアウトしますか?',
        text: 'すべてのTwin:teサービスからログアウトします',
        showCancelButton: true,
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('logout')
            .then(this.$buefy.toast.open({
              message: 'ログアウトしました',
              type: 'is-success'
            }))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$tab: 1024px; // タブレット
$sp: 560px;  // スマホ
@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}
@mixin sp {
  @media (max-width: ($sp)) {
    @content;
  }
}

.main-content{
   display: flex;
  @include sp {
    display: block;
  };
}

.nuxt-contents{
  min-height: 100vh;
  @include tab {
    width:75vw;
  };
  @include sp {
    width:100vw;
  };
}

// サイドメニュー設定
$menu-color: #1A1D32;
.active-menu{
  transform:translateX(69vw);
  transition: all .5s; /* 移動する速さ */
}
aside{
  display: block;
  z-index: 10;
  width:15vw;
  // サイズ設定
  @include tab {
    width:25vw;
  };
  @include sp {
    width:70vw;
    position:fixed;
    top:0;
    height:100vh;
    left:-70vw;
  };

  background-color: $menu-color;
  #menu-contents{
    position: sticky;
    top: 0;
  }
  a{
    box-sizing:border-box;
    margin-right:10%;
    border-radius: 0px 5px 5px 0px;
  }
  .logotitle{
  margin: 1rem 0 1rem 0;
  padding:1rem 0 1rem 1rem;
  width:80%;
    img{
      width:80%;
      min-width: 100px;
    }
  }
  #menu-footer{
    position:fixed;
    @include sp {
      position:absolute;
    }
    bottom:1rem;
    left:1rem;
    word-break : break-all;
    width:10rem;
  }
}
// メニューバー背景
@include sp {
  .menu-background {
  position: fixed;
  top: 0;
  left: 0;
  content: "";
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  opacity: 1;
  transition: opacity 0.5s;
  }

}

$sp-header-height: 10vh;
header{

  img{
    display: none;
  }

@include sp {
    position: absolute;
    top:0;
    left:0;
    width:100vw;
    height:$sp-header-height;
    background-color: $menu-color;

    #header-left{
      overflow: hidden;
      width:50vw;
      height: 100%;
      display: flex;
      align-items: center;

      #humberger {
        position: relative;
        height: 24px;
        width: 18%;
        display: block;
        box-sizing: border-box;
        margin:0 1rem 0 1rem;
      }
      #humberger div {
        position: absolute;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: #fff;
        display: inline-block;
        box-sizing: border-box;
      }
      #humberger div:nth-of-type(1) {
        top: 0;
      }
      #humberger div:nth-of-type(2) {
        top: 10px;
      }
      #humberger div:nth-of-type(3) {
        bottom: 0;
      }

      img{
      width:60%;
      display: block;
      }
    }

    .header-button-container{
      position: absolute;
      right:0;
      top:0;
      height: $sp-header-height;
      padding:calc( #{$sp-header-height} / 3) 1rem calc( #{$sp-header-height} / 3) 0;
      .header-button{
        width: 30vw;
        height:100%;
        border: 2px solid #E5E5E5 !important;
        color: #E5E5E5 !important;
        font-size:10px;
      }
    }

    .header-button:hover{
      background:#C3EAF7 !important;
      color: #1A1D32 !important;
    }

  }
}

main{
    @include sp {
      margin-top:$sp-header-height;
  };
}

</style>
