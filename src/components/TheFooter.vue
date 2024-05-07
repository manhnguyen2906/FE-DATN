<template>
  <div>
    <footer>
      <div class="container">
        <div class="row" style="padding-top: 40px">
          <div class="col-md-4 contact">
            <img src="../assets/Logo/logo2.png" alt="" style="height: 150px" />
            <h6><b>THÔNG TIN LIÊN HỆ</b></h6>
            <h6><b>KINGSHOES.VN Trang Thông Tin Chính Thức.</b></h6>
            <p>
              <i class="bi bi-house"></i>
              Phan Đình Giót, Phương Liệt, Thanh Xuân, Hà Nội
            </p>
            <p>Email : cskh.kingshoes.vn@gmail.com</p>
            <p><a href="">https://kingshoes.vn/</a></p>
            <p><a href="">https://twitter.com/KingShoes_vn</a></p>
            <p><a href="">https://instagram.com/KingShoes.vn</a></p>
            <p><a href="">https://facebook.com/pg/www.KingShoes.vn</a></p>
            <p><a href="">https://www.youtube.com/www.KingShoes.vn</a></p>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-6">
                <h6><B>HỖ TRỢ KHÁCH HÀNG</B></h6>
                <p>Chăm sóc khách hàng</p>
                <p>Thanh toán</p>
                <p>Hướng dẫn mua hàng</p>
              </div>
              <div class="col-md-6">
                <h6><b>CHÍNH SÁCH</b></h6>
                <p>Chế độ bảo hành</p>
                <p>Chính sách đổi trả</p>
                <p>Bảo mật thông tin</p>
                <p>Chính sách giao nhận</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>
                  <b>
                    Số ĐKKD: 41N8041309 cấp ngày 17/8/2018. Nơi cấp Ủy Ban Nhân
                    Dân Quận Thanh Xuân. Hộ Kinh Doanh: KINGSHOES. Hotline:
                    0356.422.999</b
                  >
                </p>
                <h6 style="text-align: center"><b>CHỨNG NHẬN</b></h6>
                <img
                  src="../assets/Logo/logoSaleNoti.png"
                  alt=""
                  style="width: 90%"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <h6><b>FANPAGE</b></h6>
            <div class="fanpage">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61552818364939&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="130"
                style="border: none; overflow: hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
          <div class="col-12"></div>
        </div>
      </div>
      <hr />
      <h4 style="text-align: center">&copy;KINGSHOES.VN</h4>
    </footer>
  </div>
</template>
            
      <script>
export default {
  name: "the-footer",
  props: {
    msg: String,
  },
};
</script>
            
<style scoped>
footer {
  background-color: #f0f0f0;
}
a {
  text-decoration: none;
  /* color: #000; */
  color: inherit;
}

.contact a:hover {
  color: #fed700;
}
</style>