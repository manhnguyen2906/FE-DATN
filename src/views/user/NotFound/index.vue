<template>
  <div class="center-container">
    <h1 class="text">BẠN KHÔNG CÓ QUYỀN TRUY CẬP !!!</h1>
    <button @click="logout" class="btn-login">
      <i class="bi bi-arrow-left-circle-fill" style="padding-right: 10px"></i>
      Trở về trang đăng nhập
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
    };
  },
  name: "errPage",
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  },

  methods: {
    logout() {
      localStorage.removeItem("userData"); // Xóa token khỏi local storage
      this.$router.push("/login"); // Chuyển hướng đến trang đăng nhập
    },
  },
};
</script>

<style scoped>
.text {
  text-align: center;
  padding: 50px 0;
}
.btn-login {
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 20px;
  background-color: #fcd603;
}
.btn-login:hover {
  background-color: #b99e00;
}
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>>
