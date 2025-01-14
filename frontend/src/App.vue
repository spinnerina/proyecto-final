<script>
export default {
  data() {
    return {
      isLogin: true,
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    handleLogin() {
      // Handle login logic here
      console.log('Logging in with', this.email, this.password);
    },
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Handle register logic here
      console.log('Registering with', this.name, this.email, this.password);
    }
  }
};
</script>

<template>
  <div id="app">
    <div class="container">
      <div class="form-container" v-if="isLogin">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p @click="toggleForm">Don't have an account? Register</p>
      </div>
      <div class="form-container" v-else>
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
          <input type="text" v-model="name" placeholder="Name" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
          <button type="submit">Register</button>
        </form>
        <p @click="toggleForm">Already have an account? Login</p>
      </div>
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

p {
  margin-top: 1rem;
  color: #6c757d;
  cursor: pointer;
}

p:hover {
  text-decoration: underline;
}
</style>