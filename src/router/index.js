import Vue from 'vue'
import VueRouter from 'vue-router'
//Home
import PageHome from '../components/PageHome.vue'


//Nguoi dung
import PageLogin from '../views/user/Login/PageLogin.vue'
import PageAbout from '../views/user/About/PageAbout.vue'
import PageSpa from '../views/user/Spa/PageSpa.vue'
import PageContact from '../views/user/Contact/PageContact.vue'
import PageCart from '../views/user/Cart/PageCart.vue'
import NotFound from '../views/user/NotFound/index.vue'
// import Order from '@/views/user/CheckOut/Order.vue'
import Order from '../views/user/CheckOut/Order.vue'
import SearchProducts from '../views/user/Products/SearchProduct/index.vue'


import PageAdidas from '../views/user/Products/PageAdidas.vue'
import PageNike from '../views/user/Products/PageNike.vue'
import PageJordan from '../views/user/Products/PageJordan.vue'
import PageYeezy from '../views/user/Products/PageYeezy.vue'
import productDetails from '../views/user/Products/ProductDetails/index.vue'
import profile from '../views/user/Login/Profile.vue'

//Admin
import AdminOrder from '../views/admin/orders/index.vue'
import AdminProduct from '../views/admin/products/index.vue'
import AdminUsers from '../views/admin/users/index.vue'
import AdminStatistical from '../views/admin/statistical/index.vue'
// import AdminStaff from '../views/admin/staff/index.vue'


// import sizeManage from '@/views/admin/products/sizeManage.vue'

Vue.use(VueRouter)

const routes = [
  // Nguoi dung
  {
    path: '/',
    name: 'home',
    component: PageHome,
    meta: { requiresAuth: true, roles: ['', 'user'] },
  },
  {
    path: '/adidas',
    name: 'adidas',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageAdidas
  },
  {
    path: '/nike',
    name: 'nike',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageNike
  },
  {
    path: '/jordan',
    name: 'jordan',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageJordan
  },
  {
    path: '/yeezy',
    name: 'yeezy',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageYeezy
  },
  {
    path: '/contact',
    name: 'contact',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageContact
  },
  {
    path: '/about',
    name: 'about',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageAbout
  },
  {
    path: '/spa',
    name: 'spa',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageSpa
  },
  {
    path: '/cart',
    name: 'cart',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: PageCart
  },
  {
    path: '/order',
    name: 'order',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: Order,
    props: true
  },
  {
    path: '/users/productdetails/',
    name: 'productDetails',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: productDetails
  },
  {
    path: '/search',
    name: 'SearchProducts',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: SearchProducts
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: true, roles: ['administrator', '', 'user'] },
    component: PageLogin
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true, roles: ['', 'user'] },
    component: profile
  },

  {
    path: '/access-denied',
    name: 'AccessDenied',
    meta: { requiresAuth: true, roles: ['administrator', '', 'user'] },
    component: NotFound
  },


  //Admin
  {
    path: '/admin/adminorder',
    name: 'order',
    meta: { requiresAuth: true, roles: ['administrator'] },
    component: AdminOrder
  },
  {
    path: '/admin/adminproducts',
    name: 'products',
    meta: { requiresAuth: true, roles: ['administrator'] },
    component: AdminProduct
  },
  {
    path: '/admin/adminusers',
    name: 'users',
    meta: { requiresAuth: true, roles: ['administrator'] },
    component: AdminUsers
  },
  {
    path: '/admin/adminstatistical',
    name: 'statistical',
    meta: { requiresAuth: true, roles: ['administrator'] },
    component: AdminStatistical
  },

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let userRole
  // Kiểm tra xem route có yêu cầu xác thực không
  if (to.meta.requiresAuth) {
    // Kiểm tra vai trò của người dùng từ thông tin đã đăng nhập (ví dụ: từ Vuex hoặc localStorage)
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      userRole = user.role;
    } else {
      userRole = 'user';
      console.log("userRole", userRole);

    }

    // Kiểm tra xem vai trò của người dùng có phù hợp không
    if (userRole && to.meta.roles.includes(userRole)) {
      // Nếu phù hợp, cho phép truy cập
      next();
    } else {
      // Nếu không phù hợp, điều hướng đến trang lỗi hoặc trang không có quyền truy cập
      next('/access-denied');
    }
  } else {
    // Nếu không yêu cầu xác thực, cho phép truy cập bình thường
    next();
  }
});
export default router
