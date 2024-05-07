<template>
  <div>
    <div><TheHeader /></div>
    <div class="container" style="margin-top: 50px">
      <div class="row">
        <div class="contact col-md-6">
          <div class="thongtin">
            <h4><b>KING SHOES KÊNH THÔNG TIN CHÍNH THỨC </b></h4>
            <p style="font-style: oblique; color: #a5a5a5">Thông tin liên hệ</p>
            <hr />
            <div class="container-contact">
              <h5>KINGSHOES.VN Trang Thông Tin Chính Thức.</h5>
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
              <p>☎️ Hotline Bán Hàng: 0909.300.746 - 0909.45.0001</p>
              <p>☎️ Hotline CSKH: 0902.368.001</p>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/epcfWIT_Ais"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div class="contact col-md-6">
          <div class="container">
            <div class="lienhe">
              <h3 class="ps-section__title" data-mask="LIÊN HỆ">
                - Với chúng tôi
              </h3>
              <div class="contact-box">
                <div class="right">
                  <input type="text" class="field" placeholder="Tên bạn*" />
                  <input type="text" class="field" placeholder="Email*" />
                  <input type="text" class="field" placeholder="Điện thoại*" />
                  <textarea placeholder="Nội Dung" class="field"></textarea>
                  <button class="btn">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact" style="margin-bottom: 50px; margin-top: 1px">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.94941242857888!2d106.65353722261744!3d10.796709437749403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a490ac0839%3A0x95c47664bcd7d113!2zS0lORyBTSE9FUyAtIEPhu61hIGjDoG5nIGdpw6B5IFNuZWFrZXIgY2jDrW5oIGjDo25nIHThuqFpIEhDTQ!5e0!3m2!1svi!2s!4v1660110090209!5m2!1svi!2s"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <div><TheFooter /></div>
  </div>
</template>
        
  <script>
import TheHeader from "../../../components/TheHeader.vue";
import TheFooter from "../../../components/TheFooter.vue";
export default {
  name: "PageAbout",
  props: {
    msg: String,
  },
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
        
<style scoped>
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: #fed700;
}
p {
  font-size: 15px;
  margin-top: 0 !important;
}
input,
textarea {
  border-radius: 7px;
}
.thongtin {
  border-radius: 2%;
  padding: 20px;
  margin-bottom: 50px;
  background-color: #f0f0f0;
}

.lienhe {
  padding-left: 20px;
}

.contact-box {
  border-radius: 2%;
  margin-bottom: 40px;
  padding: 10px;
  box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.19);
}

/* 
.contact-box {
    box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.19);
} */

.field {
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: 0.3s;
}

.field:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

textarea {
  min-height: 150px;
}

.btn {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #fed700;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background-color: #ebc802;
}

.field:focus {
  border: 2px solid #fed700;
  background-color: #fff;
}

@media screen and (max-width: 880px) {
  .contact-box {
    grid-template-columns: 1fr;
  }
  .left {
    height: 200px;
  }
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
</style>