<script>
import axiosInstance from '../config/axiosInstance.js';
export default {
    data() {
        return {
            isRegister: false,
            isCorrect: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        async handleLogin() {
            const json = {
                email: this.email,
                password: this.password,
            };
            try {
                const res = await axiosInstance.post('auth/login', json);
                if (res.status == 200) {
                    sessionStorage.setItem('token', res.data.token);
                    this.$router.push({ name: "home" });
                }
            } catch (error) {
                this.isCorrect = true;
                setTimeout(() => {
                    this.isCorrect = false,
                        this.password = ''
                }, 2000);
            }
        },
    }
}
</script>

<template>
    <div class="alert alert-danger" v-if="isCorrect" role="alert">
        Login incorrect.
    </div>
    <div class="container">
      <div class="form-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <router-link to="/register">Don't have an account? Register</router-link>
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