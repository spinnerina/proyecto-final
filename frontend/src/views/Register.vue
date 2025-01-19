<script>
import axiosInstance from '../config/axiosInstance.js';
export default {
    data() {
        return {
            isRegister: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    computed: {
        showAlert() {
            return this.password && this.confirmPassword && this.password !== this.confirmPassword;
        },
    },
    methods: {
        async handleRegister() {
            if (!this.showAlert) {
                const json = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }
                try {
                    const res = await axios.post('auth/register', json);
                    if (res.status == 201) {
                        this.isRegister = true;
                        setTimeout(() => {
                            this.name = '';
                            this.email = '';
                            this.password = '';
                            this.confirmPassword = '';
                            this.isRegister = false;
                        }, 2000);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
}
</script>

<template>
    <div class="alert alert-danger" v-if="showAlert" role="alert">
        Passwords do not match.
    </div>
    <div class="alert alert-success" v-if="isRegister" role="alert">
        User registered successfully.
    </div>
    <div class="container">
        <div class="form-container">
            <h2>Register</h2>
            <form @submit.prevent="handleRegister">
                <input type="text" v-model="name" placeholder="Name" required />
                <input type="email" v-model="email" placeholder="Email" required />
                <input type="password" v-model="password" placeholder="Password" required />
                <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
                <button type="submit" :disabled="showAlert">Register</button>
            </form>
            <router-link to="/login">Already have an account? Login</router-link>
        </div>
    </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0e4d7;
  display: flex;
  height: 100vh;
  margin: 0;
}

.container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
}

input {
  margin: 0.5rem 0;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #5a6268;
}

router-link{
  margin-top: 1rem;
  color: #6c757d;
  cursor: pointer;
}

router-link:hover {
  text-decoration: underline;
}
</style>