<template>
  <div>
    <div>
      <TheHeader />
    </div>

    <!-- <div class="search1 " style="margin-top: 50px; margin-bottom: 50px ">
        <div class="container navbar-collapse" id="searchReponsive">
          <div class="row">
            <div class="search col-md-3">
              <div class="form-group">
                <label for="">Chọn size giày</label>
                <select class="form-control" name="" id="">
                  <option active:>Size</option>
                  <option>37</option>
                  <option>38</option>
                  <option>39</option>
                  <option>40</option>
                  <option>41</option>
                  <option>42</option>
                  <option>43</option>
                </select>
              </div>
            </div>
            <div class="search col-md-3">
              <div class="form-group">
                <label for="">Khoảng giá</label>
                <select class="form-control" name="" id="">
                  <option>Tất cả</option>
                  <option>Dưới 3 Triệu</option>
                  <option>Từ 3 đến 5 Triệu</option>
                  <option>Từ 5 đến 10 Triệu</option>
                  <option>Trên 10 Triệu</option>
  
                </select>
              </div>
            </div>
            <div class="search col-md-3">
              <div class="form-group">
                <label for="">Sắp xếp theo</label>
                <select class="form-control" name="" id="">
                  <option>Giá từ thấp đến cao</option>
                  <option>Tên từ A-Z</option>
                  <option>Tên từ Z-A</option>
                </select>
              </div>
            </div>
              <div class="form-group">
                <div role="group" class="input-group">
                    <input
                      id="bv-icons-table-search"
                      type="search"
                      placeholder="Bạn muốn tìm gì ?"
                      class="form-control"
                      style="border-radius: 40px; background-color: #f0f0f0"
                      v-model="search"
                    />
                    <div
                      class="input-group-text"
                      style="
                      
                        margin-left: -41px;
                        z-index: 1;
                        border: 0;
                        border-radius: 40px;
                        margin-top: 1px;
                        margin-bottom: 1px;
                        background-color: #f0f0f0;
                      "
                    >
                      <i @click="searchProduct" class="bi bi-search"></i>
                    </div>
                  </div>
              </div>
            <div class="search col-md-3">
              <label for="">Tìm kiếm:</label>
              <b-nav-form @submit.stop.prevent>
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Search"
                  v-model="search"
                ></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="searchProduct()"
                  >Search</b-button
                >
              </b-nav-form>
            </div>
          </div>
        </div>
      </div> -->

    <!-- CONTENT -->
    <!-- Nike -->
    <div class="container" style="margin: 50px auto">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="center" v-if="message">{{ message }}</div>
            <!-- Hiển thị thông báo tìm kiếm -->

            <div class="col-md-3" v-for="item in listProduct" :key="item._id">
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
                    <h5 class="card-title text-uppercase">
                      <router-link
                        :to="{
                          name: 'productDetails',
                          params: { id: item._id },
                        }"
                      >
                        {{ item.name }}
                      </router-link>
                    </h5>

                    <i class="stock-info" style="font-size: 13px"
                      >Số lượng: {{ item.numberInStock }}</i
                    >
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
                  <!-- <div class="products-hot-HOT">
                    <i class="bi bi-fire"></i> {{ item.product_type }}
                  </div> -->
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
        <div class="col-3">
          <div class="aside">
            <div class="aside aside-footwate">
              <img src="../../../../assets/Banner/bannersitebar01.jpg" alt="" />
            </div>
            <hr />
            <div class="aside aside-news">
              <div class="container">
                <div class="row-5">
                  <div class="aside-news-header">
                    <h3><b>TIN TỨC MỚI</b></h3>
                  </div>
                  <div class="aside-news-conten">
                    <img src="../../../../assets/Blog/Blog1.jpg" alt="" />
                    <p>
                      Dịch Vụ Vệ Sinh Giày Sneaker Chuyên Nghiệp Tại Tân Bình -
                      Kingshoesvn
                    </p>
                  </div>
                </div>
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
import { mapGetters } from "vuex";
export default {
  name: "SearchProduct",
  props: {
    msg: String,
  },
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      search: "",
      listProduct: [],
      brand_id: "66091eb20e92bf29e80db7c7",
      message: "",
      item: {
        sellingPrice: 0,
        price: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["getSearch"]),
  },
  created() {
    // Khởi tạo dữ liệu hoặc đăng ký sự kiện
    //this.getAllProduct();
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
        .get(`http://localhost:3838/productsbybrand?brand_id=${this.brand_id}`)
        // .get(`http://localhost:3838/productsbybrand?brand_id=${this.brand_id}`)
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            console.log("Thành công !!!", res);
            this.listProduct = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchProduct() {
      console.log(" SEARCH in VUEX !!!", this.$store.state.search);
      if (this.$store.state.search) {
        axios
          .post(
            `http://localhost:3838/products/search/${this.$store.state.search}`
          )
          .then((res) => {
            if (res.data.status === 200 && res.data.data !== null) {
              this.listProduct = res.data.data;
              this.message = "";

              console.log("Thành công SEARCH  !!!", this.listProduct);
            } else {
              this.listProduct = "";
              this.message = "Không tìm thấy sản phẩm !!!";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.listProduct = "";
        this.message = "Vui lòng nhập từ khóa tìm kiếm";
      }
    },
  },
  watch: {
    "$store.state.search": {
      handler(newValue, oldValue) {
        // Xử lý khi giá trị của search thay đổi
        if (newValue !== oldValue) {
          this.searchProduct();
        }
      },
      immediate: true, // Thực thi ngay lập tức khi watcher được tạo
    },
  },
};
</script>
  
  <style scoped>
.aside-footwate img {
  width: 100%;
}

.aside-news img {
  width: 100%;
}

.products-hot {
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
.card-title {
  width: 200px; /* Đặt chiều rộng tùy ý */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products-hot-body {
  padding: 0 20px;
  padding-bottom: 20px;
}

.products-hot-body a {
  text-decoration: none;
  color: #5b5b5b;
}
.products-hot-body a:hover {
  color: #ffd600;
}
.star {
  font-size: 15px;
  color: rgb(255, 216, 74);
  margin-bottom: 10px;
}
.products-hot-HOT {
  position: absolute;
  font-size: 13px;
  top: 10px;
  left: 10px;
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
  right: 12px;
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