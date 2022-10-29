<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
  
     <h1 v-if="error.statusCode === 500">
      {{ serverError }}
    </h1>
    <NuxtLink to="/">
     بازگشت همه به سوی اوست
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 این صفحه رو که نداریم',
      otherError: 'An error occurred',
      serverError:'یکی پاش رفت رو کابل سرور'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
