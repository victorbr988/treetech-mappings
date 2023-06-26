<template>
  <form class="justify-center flex">
    <section class="flex flex-col gap-4">
      <section>
        <label 
          class="block mb-2 text-sm font-medium text-gray-900" 
          for="file_input_with_mnemonico">Mapa com Mnemônico</label>
        <input 
          @change="uploadFileWithMnemonico" 
          class="block w-full flex-1 p-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          id="file_input_with_mnemonico"
          type="file"
          multiple
        >
      </section>

      <section class="flex gap-4">
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900" 
            for="file_input_without_mnemonico">Mapa sem Mnemônico</label>
          <input 
            @change="uploadFileWithoutMnemonico" 
            class="block w-full flex-1 p-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            id="file_input_without_mnemonico" 
            type="file"
            multiple
          >
        </div>
      </section>
      <button 
        type="button"
        @click="generateFile"
        :disabled="fileWithMnemonico === null || fileWithoutMnemonico === null"
        class="px-6 py-3 rounded justify-center flex disabled:brightness-75 disabled:cursor-not-allowed bg-gray-900 text-gray-200 hover:bg-gray-800"
      >
        <Loading v-if="uploadedProgress" />
       
        <span v-if="!uploadedProgress">Gerar csv</span>
      </button>
    </section>
  </form>
</template>

<script>
import { defineComponent } from "vue"
import axios from "axios"
import Loading from "./Loading.vue"

const api_url = import.meta.env.VITE_API_URL

export default defineComponent({
  name: "Form",
  emits: ["showFileGenerated", "downloadFile"],
  data() {
    return {
      fileWithMnemonico: null,
      fileWithoutMnemonico: null,
      uploadedProgress: false
    }
  },
  components:{
    Loading
  },
  methods: {
    generateFile() {
      this.uploadedProgress = true
      const data = new FormData()

      data.append("file", this.fileWithMnemonico, this.fileWithMnemonico.name)
      data.append("file", this.fileWithoutMnemonico, this.fileWithoutMnemonico.name)

      console.log(data)

      axios.post(api_url, data)
      .then((response) => {
        this.$emit("showFileGenerated", response.data.file)
        this.uploadedProgress = false
        this.fileWithMnemonico = null
        this.fileWithoutMnemonico = null
      })
      .catch((err) => {
        this.uploadedProgress = false
        console.log(err)
      })
    },
    uploadFileWithMnemonico(event) {
      this.fileWithMnemonico = event.target.files[0];
    },
    uploadFileWithoutMnemonico(event) {
      this.fileWithoutMnemonico = event.target.files[0];
    }
  }
})

</script>