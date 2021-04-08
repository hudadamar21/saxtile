<template>
  <Layout noIndicator>
    <AccountSetting />
    <AppSetting />
  </Layout>
</template>

<script>
export default {
  title: 'Saxtile Setting',
  components: {
    AccountSetting: () => import(/* webpackChunkName: "setting" */ './AccountSetting'),
    AppSetting: () => import(/* webpackChunkName: "setting" */ './AppSetting'),
  }, 
}
</script>