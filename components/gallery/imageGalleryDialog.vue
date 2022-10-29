<template>

    <v-dialog max-width="700" v-model="dialog">
        <v-card>
            <imageGallery :multi="multi" :selectable="selectable" @selectedListener="selectedListener"></imageGallery>
        </v-card>
    </v-dialog>


</template>

<script>
import imageGallery from "~/components/gallery/imageGallery"
export default {
    layout: "panel",
    props: {
        dialog: Boolean,
        multi: Boolean,
        selectable: Boolean
    },
    components: {
        imageGallery
    },
    data() {
        return {
            dialog: this.dialog
        }
    },
    methods: {
        selectedListener(item) {
     
         
            this.$emit('selectedListener',item)
        },
    }

}
</script>
