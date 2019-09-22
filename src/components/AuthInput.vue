<template>
  <input
    class="input"
    :value="value"
    :class="{
      success:status==='success',
      error:status==='error'
  }"
    :placeholder="placeholder"
    :rule="rule"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      status: ""
    };
  },
  props: ["placeholder", "rule", "name","value", "err_message","password"],
  methods: {
    handleInput(event) {
      const { value } = event.target;
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
      this.$emit("input", event.target.value);
    },
    handleChange() {
      if (this.err_message && this.status === "error") {
          this.$toast.fail(this.err_message)
      }
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38/360 * 100vw;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #666;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>