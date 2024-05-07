<template>
  <div>
    <div class="container-fluid" id="container">
      <div class="row">
        <!-- SIDE BAR -->
        <div class="col-sm-2 d-none d-sm-flex" style="padding: 15px">
          <div class="sidebar-manager">
            <SideBar />
          </div>
        </div>

        <div class="col-12 col-sm-10" style="padding: 15px">
          <div class="container-fluid" id="container">
            <!-- USER MANAGER -->
            <div class="users-manager">
              <!-- QUAN LY TAI KHOAN -->
              <div class="row" style="margin: 0 0 20px 0px">
                <div class="col-6 text-left">
                  <h5>QUẢN LÝ TÀI KHOẢN</h5>
                </div>
                <!-- BUTTON THEM TAI KHOAN -->
                <!-- <div class="col-6 text-right">
                  <b-button
                    id="show-btn"
                    @click="showModalUsers"
                    v-if="selectedTable === 'User'"
                    >Thêm tài khoản</b-button
                  >
                </div> -->
              </div>

              <!-- MODAL -->
              <!-- MODAL THEM TAI KHOAN -->
              <!-- <b-modal
                ref="my-modal-users"
                hide-footer
                title="Thêm mới tài khoản"
              >
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitUsers">
                    <div class="mb-3">
                      <label for="userName" class="form-label"
                        >Tên nguời dùng:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="brandName"
                        v-model="dataCreateUsers.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="UserPhoneNumber" class="form-label"
                        >Số điện thoại:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="UserPhoneNumber"
                        v-model="dataCreateUsers.phone"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="emailUser" class="form-label">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailUser"
                        v-model="dataCreateUsers.email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Mật khẩu:</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="dataCreateUsers.password"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="userImage" class="form-label"
                        >Hình ảnh:</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="userImage"
                        @change="handleImageUserUpload"
                        accept="image/*"
                      />
                      <div v-if="imageUrl">
                        <img :src="imageUrl" alt="Ảnh người dùng" />
                      </div>
                    </div>
                    <!-- <div class="mb-3">
                      <label for="status" class="form-label">Trạng thái:</label>
                      <input type="checkbox" id="status" v-model="dataCreateUsers.status" />
                      <label for="status">Hoạt động</label>
                    </div> 

                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalSubmitUsers"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal> 
              <!-- MODAL SUA TAI KHOAN -->
              <!-- <b-modal
                ref="my-modal-update-users"
                hide-footer
                title="Thêm mới tài khoản"
              >
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitUpdateUsers">
                    <div class="mb-3">
                      <label for="userName" class="form-label"
                        >Tên nguời dùng:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="brandName"
                        v-model="dataUpdateUsers.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="UserPhoneNumber" class="form-label"
                        >Số điện thoại:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="UserPhoneNumber"
                        v-model="dataUpdateUsers.phone"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="emailUser" class="form-label">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailUser"
                        v-model="dataUpdateUsers.email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Mật khẩu:</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="dataUpdateUsers.password"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="userImage" class="form-label"
                        >Hình ảnh:</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="userImage"
                        @change="handleImageUserUploadUpdate"
                        accept="image/*"
                      />
                      <div v-if="imageUrl">
                        <img :src="imageUrl" alt="Ảnh người dùng" />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="status" class="form-label">Trạng thái:</label>
                      <input
                        type="checkbox"
                        id="status"
                        v-model="dataCreateUsers.status"
                      />
                      <label for="status">Hoạt động</label>
                    </div>

                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalUpdateUsers"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal> -->
              <!-- TABLE USERS -->
              <table class="table" v-if="selectedTable === 'User'">
                <thead>
                  <tr style="background-color: #e0e0e0">
                    <th scope="col">Tên người dùng</th>
                    <th scope="col">Số Điện Thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mật khẩu</th>
                    <!-- <th scope="col">Hình ảnh</th> -->
                    <!-- <th scope="col">Trạng thái</th> -->
                    <!-- <th scope="col">Tác vụ</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listUser" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.password }}</td>
                    <!-- <td>
                      <img
                        :src="'http://localhost:3838/' + item.image"
                        alt=""
                        style="width: 50px; height: 70px"
                      />
                    </td> -->
                    <!-- <td>
                      {{
                        item.status === true ? "Hoạt động" : "Dừng hoạt động"
                      }}
                    </td> -->
                    <!-- <td>
                      <i
                        @click="showModalUpdateUser(item)"
                        class="bi bi-pencil-square"
                      ></i>
                      <i @click="deleteUser(item)" class="bi bi-trash"></i>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
export default {
  name: "users",
  components: {
    SideBar,
  },
  data() {
    return {
      imageUrl: "",
      selectedTable: "User",
      // showModalUsers: false,
      // hideModalSubmitUsers: false,

      // Data hiển thị trên Table
      listUser: {
        name: "",
        phone: "",
        email: "",
        password: "",
        image: "",
        // status: "",
      },

      // Data khi thêm mới
      // dataCreateUsers: {
      //   name: "",
      //   phone: "",
      //   email: "",
      //   password: "",
      //   image: "",
      // status: "",
      // },
      //Data khi update
      // dataUpdateUsers: {
      //   name: "",
      //   phone: "",
      //   email: "",
      //   password: "",
      //   image: "",
      // status: "",
      //},
    };
  },

  created() {
    this.getAllUser();
  },
  methods: {
    //Them moi user
    // showModalUsers() {
    //   this.$refs["my-modal-users"].show();
    // },
    // hideModalSubmitUsers() {
    //   this.$refs["my-modal-users"].hide();
    //   this.dataCreateUsers = {
    //     name: "",
    //     phone: "",
    //     email: "",
    //     password: "",
    //     image: "",
    //     // status: "",
    //   };
    // },
    // handleSubmitUsers() {
    //   console.log("Check create users", this.dataCreateUsers);
    //   const formData = new FormData();
    //   formData.append("name", this.dataCreateUsers.name);
    //   formData.append("phone", this.dataCreateUsers.phone);
    //   formData.append("email", this.dataCreateUsers.email);
    //   formData.append("password", this.dataCreateUsers.password);
    //   formData.append("image", this.dataCreateUsers.image); // Thêm tệp hình ảnh vào FormData
    //   // formData.append("status", this.dataCreateUsers.status);
    //   // Xử lý khi người dùng submit
    //   axios
    //     .post("http://localhost:3838/users ", formData)
    //     .then((res) => {
    //       if (res.data.status === 200) {
    //         console.log("Thêm thành công !", res.data);
    //         // Thêm thông báo thành công
    //         this.$swal.fire({
    //           position: "center",
    //           icon: "success",
    //           title: "Thêm user thành công",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });

    //         this.getAllUser();
    //       } else {
    //         // Thêm thông báo lỗi
    //         console.log("Thêm thất bại", res.data.message[0].message);
    //         this.$swal.fire({
    //           position: "center",
    //           icon: "error",
    //           title: res.data.message[0].message,
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   this.hideModalSubmitUsers();
    // },
    handleImageUserUpload(event) {
      const file = event.target.files[0];
      this.dataCreateUsers.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },

    // //UPDATE
    // showModalUpdateUsers() {
    //   this.$refs["my-modal-update-users"].show();
    // },
    // hideModalUpdateUsers() {
    //   this.$refs["my-modal-update-users"].hide();
    //   this.dataCreateUsers = {
    //     name: "",
    //     phone: "",
    //     email: "",
    //     password: "",
    //     image: "",
    //     // status: "",
    //   };
    // },
    // handleUpdateUsers() {
    //   console.log("Check update users", this.dataUpdateUsers);
    //   const formData = new FormData();
    //   formData.append("name", this.dataUpdateUsers.name);
    //   formData.append("phone", this.dataUpdateUsers.phone);
    //   formData.append("email", this.dataUpdateUsers.email);
    //   formData.append("password", this.dataUpdateUsers.password);
    //   formData.append("image", this.dataUpdateUsers.image); // Thêm tệp hình ảnh vào FormData
    //   // formData.append("status", this.dataCreateUsers.status);
    //   // Xử lý khi người dùng submit
    //   axios
    //     .post("http://localhost:3838/users ", formData)
    //     .then((res) => {
    //       if (res.data.status === 200) {
    //         console.log("Sửa thành công !", res.data);
    //         // Thêm thông báo thành công
    //         this.$swal.fire({
    //           position: "center",
    //           icon: "success",
    //           title: "Sửa user thành công",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });

    //         this.getAllUser();
    //       } else {
    //         // Thêm thông báo lỗi
    //         console.log("Sửa thất bại", res.data.message[0].message);
    //         this.$swal.fire({
    //           position: "center",
    //           icon: "error",
    //           title: res.data.message[0].message,
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   this.hideModalUpdateUsers();
    // },
    // handleImageUserUploadUpdate(event) {
    //   const file = event.target.files[0];
    //   this.dataUpdateUsers.image = file;
    //   this.imageUrl = URL.createObjectURL(file);
    // },
    getAllUser() {
      axios
        .get("http://localhost:3838/users")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.listUser = res.data.data; //Gan data vao optionSize
            console.log("Thành công lấy user", res);
            // this.optionsUser = res.data.data; //Gan data vao optionSize
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.product-manager h5 {
  padding-top: 5px;
}

.active {
  background-color: #6c757d;
  border-radius: 5px;
  color: #fff;
}

.navbar {
  padding: 0 15px;
  background-color: #ffd600;
}

tbody i {
  margin-left: 10px;
  font-size: 30px;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  margin: 20px auto;
}

h2 {
  padding-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table tr:hover {
  background-color: #ddd;
}

.bi-pencil-square {
  color: green;
}

.bi-trash {
  color: red;
}

.bi-pencil-square,
.bi-trash {
  border: 1px solid #a1a1a1;
  padding: 0 5px;
  border-radius: 10px;
  background-color: #ddd;
}
</style>
