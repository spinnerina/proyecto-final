<script setup>
import { ref, reactive, onMounted } from 'vue';
import axiosInstance from '../config/axiosInstance.js';
import {  useRouter } from 'vue-router';

// Reactive state
const form = reactive({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
});
const categories = ref([]);
const isCreated = ref(false);
const router = useRouter();

// Fetch categories on component mount
const getCategories = async () => {
    try {
        const { data, status } = await axiosInstance.get('products/categories');
        if (status === 200) {
            categories.value = data;
        }
    } catch (error) {
        alert(`Error al traer las categorías: ${error.message || error}`);
    }
};

// Create a new product
const createProduct = async () => {
    if (form.price > 0) {
        try {
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { status, data } = await axiosInstance.post('products', form, config);
            if (status === 201) {
                isCreated.value = true;
                setTimeout(() => {
                    Object.assign(form, { name: '', description: '', price: 0, stock: 0, category: '' });
                    isCreated.value = false;
                    router.push({ name: 'home' });
                }, 2000);
            }
        } catch (error) {
            alert(`Error al crear el producto: ${error.message || error}`);
        }
    } else {
        alert('El precio debe ser mayor a 0.');
    }
};

// Lifecycle hook
onMounted(() => {
    getCategories();
});
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Products App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/create" class="nav-link active">Crear producto</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="alert alert-success" v-if="isCreated" role="alert">
        Producto creado exitosamente.
    </div>
    <div class="container mt-5">
        <h2 class="mb-4">Crear Nuevo Producto</h2>
        <form @submit.prevent="createProduct">
            <div class="form-group">
                <label for="name">Nombre del Producto</label>
                <input type="text" class="form-control" v-model="form.name" minlength="3"
                    placeholder="Ingrese el nombre del producto" required />
            </div>
            <div class="form-group">
                <label for="description">Descripción</label>
                <textarea class="form-control" v-model="form.description" rows="3"
                    placeholder="Ingrese la descripción del producto" minlength="3" maxlength="255" required></textarea>
            </div>
            <div class="form-group">
                <label for="price">Precio</label>
                <input type="number" class="form-control" v-model="form.price"
                    placeholder="Ingrese el precio del producto" required />
            </div>
            <div class="form-group">
                <label for="category">Categoría</label>
                <input type="text" class="form-control" v-model="form.category"
                    placeholder="Ingrese la categoría del producto" list="category-list" required />
                <datalist id="category-list">
                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </datalist>
            </div>
            <div class="form-group">
                <label for="stock">Stock</label>
                <input type="number" class="form-control" v-model="form.stock"
                    placeholder="Ingrese el stock del producto" required />
            </div>
            <button type="submit" class="btn btn-primary mt-3">Crear Producto</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
}

h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 1.5rem;
}

.btn {
    display: block;
    width: 100%;
}
</style>
