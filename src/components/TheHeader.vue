<template>
  <div class="container-fluid">
    <div class="header-top">
      <div class="container-fluid">
        <div class="row text-right">
          <div class="col-12" style="padding: 10px 20px">
            <b>👑 KING AND QUEEN ~ <i class="bi bi-telephone-fill"></i> </b>
            Hotline: <b>0356422999</b>
          </div>
        </div>
      </div>
    </div>
    <!-- header -->
    <div class="row">
      <nav
        class="navbar navbar-expand-md navbar-light bg-light sticky-top"
        role="tablist"
      >
        <div class="col-3">
          <div class="collapse navbar-collapse" id="navbarReponsive">
            <router-link to="/">
              <img src="../assets/Logo/logo.png" alt="LOGO" width="70%" />
            </router-link>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-center">
          <div class="collapse navbar-collapse float-left" id="navbarReponsive">
            <ul
              class="navbar-nav ml-auto justify-content-center mr-auto"
              role="tablist"
            >
              <li class="nav-item item">
                <router-link class="nav-link element" to="/about"
                  >GIỚI THIỆU</router-link
                >
              </li>
              <li class="nav-item item">
                <router-link class="nav-link" to="/nike">NIKE</router-link>
              </li>
              <li class="nav-item item">
                <router-link class="nav-link" to="/adidas">ADIDAS</router-link>
              </li>
              <li class="nav-item item">
                <router-link class="nav-link" to="/jordan">JORDAN</router-link>
              </li>
              <li class="nav-item item">
                <router-link class="nav-link" to="/yeezy">YEZZY</router-link>
              </li>
              <li class="nav-item item">
                <router-link class="nav-link" to="/spa">SPA GIÀY</router-link>
              </li>
              <li class="nav-item item">
                <router-link class="nav-link" to="/contact"
                  >LIÊN HỆ</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-3">
          <div class="collapse navbar-collapse" id="navbarReponsive">
            <ul class="navbar-nav ml-auto" role="tablist" style="float: center">
              <li class="nav-item">
                <div class="search col-md-3">
                  <b-nav-form @submit.stop.prevent>
                    <div class="search-container">
                      <b-form-input
                        size="sm"
                        class="mr-sm-2 search-input"
                        placeholder="Bạn muốn tìm gì ... ?"
                        v-model="search"
                      ></b-form-input>
                      <b-button
                        size="sm"
                        class="my-2 my-sm-0 search-button"
                        type="submit"
                        @click="searchProduct()"
                        ><i class="bi bi-search"></i>
                      </b-button>
                    </div>
                  </b-nav-form>
                </div>
              </li>
              <li class="nav-item">
                <div class="dropdown">
                  <button class="dropbtn">
                    <i v-if="!userData" class="bi bi-person"></i>
                    <span
                      v-if="userData"
                      style="
                        font-size: 15px;
                        width: 50px;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >Hi, {{ userData.name }}
                    </span>
                  </button>
                  <div class="dropdown-content">
                    <div class="login">
                      <router-link
                        class="nav-link"
                        to="/login"
                        v-if="!userData"
                      >
                        Đăng nhập
                      </router-link>
                    </div>
                    <div class="profile">
                      <router-link
                        class="nav-link"
                        to="/profile"
                        v-if="userData"
                        style="padding-left: 13px"
                      >
                        Thông tin
                      </router-link>
                    </div>
                    <div class="logout">
                      <button
                        @click="logout"
                        class="btn btn-logout"
                        v-if="userData"
                      >
                        <b>Đăng xuất</b>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-item-cart">
                  <router-link to="/cart">
                    <i class="bi bi-cart" style="position: relative"></i>
                    <span class="nav-item-cart-quantity">{{
                      numberProduct ? numberProduct : 0
                    }}</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "the-header",
  props: {
    msg: String,
  },
  data() {
    return {
      userData: {},
      numberProduct: 0,
      listProductSearch: [],
      user_id: "",
      listProduct: {
        name: "",
        description: "",
        status: "",
        image: "", // Lưu trữ đường dẫn của hình ảnh
        price: "",
        brand_id: "",
        size_id: "",
        product_type: "",
        numberInStock: "",
      },
      // search
      search: "",
      // listProductSearch: [],
      // message: "",
    };
  },
  computed: {
    ...mapGetters(["getSearch"]),
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user && user._id) {
      this.user_id = user._id;
    }
    this.getAllCart();
  },
  methods: {
    logout() {
      localStorage.removeItem("userData"); // Xóa token khỏi local storage
      this.$router.push("/login"); // Chuyển hướng đến trang đăng nhập
    },
    getAllCart() {
      axios
        .get(`http://localhost:3838/carts?user_id=${this.user_id}`)
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.dataCart = res.data.data;
            console.log("dataCart: ", this.dataCart[0]);
            // this.dataCart.forEach((cart) => {
            this.numberProduct = this.dataCart[0].product.length;
            // });
            console.log("this.numberProduct", this.numberProduct);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchProduct() {
      // console.log(" SEARCH  !!!", this.search);
      // this.$store.dispatch("setSearch", this.search);
      if (this.$route.path !== "/search") {
        this.$router.push({
          path: "/search",
        });
        this.$store.dispatch("setSearch", this.search);
      } else {
        this.$store.dispatch("setSearch", this.search);
      }
    },
  },
};
</script>

<style scoped>
.header-top {
  text-decoration: none;
}

.header {
  background-color: #f0f0f0 !important;
  box-shadow: 0 6px 6px -6px rgb(0 0 0 / 50%);
}

.header #search-addon {
  border: none;
}

.nav-item {
  padding: 0 15px;
}

.nav-item.item:hover {
  border-radius: 40px;
  background-color: #fcd603;
}

.nav-link:active {
  color: #bf1919;
}

.card,
.user {
  align-items: center;
}

.bi-person,
.bi-cart {
  font-size: 25px;
  font-weight: bold;
}

.navbar-collapse ul {
  align-items: center;
}

a {
  font-weight: bold;
  color: black !important;
}

label {
  font-weight: bold;
}

.navbar-collapse li a {
  position: relative;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  /* background-color: #3498db; */
  background-color: #f8f9fa;
  color: #000;
  /* padding: 12px; */
  font-size: 10px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 110px;
  /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: rgb(129, 129, 129) 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.nav-item-cart-quantity {
  position: absolute;
  background-color: #fcd603;
  padding: 0 7px;
  border-radius: 20px;
  left: 13px;
}
.dropdown-content {
  background-color: #fcd603;
}
.profile:hover,
.logout:hover {
  background-color: #756400;
}
.logout {
  padding: 5px 0;
}
.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  border-radius: 20px;
  padding: 20px 15px;
  background-color: #e7e7e7;
}

.search-button {
  border-radius: 20px; /* Điều chỉnh độ cong của góc phải */
  margin-left: -43px;
  border: 0;
  background-color: #e7e7e7;
}
.search-button i {
  color: #000;
}
</style>
