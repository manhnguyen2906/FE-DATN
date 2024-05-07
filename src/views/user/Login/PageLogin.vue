<template>
  <!-- <div>
    <div><TheHeader /></div> -->

  <div>
    <div>
      <div class="container" id="container">
        <div class="form-container sign-up">
          <form>
            <h1>Tạo Tài Khoản</h1>
            <div class="social-icons">
              <a href="#" class="icon"><i class="bi bi-google"></i></a>
              <a href="#" class="icon"><i class="bi bi-facebook"></i></a>
              <a href="#" class="icon"><i class="bi bi-twitter"></i></a>
            </div>
            <span>hoặc đăng ký tài khoản với email của bạn</span>
            <input type="text" v-model="user.name" placeholder="Name" />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
            <input type="email" v-model="user.email" placeholder="Email" />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
            <input
              type="text"
              v-model="user.phone"
              placeholder="Số điện thoại"
            />
            <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
            <input
              type="password"
              v-model="user.password"
              placeholder="Password"
            />
            <span v-if="errors.password" class="error">{{
              errors.password
            }}</span>
            <button @click="signup">Đăng Ký</button>
            <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
          </form>
        </div>
        <div class="form-container sign-in">
          <form>
            <h1>Đăng Nhập</h1>
            <div class="social-icons">
              <a href="#" class="icon"><i class="bi bi-google"></i></a>
              <a href="#" class="icon"><i class="bi bi-facebook"></i></a>
              <a href="#" class="icon"><i class="bi bi-twitter"></i></a>
            </div>
            <span>hoặc sử dụng email và mật khẩu của bạn</span>
            <input type="email" v-model="userLogin.email" placeholder="Email" />
            <span v-if="errorsLogIn.email" class="error">{{
              errorsLogIn.email
            }}</span>
            <input
              type="password"
              v-model="userLogin.password"
              placeholder="Password"
            />
            <span v-if="errorsLogIn.password" class="error">{{
              errorsLogIn.password
            }}</span>
            <a href="">Bạn quên mật khẩu ?</a>
            <button @click.prevent="login">Đăng Nhập</button>
            <span v-if="errorMessageLogin" class="error">{{
              errorMessageLogin
            }}</span>
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h1>Mừng Trở Lại!</h1>
              <p>
                Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng
                của trang web !
              </p>
              <button class="hidden" id="login">Đăng Nhập</button>
            </div>
            <div class="toggle-panel toggle-right">
              <h1>Xin chào !</h1>
              <p>
                Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính
                năng của trang web
              </p>
              <button @click="changeSwitch" class="hidden" id="register">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
        
  <script>
import axios from "axios";
// import router from "@/router";
export default {
  name: "PageLogin",
  props: {
    msg: String,
  },
  data() {
    return {
      user: {
        name: "",
        phone: "",
        email: "",
        role: "user",
        password: "",
      },
      userLogin: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
        phone: "",
        name: "",
      },
      errorsLogIn: {
        email: "",
        password: "",
        // phone: "",
        // name: "",
      },
      errorMessage: "",
      errorMessageLogin: "",
      // data: "",
    };
  },

  methods: {
    isValidEmail(email) {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isValidPhone(phone) {
      const phoneRegex = /^[0-9]{10}$/; // 10 số
      return phoneRegex.test(phone);
    },
    signup(e) {
      e.preventDefault(); // Ngan form tu submit

      // Reset errors and errorMessage
      this.errors.name = "";
      this.errors.email = "";
      this.errors.phone = "";
      this.errors.password = "";
      this.errorMessage = "";

      //Validate name
      if (!this.user.name) {
        this.errors.name = "Vui lòng nhập họ tên của bạn !";
      }

      // Validate email
      if (!this.user.email) {
        this.errors.email = "Vui lòng nhập email !";
      } else if (!this.isValidEmail(this.user.email)) {
        this.errors.email = "Email không hợp lệ !";
      }

      //Validate phone
      if (!this.user.phone) {
        this.errors.phone = "Vui lòng nhập số điện thoại !";
      } else if (!this.isValidPhone(this.user.phone)) {
        this.errors.phone = "Số điện thoại không hợp lệ !";
      }

      // Validate password
      if (!this.user.password) {
        this.errors.password = "Vui lòng nhập mật khẩu !";
      } else if (this.user.password.length < 6) {
        this.errors.password = "Mật khẩu phải có ít nhất 6 ký tự !";
      }

      // If no errors, proceed to login
      if (
        !this.errors.name &&
        !this.errors.email &&
        !this.errors.phone &&
        !this.errors.password
      ) {
        console.log("Đây là thông tin người dùng đăng ký", this.user);
        axios
          .post("http://localhost:3838/signup", this.user)
          .then((res) => {
            console.log("thanh cong", res);
            if (res.data.status === 200) {
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: "Đăng ký tài khoản thành công",
                showConfirmButton: false,
                timer: 1500,
              });
              // window.location.reload();
            } else {
              this.errorMessage = res.data.message ? res.data.message : "";
              this.user.email = "";
              this.user.password = "";
              this.user.phone = "";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    login(e) {
      e.preventDefault(); // Ngan form tu submit

      // Reset errors and errorMessage
      this.errorsLogIn.email = "";
      this.errorsLogIn.password = "";
      this.errorMessageLogin = "";

      // Validate email
      if (!this.userLogin.email) {
        this.errorsLogIn.email = "Vui lòng nhập email !";
      } else if (!this.isValidEmail(this.userLogin.email)) {
        this.errorsLogIn.email = "Email không hợp lệ !";
        this.userLogin.email = "";
      }

      // Validate password
      if (!this.userLogin.password) {
        this.errorsLogIn.password = "Vui lòng nhập mật khẩu !";
        this.userLogin.password = "";
      } else if (this.userLogin.password.length < 6) {
        this.errorsLogIn.password = "Mật khẩu phải có ít nhất 6 ký tự !";
        this.userLogin.password = "";
      }

      // If no errors, proceed to login
      if (!this.errorsLogIn.email && !this.errorsLogIn.password) {
        console.log("Đây là thông tin người dùng đăng nhập", this.userLogin);
        axios
          .post("http://localhost:3838/login", this.userLogin)
          .then((res) => {
            console.log("thanh cong", res);
            if (res.data.status === 200 && res.data.data.user) {
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: "Đăng nhập thành công",
                showConfirmButton: false,
                timer: 1500,
              });
              localStorage.setItem(
                "userData",
                JSON.stringify(res.data.data.user)
              );
              if (res.data.data.user.role === "administrator") {
                console.log("Chạy 1");
                this.$router.push({ name: "products" });
              } else {
                this.$router.push({ name: "home" });
                console.log("Chạy 2");
              }
            } else {
              this.errorMessageLogin = res.data.message ? res.data.message : "";
              this.userLogin.email = "";
              this.userLogin.password = "";
            }
          })
          .catch((err) => {
            console.log(err);
            // Kiểm tra nếu lỗi là do tài khoản không chính xác
            // if (err.response && err.response.status === 401) {

            // }
          });
      }
    },

    changeSwitch() {
      const container = document.getElementById("container");
      const registerBtn = document.getElementById("register");
      const loginBtn = document.getElementById("login");

      registerBtn.addEventListener("click", () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
      });
    },
  },
};
</script>
        
<style scoped>
* {
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: #c9d6ff;
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 580px;
  margin-top: 10%;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container a i {
  color: #333;
  font-size: 20px;
  /* text-decoration: none;
  margin: 15px 0 10px; */
}
.container button {
  background-color: #ffd600;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons {
  margin: 20px 0;
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  background-color: #ffd600;
  height: 100%;
  background: linear-gradient(to right, #b09301, #ffd600);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>