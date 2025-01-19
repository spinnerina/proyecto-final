import { createRouter, createWebHistory } from 'vue-router';

//Views
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import CreateProduct from '@/views/Create.product.vue';
import Product from '@/views/Product.vue';
import UpdateProduct from '@/views/Update.product.vue';


//Routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/create',
        name: 'createProduct',
        component: CreateProduct
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product
    },
    {
        path: '/product/update/:id',
        name: 'updateProduct',
        component: UpdateProduct
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;