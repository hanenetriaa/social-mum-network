<!-- @format -->

<template>
  <div class="inscription">
    <nav></nav>
    <br />
    <br />
    <div class="form">
      <h3>REGISTER</h3>
      <!---->
      <form class="register-form" action="submit" v-on:submit.prevent>
        <input
          type="text"
          id="firstname"
          v-model="user.firstname"
          placeholder="Firstname"
        />

        <br /><input
          type="text"
          id="lastname"
          v-model="user.lastname"
          placeholder="Lastname"
        />

        <br /><input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="E-mail"
        />

        <br /><input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="Password"
        />

        <div class="checkboxdiv">
          <input type="checkbox" id="checkbox" />
          <label class="cgv" for="checkbox">
            I have read and accept the terms and conditions</label
          >
        </div>

        <br /><button type="submit" value="Valider" @click="firstRegister">
          Validate
        </button>
      </form>
    </div>
  </div>
</template>

<script>
const Inscription = {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async firstRegister() {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/register",
        {
          method: "POST",
          body: JSON.stringify(this.user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    },
  },
};
export default Inscription;
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  border: solid 3px #8dd7d0;
  border-top: solid 100px#8dd7d0;
  height: 100vh;
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
.form input:not([type="checkbox"]) {
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

.cgv {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}

.checkboxdiv {
  display: flex;
  flex-direction: row;
}
</style>
