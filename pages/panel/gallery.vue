<template>
<v-app style="background: #eaecef !important" class="d-flex justify-center align-center">
    <imageGallery></imageGallery>
</v-app>
</template>

<script>

import imageGallery from "~/components/gallery/imageGallery"
export default {
    layout: "panel",
    components: {
        imageGallery
    },

}
</script>
