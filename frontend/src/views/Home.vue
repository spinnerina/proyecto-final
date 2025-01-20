<script setup>
import { reactive, ref, onMounted } from 'vue';
import axiosInstance from '../config/axiosInstance.js';
import { useRouter } from 'vue-router';

const data = reactive({
    selectedProductId: null,
    selectedProductName: '',
    confirmModal: null,
    minPrice: '',
    maxPrice: ''
});
const products = ref([]);
const categories = ref([]);
const productStatistics = ref([]);
const selectedCategory = ref("");
const router = useRouter();

const getAllProduct = async () => {
    products.value = [];
    const { status, data } = await axiosInstance.get('products');
    if (status == 200) {
        products.value = data;
        getStat();
    }
}

const getProductFilter = async () => {
    products.value = [];
    const token = sessionStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const json = {
        category: selectedCategory.value,
        minPrice: data.minPrice,
        ...(data.maxPrice > 0 && { maxPrice: data.maxPrice })
    };
    const { status, data: responseData } = await axiosInstance.post('products/filter', json, config);
    if (status === 200) {
        products.value = responseData;
    }
};

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

const getStat = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { status, data } = await axiosInstance.get('products/stats', config);
        if (status === 200) {
            productStatistics.value = data;
        }
    } catch (error) {
        alert(`Error al traer las categorías: ${error.message || error}`);
    }
};

const deleteProduct = async () => {
    if (data.selectedProductId !== null) {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const { status } = await axiosInstance.delete(`products/${data.selectedProductId}`, config);
            if (status === 200) {
                getAllProduct();
            }
        } catch (error) {
            alert('Error al eliminar el producto:', error);
        } finally {
            closeModal();
            data.selectedProductId = null;
            data.selectedProductName = '';
        }
    }
};

const showConfirmModal = (_id, productName) => {
    data.selectedProductId = _id;
    data.selectedProductName = productName;

    data.confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    data.confirmModal.show();
};

const closeModal = () => {
    if (data.confirmModal) {
        data.confirmModal.hide();
    }
};

const closeSession = () => {
    sessionStorage.removeItem('token');
    router.push({ name: 'login' });
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
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/create" class="nav-link">Crear producto</router-link>
                    </li>
                </ul>
                <div class="d-flex">
                    <a class="btn btn-outline-danger d-flex align-items-center" @click="closeSession()">
                        <i class="bi bi-box-arrow-right me-2"></i> Logout
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Lista de Productos</h4>
                <div class="d-flex gap-2">
                    <!-- Filtro por categoría -->
                    <label for="catergories" class="form-label mb-0 me-2">Categorías:</label>
                    <select v-model="selectedCategory" @change="getProductFilter"
                        class="form-select form-select-sm w-auto" id="catergories">
                        <option value="">Todas las categorías</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                    <!-- Filtro por precio mínimo -->
                    <label for="minPrice" class="form-label mb-0 me-2">Precio mínimo:</label>
                    <input id="minPrice" v-model.number="data.minPrice" @input="getProductFilter" type="number"
                        class="form-control form-control-sm w-auto" placeholder="Precio mínimo" />
                    <!-- Filtro por precio máximo -->
                    <label for="maxPrice" class="form-label mb-0 me-2 ms-2">Precio máximo:</label>
                    <input id="maxPrice" v-model.number="data.maxPrice" @input="getProductFilter" type="number"
                        class="form-control form-control-sm w-auto" placeholder="Precio máximo" />
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
                                        :to="{ name: 'updateProduct', params: { id: product._id } }">
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

    <!-- Cuadro de estadisticas -->
    <div class="statistics container mt-5">
        <h1 class="text-center mb-4">Estadísticas de Productos</h1>
        <div class="table-responsive">
            <table class="table table-striped table-bordered text-center">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Categoría</th>
                        <th scope="col">Cantidad de Productos</th>
                        <th scope="col">Precio Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="stat in productStatistics" :key="stat.category">
                        <td>{{ stat.category }}</td>
                        <td>{{ stat.productCount }}</td>
                        <td>{{ stat.averagePrice | currency }}</td>
                    </tr>
                </tbody>
            </table>
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