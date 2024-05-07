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
            <div class="panel panel-container">
              <div class="row">
          <div class="search col-md-4">
            <div class="form-group">
              <label for="">THỐNG KÊ THEO</label>
              <select class="form-control" name="" id="" v-model="selectedType" @change="handleChangeTime">
                <option active:>Tháng</option>
                <option>Năm</option>
              </select>
            </div>
          </div>
          </div>
              <div class="row">
                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                  <router-link
                    to="/admin/adminorder"
                    style="text-decoration: none"
                  >
                    <div class="panel panel-teal panel-widget border-right">
                      <div class="row no-padding">
                        <i class="bi bi-cart-check-fill"></i>
                        <div class="large">{{ totalOrder }}</div>
                        <div class="text-muted">Đơn hàng</div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                  <router-link to="" style="text-decoration: none">
                    <div class="panel panel-blue panel-widget border-right">
                      <div class="row no-padding">
                        <i class="bi bi-clipboard2-data"></i>
                        <div class="large">
                          {{ formatPriceTotal(totalPrice) }}
                        </div>
                        <div class="text-muted">Doanh thu</div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                  <router-link
                    to="/admin/adminproducts"
                    style="text-decoration: none"
                  >
                    <div class="panel panel-orange panel-widget border-right">
                      <div class="row no-padding">
                        <i class="bi bi-handbag"></i>
                        <div class="large">{{ totalProduct }}</div>
                        <div class="text-muted">Sản phẩm</div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                  <router-link
                    to="/admin/adminusers"
                    style="text-decoration: none"
                  >
                    <div class="panel panel-orange panel-widget border-right">
                      <div class="row no-padding">
                        <i class="bi bi-people-fill"></i>
                        <div class="large">{{ totalUser }}</div>
                        <div class="text-muted">Người dùng</div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <!--/.row-->

              <figure class="highcharts-figure" style="margin-top: 50px">
                <div id="chart"></div>
              </figure>
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
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
export default {
  name: "statistical",
  components: {
    SideBar,
    HighchartsVue,
  },
  data() {
    return {
      selectedType: "Tháng",
      type: "month",
      dataTime: [],
      dataCountOrder: [],
      dataCountPrice: [],
      // userData: {},
      // selectedTable: "Order",
      listOrder: [],
      statusOder: [
        { _id: "0", name: "Chờ xác nhận" },
        { _id: "1", name: "Đã xác nhận" },
        { _id: "2", name: "Đang giao hàng" },
        { _id: "3", name: "Giao hàng thành công" },
        { _id: "4", name: "Giao hàng không thành công" },
      ],
      dataUpdateOrder: {
        statusOder: "",
      },
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
      totalPrice: "",
      totalOrder: "",
      totalProduct: "",
      totalUser: "",
    };
  },
  created() {
    this.getStatistical();
    this.getAllProduct();
    this.getAllUser();
  },
  mounted() {},
  methods: {
    getStatistical() {
      axios
        .get(`http://localhost:3838/statistical?type=${this.type}`)
        .then((res) => {
          if (
            res.data.status === 200 &&
            res.data.data &&
            res.data.data.length
          ) {
            (this.dataTime = []),
              (this.dataCountOrder = []),
              (this.dataCountPrice = []),
              (this.totalPrice = 0); // Khởi tạo là số 0
            this.totalOrder = 0; // Khởi tạo là số 0

            res.data.data.forEach((element) => {
              this.totalPrice += parseFloat(
                element.totalRevenue.$numberDecimal
              );
              this.totalOrder += parseFloat(element.totalOrders);
              element._id.day
                ? this.dataTime.push(element._id.day)
                : this.dataTime.push(element._id.month);
              this.dataCountPrice.push(
                this.formatPrice(element.totalRevenue.$numberDecimal)
              );
              this.dataCountOrder.push(element.totalOrders);
            });
          }

          this.DrawChart();
          console.log(
            "Thành công !!!",
            this.dataTime,
            this.dataCountOrder,
            this.dataCountPrice
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatPrice(price) {
      return price / 1000000;
    },
    formatNumber(number) {
      return parseFloat(number);
    },
    formatPriceTotal(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    DrawChart() {
      Highcharts.chart("chart", {
        chart: {
          type: "column",
        },
        title: {
          text: "Thống kê cửa hàng KING SHOES",
          align: "center",
        },
        xAxis: {
          categories: this.dataTime,
          crosshair: true,
          accessibility: {
            description: "Countries",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        // tooltip: {
        //   valueSuffix: " (1000 MT)",
        // },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "Doanh thu (triệu đồng)",
            data: this.dataCountPrice,
          },
          {
            name: "Đơn hàng (Đơn)",
            data: this.dataCountOrder,
          },
        ],
      });
    },
    handleChangeTime() {
      if (this.selectedType === "Năm") {
        console.log(this.type, "111111111");
        this.type = "year";
        this.getStatistical();
      }
      if (this.selectedType === "Tháng") {
        console.log(this.type, "2222222222");
        this.type = "month";
        this.getStatistical();
      }
    },
    getAllProduct() {
      axios
        .get("http://localhost:3838/products")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.totalProduct = res.data.data.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllUser() {
      axios
        .get("http://localhost:3838/users")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.totalUser = res.data.data.length;
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

.panel {
  border: 0;
}

.panel-container {
  padding-top: 20px;
}

.panel-heading .fa-toggle-up,
.panel-heading .fa-toggle-down {
  font-size: 17px;
}

.panel-primary > .panel-heading {
  background-color: #30a5ff;
  color: #fff;
  border: none;
}

.panel-success > .panel-heading {
  background-color: #8ad919;
  color: #fff;
  border: none;
}

.panel-info > .panel-heading {
  background-color: #30a5ff;
  color: #fff;
  border: none;
}

.panel-warning > .panel-heading {
  background-color: #ffb53e;
  color: #fff;
  border: none;
}

.panel-danger > .panel-heading {
  background-color: #f9243f;
  color: #fff;
  border: none;
}

.panel-primary .panel-settings,
.panel-primary .panel-toggle,
.panel-success .panel-settings,
.panel-success .panel-toggle,
.panel-info .panel-settings,
.panel-info .panel-toggle,
.panel-warning .panel-settings,
.panel-warning .panel-toggle,
.panel-danger .panel-settings,
.panel-danger .panel-toggle {
  border: none;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}

.panel-primary .panel-settings:hover,
.panel-primary .panel-toggle:hover,
.panel-success .panel-settings:hover,
.panel-success .panel-toggle:hover,
.panel-info .panel-settings:hover,
.panel-info .panel-toggle:hover,
.panel-warning .panel-settings:hover,
.panel-warning .panel-toggle:hover,
.panel-danger .panel-settings:hover,
.panel-danger .panel-toggle:hover {
  border: none;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.4);
}

.panel-blue {
  background: #30a5ff;
  color: #fff;
}

.panel-teal {
  background: #1ebfae;
  color: #fff;
}

.panel-orange {
  background: #ffb53e;
  color: #fff;
}

.panel-red {
  background: #f9243f;
  color: #fff;
}

.dark-overlay {
  background: rgba(0, 0, 0, 0.05);
}

.panel-blue p,
.panel-teal p,
.panel-orange p,
.panel-red p {
  color: rgba(255, 255, 255, 0.75);
}

.panel-heading {
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.025em;
  height: 60px;
  line-height: 38px;
}

.panel-default .panel-heading {
  background: #fff;
  border-bottom: 1px solid #e9ecf2;
  color: #444444;
}

.panel-footer {
  background: #fff;
  border-top: 1px solid #e9ecf2;
}

.panel-widget {
  padding: 10px 0;
  position: relative;
  box-shadow: none;
  border-radius: 0;
  background: none;
  text-align: center;
  color: #333;
}

.panel-widget .panel-footer {
  border: 0;
  text-align: center;
}

.panel-footer .input-group {
  padding: 0px;
  margin: 0 -5px;
}

.panel-footer .input-group-btn:last-child > .btn,
.panel-footer .input-group-btn:last-child > .btn-group {
  margin: 0;
}

.panel-widget .panel-footer a {
  color: #999;
}

.panel-widget .panel-footer a:hover {
  color: #666;
  text-decoration: none;
}

.panel-widget .text-muted {
  margin-top: -6px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8em;
}

.panel-widget .large {
  color: #373b45;
  font-size: 3em;
}

.panel-settings {
  list-style: none;
  padding: 0;
  margin: 0;
}

.panel-settings .dropdown a.dropdown-toggle,
.panel-settings a {
  padding: 0;
  background: none;
  color: #7c7c7c;
}

.panel-settings a,
.panel-toggle {
  width: 40px;
  padding: 2px 0 0 0;
}

.panel-settings:hover,
.panel-toggle:hover,
.panel-settings .dropdown a.dropdown-toggle:hover,
.panel-settings:active,
.panel-toggle:active,
.panel-settings .dropdown a.dropdown-toggle:active,
.panel-settings:focus,
.panel-toggle:focus,
.panel-settings .dropdown a.dropdown-toggle:focus {
  background: #f1f4f7;
  color: #444444;
}

.panel-settings,
.panel-toggle {
  display: inline-block;
  margin: -1px -5px 0 15px !important;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #e9ecf2;
  color: #7c7c7c;
  background: #fff;
  width: 42px;
}

.panel-settings {
  width: 42px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.panel-settings li.dropdown {
  margin: 0;
  padding: 0;
}

.dropdown-settings {
  border: 1px solid #fff;
  width: 220px;
  font-size: 0.9em;
  padding: 0;
}

.dropdown-settings li {
  list-style: none;
  padding: 0 10px;
  width: 220px;
  height: 26px;
  line-height: 26px;
}

.dropdown-settings .divider {
  margin: 7px 0;
}

.dropdown-settings li a {
  padding: 0;
  margin: 0;
  display: inline-block;
  width: 100%;
  color: #444444;
}

.clickable {
  cursor: pointer;
}

.panel-heading span {
  margin: 0px;
  font-size: 14px;
}

.panel-button-tab-right {
  margin-left: 4px !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.panel-button-tab-left {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.border-top {
  border-top: 1px solid #dadbda;
}

.border-right {
  border-right: 1px solid #dadbda;
}

.border-bottom {
  border-bottom: 1px solid #dadbda;
}

.border-left {
  border-left: 1px solid #dadbda;
}

.panel .border-top,
.panel .border-right,
.panel .border-bottom,
.panel .border-left {
  border-color: #e9ecf2;
}

.bi-cart-check-fill,
.bi-clipboard2-data,
.bi-people-fill,
.bi-handbag {
  font-size: 40px;
}

.bi-cart-check-fill {
  color: #30a5ff;
}
.bi-clipboard2-data {
  color: red;
}
.bi-people-fill {
  color: green;
}
.bi-handbag {
  color: #8ad919;
}
/* .highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
} */

#container {
  height: 400px;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}

.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>
  