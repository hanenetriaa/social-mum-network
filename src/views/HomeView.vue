<!-- @format -->

<template>
  <div class="home">
    <div class="login-page">
      <div class="form">
        <h3>SIGN IN</h3>

        <form class="login-form" action="submit" v-on:submit.prevent>
          <input
            type="email"
            id="email"
            v-model="user.email"
            placeholder="EMAIL"
          />
          <input
            type="password"
            id="password"
            v-model="user.password"
            placeholder="PASSWORD"
          />
          <button @click="Conect">login</button>
          <router-link class="message" to="/inscription"
            >Inscription</router-link
          >
          <router-view />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// Déclaration de notre composant Home
const Home = {
  inject: ["login"],

  data() {
    return {
      // Déclaration de notre objet user avec email mot de passe et le token
      user: {
        email: "",
        password: "",
        token: "",
      },
    };
  },

  methods: {
    async Conect() {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/login",
        {
          method: "POST",
          body: JSON.stringify(this.user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      let data = await response.json();

      if (data.success) {
        localStorage.setItem("local", data.token);
        this.$router.push("/Actu");
        this.login();
      }
    },
  },
};
export default Home;
</script>

<style lang="scss" scoped>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  font-family: "Roboto", sans-serif;
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #8dd7d0;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #8dd7d0;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}
.form .message a {
  color: #8dd7d0;
  text-decoration: none;
}

body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
