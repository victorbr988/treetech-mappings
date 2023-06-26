<template>
  <main class="flex bg-gray-100">
    <Sidebar />
    <section class="p-20">
      <h1 class="text-3xl">Treetech mapa - DNP</h1>
      <section class="flex sm:flex flex-col justify-between items-center">
        <section class="flex w-[90%] p-10">
          <Form @showFileGenerated="showFileGenerated" @downloadFile="downloadFile" />
        </section>

        <p class="mt-3 text-lg">
          Aqui você consgue preencher seu mapa DNP com o Mnemônico de outro arquivo CSV,
          útil caso esteja realizando um re-mapeamento ou o mesmo mapa mas com protocolo diferente.
          Validar os campos 16_M e 16_U da planilha gerada
        </p>
      </section>

      <section class="border-[1px] border-gray-600 p-4 mt-3 rounded">
        <span v-if="!fileGenerated.filename">Nenhum arquivo gerado :(</span>
        
        <button
          v-if="fileGenerated.filename"
          @click="downloadFile"
          class="pointer justify-center flex"
        >
          {{ fileGenerated.filename }}
      </button>
      </section>
    </section>
  </main>
</template>

<script>
  import { defineComponent } from "vue"
  import Sidebar from "./components/Sidebar.vue"
  import Form from "./components/Form.vue"

  export default defineComponent({
    name: "App",
    components: {
      Sidebar,
      Form
    },
    data() {
      return {
        fileGenerated: {},
      }
    },
    methods: {
      showFileGenerated(file) {
        this.fileGenerated = file
      },
      downloadFile() {
        const csvContent = this.fileGenerated.content;
        const csvFileName = this.fileGenerated.filename;

        // Crie um objeto Blob com o conteúdo do arquivo CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });

        // Crie um URL temporário para o Blob
        const url = window.URL.createObjectURL(blob);

        // Crie um elemento de link de download
        const link = document.createElement('a');
        link.href = url;
        link.download = csvFileName;

        // Simule o clique no link para iniciar o download
        link.click();

        // Libere o URL temporário do Blob
        window.URL.revokeObjectURL(url);
        this.fileGenerated = {}
      }
    }
  })
</script>
