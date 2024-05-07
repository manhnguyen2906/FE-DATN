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

        <!-- TABLE -->
        <div class="col-12 col-sm-10" style="padding: 15px">
          <div class="container-fluid" id="container">
            <div class="product-manager">
              <!-- Điều hướng -->
              <div class="row" style="margin: 0 0 20px 0px">
                <div
                  class="col-3 text-center"
                  :class="{ active: selectedTable === 'Product' }"
                  @click="changeTable('Product')"
                >
                  <h5>QUẢN LÝ SẢN PHẨM</h5>
                </div>

                <div
                  class="col-3 text-center"
                  :class="{ active: selectedTable === 'Brand' }"
                  @click="changeTable('Brand')"
                >
                  <h5>QUẢN LÝ THƯƠNG HIỆU</h5>
                </div>

                <div
                  class="col-3 text-center"
                  :class="{ active: selectedTable === 'Size' }"
                  @click="changeTable('Size')"
                >
                  <h5>QUẢN LÝ SIZE</h5>
                </div>

                <!-- Button Thêm -->
                <div class="col-3 text-right">
                  <!-- BUTTON THEM SAN PHAM -->
                  <b-button
                    id="show-btn"
                    @click="showModal"
                    v-if="selectedTable === 'Product'"
                    >Thêm sản phầm</b-button
                  >
                  <b-button
                    id="show-btn"
                    @click="showModalSize"
                    v-if="selectedTable === 'Size'"
                    >Thêm size</b-button
                  >
                  <b-button
                    id="show-btn"
                    @click="showModalBrand"
                    v-if="selectedTable === 'Brand'"
                    >Thêm thương hiệu</b-button
                  >
                </div>
              </div>

              <!-- MODAL -->
              <!-- modal thêm mới  sản phẩm-->
              <b-modal ref="my-modal" hide-footer title="Thêm mới sản phẩm">
                <div class="modal-body">
                  <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                      <label for="productName" class="form-label"
                        >Tên sản phẩm:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="productName"
                        v-model="dataCreate.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="productName" class="form-label">Mô tả:</label>
                      <textarea
                        id="textarea productName"
                        class="form-control"
                        v-model="dataCreate.description"
                      ></textarea>
                    </div>

                    <div class="mb-3">
                      <label for="productSize" class="form-label">Size:</label>
                      <select
                        class="form-select"
                        id="productSize"
                        v-model="dataCreate.size_id"
                        required
                      >
                        <option value="">Chọn size</option>
                        <option
                          v-for="size in optionsSize"
                          :key="size._id"
                          :value="size._id"
                        >
                          {{ size.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="productBrand" class="form-label"
                        >Thương hiệu:</label
                      >
                      <select
                        class="form-select"
                        id="productBrand"
                        v-model="dataCreate.brand_id"
                        required
                      >
                        <option value="">Chọn thương hiệu</option>
                        <option
                          v-for="brand in optionsBrand"
                          :key="brand._id"
                          :value="brand._id"
                        >
                          {{ brand.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="productprice" class="form-label"
                        >Price:</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        id="productprice"
                        v-model="dataCreate.price"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="productSellingPrice" class="form-label"
                        >Sale (%):</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        id="productSellingPrice"
                        v-model="dataCreate.sellingPrice"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="productImage" class="form-label"
                        >Hình ảnh:</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="productImage"
                        @change="handleImageUpload"
                        accept="image/*"
                        required
                      />
                      <div v-if="imageUrl">
                        <img
                          :src="imageUrl"
                          alt="Ảnh sản phẩm"
                          style="width: 40%; padding-top: 20px"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="productType" class="form-label"
                        >Chọn loại sản phẩm</label
                      >
                      <select
                        class="form-select"
                        id="productType"
                        v-model="dataCreate.product_type"
                      >
                        <option value="">Chọn loại sản phẩm:</option>
                        <option
                          v-for="type in productTypes"
                          :key="type._id"
                          :value="type._id"
                        >
                          {{ type.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="productquantity" class="form-label"
                        >Số lượng</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        id="productquantity"
                        v-model="dataCreate.numberInStock"
                        required
                      />
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModal"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal>

              <!-- modal sửa sản phẩm -->
              <b-modal
                ref="my-modal-update"
                hide-footer
                title="Sửa thông tin sản phẩm"
              >
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitUpdate">
                    <div class="mb-3">
                      <label for="productName" class="form-label"
                        >Tên sản phẩm:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="productName"
                        v-model="dataUpdate.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="productName" class="form-label">Mô tả:</label>
                      <textarea
                        id="textarea productName"
                        class="form-control"
                        v-model="dataUpdate.description"
                      ></textarea>
                    </div>

                    <div class="mb-3">
                      <label for="productSize" class="form-label">Size:</label>
                      <select
                        class="form-select"
                        id="productSize"
                        v-model="dataUpdate.size_id._id"
                        required
                      >
                        <option value="">Chọn size</option>
                        <option
                          v-for="size in optionsSize"
                          :key="size._id"
                          :value="size._id"
                        >
                          {{ size.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="productBrand" class="form-label"
                        >Thương hiệu:</label
                      >
                      <select
                        class="form-select"
                        id="productBrand"
                        v-model="dataUpdate.brand_id._id"
                        required
                      >
                        <option value="">Chọn thương hiệu</option>
                        <option
                          v-for="brand in optionsBrand"
                          :key="brand._id"
                          :value="brand._id"
                        >
                          {{ brand.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="productprice" class="form-label"
                        >Price:</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        id="productprice"
                        v-model="dataUpdate.price"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="productSellingPrice" class="form-label"
                        >Sale (%):</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        id="productSellingPrice"
                        v-model="dataUpdate.sellingPrice"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="productImage" class="form-label"
                        >Hình ảnh:</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="productImage"
                        @change="handleImageUploadUpdate"
                        accept="image/*"
                        :v-model="dataUpdate.image"
                      />
                      <div v-if="imageUrl">
                        <img
                          :src="imageUrl"
                          alt="Ảnh sản phẩm"
                          style="width: 40%; padding-top: 20px"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="productType" class="form-label"
                        >Chọn loại sản phẩm</label
                      >
                      <select
                        class="form-select"
                        id="productType"
                        v-model="dataUpdate.product_type"
                      >
                        <option value="">Chọn loại sản phẩm:</option>
                        <option
                          v-for="type in productTypes"
                          :key="type._id"
                          :value="type._id"
                        >
                          {{ type.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="productquantity" class="form-label"
                        >Số lượng</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        id="productquantity"
                        v-model="dataUpdate.numberInStock"
                        required
                      />
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalUpdate"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal>

              <!-- Modal thêm mới size -->
              <b-modal ref="my-modal-size" hide-footer title="Thêm mới Size">
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitSize">
                    <div class="mb-3">
                      <label for="sizeName" class="form-label">Tên Size:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="sizeName"
                        v-model="dataCreateSize.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="status" class="form-label">Trạng thái:</label>
                      <input
                        type="checkbox"
                        id="status"
                        v-model="dataCreateSize.status"
                      />
                      <label for="status">Hoạt động</label>
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalSize"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal>
              <!-- modal sửa Size -->
              <b-modal ref="my-modal-update-size" hide-footer title="Sửa Size">
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitUpdateSize">
                    <div class="mb-3">
                      <label for="sizeName" class="form-label">Tên Size:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="sizeName"
                        v-model="dataUpdateSize.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="status" class="form-label">Trạng thái:</label>
                      <input
                        type="checkbox"
                        id="status"
                        v-model="dataUpdateSize.status"
                      />
                      <label for="status">Hoạt động</label>
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalUpdateSize"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal>

              <!-- Modal thêm mới brand -->
              <b-modal
                ref="my-modal-brand"
                hide-footer
                title="Thêm mới Thương hiệu"
              >
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitBrand">
                    <div class="mb-3">
                      <label for="brandName" class="form-label"
                        >Tên thương hiệu:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="brandName"
                        v-model="dataCreateBrand.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="emailBrand" class="form-label">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailBrand"
                        v-model="dataCreateBrand.emailBrand"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phoneNumber" class="form-label"
                        >Số điện thoại:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="phoneNumber"
                        v-model="dataCreateBrand.phoneNumber"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="address" class="form-label">Địa chỉ:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        v-model="dataCreateBrand.address"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="brandImage" class="form-label"
                        >Hình ảnh:</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="brandImage"
                        @change="handleImageBrandUpload"
                        accept="image/*"
                        required
                      />
                      <div v-if="imageUrl">
                        <img
                          :src="imageUrl"
                          alt="Ảnh thương hiệu"
                          style="width: 40%; padding-top: 20px"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="status" class="form-label">Trạng thái:</label>
                      <input
                        type="checkbox"
                        id="status"
                        v-model="dataCreateBrand.status"
                      />
                      <label for="status">Hoạt động</label>
                    </div>

                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalBrand"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal>

              <!-- Modal sửa brand -->
              <b-modal
                ref="my-modal-update-brand"
                hide-footer
                title="Sửa thương hiệu brand"
              >
                <div class="modal-body">
                  <form @submit.prevent="handleSubmitUpdateBrand">
                    <div class="mb-3">
                      <label for="brandName" class="form-label"
                        >Tên thương hiệu:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="brandName"
                        v-model="dataUpdateBrand.name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="emailBrand" class="form-label">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailBrand"
                        v-model="dataUpdateBrand.emailBrand"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phoneNumber" class="form-label"
                        >Số điện thoại:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="phoneNumber"
                        v-model="dataUpdateBrand.phoneNumber"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="address" class="form-label">Địa chỉ:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        v-model="dataUpdateBrand.address"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="brandImage" class="form-label"
                        >Hình ảnh:</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="brandImage"
                        @change="handleImageBrandUploadUpdate"
                        accept="image/*"
                      />
                      <!-- Hiện ảnh để biết mà sửa -->
                      <div v-if="imageUrl">
                        <img
                          :src="imageUrl"
                          alt="Ảnh thương hiệu"
                          style="width: 40%; padding-top: 20px"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="status" class="form-label">Trạng thái:</label>
                      <input
                        type="checkbox"
                        id="status"
                        v-model="dataUpdateBrand.status"
                      />
                      <label for="status">Hoạt động</label>
                    </div>

                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Lưu</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="hideModalUpdateBrand"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </b-modal>
            </div>

            <!-- TABLE -->

            <!-- TABLE SAN PHAM -->
            <div class="tbl-products">
              <div class="row" style="padding-bottom: 20px">
                <div class="col-3">
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
              </div>
              <table class="table" v-if="selectedTable === 'Product'">
                <thead>
                  <tr style="background-color: #e0e0e0">
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Thương hiệu</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Size</th>
                    <th scope="col">Giá bán</th>
                    <th scope="col">SALE</th>
                    <th scope="col" style="width: 10%">Hình ảnh</th>
                    <th scope="col" style="width: 7%">Loại sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <!-- <th scope="col">Trạng thái</th> -->
                    <th scope="col">Tác vụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listProduct" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.brand_id ? item.brand_id.name : "" }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.size_id ? item.size_id.name : "" }}</td>
                    <td>{{ formatPrice(item.price) }}</td>
                    <td>
                      {{ item.sellingPrice ? item.sellingPrice + "%" : "" }}
                    </td>
                    <td>
                      <img
                        :src="'http://localhost:3838/' + item.image"
                        alt=""
                        style="width: 100%; height: 100%"
                      />
                    </td>
                    <td>{{ item.product_type }}</td>
                    <td>
                      {{
                        item.numberInStock ? item.numberInStock + " đôi" : ""
                      }}
                      <br />
                      <span
                        v-if="item.numberInStock == 0"
                        style="
                          text-align: center;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          background-color: red;
                          border-radius: 5px;
                        "
                        ><b>ĐÃ HẾT</b></span
                      >
                      <span
                        v-if="item.numberInStock > 0 && item.numberInStock < 10"
                        style="
                          text-align: center;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          background-color: orange;
                          border-radius: 5px;
                        "
                        ><b>SẮP HẾT</b></span
                      >
                    </td>
                    <td>
                      <i
                        @click="showModalUpdate(item)"
                        class="bi bi-pencil-square"
                      ></i>

                      <i @click="deleteProduct(item)" class="bi bi-trash"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- TABLE SIZE -->
            <table class="table" v-if="selectedTable === 'Size'">
              <thead>
                <tr style="background-color: #e0e0e0">
                  <th scope="col">Size</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listSize" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                    {{ item.status === true ? "Hoạt động" : "Dừng hoạt động" }}
                  </td>
                  <td>
                    <i
                      @click="showModalUpdateSize(item)"
                      class="bi bi-pencil-square"
                    ></i>

                    <!-- <i @click="deleteSize(item)" class="bi bi-trash"></i> -->
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- TABLE THUONG HIEU -->
            <table class="table" v-if="selectedTable === 'Brand'">
              <thead>
                <tr style="background-color: #e0e0e0">
                  <th scope="col">Thương Hiệu</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số Điện Thoại</th>
                  <th scope="col">Địa Chỉ</th>
                  <th scope="col" style="width: 7%">Hình ảnh</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listBrand" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.emailBrand }}</td>
                  <td>{{ item.phoneNumber }}</td>
                  <td>{{ item.address }}</td>
                  <td>
                    <img
                      :src="'http://localhost:3838/' + item.image"
                      alt=""
                      style="width: 100%; height: 100%"
                    />
                  </td>

                  <td>
                    {{ item.status === true ? "Hoạt động" : "Dừng hoạt động" }}
                  </td>
                  <td>
                    <i
                      @click="showModalUpdateBrand(item)"
                      class="bi bi-pencil-square"
                    ></i>
                    <!-- <i @click="deleteBrand(item)" class="bi bi-trash"></i> -->
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: "products",
  components: {
    SideBar,
  },
  data() {
    return {
      imageUrl: "",
      selectedTable: "Product",
      modalShow: false,
      // Data hiển thị trên table sẽ gán vào đây
      listProduct: {
        name: "",
        description: "",
        status: "",
        image: "", // Lưu trữ đường dẫn của hình ảnh
        price: "",
        sellingPrice: "",
        brand_id: "",
        size_id: "",
        product_type: "",
        numberInStock: "",
      },
      listSize: {
        name: "",
        status: "",
      },
      listBrand: {
        name: "",
        phoneNumber: "",
        emailBrand: "",
        adress: "",
        image: "", // Lưu trữ đường dẫn của hình ảnh
        status: "",
      },

      selectedBrand: [],
      selectedSize: [],
      productTypes: [
        // Mảng chứa các loại sản phẩm
        { _id: "HOT", name: "HOT" },
        { _id: "NEW", name: "NEW" },
        // Thêm các loại sản phẩm khác nếu cần
      ],

      // Data khi thêm mới, sửa sản phẩm sẽ gán vào dây
      dataCreate: {
        name: "",
        description: "",
        status: true,
        image: "", // Lưu trữ đường dẫn của hình ảnh
        price: "",
        sellingPrice: "",
        brand_id: "",
        size_id: "",
        product_type: "",
        numberInStock: "",
      },
      dataUpdate: {
        name: "",
        description: "",
        status: true,
        image: "", // Lưu trữ đường dẫn của hình ảnh
        price: "",
        sellingPrice: "",
        brand_id: "",
        size_id: "",
        product_type: "",
        numberInStock: "",
      },

      //Data khi thêm mới, sửa size
      dataCreateSize: {
        name: "",
        status: false,
      },
      dataUpdateSize: {
        name: "",
        status: "",
      },

      // Data khi thêm mới, sửa brand sẽ gán vào dây
      dataCreateBrand: {
        name: "",
        emailBrand: "",
        phoneNumber: "",
        address: "",
        image: "",
        status: "",
      },
      dataUpdateBrand: {
        name: "",
        emailBrand: "",
        phoneNumber: "",
        address: "",
        image: "",
        status: true,
      },
      optionsBrand: [],
      optionsSize: [],
      optionProduct: [],
      search: "",
    };
  },
  // computed: {
  //   activeBrands() {
  //     return this.optionsBrand.filter((brand) => brand.isActive === true);
  //   },
  // },
  created() {
    // Khởi tạo dữ liệu hoặc đăng ký sự kiện
    this.getAllProduct();
    this.getAllSize();
    this.getAllBrand();
    this.getAllBrandOn();
    this.getAllSizeOn();
  },
  methods: {
    //Them moi san pham
    showModal() {
      this.$refs["my-modal"].show();
      this.imageUrl = "";
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      this.dataCreate = {
        name: "",
        description: "",
        status: true,
        image: "", // Lưu trữ đường dẫn của hình ảnh
        price: "",
        brand_id: "",
        size_id: "",
        product_type: "",
        numberInStock: "",
      };
    },
    handleSubmit() {
      console.log("Check create product", this.dataCreate);
      const formData = new FormData();
      formData.append("name", this.dataCreate.name);
      formData.append("price", this.dataCreate.price);
      formData.append("sellingPrice", this.dataCreate.sellingPrice);
      formData.append("description", this.dataCreate.description);
      formData.append("size_id", this.dataCreate.size_id);
      formData.append("brand_id", this.dataCreate.brand_id);
      formData.append("image", this.dataCreate.image); // Thêm tệp hình ảnh vào FormData
      formData.append("product_type", this.dataCreate.product_type);
      formData.append("numberInStock", this.dataCreate.numberInStock);
      // Xử lý khi người dùng submit
      axios
        .post("http://localhost:3838/products", formData)
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

            this.getAllProduct();
          } else {
            // Thêm thông báo lỗi
            console.log("Thêm thất bại !", res.data.message[0].message);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message[0].message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModal();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.dataCreate.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },

    // Sửa sán phẩm
    showModalUpdate(item) {
      this.$refs["my-modal-update"].show();
      console.log(item);
      this.dataUpdate = item;
      this.imageUrl = "http://localhost:3838/" + item.image;
    },
    hideModalUpdate() {
      this.$refs["my-modal-update"].hide();
      this.imageUrl = "";
    },
    handleSubmitUpdate() {
      console.log("Check update product", this.dataUpdate);
      const formData = new FormData();
      formData.append("_id", this.dataUpdate._id);
      formData.append("name", this.dataUpdate.name);
      formData.append("price", this.dataUpdate.price);
      formData.append("sellingPrice", this.dataUpdate.sellingPrice);
      formData.append("description", this.dataUpdate.description);
      formData.append("size_id", this.dataUpdate.size_id._id);
      formData.append("brand_id", this.dataUpdate.brand_id._id);
      formData.append("image", this.dataUpdate.image); // Thêm tệp hình ảnh vào FormData
      formData.append("product_type", this.dataUpdate.product_type);
      formData.append("numberInStock", this.dataUpdate.numberInStock);
      // Xử lý khi người dùng submit
      axios
        .put(`http://localhost:3838/products/${this.dataUpdate._id}`, formData)
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Sửa thành công !", res.data);
            // Thêm thông báo thành công
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Sửa sản phẩm thành công !",
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllProduct();
          } else {
            // Thêm thông báo lỗi
            console.log("Sửa thất bại !", res);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message[0].message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModalUpdate();
    },
    handleImageUploadUpdate(event) {
      const file = event.target.files[0];
      this.dataUpdate.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },

    getAllProduct() {
      axios
        .get("http://localhost:3838/products")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            this.listProduct = res.data.data;
            console.log("Thành công !!!", this.listProduct);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Xoa san pham
    deleteProduct(item) {
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
              .delete(`http://localhost:3838/products/${item._id}`)
              .then((res) => {
                if (res.data.status === 200) {
                  console.log("Xóa thành công", res);

                  // Thông báo xóa thành công
                  this.$swal.fire({
                    title: "Đã xóa !",
                    text: "Sản phẩm đã được xóa thành công",
                    icon: "success",
                  });

                  // Cập nhật danh sách sản phẩm (giả sử bạn đã có hàm này là getAllProduct())
                  this.getAllProduct();
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

    //Them moi size
    showModalSize() {
      this.$refs["my-modal-size"].show();
      this.imageUrl = "";
    },
    hideModalSize() {
      this.$refs["my-modal-size"].hide();
      this.dataCreateSize = {
        name: "",
        status: false,
      };
      this.imageUrl = "";
    },
    handleSubmitSize() {
      console.log("Check create size", this.dataCreateSize);
      const formData = new FormData();
      formData.append("name", this.dataCreateSize.name);
      formData.append("status", this.dataCreateSize.status);
      // console.log("đasadsadsadsaa", this.formData);
      // Xử lý khi người dùng submit
      axios
        .post("http://localhost:3838/sizes", this.dataCreateSize)
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Thêm thành công !", res.data);
            // Thêm thông báo thành công
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Thêm Size sản phẩm thành công !",
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllSize();
          } else {
            // Thêm thông báo lỗi
            console.log("Thêm thất bại !", res.data.message[0].message);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message[0].message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModalSize();
    },
    //Sua Size
    showModalUpdateSize(item) {
      this.$refs["my-modal-update-size"].show();
      console.log(item);
      this.dataUpdateSize = item;
    },
    hideModalUpdateSize() {
      this.$refs["my-modal-update-size"].hide();
    },
    handleSubmitUpdateSize() {
      console.log("Check update size", this.dataUpdateSize);
      const formData = new FormData();
      formData.append("_id", this.dataUpdateSize._id);
      formData.append("name", this.dataUpdateSize.name);
      formData.append("status", this.dataUpdateSize.status);
      // Xử lý khi người dùng submit
      console.log(this.dataUpdateSize._id);
      axios
        .put(
          `http://localhost:3838/sizes/${this.dataUpdateSize._id}`,
          this.dataUpdateSize
        )
        // .put(
        //   "http://localhost:3838/sizes/" + this.dataUpdateSize._id,
        //   this.dataUpdateSize
        // )
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Sửa thành công !", res.data);
            // Thêm thông báo thành công
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Sửa Size sản phẩm thành công !",
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllSize();
            this.getAllSizeOn();
          } else {
            // Thêm thông báo lỗi
            console.log("Thêm thất bại !", res);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message[0].message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModalUpdateSize();
    },
    getAllSize() {
      axios
        .get("http://localhost:3838/sizes")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            console.log("Thành công lấy size", res);
            this.listSize = res.data.data; //Gan data vao optionSize
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllSizeOn() {
      axios
        .get("http://localhost:3838/sizes-on")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            console.log("Thành công lấy size", res);
            this.optionsSize = res.data.data; //Gan data vao optionSize
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Xóa Size
    deleteSize(item) {
      // Hiển thị thông báo xác nhận
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa ?",
          text: "Bạn sẽ không thể khôi phục Size đã xóa !",
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
              .delete(`http://localhost:3838/sizes/${item._id}`)
              .then((res) => {
                if (res.data.status === 200) {
                  console.log("Xóa thành công !", res);

                  // Thông báo xóa thành công
                  this.$swal.fire({
                    title: "Đã xóa !",
                    text: "Size đã được xóa thành công !",
                    icon: "success",
                  });

                  // Cập nhật danh sách size
                  this.getAllSize();
                }
              })
              .catch((err) => {
                console.log(err);

                // Thông báo lỗi khi xóa size
                this.$swal.fire({
                  title: "Error!",
                  text: "An error occurred while deleting the product.",
                  icon: "error",
                });
              });
          }
        });
    },

    //Them moi thuong hieu
    showModalBrand() {
      this.$refs["my-modal-brand"].show();
      this.imageUrl = "";
    },
    hideModalBrand() {
      this.$refs["my-modal-brand"].hide();
      this.dataCreateBrand = {
        name: "",
        emailBrand: "",
        phoneNumber: "",
        address: "",
        image: "",
        status: "",
      };
      this.imageUrl = "";
    },
    handleSubmitBrand() {
      console.log("Check create brand", this.dataCreateBrand);
      const formData = new FormData();
      formData.append("name", this.dataCreateBrand.name);
      formData.append("emailBrand", this.dataCreateBrand.emailBrand);
      formData.append("phoneNumber", this.dataCreateBrand.phoneNumber);
      formData.append("address", this.dataCreateBrand.address);
      formData.append("image", this.dataCreateBrand.image); // Thêm tệp hình ảnh vào FormData
      formData.append("status", this.dataCreateBrand.status);
      // Xử lý khi người dùng submit
      axios
        .post("http://localhost:3838/brands", formData)
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Thêm thành công !", res.data);
            // Thêm thông báo thành công
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Thêm thương hiệu thành công",
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllBrand();
          } else {
            // Thêm thông báo lỗi
            console.log("Thêm thất bại", res.data.message[0].message);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message[0].message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModalBrand();
    },
    handleImageBrandUpload(event) {
      const file = event.target.files[0];
      this.dataCreateBrand.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },

    //Sửa thương hiệu
    showModalUpdateBrand(item) {
      this.$refs["my-modal-update-brand"].show();
      console.log(item);
      this.dataUpdateBrand = item;
      this.imageUrl = "http://localhost:3838/" + item.image;
    },
    hideModalUpdateBrand() {
      this.$refs["my-modal-update-brand"].hide();
    },
    handleSubmitUpdateBrand() {
      console.log("Check update brand", this.dataUpdateBrand);
      const formData = new FormData();
      formData.append("name", this.dataUpdateBrand.name);
      formData.append("emailBrand", this.dataUpdateBrand.emailBrand);
      formData.append("phoneNumber", this.dataUpdateBrand.phoneNumber);
      formData.append("address", this.dataUpdateBrand.address);
      formData.append("image", this.dataUpdateBrand.image); // Thêm tệp hình ảnh vào FormData
      formData.append("status", this.dataUpdateBrand.status);
      // Xử lý khi người dùng submit
      console.log(formData);
      axios
        .put(
          `http://localhost:3838/brands/${this.dataUpdateBrand._id}`,
          formData
        )
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Sửa thành công !", res.data);
            // Thêm thông báo thành công
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Sửa sản phẩm thành công !",
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllBrand();
            this.getAllBrandOn();
          } else {
            // Thêm thông báo lỗi
            console.log("Sửa thất bại !", res);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: res.data.message[0].message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModalUpdateBrand();
    },
    handleImageBrandUploadUpdate(event) {
      const file = event.target.files[0];
      this.dataUpdateBrand.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },

    getAllBrand() {
      axios
        .get("http://localhost:3838/brands")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            console.log("Thành công lấy brand", res);
            this.listBrand = res.data.data; //Gan data vao optionSize
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllBrandOn() {
      axios
        .get("http://localhost:3838/brands-on")
        .then((res) => {
          if (res.data.status === 200 && res.data.data) {
            console.log("Thành công lấy brand", res);
            this.optionsBrand = res.data.data; //Gan data vao optionSize
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Xóa thương hiệu
    deleteBrand(item) {
      // Hiển thị thông báo xác nhận
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốn xóa ?",
          text: "Bạn sẽ không thể khôi phục thương hiệu đã xóa!",
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
              .delete(`http://localhost:3838/brands/${item._id}`)
              .then((res) => {
                if (res.data.status === 200) {
                  console.log("Xóa thành công", res);

                  // Thông báo xóa thành công
                  this.$swal.fire({
                    title: "Đã xóa !",
                    text: "Thương hiệu đã được xóa thành công",
                    icon: "success",
                  });

                  // Cập nhật danh sách sản phẩm (giả sử bạn đã có hàm này là getAllProduct())
                  this.getAllBrand();
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
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },

    changeTable(selected) {
      this.selectedTable = selected;
    },
    searchProduct() {
      axios
        .post(`http://localhost:3838/products/search/${this.search}`)
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
