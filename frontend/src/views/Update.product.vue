<script setup>
import axiosInstance from '../config/axiosInstance.js';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const product = ref([]);
const categories = ref([]);
const router = useRouter();
const route = useRoute();
const _id = route.params.id;
const isUpdate = ref(false);

const getProductById = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data, status } = await axiosInstance.get(`products/${_id}`, config);
        if (status === 200) {
            product.value = data;
        }
    } catch (error) {
        alert(`Error al traer el producto: ${error.message || error}`);
    }
}

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

const updateProduct = async () => {
    if (product.value.price > 0) {
        try {
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { status, data } = await axiosInstance.put(`products/${_id}`, product.value, config);
            if (status === 200) {
                isUpdate.value = true;
                setTimeout(() => {
                    isUpdate.value = false;
                }, 2000);
                router.push({ name: 'home' });
            }
        } catch (error) {
            alert(`Error al crear el producto: ${error.message || error}`);
        }
    } else {
        alert('El precio debe ser mayor a 0.');
    }
}

const volver = () => {
    router.push({ name: 'home' });
}

onMounted(() => {
    getProductById();
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
                    <button class="nav-item btn btn-transparent" @click="volver()">
                        <i class="bi bi-arrow-left-circle-fill text-white fs-5"></i>
                    </button>
                </ul>
            </div>
        </div>
    </nav>
    <div class="alert alert-success" v-if="isUpdate" role="alert">
        Producto creado exitosamente.
    </div>
    <div class="container mt-5">
        <div class="container mt-5">
            <h2 class="mb-4">Actualizar Producto</h2>
            <form @submit.prevent="updateProduct">
                <div class="form-group">
                    <label for="name">Nombre del Producto</label>
                    <input type="text" class="form-control" v-model="product.name" minlength="3"
                        placeholder="Ingrese el nombre del producto" required />
                </div>
                <div class="form-group">
                    <label for="description">Descripción</label>
                    <textarea class="form-control" v-model="product.description" rows="3"
                        placeholder="Ingrese la descripción del producto" minlength="3" maxlength="255"
                        required></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Precio</label>
                    <input type="number" class="form-control" v-model="product.price"
                        placeholder="Ingrese el precio del producto" required />
                </div>
                <div class="form-group">
                    <label for="category">Categoría</label>
                    <input type="text" class="form-control" v-model="product.category"
                        placeholder="Ingrese la categoría del producto" list="category-list" required />
                    <datalist id="category-list">
                        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </datalist>
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input type="number" class="form-control" v-model="product.stock"
                        placeholder="Ingrese el stock del producto" required />
                </div>
                <button type="submit" class="btn btn-primary mt-3">Actualizar Producto</button>
            </form>
        </div>
        <div v-if="!product" class="text-center py-4">
            <p class="text-muted">No se encontro el producto con id: {{ _id }}</p>
        </div>
    </div>
</template>

<style></style>