<template>
  <div class="sidebar">
    <h3>
      <img
        src="../assets/Logo/logo2.png"
        alt=""
        style="width: 30%; padding-left: 15px"
      />
      QUẢN LÝ
    </h3>
    <div>
      <ul>
        <li>
          <router-link class="nav-link" to="/admin/adminusers"
            ><i class="bi bi-people"></i>Quản lý tài khoản</router-link
          >
        </li>
        <!-- <li>
          <router-link class="nav-link" to="/admin/adminstaff">
            <i class="bi bi-person-gear"></i>Quản lý nhân viên</router-link
          >
        </li> -->
        <li>
          <router-link class="nav-link" to="/admin/adminproducts">
            <i class="bi bi-database-fill"></i>
            Quản lý sản phẩm
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/admin/adminorder">
            <div class="order">
              <i class="bi bi-basket"></i>Quản lý đơn hàng
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/admin/adminstatistical"
            ><i class="bi bi-clipboard2-data"></i>Quản lý thống kê</router-link
          >
        </li>
        <li>
          <button
            class="nav-link"
            @click="logout"
            v-if="userData"
            style="padding: 10px 35px 10px"
          >
            <i class="bi bi-box-arrow-right"></i>Thoát
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      userData: {},
    };
  },
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
.sidebar {
  /* padding-left: 30px;
  padding-right: 30px; */
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 20px;
  border: 1px solid #c9c9c9;
}

.sidebar h2 {
  color: #000;
  padding-left: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li a {
  padding: 10px 35px 10px;
}
.sidebar ul li i {
  padding-right: 10px;
  font-size: 20px;
}
.sidebar ul li a {
  color: #000;
  text-decoration: none;
}

.sidebar ul li:hover {
  background-color: #ffd600;
}
</style>