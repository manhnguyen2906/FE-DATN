<template>
  <div>
    <div><TheHeader /></div>

    <div class="container" style="padding: 30px 0">
      <div class="row">
        <div class="col-4">
          <h5>THÔNG TIN TÀI KHOẢN</h5>
          <div class="row">
            <div class="col-4">
              <div class="name">
                <h6>Họ tên:</h6>
              </div>
              <div class="email:">
                <h6>Email:</h6>
              </div>
              <div class="phone">
                <h6>Số điện thoại:</h6>
              </div>
            </div>
            <div class="col-8" v-if="userData">
              <div class="name">
                <h6>{{ userData.name }}</h6>
              </div>
              <div class="email:">
                <h6>{{ userData.email }}</h6>
              </div>
              <div class="phone">
                <h6>{{ userData.phone }}</h6>
              </div>
            </div>
          </div>
          <div class="change-profile">
                  <b-button
                    id="show-btn"
                    @click="showModalUpdateUser()"
                    >Cập nhật thông tin tài khoản</b-button
                  >

           <b-modal
                ref="my-modal-update-users"
                hide-footer
                title="Cập nhật thông tin tài khoản"
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
                        v-model="userData.name"
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
                        v-model="userData.phone"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="emailUser" class="form-label">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailUser"
                        v-model="userData.email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Mật khẩu:</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="userData.password"
                        required
                      />
                    </div>
                    <!-- <div class="mb-3">
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
                    </div> -->

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
              </b-modal>
          </div>
        </div>
        <div class="col-8" style="border-left: 1px solid #acacac">
          <h5>LỊCH SỬ ĐẶT HÀNG</h5>
          <div class="container-fluid">
            <table class="table" v-if="selectedTable === 'Order'">
              <thead>
                <tr style="background-color: #e0e0e0">
                  <th scope="col">Ngày tạo</th>
                  <th scope="col" style="width: 9%">Tên người nhận</th>
                  <th scope="col" style="width: 9%">Số điện thoại</th>
                  <!-- <th scope="col">Email</th> -->
                  <th scope="col" style="width: 10%">Địa chỉ</th>
                  <th scope="col" style="width: 10%">Tổng tiền</th>
                  <th scope="col" style="width: 7%">Phương thức thanh toán</th>
                  <th scope="col" style="width: 7%">Trạng thái thanh toán</th>
                  <th scope="col" style="width: 7%">Trạng thái đơn hàng</th>
                  <th scope="col" style="width: 7%">Ghi chú</th>
                  <th scope="col">Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listOrder" :key="item.id">
                  <td>{{ getDate(item.createdAt) }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phone }}</td>
                  <!-- <td>{{ item.email }}</td> -->
                  <td>
                    {{
                      item.address +
                      ", " +
                      item.ward +
                      ", " +
                      item.district +
                      ", " +
                      item.province
                    }}
                  </td>
                  <td>{{ formatPrice(item.totalPrice) }}</td>
                  <td>{{ item.typePay }}</td>
                  <td>
                    {{
                      item.statusPay === "0"
                        ? "Thanh toán khi nhận hàng"
                        : "Đã thanh toán"
                    }}
                  </td>

                  <td>
                    {{
                      item.statusOder === "0"
                        ? "Chờ xác nhận"
                        : item.statusOder === "1"
                        ? "Xác nhận"
                        : item.statusOder === "2"
                        ? "Đang giao hàng"
                        : item.statusOder === "3"
                        ? "Giao hàng thành công"
                        : item.statusOder === "4"
                        ? "Giao hàng thất bại"
                        : item.statusOder === "5"
                        ? "Đơn đã hủy"
                        : ""
                    }}
                  </td>
                  <td>{{ item.note }}</td>
                  <td>
                    <i @click="showModalOrderDetail(item)" class="bi bi-eye-fill"></i>
                    <i class="bi bi-pencil-square" @click="updateOder(item)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Modal xem chi tiet don hang -->
          <b-modal
          ref="my-modal-order-detail"
          id="modal-xl"
          size="xl"
          centered
          hide-footer
          title="Chi tiết đơn đặt hàng"
        >
          <div class="modal-body">
            <form @submit.prevent="">
              <div class="mb-3 order-detail">
                <div class="row">
                  <div class="col-4">
                    <b>Ngày tạo: </b>{{ getDate(dataDetailOrder.createdAt) }}
                  </div>
                  <div class="col-4">
                    <b>Trạng thái thanh toán: </b>
                    {{
                      dataDetailOrder.statusPay === "0"
                        ? "Thanh toán khi nhận hàng"
                        : "Đã thanh toán"
                    }}
                  </div>
                  <div class="col-4">
                    <b>Trạng thái vận chuyển:</b>
                    {{
                      dataDetailOrder.statusOder === "0"
                        ? "Chờ xác nhận"
                        : dataDetailOrder.statusOder === "1"
                        ? "Xác nhận"
                        : dataDetailOrder.statusOder === "2"
                        ? "Đang giao hàng"
                        : dataDetailOrder.statusOder === "3"
                        ? "Giao hàng thành công"
                        : dataDetailOrder.statusOder === "4"
                        ? "Giao hàng thất bại"
                        : dataDetailOrder.statusOder === "5"
                        ? "Đơn đã hủy"
                        : ""
                    }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <b>Thông tin giao hàng:</b>
                    <div class="information">
                      <p><b>- Tên người nhận: </b>{{ dataDetailOrder.name }}</p>
                      <p><b>- Số điện thoại: </b>{{ dataDetailOrder.phone }}</p>
                      <p>
                        <b>- Địa chỉ: </b
                        >{{
                          dataDetailOrder.address +
                          ", " +
                          dataDetailOrder.ward +
                          ", " +
                          dataDetailOrder.district +
                          ", " +
                          dataDetailOrder.province
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <b>Phương thức thanh toán: </b>
                    <div class="typePay">
                      {{ dataDetailOrder.typePay }}
                    </div>
                  </div>
                  <div class="col-4">
                    <b>Ghi chú: </b>
                    <div class="note" v-if="dataDetailOrder.note">
                      {{ dataDetailOrder.note }}
                    </div>
                    <div class="note" v-if="!dataDetailOrder.note">
                      Không có ghi chú !!!
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="totalPrice text-right">
                <p>
                <h5>TỔNG TIỀN: <b style="color:Red">{{ formatPrice(dataDetailOrder.totalPrice)  }}</b></h5>

                </p>
                
              </div>
              <div class="product-detail">
                <div class="row">
                  <div class="col-12">
                    <table class="table">
                      <thead>
                        <tr style="background-color: #e0e0e0">
                          <th scope="col" style="width: 10%">Hình ảnh</th>
                          <th scope="col">Thông tin sản phẩm</th>
                          <th scope="col">Đơn giá</th>
                          <th scope="col"style="width: 5%">Số lượng</th>
                          <!-- <th scope="col">Tổng tiền</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item2 in dataDetailOrder.product">
                          <td>
                            <img
                              :src="
                                'http://localhost:3838/' +
                                item2.product_id.image
                              "
                              alt=""
                              style="width: 100%; height: 100%"
                            />
                          </td>
                          <td>
                            Tên sản phẩm: {{ item2.product_id.name }} <br>
                            Size: {{ item2.product_id.size_id }}
                          </td>
                          <td>
                            <p
                              v-if="
                                item2.product_id.sellingPrice &&
                                item2.product_id.price
                              "
                            >
                              {{
                                formatPrice(
                                  calculateCurrentPrice(
                                    item2.product_id.price,
                                    item2.product_id.sellingPrice
                                  )
                                )
                              }}
                            </p>
                            <p
                              v-if="
                                !item2.product_id.sellingPrice &&
                                item2.product_id.price
                              "
                            >
                              {{
                                formatPrice(
                                  calculateCurrentPrice(
                                    item2.product_id.price,
                                    0
                                  )
                                )
                              }}
                            </p>
                          </td>
                          <!-- <td>{{ item2.product_id.size_id ? item2.product_id.size_id.name : "" }}</td> -->
                          <td>{{ item2.quantity }}</td>
                          <!-- <td rowspan="5">{{ dataDetailOrder.totalPrice }}</td> -->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </b-modal>
        </div>
      </div>
    </div>

    <div><TheFooter /></div>
  </div>
</template>
        
  <script>
import TheHeader from "../../../components/TheHeader.vue";
import TheFooter from "../../../components/TheFooter.vue";
import axios from "axios";
import moment from "moment";
export default {
  name: "Profile",
  props: {
    msg: String,
  },
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      userData: {},
      selectedTable: "Order",
      listOrder: [],
      dataDetailOrder: {
        user_id: "",
        product_data: [],
        name: "",
        email: "",
        address: "",
        ward: "",
        district: "",
        province: "",
        phone: "",
        totalPrice: "",
        note: "",
        typePay: "COD",
        statusPay: "",
        statusOder: "0",
      },

      dataProductDetail: {},
      dataUpdateUsers: [],
    };
  },
  created() {
    this.getAllSize();
    this.getAllUser();
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.getAllOrder();
  },
  methods: {
    showModalOrderDetail(item) {
      console.log(item);
      this.dataDetailOrder = item;
      this.$refs["my-modal-order-detail"].show();
      this.imageUrl = "http://localhost:3838/" + item.image;
    },

    hideModalOrderDetail() {
      this.$refs["my-modal-order-detail"].hide();
    },
    showModalUpdateUser() {
      this.dataUpdateUsers = this.userData;
      this.$refs["my-modal-update-users"].show();
    },
    hideModalUpdateUsers() {
      this.$refs["my-modal-update-users"].hide();
    },
    handleSubmitUpdateUsers() {
      axios
        .put(
          `http://localhost:3838/users/${this.dataUpdateUsers._id}`,
          this.dataUpdateUsers
        )
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Cập nhật thành công !", res.data);
            // Thêm thông báo thành công
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Sửa user thành công",
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllUser();
          } else {
            // Thêm thông báo lỗi
            console.log("Sửa thất bại", res.data.message);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModalUpdateUsers();
    },
    getAllUser() {
      axios
        .get("http://localhost:3838/users")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.listUser = res.data.data; //Gan data vao optionSize`
            console.log("Thành công lấy user", res);
            // this.optionsUser = res.data.data; //Gan data vao optionSize
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllSize() {
      axios
        .get("http://localhost:3838/sizes")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.listSize = res.data.data;
          }

          console.log("Thành công lấy size", this.listSize);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllOrder() {
      axios
        .get(`http://localhost:3838/oders/${this.userData._id}`)
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.listOrder = res.data.data;
            console.log("Thành công !!!", this.listOrder);
            this.listOrder.forEach((element) => {
              // console.log(element);
              element.product.forEach((element3) => {
                this.listSize.forEach((element2) => {
                  if (element3.product_id.size_id === element2._id) {
                    element3.product_id.size_id = element2.name;
                  }
                });
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    calculateCurrentPrice(price, sellingPrice) {
      // Tính giá tiền hiện tại dựa trên giá gốc và phần trăm giảm giá
      return price - price * (sellingPrice / 100);
    },
    calculateTotalAmount() {
      let total = 0;
      let data = this.dataShowCart.forEach((item) => {
        // Chọn giá bán phù hợp: nếu có giá sale thì sử dụng giá sale, ngược lại sử dụng giá gốc
        let price = item.product_id.sellingPrice
          ? this.calculateCurrentPrice(
              item.product_id.price,
              item.product_id.sellingPrice
            ) * item.quantity
          : this.calculateCurrentPrice(item.product_id.price, "0") *
            item.quantity;

        // Tính tổng số tiền cho từng sản phẩm trong giỏ hàng
        total += price;
      });

      // Cập nhật tổng số tiền cho đơn hàng

      this.dataOrder.totalPrice = total;
      // Trả về tổng số tiền
      return total;
    },
    getDate(date) {
      try {
        return moment(date).format(`DD/MM/YYYY`);
      } catch (error) {
        return ``;
      }
    },
    updateOder(item) {
      let dataUpdate = {};
      dataUpdate.statusOder = "5";
      dataUpdate.statusPay = item.statusPay;
      dataUpdate._id = item._id;

      if (item.statusOder === "0") {
        this.$swal
          .fire({
            title: "Bạn chắc chắn muốn hủy ?",
            text: "Bạn sẽ không thể khôi phục đơn hàng đã Hủy!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý, Hủy ngay !!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              // Nếu người dùng đã xác nhận xóa
              axios
                .put(`http://localhost:3838/oders`, dataUpdate)
                .then((res) => {
                  if (res.data.status === 200) {
                    console.log("Hủy thành công", res);

                    // Thông báo xóa thành công
                    this.$swal.fire({
                      title: "Đã Hủy !",
                      text: "Đơn hàng đã được Hủy thành công",
                      icon: "success",
                    });

                    // Cập nhật danh sách sản phẩm (giả sử bạn đã có hàm này là getAllProduct())
                    this.getAllOrder();
                  }
                })
                .catch((err) => {
                  console.log(err);

                  // Thông báo lỗi khi xóa sản phẩm
                  this.$swal.fire({
                    title: "Error!",
                    text: "An error occurred while deleting the product.",
                    icon: "error",
                  });
                });
            }
          });
      } else {
        this.$swal.fire({
          title: "Lỗi rồi",
          text: "Bạn chỉ có thể hủy đơn hàng chưa xác nhận",
          icon: "error",
        });
      }
    },
    getDate(date) {
      try {
        return moment(date).format(`DD/MM/YYYY`);
      } catch (error) {
        return ``;
      }
    },
  },
};
</script>

<style scoped>
/* .col-8 {
  border-left: 1px solid #acacac;
} */
h5 {
  text-align: center;
  font-weight: bold;
}

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
.order-detail .row {
  padding: 20px 0;
}
.information,
.typePay,
.note {
  /* border: 1px solid; */
  background-color: #ddd;
  padding-left: 30px;
  margin: 10px 0;
  padding: 10px 0;
  padding-left: 20px;
  border-radius: 5px;
}
.information p {
  margin: 0;
  padding: 10px 0;
}
.change-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
</style>