<template>
  <div>
    <div>
      <TheHeader />
    </div>
    <!-- slide -->
    <div>
      <div id="carouselId" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselId" data-slide-to="0" class="active"></li>
          <li data-target="#carouselId" data-slide-to="1"></li>
          <li data-target="#carouselId" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <img src="../assets/Banner/slider2.jpg" alt="First slide" />
          </div>
          <div class="carousel-item">
            <img src="../assets/Banner/slider3.jpg" alt="Second slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselId"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselId"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <div style="background-color: #f8f9fa">
        <div class="container support">
          <div class="row text-center support">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <i class="bi bi-wallet2"></i>
              <h3>CAM KẾT CHÍNH HÃNG</h3>
              <h6>100% Authentic</h6>
              <p>Cam kết sản phẩm chính hãng từ Châu Âu, Châu Mỹ...</p>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <i class="bi bi-truck"></i>
              <h3>GIAO HÀNG HỎA TỐC</h3>
              <h6>Express delivery</h6>
              <p>SHIP hỏa tốc 1h nhận hàng trong nội thành Hà Nội</p>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <i class="bi bi-telephone-inbound"></i>
              <h3>HỖ TRỢ 24/24</h3>
              <h6>Supporting 24/24</h6>
              <p>Gọi ngay 0356422999</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nội dung -->
    <div class="container">
      <!-- Sản phẩm hot -->
      <h3 class="ps-section__title" data-mask="HOT">- Sản phẩm hot</h3>
      <div class="row">
        <div class="col-md-3" v-for="item in listProductHot" :key="item.id">
          <div class="products-hot">
            <div class="products-hot-img">
              <router-link
                :to="{ name: 'productDetails', params: { id: item._id } }"
              >
                <img
                  :src="'http://localhost:3838/' + item.image"
                  alt=""
                  style="width: 100%"
                />
              </router-link>
            </div>
            <div class="products-hot-body">
              <div class="product-info">
                <h4 class="card-title text-uppercase">
                  <router-link
                    :to="{ name: 'productDetails', params: { id: item._id } }"
                  >
                    {{ item.name }}
                  </router-link>
                </h4>

                <i class="stock-info">Số lượng: {{ item.numberInStock }}</i>
              </div>

              <span class="card-text">
                <div class="star">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </span>
              <div class="price">
                <strong :class="{ 'price-old': item.sellingPrice }">{{
                  formatPrice(item.price)
                }}</strong>
                <strong
                  class="price-current"
                  v-if="item.sellingPrice"
                  style="color: red; padding-left: 10px"
                  >{{
                    formatPrice(
                      calculateCurrentPrice(item.price, item.sellingPrice)
                    )
                  }}</strong
                >
              </div>
            </div>
            <div class="products-hot-HOT" v-if="item.product_type">
              <i class="bi bi-fire"></i> {{ item.product_type }}
            </div>
            <div class="products-hot-sale-off" v-if="item.sellingPrice">
              <span class="products-hot-sale-off-percent">
                {{ item.sellingPrice }}%</span
              >
              <span class="products-hot-sale-off-label"> GIẢM</span>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <!-- Sản phẩm mới -->
      <div class="product-new">
        <div class="container">
          <h3 class="ps-section__title text-left" data-mask="Product">
            - Sản phẩm mới
          </h3>
          <div class="row">
            <div
              class="col-md-3 text-left"
              v-for="item in listProductNew"
              :key="item.id"
            >
              <div class="products-hot">
                <div class="products-hot-img">
                  <router-link
                    :to="{ name: 'productDetails', params: { id: item._id } }"
                  >
                    <img
                      :src="'http://localhost:3838/' + item.image"
                      alt=""
                      style="width: 100%"
                    />
                  </router-link>
                </div>
                <div class="products-hot-body">
                  <div class="product-info">
                    <h4 class="card-title text-uppercase">
                      <router-link
                        :to="{
                          name: 'productDetails',
                          params: { id: item._id },
                        }"
                      >
                        {{ item.name }}
                      </router-link>
                    </h4>

                    <i class="stock-info">Số lượng: {{ item.numberInStock }}</i>
                  </div>
                  <span class="card-text">
                    <div class="star">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                  </span>
                  <div class="price">
                    <strong :class="{ 'price-old': item.sellingPrice }">{{
                      formatPrice(item.price)
                    }}</strong>
                    <strong
                      class="price-current"
                      v-if="item.sellingPrice"
                      style="color: red; padding-left: 10px"
                      >{{
                        formatPrice(
                          calculateCurrentPrice(item.price, item.sellingPrice)
                        )
                      }}</strong
                    >
                  </div>
                </div>
                <div class="products-hot-HOT" v-if="item.product_type">
                  <i class="bi bi-fire"></i> {{ item.product_type }}
                </div>
                <div class="products-hot-sale-off" v-if="item.sellingPrice">
                  <span class="products-hot-sale-off-percent">
                    {{ item.sellingPrice }}%</span
                  >
                  <span class="products-hot-sale-off-label"> GIẢM</span>
                </div>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <h3 class="ps-section__title text-left" data-mask="Discount">
            - Sản phẩm khuyến mãi
          </h3>
          <div class="row">
            <div
              class="col-md-3 text-left"
              v-for="item in listProductSale"
              :key="item.id"
            >
              <div class="products-hot">
                <div class="products-hot-img">
                  <router-link
                    :to="{ name: 'productDetails', params: { id: item._id } }"
                  >
                    <img
                      :src="'http://localhost:3838/' + item.image"
                      alt=""
                      style="width: 100%"
                    />
                  </router-link>
                </div>
                <div class="products-hot-body">
                  <div class="product-info">
                    <h4 class="card-title text-uppercase">
                      <router-link
                        :to="{
                          name: 'productDetails',
                          params: { id: item._id },
                        }"
                      >
                        {{ item.name }}
                      </router-link>
                    </h4>

                    <i class="stock-info">Số lượng: {{ item.numberInStock }}</i>
                  </div>
                  <span class="card-text">
                    <div class="star">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                  </span>
                  <div class="price">
                    <strong :class="{ 'price-old': item.sellingPrice }">{{
                      formatPrice(item.price)
                    }}</strong>
                    <strong
                      class="price-current"
                      v-if="item.sellingPrice"
                      style="color: red; padding-left: 10px"
                      >{{
                        formatPrice(
                          calculateCurrentPrice(item.price, item.sellingPrice)
                        )
                      }}</strong
                    >
                  </div>
                </div>
                <div class="products-hot-HOT" v-if="item.product_type">
                  <i class="bi bi-fire"></i> {{ item.product_type }}
                </div>
                <div class="products-hot-sale-off" v-if="item.sellingPrice">
                  <span class="products-hot-sale-off-percent">
                    {{ item.sellingPrice }}%</span
                  >
                  <span class="products-hot-sale-off-label"> GIẢM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- Tin tức -->
      <div class="blogs" style="margin-bottom: 50px">
        <div class="container">
          <h3 class="ps-section__title" data-mask="NEWS">- Tin tức</h3>
          <div class="card-group">
            <div class="card">
              <img
                class="card-img-top"
                src="../assets/Blog/Blog1.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h4 class="card-title">
                  DỊCH VỤ VỆ SINH GIÀY SNEAKER CHUYÊN NGHIỆP TẠI TÂN BÌNH -
                  KINGSHOESVN
                </h4>
                <p class="card-text">
                  Dịch vụ vệ sinh giày và dán Sole ( đế giày ) Kingshoes ra đời
                  với sứ mệnh làm giúp khách hàng gia tăng trải nghiệm sản phẩm
                  không chỉ trong quá trình mua sắm mà còn bảo vệ đôi giày của
                  khách hàng tromg quá trình sử dụng luôn mới - bền - đẹp.
                </p>
              </div>
              <p class="card-text" style="margin: 30px">
                <a href=""> <strong>XEM THÊM </strong> </a>
              </p>
            </div>
            <div class="card ml-3">
              <img
                class="card-img-top"
                src="../assets/Blog/Blog2.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h4 class="card-title">
                  HƯỚNG DẪN CHỌN SIZE GIÀY SNEAKER NIKE, ADIDAS
                </h4>
                <p class="card-text blogs">
                  Cách chọn size giày Sneaker Nike, Adidas @ KINGSHOES.VN Kinh
                  ngghiệm chọn size giày Nam- Nữ Đo size giày Nam- Nữ chuẩn
                  UK,US, Việt Nam
                </p>
              </div>
              <p class="card-text" style="margin: 30px">
                <a href=""> <strong>XEM THÊM </strong> </a>
              </p>
            </div>
            <div class="card ml-3">
              <img
                class="card-img-top"
                src="../assets/Blog/Blog3.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h4 class="card-title">
                  CÁCH ĐO CỠ CHÂN VÀ XÁC ĐỊNH SIZE GIÀY VIỆT NAM, US, UK CHUẨN
                  XÁC
                </h4>
                <p class="card-text">
                  Chọn đươc giày vừa size luôn là một bài toán khó đối với các
                  khách hàng thường xuyên mua giày online. Đặc biệt khi chọn
                  giày thể thao bạn cần size vừa vặn để tăng hiệu quả luyện tập.
                  Vậy thì hãy cùng KINGSHOES.VN thực hiện nhanh những bước sau
                  đây để tìm ra size giày chuẩn xác nhất dành cho mình nhé
                </p>
              </div>
              <p class="card-text" style="margin: 30px">
                <a href=""> <strong>XEM THÊM </strong> </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <!-- Liên hệ -->
      <div class="container-fluid contact">
        <div class="row">
          <div class="col-3 contact-buy">
            <h6>GỌI MUA HÀNG ( 8:30 - 22:20 )</h6>
            <div class="icon">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div class="text">
              <h2>0356422491</h2>
            </div>
            <p>Tất cả các ngày trong tuần</p>
          </div>
          <div class="col-3 contact-buy">
            <h6>GÓP Ý, KHIẾU NẠI ( 8:30 - 17:00 )</h6>
            <div class="icon">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div class="text">
              <h2>0356422491</h2>
            </div>
            <p>Các ngày trong tuần ( Trừ ngày lễ)</p>
          </div>
          <div class="col-3">
            <h6>ĐĂNG KÝ NHẬN THÔNG TIN MỚI</h6>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập email của bạn tại đây...."
                aria-label="email"
                aria-describedby="button-addon2"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Đăng ký
              </button>
            </div>
          </div>
          <div class="col-3">
            <h6>THEO DÕI CHÚNG TÔI</h6>
            <div class="link">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-instagram"></i>
              <i class="bi bi-twitter"></i>
              <i class="bi bi-youtube"></i>
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
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import axios from "axios";
export default {
  components: { TheHeader, TheFooter },
  name: "Home",
  props: {
    msg: String,
  },
  data() {
    return {
      listProduct: [],
      listProductNew: [],
      listProductHot: [],
      listProductSale: [],
      item: {
        sellingPrice: 0,
        price: 0,
      },
    };
  },
  created() {
    // Khởi tạo dữ liệu hoặc đăng ký sự kiện
    this.getAllProduct();
  },
  methods: {
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
    getAllProduct() {
      axios
        .get("http://localhost:3838/products")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            console.log("Thành công !!!", res);
            this.listProduct = res.data.data;
            this.listProduct.forEach((element) => {
              if (element.product_type === "NEW") {
                this.listProductNew.push(element);
              }
              if (element.product_type === "HOT") {
                this.listProductHot.push(element);
              }
              if (element.sellingPrice) {
                this.listProductSale.push(element);
              }
            });
          }
          console.log("Sale", this.listProductSale);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#carouselId img {
  width: 100%;
  height: 100%;
}
.support h3 {
  color: #ffd603;
}
.products-hot {
  position: relative;
  border: 1px solid #dadada;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 23px;
}

.products-hot:hover {
  border: 1px solid #b7b6b6;
}

.products-hot-img {
  width: 100%;
  padding-top: 100%;
  /* đảm bảo chiều cao tỷ lệ 1:1 */
  position: relative;
  overflow: hidden;

  margin-bottom: 20px;
}

.products-hot-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  transition: transform 0.3s ease;
}
.products-hot-img:hover img {
  transform: scale(1.1); /* Phóng to 110% khi di chuột vào */
}

.products-hot-body {
  padding: 0 20px;
  padding-bottom: 20px;
}
.products-hot-body .cart-title {
  font-size: 1.4rem;
  line-height: 1.8rem;
  height: 1.8rem;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.products-hot-body a {
  text-decoration: none;
  color: #5b5b5b;
  line-height: 2.8rem;
}
.products-hot-body a:hover {
  color: #ffd600;
}
.bi-wallet2,
.bi-truck,
.bi-telephone-inbound {
  font-size: 40px;
  color: #000000;
}

.bi-wallet2::before,
.bi-truck::before,
.bi-telephone-inbound::before {
  margin-top: 30px;
}

.product-new {
  text-align: center;
  margin: 20px 0;
}

.product-new .nav-tabs {
  text-align: center !important;
  display: inline-block;
}

.product-new .nav-tabs li {
  display: inline-block;
}

.product-new .nav-tabs li a {
  padding: 10px 25px;
  margin: 10px;
}

.pagination li a:hover {
  background-color: #ffd600;
}

.pagination li a {
  background-color: #f8f9fa;
  color: black !important;
  border: 1px #f8f9fa solid;
}

.product-new .nav-tabs li a:hover,
.product-new .nav-tabs li a.active {
  background-color: #f8f9fa;
}

.social {
  margin-bottom: 20px;
}

.social a {
  font-size: 5em;
  padding: 0 3rem;
}

.ps-section__title {
  position: relative;
  z-index: 10;
  min-width: 50%;
  display: block;
  /* font-family: "Roboto Condensed", sans-serif; */
  font-weight: 700;
  color: #1d1d1d;
  line-height: 100px;
  text-transform: uppercase;
  margin-top: 0;
}

.ps-section__title::before {
  content: attr(data-mask);
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  left: -4px;
  z-index: -1;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 70px;
  line-height: 1em;
  color: #f4f4f4;
  letter-spacing: 0.08em;
}

.page-link {
  border-radius: 50%;
  background-color: #f0f0f0;
  margin: 0 10px;
}

.ps-section__title {
  margin: 20px 0;
}

.star {
  font-size: 15px;
  color: rgb(255, 216, 74);
  margin-bottom: 10px;
}

.container-about {
  margin-top: 30px;
}

.container {
  padding: 0;
}
.contact {
  padding: 50px 0;
}

.contact-buy .icon,
.text {
  display: inline-block;
  margin-right: 20px;
}
.contact-buy .icon {
  align-content: center;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  /* height: 30px; */
  color: #fff;
}
.link i {
  padding-right: 20px;
  font-size: 30px;
}
.card-title {
  width: 200px; /* Đặt chiều rộng tùy ý */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products-hot-HOT {
  position: absolute;
  top: 10px;
  left: -4px;
  background-color: red;
  padding: 0 5px;
  color: #fff;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.products-hot-HOT::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  border-top: 3px solid currentColor;
  border-left: 3px solid transparent;
}

.products-hot-sale-off {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 45px;
  background-color: rgba(255, 216, 64, 0.95);
  text-align: center;
}

.products-hot-sale-off::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  border-width: 0 22px 6px;
  border-style: solid;
  border-color: transparent rgba(255, 216, 64, 0.95) transparent
    rgba(255, 216, 64, 0.95);
}
.products-hot-sale-off-percent {
  color: red;
  font-weight: 600;
  /* font-size: 1.2rem; */
  line-height: 1.2rem;
  position: relative;
  top: -1px;
}
.products-hot-sale-off-label {
  color: #fff;
  /* font-size: 1.4rem; */
  line-height: 1.3rem;
  position: relative;
  top: -5px;
  font-weight: 600;
}
.price-old {
  text-decoration: line-through; /* Gạch ngang giá cũ */
  color: #9d9d9d;
}
.product-info {
  display: flex;
  align-items: center; /* Căn giữa các phần tử theo chiều dọc */
}

.card-title {
  flex: 1; /* Đảm bảo tiêu đề sản phẩm chiếm hết phần còn lại của hàng */
  white-space: nowrap; /* Ngăn tiêu đề sản phẩm xuống dòng */
  overflow: hidden; /* Ẩn phần nội dung vượt quá chiều rộng */
  text-overflow: ellipsis; /* Hiển thị dấu "..." khi nội dung vượt quá */
}

.stock-info {
  margin-left: 10px;
}
</style>
