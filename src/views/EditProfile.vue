<!-- @format -->

<template>
  <button v-show="!logout && token" class="logout" @click="removeToken">
    Log Out
  </button>
  <div class="editBox">
    <div class="sidebar">
      <div :class="'sidebarItem ' + activeData" @click="changeEditBoxData()">
        Data
      </div>
      <div
        :class="'sidebarItem ' + activeSecurity"
        @click="changeEditBoxSecurity()"
      >
        Security
      </div>
      <div
        :class="'sidebarItem ' + activePrivacity"
        @click="changeEditBoxPrivacity()"
      >
        Privacity
      </div>
      <div
        :class="'sidebarItem ' + activeDelete"
        @click="changeEditBoxDelete()"
      >
        Delete
      </div>
    </div>
    <div class="principal">
      <div class="editPrincipal" id="data" v-if="editBox === ''">
        <div class="titleEdit"><h2>Settings</h2></div>
        <div class="descEdit">
          <p>Click on menu to change anything</p>
        </div>
      </div>

      <div class="editPrincipal" id="data" v-if="editBox === 'dataScreen'">
        <div class="titleEdit"><h2>Personal Data</h2></div>
        <div class="descEdit">If you want change your personal data.</div>
        <div class="inputSecurity">
          <div class="passEdit">
            <div class="passEdit-50">First name</div>
            <div class="passEdit-50">
              <input
                type="text"
                placeholder="Tony"
                v-model="userProfile.firstname"
              />
            </div>
          </div>
          <div class="passEdit">
            <div class="passEdit-50">Last name</div>
            <div class="passEdit-50">
              <input
                type="text"
                placeholder="Stark"
                v-model="userProfile.lastname"
              />
            </div>
          </div>
          <div class="passEdit">
            <div class="passEdit-50">Age</div>
            <div class="passEdit-50">
              <input
                type="number"
                placeholder="Your age"
                v-model="userProfile.age"
              />
            </div>
          </div>
          <div class="passEdit">
            <div class="passEdit-50">Description</div>
            <div class="passEdit-50">
              <textarea
                type="text"
                placeholder="About you"
                v-model="userProfile.occupation"
              ></textarea>
            </div>
          </div>
        </div>
        <div
          class="confirmBtn"
          id="confirmEdit"
          v-if="
            userProfile.firstname != '' &&
            userProfile.lastname != '' &&
            userProfile.age != ''
          "
          @click="ModifyUser()"
        >
          <span>Save changes</span>
        </div>

        <div
          class="confirmFalseBtn"
          id="confirmEdit"
          v-if="
            userProfile.firstname === '' &&
            userProfile.lastname === '' &&
            userProfile.age === ''
          "
        >
          <span>Save changes</span>
        </div>
      </div>

      <div
        class="editPrincipal"
        id="security"
        v-if="editBox === 'securityScreen'"
      >
        <div class="titleEdit"><h2>Security</h2></div>
        <div class="descEdit">
          If you want change your password, insert your new password.
        </div>
        <div class="inputSecurity">
          <div class="passEdit">
            <div class="passEdit-50">Current password</div>
            <div class="passEdit-50">
              <input type="password" placeholder="Type your current password" />
            </div>
          </div>
          <div class="passEdit">
            <div class="passEdit-50">New password</div>
            <div class="passEdit-50">
              <input type="password" placeholder="Type your new password" />
            </div>
          </div>
          <div class="passEdit">
            <div class="passEdit-50">Confirm new password</div>
            <div class="passEdit-50">
              <input type="password" placeholder="Confirm your new password" />
            </div>
          </div>
        </div>
        <div
          class="confirmBtn"
          id="confirmEdit"
          v-if="
            userProfile.currentPassword != '' &&
            userProfile.password != '' &&
            userProfile.newPassword != ''
          "
          @click="ModifyUser()"
        >
          <span>Save changes</span>
        </div>

        <div
          class="confirmFalseBtn"
          id="confirmEdit"
          v-if="
            userProfile.currentPassword === '' &&
            userProfile.password === '' &&
            userProfile.newPassword === ''
          "
        >
          <span>Save changes</span>
        </div>
      </div>

      <div
        class="editPrincipal"
        id="privacity"
        v-if="editBox === 'privacityScreen'"
      >
        <div class="titleEdit"><h2>Privacity</h2></div>
        <div class="descEdit">
          If you want change your e-mail. Your current e-mail is:
          {{ emailProfile.currentEmail }}
        </div>
        <div class="inputSecurity">
          <div class="passEdit">
            <div class="passEdit-50">New email</div>
            <div class="passEdit-50">
              <input
                type="email"
                placeholder="Type your new email"
                v-model="userProfile.email"
              />
            </div>
          </div>
          <div class="passEdit">
            <div class="passEdit-50">Confirm new email</div>
            <div class="passEdit-50">
              <input
                type="email"
                placeholder="Confirm your new email"
                v-model="emailProfile.confirmEmail"
              />
            </div>
          </div>
        </div>
        <div class="passEdit">
          <div class="passEdit-50">Confirm your password</div>
          <div class="passEdit-50">
            <input type="password" placeholder="Type your current password" />
          </div>
        </div>
        <div
          class="confirmBtn"
          id="confirmEdit"
          v-if="
            userProfile.email === emailProfile.confirmEmail &&
            userProfile.email != ''
          "
          @click="ModifyUser()"
        >
          <span>Save changes</span>
        </div>

        <div
          class="confirmFalseBtn"
          id="confirmEdit"
          v-if="
            userProfile.email != emailProfile.confirmEmail ||
            userProfile.email === ''
          "
        >
          <span>Save changes</span>
        </div>
      </div>

      <div class="editPrincipal" id="delete" v-if="editBox === 'deleteScreen'">
        <div class="titleEdit"><h2>Delete Account</h2></div>
        <div class="descEdit">If you want delete your account.</div>
        <div class="inputSecurity">
          <div class="passEdit">
            <div class="passEdit-50">Confirm your password</div>
            <div class="passEdit-50">
              <input type="password" placeholder="Type your current password" />
            </div>
          </div>
        </div>
        <div class="deleteBtn" id="deleteEdit">
          <span>Delete account</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Actu from "../views/ActuView.vue";
const Feed = {
  data() {
    return {
      logout: "",
      userProfile: {
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        occupation: "",
      },
      emailProfile: {
        currentEmail: "",
        confirmEmail: "",
      },

      editBox: "",
      activeData: "",
      activeSecurity: "",
      activePrivacity: "",
      activeDelete: "",

      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("local");
    this.User();
  },
  methods: {
    // Method qui supprime le Token du local storage pour Log Out
    removeToken() {
      localStorage.removeItem("local");
      this.$router.push("/");
    },

    changeEditBoxData() {
      this.editBox = "dataScreen";
      this.activeData = "active";
      this.activeSecurity = "";
      this.activePrivacity = "";
      this.activeDelete = "";
    },
    changeEditBoxPrivacity() {
      this.editBox = "privacityScreen";
      this.activeData = "";
      this.activeSecurity = "";
      this.activePrivacity = "active";
      this.activeDelete = "";
    },
    changeEditBoxSecurity() {
      this.editBox = "securityScreen";
      this.activeData = "";
      this.activeSecurity = "active";
      this.activePrivacity = "";
      this.activeDelete = "";
    },
    changeEditBoxDelete() {
      this.editBox = "deleteScreen";
      this.activeData = "";
      this.activeSecurity = "";
      this.activePrivacity = "";
      this.activeDelete = "active";
    },

    async User() {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        }
      );

      let recuProfile = await response.json();
      console.log(`recuProfile: `, recuProfile);

      if (response.status === 200) {
        this.userProfile.firstname = recuProfile.firstname;
        this.userProfile.lastname = recuProfile.lastname;
        this.emailProfile.currentEmail = recuProfile.email;
        this.userProfile.age = recuProfile.age;
        this.userProfile.occupation = recuProfile.occupation;
      }
    },

    async ModifyUser() {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/user",
        {
          method: "PUT",
          body: JSON.stringify(this.userProfile),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        }
      );
      if (response.status === 200) {
        console.log("ok estou na resposta 200");
        alert(`Sucess!`);
      }
    },
  },
};
export default Feed;
</script>

<style scoped>
.editBox {
  width: 70%;
  margin: 5% 15% 0% 15%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  display: flex;
}
.sidebar {
  width: 20%;
  min-height: 100%;
  display: flex;
  position: relative;
  background-color: #c3f0eb;
  flex-wrap: wrap;
  align-content: start;
}

.sidebar .sidebarItem {
  width: 100%;
  list-style: none;
  font-family: "Roboto", sans-serif;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
  padding: 15px;
  color: grey;
  height: fit-content !important;
}
.sidebar .sidebarItem:hover,
.active {
  width: 93%;
  list-style: none;
  font-family: "Roboto", sans-serif;
  font-size: medium;
  font-weight: 500;
  background-color: #8dd7d0;
  color: white !important;
}

.principal {
  background-color: white;
  width: 80%;

  min-height: 100%;
  margin-left: 0%;
  font-family: "Roboto", sans-serif;
  font-size: medium;
}

.principal .editPrincipal {
  padding: 5px 25px;
}

.editPrincipal .titleEdit h2 {
  font-weight: 400;
  color: #8dd7d0;
}

.editPrincipal .descEdit {
  font-weight: 400;
  margin: 15px 0px;
}

.editPrincipal .passEdit {
  display: flex;
  align-items: center;
  font-size: small;
}

.editPrincipal .passEdit .passEdit-50 {
  width: 35%;
  margin: 8px 0px;
}

.editPrincipal .passEdit .passEdit-50 input {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.editPrincipal .passEdit .passEdit-50 input::placeholder {
  font-family: "Roboto", sans-serif;
  font-size: small;
}

.editPrincipal .confirmBtn {
  display: flex;
  justify-content: center;
  margin-right: 50px;
  margin-top: 15px;
}

.editPrincipal .confirmBtn span {
  background-color: green;
  color: white;
  font-family: "Roboto", sans-serif;
  padding: 5px 15px;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 25px;
}

.editPrincipal .confirmBtn:hover {
  filter: brightness(120%);
}

.editPrincipal .confirmFalseBtn {
  display: flex;
  justify-content: center;
  margin-right: 50px;
  margin-top: 15px;
}

.editPrincipal .confirmFalseBtn span {
  background-color: green;
  color: rgb(255, 255, 255);
  font-family: "Roboto", sans-serif;
  padding: 5px 15px;
  width: fit-content;
  margin-bottom: 25px;
}

.editPrincipal .deleteBtn {
  display: flex;
  justify-content: center;
  margin-right: 50px;
  margin-top: 15px;
}

.editPrincipal .deleteBtn span {
  background-color: red;
  color: white;

  font-family: "Roboto", sans-serif;
  padding: 5px 15px;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 25px;
}

.editPrincipal .deleteBtn:hover {
  filter: brightness(120%);
}
.logout {
  background-color: black;
  border: solid 2px black;
  text-decoration: none;
  color: white;
  padding: 5px 25px 5px 25px;
  font-family: "Roboto", sans-serif;
  position: absolute;
  left: 15px;
  top: 15px;
}
</style>
