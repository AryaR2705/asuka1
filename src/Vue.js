<template>
  <div>
    <h1>Chatbot Response</h1>
    <pre v-if="response">{{ JSON.stringify(response, null, 2) }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const data = { inputs: 'The answer to the universe is' };
        const result = await query(data);
        this.response = result;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
