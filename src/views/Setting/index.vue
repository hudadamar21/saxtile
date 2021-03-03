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
    Layout: () => import(/* webpackChunkName: "components" */ '@/components/Layout'),
    AccountSetting: () => import(/* webpackChunkName: "setting" */ './AccountSetting'),
    AppSetting: () => import(/* webpackChunkName: "setting" */ './AppSetting'),
  }, 
}
</script>