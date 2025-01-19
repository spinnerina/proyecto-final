<script setup>
import { reactive, ref, onMounted } from 'vue';
import axiosInstance from '../config/axiosInstance.js';

const data = reactive({
    selectedProductId: null,
    selectedProductName: '',
    confirmModal: null,
});
const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");

const getAllProduct = async () => {
    products.value =[];
    if (selectedCategory != "") {
        const json = {
            category: selectedCategory.value
        };
        const { status, data } = await axiosInstance.post('products/filter', json);
        if (status == 200) {
            products.value = data;
            return;
        }
    }
    const { status, data } = await axiosInstance.get('products');
    if (status == 200) {
        products.value = data;
    }
}

const getCategories = async () => {
    try {
        const { status, data } = await axiosInstance.get('products/categories');
        if (status === 200) {
            categories.value = data;
        }
    } catch (error) {
        alert(`Error al traer las categorías: ${error.message || error}`);
    }
};

const deleteProduct = async () => {
    if (this.data.selectedProductId !== null) {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const { status, data } = await axiosInstance.delete(`products/${this.selectedProductId}`, config);
            if (status === 200) {
                getAllProduct();
            }
        } catch (error) {
            alert('Error al eliminar el producto:', error);
        } finally {
            this.closeModal();
            this.data.selectedProductId = null;
            this.data.selectedProductName = '';
        }
    }
}

const showConfirmModal = (_id, productName) => {
    this.data.selectedProductId = _id;
    this.data.selectedProductName = productName;

    this.data.confirmModal = new bootstrap.Modal(this.$refs.confirmModal);
    this.data.confirmModal.show();
}

const closeModal = () => {
    if (this.data.confirmModal) {
        this.data.confirmModal.hide();
    }
}

onMounted(() => {
    getAllProduct();
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
                        <router-link to="/" class="nav-link active">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/create" class="nav-link">Crear producto</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Lista de Productos</h4>
                <div>
                    <select v-model="selectedCategory" @change="getAllProduct" class="form-select form-select-sm w-auto">
                        <option value="">Todas las categorías</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-hover table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Category</th>
                            <th scope="col">Fecha Creación</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product._id">
                            <td>{{ product._id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price | currency }}</td>
                            <td>{{ product.stock }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ new Date(product.fechaCreacion).toLocaleDateString('es-ES') }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Actions">
                                    <router-link class="btn btn-sm btn-primary"
                                        :to="{ name: 'product', params: { id: product._id } }">
                                        <i class="bi bi-eye"></i>
                                    </router-link>
                                    <router-link class="btn btn-sm btn-warning" 
                                        :to="{ name: 'updateProduct', params: { id: product._id }}">
                                        <i class="bi bi-pencil"></i>
                                    </router-link>
                                    <button class="btn btn-sm btn-danger"
                                        @click="showConfirmModal(product._id, product.name)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!products.length" class="text-center py-4">
                    <p class="text-muted">No hay productos disponibles</p>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal de Confirmación -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true"
        ref="confirmModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmModalLabel">Confirmar Eliminación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar el producto <strong>{{ selectedProductName }}</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteProduct">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>