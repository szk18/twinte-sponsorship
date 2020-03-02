export default function ({ store, redirect }) {
  if (store.getters.authorized) { return }

  store.dispatch('login')
    .then(
      () => {
        if (!store.getters.authorized) {
          redirect('/login')
        }
      }

    )
}
