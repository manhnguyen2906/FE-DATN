<template>
  <div>
    <div>
      <TheHeader />
    </div>

    <div class="container">
      <div class="cart-listing">
        <div class="cart-page">
          <div class="cart-page-header">
            <h2>GIỎ HÀNG</h2>
          </div>
          <hr />
          <div class="cart-page-item">
            <div class="cart-page-item-info">
              <div class="row" v-for="item in dataShowCart" :key="item._id">
                <div class="col-4">
                  <div class="image">
                    <img
                      :src="'http://localhost:3838/' + item.product_id.image"
                      alt=""
                      style="width: 100%"
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="info">
                    <div class="title">
                      <h3>{{ item.product_id.name }}</h3>
                    </div>
                    <div class="size">
                      <!-- <span>Size giày: {{ item.product_id.size_id }}</span> -->
                      <div v-for="size in listSize" :key="size._id">
                        <div
                          v-if="
                            size._id &&
                            item.product_id &&
                            item.product_id.size_id === size._id
                          "
                        >
                          <span> Size: {{ size.name }} </span>
                        </div>
                      </div>
                    </div>
                    <div class="quantity">
                      <div class="product-details-quantity">
                        <div class="product-details-quantity-custom">
                          <button
                            class="reduced items-count sub"
                            @click="decreaseQuantity"
                            type="button"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            class="input-text qty"
                            title="Qty"
                            :min="1"
                            :maxlength="12"
                            id="qty"
                            name="quantity"
                            v-model="item.quantity"
                            readonly
                            disabled
                          />
                          <button
                            class="increase items-count add"
                            @click="increaseQuantity"
                            type="button"
                          >
                            +
                          </button>
                          <div class="clear"></div>
                        </div>

                        <!-- Price -->
                        <div class="xprice">
                          <i class="bi bi-x"></i>

                          <strong
                            :class="{
                              'price-old': item.product_id.sellingPrice,
                            }"
                            v-if="!dataCart"
                            >{{ formatPrice(item.product_id.price) }}</strong
                          >
                          <strong
                            class="price-current"
                            v-if="
                              item.product_id.sellingPrice &&
                              item.product_id.price
                            "
                            style="color: red; padding-left: 10px"
                            >{{
                              formatPrice(
                                calculateCurrentPrice(
                                  item.product_id.price,
                                  item.product_id.sellingPrice
                                )
                              )
                            }}</strong
                          >
                          <strong
                            class="price-current"
                            v-if="
                              !item.product_id.sellingPrice &&
                              item.product_id.price
                            "
                            style="color: red; padding-left: 10px"
                            >{{
                              formatPrice(
                                calculateCurrentPrice(item.product_id.price, 0)
                              )
                            }}</strong
                          >
                        </div>
                      </div>
                    </div>
                    <div class="price">
                      <p><b>Thành tiền: </b></p>
                      <!-- <strong
                        :class="{
                          'price-old': item.product_id.sellingPrice,
                        }"
                        v-if="!dataCart"
                        >{{
                          formatPrice(item.product_id.price * item.quantity)
                        }}</strong
                      >
                      <strong
                        class="price-current"
                        v-if="item.product_id.sellingPrice"
                        style="color: red; padding-left: 10px"
                        >{{
                          formatPrice(
                            calculateCurrentPrice(
                              item.product_id.price,
                              item.product_id.sellingPrice
                            )
                          )
                        }}</strong
                      > -->
                      <h5>
                        <b
                          v-if="
                            item.product_id.sellingPrice &&
                            item.product_id.price
                          "
                          >{{
                            formatPrice(
                              calculateCurrentPrice(
                                item.product_id.price,
                                item.product_id.sellingPrice
                              ) * item.quantity
                            )
                          }}</b
                        >
                        <b
                          v-if="
                            !item.product_id.sellingPrice &&
                            item.product_id.price
                          "
                          >{{
                            formatPrice(
                              calculateCurrentPrice(item.product_id.price, 0) *
                                item.quantity
                            )
                          }}</b
                        >
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="close" @click="deleteProductInCart(item)">
                    <input class="btn btn-primary" type="button" value="X" />
                  </div>
                </div>
                <hr style="margin-top: 20px" />
              </div>
              <div class="total-price text-right">
                <h5>
                  Tổng tiền:
                  <b style="color: Red">{{
                    formatPrice(calculateTotalAmount())
                  }}</b>
                </h5>
                <div class="product-details-addCart">
                  <router-link to="/">
                    <button class="btn btn-primary-addCart" type="submit">
                      <b>MUA TIẾP</b>
                    </button>
                  </router-link>
                  <router-link
                    :to="{ name: 'order', params: { data: dataCart } }"
                  >
                    <button class="btn btn-primary-buy" type="submit">
                      <b>ĐẶT HÀNG</b>
                    </button>
                  </router-link>
                </div>
                <hr />
              </div>
              <img
                src="../../../assets/About/thanhtoan.jpg"
                alt=""
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import TheHeader from "../../../components/TheHeader.vue";
import TheFooter from "../../../components/TheFooter.vue";
import axios from "axios";
export default {
  name: "PageAbout",
  props: {
    msg: String,
  },
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      user_id: "",
      quantity: 1,
      modalShow: false,
      dataCart: [],
      dataShowCart: [],
      listSize: [],
      // item: {
      //   sellingPrice: 0,
      //   price: 0,
      // },
    };
  },
  // mounted() {},
  created() {
    const user = JSON.parse(localStorage.getItem("userData"));
    this.user_id = user._id;
    console.log("user_id in carts", this.user_id);
    this.getAllCart();
    this.getAllSize();
  },
  methods: {
    deleteProductInCart(item) {
      // Hiển thị thông báo xác nhận
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa ?",
          text: "Bạn sẽ không thể khôi phục sản phẩm đã xóa!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý, xóa ngay !!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Nếu người dùng đã xác nhận xóa
            axios
              .delete(`http://localhost:3838/carts/${this.dataCart[0]._id}`, {
                data: { product_id: item.product_id._id },
              })
              .then((res) => {
                if (res.data.status === 200) {
                  console.log("Xóa thành công", res);

                  // Thông báo xóa thành công
                  this.$swal.fire({
                    title: "Đã xóa !",
                    text: "Sản phẩm đã được xóa thành công",
                    icon: "success",
                  });

                  // Sau khi xóa thành công, gọi hàm getAllProduct() để cập nhật danh sách sản phẩm
                  window.location.reload();
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
    },

    getAllCart() {
      // console.log("user_id", this.user_id);

      axios
        .get(`http://localhost:3838/carts?user_id=${this.user_id}`)
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.dataCart = res.data.data;
            console.log("dataCart: ", this.dataCart[0]);
            this.dataCart.forEach((cart) => {
              cart.product.forEach((item) => {
                this.dataShowCart.push({
                  product_id: item.product_id,
                  quantity: item.quantity,
                });
              });
            });

            console.log("Thành công Cart chưa show!!!", this.dataCart);
            console.log("Thành công Cart!!!", this.dataShowCart);
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
            this.listSize = res.data.data; //Gan data vao optionSize
            // this.optionsSize = res.data.data; //Gan data vao optionSize
          }
          console.log("Thành công lấy size", this.listSize);
        })
        .catch((err) => {
          console.log(err);
        });
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
      //this.dataOrder.totalPrice = total;

      // Trả về tổng số tiền
      return total;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      if (this.quantity < 12) {
        // Sử dụng maxlength của ô input là 12
        this.quantity++;
      }
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
  },
};
</script>

<style scoped>
.id p {
  margin: 0;
}
.cart-listing {
  margin: 50px 0;
}

.cart-page {
  max-width: 100%;
  width: 650px;
  margin: 0 auto;
  /* border: 1px solid; */
}

.product-details-quantity-custom {
  padding-top: 10px;
  display: inline-block;
}
.xprice {
  display: inline-block;
  padding: 0 10px;
}
.xprice h5 {
  display: inline-block;
  color: red;
  padding-left: 10px;
}
.price {
  padding-top: 10px;
}
.price p {
  display: inline-block;
}
.price h5 {
  display: inline-block;
  padding-left: 10px;
  color: red;
}
.close input {
  border-radius: 20px;
  background-color: red;
}
.product-details-quantity button {
  text-align: center;
  width: 30px;
  height: 40px;
  border: 1px solid #5b5b5b;
}

.product-details-quantity input {
  width: 50px;
  height: 40px;
  border: 1px solid;
  border-radius: 0;
  text-align: center;
}
.product-details-addCart button {
  background-color: #ffd603;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 20px;
}
.product-details-addCart button:hover {
  background-color: #5b5b5b;
  color: #fff;
}
</style>
