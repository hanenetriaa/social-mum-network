<!-- @format -->

<template>
  <div class="container">
    <!-- <hr class="ligne" width="100%" size="100" color="#06daf0" align="center" /> -->
    <div class="header">
      <div>
        <router-link class="Actu" to="/actu">
          <img class="logo" src="./assets/logof.png" />
        </router-link>
      </div>
    </div>
    <nav class="navbar">
      <router-link v-if="!isLoggedIn" class="connexion" to="/"
        >Connexion</router-link
      >
      <router-link v-if="!isLoggedIn" class="inscription1" to="/inscription"
        >Inscription</router-link
      >
      <router-link v-if="isLoggedIn" class="connexion" to="/editprofile"
        >Modifier Profile</router-link
      >
    </nav>
    <div>
      <router-link class="theButton1" to="/actu"> HOME </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },

  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },

  provide() {
    return {
      login: this.login,
      logout: this.logout,
    };
  },
};
</script>

<style lang="scss">
html body {
  margin: 0;
  font-family: "Roboto", sans-serif;
}

.logo {
  width: 100px;
  margin-left: auto;
  display: flex;
  margin-right: auto;
  position: relative;
  top: 20px;
}

.container {
  background-image: url("assets/bkg-img.png");
  background-size: cover;
  background-position: bottom;
  min-height: 100vh;
  background-attachment: fixed;
}

.header {
  width: 100%;
  height: 10vh;
  background-color: #8dd7d0;
}

.inscription1 {
  background-color: black;
  text-decoration: none;
  color: white;
  padding: 5px 25px 5px 25px;
  font-family: "Roboto", sans-serif;
  margin: 5px;
}

.connexion {
  background-color: #8dd7d0;
  text-decoration: none;
  color: white;
  padding: 5px 25px 5px 25px;
  font-family: "Roboto", sans-serif;
  margin: 5px;
}

.navbar {
  margin: 5px;
  padding: 5px;
  gap: 5px;
  display: flex;
  justify-content: end;
}

.theButton1 {
  background-color: #8dd7d0;
  text-decoration: none;
  color: white;
  border: solid 1px;
  padding: 5px 25px 5px 25px;
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: center;
  margin: -12px;
  margin-right: -12px;
  margin-left: -12px;
  padding: 9px;
  margin-left: auto;
  margin-right: auto;
  width: 50px;
}
</style>
