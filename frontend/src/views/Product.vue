<script setup>
import axiosInstance from '../config/axiosInstance.js';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const product = ref([]);
let _id = ''
const router = useRouter();
const route = useRoute();

const getProductById = async () => {
    try {

        _id = route.params.id;
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

const volver = () => {
    router.push({ name: 'home' });
}

onMounted(() => {
    getProductById();
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
    <div class="container mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h2>{{ product.name }}</h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><strong>ID:</strong> {{ product._id }}</li>
                    <li class="list-group-item"><strong>Description:</strong> {{ product.description }}</li>
                    <li class="list-group-item"><strong>Price:</strong> ${{ product.price }}</li>
                    <li class="list-group-item"><strong>Stock:</strong> {{ product.stock }}</li>
                    <li class="list-group-item"><strong>Category:</strong> {{ product.category }}</li>
                    <li class="list-group-item"><strong>Date:</strong> {{ product.fechaCreacion }}</li>
                </ul>
            </div>
        </div>
        <div v-if="!product" class="text-center py-4">
            <p class="text-muted">No se encontro el producto con id: {{ _id }}</p>
        </div>
    </div>
</template>

<style>
.card-header {
    background-color: #007bff;
    color: white;
}

.card-footer {
    background-color: #f8f9fa;
}

.btn-transparent {
    background-color: transparent;
    border: none;
    box-shadow: none;
}
</style>