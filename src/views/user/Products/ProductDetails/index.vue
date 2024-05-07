<template>
  <div>
    <div>
      <TheHeader />
    </div>

    <div>
      <div class="container">
        <div class="row product-details">
          <!-- Ảnh -->
          <div class="col-6 product-details-img">
            <img
              :src="'http://localhost:3838/' + this.product.image"
              alt=""
              style="width: 70%; float: right"
            />
          </div>
          <div class="col-6 product-details-content">
            <!-- Tên -->
            <div class="product-details-name text-uppercase">
              <h1>{{ this.product.name }}</h1>
            </div>

            <!-- Gía -->
            <div class="product-details-price">
              <div class="price">
                <h3>
                  <strong :class="{ 'price-old': this.product.sellingPrice }">{{
                    formatPrice(this.product.price)
                  }}</strong>
                  <strong
                    class="price-current"
                    v-if="this.product.sellingPrice"
                    style="color: red; padding-left: 10px"
                    >{{
                      formatPrice(
                        calculateCurrentPrice(
                          this.product.price,
                          this.product.sellingPrice
                        )
                      )
                    }}</strong
                  >
                </h3>
              </div>
            </div>
            <i class="stock-info"
              >Sản phẩm còn lại: {{ product.numberInStock }}</i
            >
            <hr style="width: 70%" />
            <!-- Size -->
            <div class="product-detail-size">
              <div class="product-detail-size-text">
                <h6>KÍCH THƯỚC</h6>
                <p @click="modalShow = !modalShow">
                  <a>Hướng dẫn chọn size giày</a>
                </p>
                <b-modal ref="modal-size" v-model="modalShow">
                  <img
                    src="../../../../assets/Blog/Blog3.jpg"
                    alt=""
                    style="width: 100%"
                  />
                </b-modal>
                <div class="row size" style="padding-top: 15px">
                  <div class="col-12">
                    <input
                      type="radio"
                      class="btn-check"
                      name="options-base"
                      id="option5"
                      autocomplete="off"
                      checked
                    />
                    <label class="btn" for="option5">{{
                      this.product.size_id ? this.product.size_id.name : ""
                    }}</label>
                    <!-- <label class="btn" for="option5"> 39</label> -->
                  </div>
                </div>
              </div>
            </div>
            <hr style="width: 70%" />
            <!-- Số lượng -->
            <div class="product-details-quantity">
              <h6>SỐ LƯỢNG</h6>
              <div class="product-details-quantity-custom">
                <button
                  class="reduced this.products-count sub"
                  @click="decreaseQuantity"
                  type="button"
                >
                  -
                </button>
                <input
                  type="number"
                  class="input-text qty"
                  title="Qty"
                  :min="1"
                  :maxlength="12"
                  id="qty"
                  name="quantity"
                  v-model="quantity"
                  readonly
                  disabled
                />
                <button
                  class="increase this.products-count add"
                  @click="increaseQuantity"
                  type="button"
                >
                  +
                </button>
                <div class="clear"></div>
              </div>
            </div>
            <hr style="width: 70%" />
            <!-- Mua hang -->
            <div class="product-details-addCart">
              <button
                class="btn btn-primary-addCart"
                @click="addCart"
                type="submit"
              >
                <i class="bi bi-cart-plus-fill"></i>
                <b>THÊM VÀO GIỎ</b>
              </button>
              <button class="btn btn-primary-buy" type="submit" @click="buyNow">
                <b>MUA NGAY</b><i class="bi bi-box-arrow-in-right"></i>
              </button>
              <div class="product-details-addCart-text">
                <span style="display: inline"
                  >Hoặc đặt mua:
                  <h5 style="display: inline; color: red">0356422491</h5>
                  (Tư vấn miễn phí)
                </span>
              </div>
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
import TheHeader from "../../../../components/TheHeader.vue";
import TheFooter from "../../../../components/TheFooter.vue";
import axios from "axios";
import router from "@/router";
export default {
  name: "ProductDetails",
  props: {
    msg: String,
  },
  components: {
    TheHeader,
    TheFooter,
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("cart", this.user);
    if (this.user && this.user._id) {
      this.dataAddCart.user_id = this.user._id;
    }
  },
  data() {
    return {
      user: [],
      quantity: 1,
      modalShow: false,
      productId: null,
      product: {},
      dataAddCart: {
        user_id: "",
        product_data: [
          {
            product_id: "",
            quantity: 1,
          },
        ],
      },
      item: {
        sellingPrice: 0,
        price: 0,
      },
    };
  },
  // addCart() {},
  created() {
    this.productId = this.$route.params.id;
    this.getAllProductById();
  },
  methods: {
    addCart() {
      if (this.user && this.user._id) {
        axios
          .post("http://localhost:3838/carts", this.dataAddCart)
          .then((res) => {
            if (res.data.status === 200) {
              console.log("Thêm thành công !", res.data);
              // console.log(this.dataUpdate.product_type);
              // Thêm thông báo thành công
              this.$swal.fire({
                position: "center",
                icon: "success",
                title: "Thêm sản phẩm thành công !",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              // Thêm thông báo lỗi
              console.log("Thêm thất bại !", res.data.message);
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
      } else {
        this.$router.push("/login");
      }
    },
    buyNow() {
      if (this.user && this.user._id) {
        axios
          .post("http://localhost:3838/carts", this.dataAddCart)
          .then((res) => {
            if (res.data.status === 200) {
              console.log("Thêm thành công !", res.data);

              this.$swal.fire({
                position: "center",
                icon: "success",
                title: "Thêm sản phẩm thành công !",
                showConfirmButton: false,
                timer: 1500,
              });
              router.push({ path: "/cart" });
            } else {
              // Thêm thông báo lỗi
              console.log("Thêm thất bại !", res.data);
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
      } else {
        this.$router.push("/login");
      }
    },
    getAllProductById() {
      axios
        .get(`http://localhost:3838/products/${this.productId}`)
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.product = res.data.data;
            console.log("Thành công  !!!", this.product);

            this.dataAddCart.product_data[0].product_id = this.product._id;
            console.log("dataAddCart", this.dataAddCart);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    increaseQuantity() {
      if (this.quantity < 12) {
        // Sử dụng maxlength của ô input là 12
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
        this.dataAddCart.product_data[0].quantity = this.quantity;
        console.log("TRU", this.dataAddCart[0]);
      }
    },
    increaseQuantity() {
      this.quantity++;
      this.dataAddCart.product_data[0].quantity = this.quantity;
      console.log("CONG", this.dataAddCart);
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    calculateCurrentPrice(originalPrice, discountPercent) {
      // Tính giá tiền hiện tại dựa trên giá gốc và phần trăm giảm giá
      return originalPrice - originalPrice * (discountPercent / 100);
    },
  },
};
</script>

<style scoped>
.product-details {
  margin: 50px 0;
}

.product-details-content {
  padding-left: 50px;
}

.product-detail-size-text p,
h6 {
  display: inline;
}

.product-details-price h1 {
  color: red;
}

.product-detail-size-text p a {
  text-decoration: underline;
  padding-left: 20px;
  color: #5b5b5b;
}

.product-detail-size-text p a:hover {
  color: red;
  text-decoration: none;
}

.product-detail-size-text .size label {
  margin-right: 10px;
  border-radius: 20px;
  background-color: #dcdcdc;
}

.product-details-quantity-custom {
  padding: 15px 0;
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

.btn-primary-addCart,
.btn-primary-buy {
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 30px;
  width: 200px;
  height: 60px;
  /* background-color: #5b5b5b; */
}

.btn-primary-addCart {
  background-color: #ffd603;
  border: 1px solid;
}

.btn-primary-buy {
  background-color: red;
  border: 1px solid;
  color: #fff;
}

.bi-cart-plus-fill {
  padding-right: 10px;
}

.bi-box-arrow-in-right {
  padding-left: 10px;
}

.btn-primary-addCart:hover,
.btn-primary-buy:hover {
  background-color: #5b5b5b;
  color: #ffd603;
}

.product-details-addCart-text {
  padding: 15px 0;
}
.price-old {
  text-decoration: line-through; /* Gạch ngang giá cũ */
  color: #9d9d9d;
}
</style>
