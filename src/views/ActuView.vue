<!-- @format -->

<template>
  <div class="Actu">
    <h1></h1>
  </div>

  <!-- Button de log Out -->
  <button v-show="!logout && token" class="logout" @click="removeToken">
    Log Out
  </button>

  <div class="grosseBoite">
    <div class="">
      <h1 class=""></h1>
    </div>
    <div class="postBack" v-show="!logout && token">
      <div class="titlePost">
        <h2 class="titlePost2">My posts</h2>
      </div>
      <form>
        <div class="form-post-content">
          <input type="text" placeholder="Title" v-model="newPost.title" />
        </div>
        <div class="form-post-content">
          <textarea
            class="hello"
            name=""
            id=""
            rows="3"
            placeholder="Content"
            v-model="newPost.content"
          ></textarea>
        </div>

        <div class="petiteBoite">
          <button @click.prevent="Post" class="theButton">Post !</button>
        </div>
      </form>
    </div>

    <!-- Box Profile -->
    <div class="boxTotal" v-if="showProfile === true">
      <div class="profileBox" >
        <div class="profileTxt">
          <h2>{{ userProfile.firstname }} {{ userProfile.lastname }}</h2>
        </div>
        <div class="profileTxt">Age: {{ userProfile.age }}</div>
        <div class="profileTxt">E-mail: {{ userProfile.email }}</div>
        <div class="profileTxt">{{ userProfile.occupation }}</div>
        <div class="profileBtn"><span @click="showBox()">Close box</span></div>
      </div>
    </div>

    <div class="newPost">
      <ul>
        <!-- Affichage de chaque commentaire (titre et contenu) depuis le tableau feeds-->
        <li class="kikou" v-for="(element, index) in feeds" :key="index">
          <strong><span class="profileLink" @click="showBoxProfil(element)"
                  >{{ element.firstname }} {{ element.lastname }}</span
                ></strong>
          <br />
          <i>{{ element.title }} </i><br />
          {{ element.content }} <br />
          <!-- Boutton pour commenter qui appel notre fonction Comment avec en parametre(element._id)
          par rapport à chaque post -->
          <br />
          <hr color="#8dd7d0" />
          <br />
          <div class="lesButtons">
            <button
              v-show="!logout && token"
              @click="Like(element._id, index)"
              class="js-like-button like-btn"
            >
              ♥︎&nbsp;
              {{ element.likes.length }}
            </button>
            <!--creation du bouton Like, avec le rappel de la fonction Like lié a un seul id-->
            <InputComment
              :id="element._id"
              :successCallback="subscribeToFeed"
              v-show="!logout && token"
            />
          </div>
          <br />

          <!-- Affichage de chaque commentaire sous le post correspondant grâce 
            au tableau des commentaires ici "element.comments"-->
          <div class="stylebox">
            <p
              class="commentbox"
              v-for="(comment, index) in element.comments"
              :key="index"
            >
              <strong>
                <span class="profileLink" @click="showBoxProfil(comment)"
                  >{{ comment.firstname }} {{ comment.lastname }}</span
                >
              </strong>
              <br />
              {{ comment.content }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import InputComment from "./InputComment";
//CREATION du composant Feed
const Actu = {
  components: {
    InputComment,
  },

  inject: {
    logoutUser: {
      from: "logout",
    },
  },

  data() {
    return {
      // Tableau objet feeds qui va contenir l'ensemble des posts
      feeds: [],
      // Objet correspodant à un post avec un titre et son contenu
      newPost: {
        title: "",
        content: "",
      },

      content: "",
      // Creation d'un data token qui fait reference à l'acces
      token: "",
      logout: false,

      // Show profile
      showProfile: false,

      // User Comment
      userProfile: {
        firstname: "",
        lastname: "",
        age: "",
        email: "",
        occupation: "",
      },
    };
  },

  // Creation d'une fonction qui au mountage va recuperer notre token dans le localStorage
  mounted() {
    this.token = localStorage.getItem("local");
    console.log(this.token);
    this.subscribeToFeed();
  },
  // METHODS
  methods: {
    // Method qui supprime le Token du local storage pour Log Out
    removeToken() {
      localStorage.removeItem("local");
      this.$router.push("/");
      this.logoutUser();
    },

    // Show profile
    showBox() {
      this.showProfile = !this.showProfile;
      console.log(`on est dans ShowBox`);
      console.log(this.showProfile);
    },

    async showBoxProfil(comment) {
      let id = comment.userId;
      console.log(id);
      const promise = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/user/" + id,
        {
          method: "GET",
          parameters: JSON.stringify(id),
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + this.token,
          },
        }
      );

      const userComment = await promise.json();

      console.log(userComment);

            this.showProfile = !this.showProfile;

      this.userProfile.firstname = userComment.firstname;
      this.userProfile.lastname = userComment.lastname;
      this.userProfile.age = userComment.age;
      this.userProfile.email = userComment.email;
      this.userProfile.occupation = userComment.occupation;
    },
    async Post() {
      // Envoie de la requête avec fetch
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/post",
        {
          method: "POST",
          body: JSON.stringify(this.newPost),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        }
      );

      console.log(response);
      // Condition qui donne l'acces pour poster
      if (response.status === 200) {
        this.subscribeToFeed();
        this.newPost.title = "";
        this.newPost.content = "";
      }
    },

    // Function promesse va recuperer les posts depuis le serveur pour les afficher par la suite
    async subscribeToFeed() {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/posts"
      );

      let data = await response.json();
      // Remplissage de notre tableau feeds avec tous les posts
      this.feeds = data.posts;
    },

    //CREATION DE LA FONCTION LIKE
    async Like(id) {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/post/like",
        {
          method: "POST",
          body: JSON.stringify({
            postId: id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.subscribeToFeed();
      console.log(response);
    },
  },
};

// Exportation de notre composant
export default Actu;
</script>

<style scoped>
.boxTotal {
  z-index: 10;
  width: 100vw;
  top:0px;
  left: 0px;
  height: 100vh;
  position:fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.500);
}
.profileLink {
  cursor: pointer;
}
.profileBox {
  background-color: white;
  padding: 25px 50px;
  width: fit-content;
  height: fit-content;
  font-family: "Roboto", sans-serif;
}

.profileTxt {
  width: 100%;
  font-size: medium;
  font-weight: 400;
}

.profileBtn {
margin-top: 30px;
align-items: center;
}

.profileBtn span {
  padding: 10px 25px;
  background-color: #8dd7d0;
  font-size: medium;
  font-weight: 400;
  cursor: pointer;
}

.profileTxt h2 {
  font-weight: 400;
}

ul {
  list-style: none;
}
.theButton {
  background-color: rgba(0, 0, 0, 0.445);
  text-decoration: none;
  color: white;
  border: solid 1px;
  padding: 5px 25px 5px 25px;
  font-family: "Roboto", sans-serif;
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

.petiteBoite {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.petiteBoite button {
  cursor: pointer;
}
.form-post-content {
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 10px;
  font-family: "Roboto", sans-serif;
}

.form-post-content input,
textarea {
  width: 100%;
}

.form-post-content input::placeholder,
textarea::placeholder {
  width: 100%;
  font-family: "Roboto", sans-serif;
  font-size: medium;
}

.grosseBoite {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  font-family: "Roboto", sans-serif;
}

.hello {
  height: 5vh;
}
.postBack {
  border: 1px solid #8dd7d0;
  padding: 20px;
  background-color: #8dd7d0;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  width: 55%;
  font-family: "Roboto", sans-serif;
}

.newPost {
  display: flex;
  justify-content: center;
  width: 55%;
}

.kikou {
  margin: 15px;
  padding: 15px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color: white;
}

.lesButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.like-btn {
  background: #8dd7d0;
  border: none;
  padding: 1rem 0.5rem;
  color: #fff;
  text-align: left;
  min-width: 5rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
}

.like-btn__spinner {
  vertical-align: middle;
}
.commentbox {
  border-color: none;
  font-family: "Roboto", sans-serif;
  background-color: rgb(245, 243, 243);
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
}

.stylebox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.titlePost {
  text-align: center;
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: center;
}

.titlePost2 {
  border: 1px solid black;
  border-right: none;
  border-left: none;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
}
</style>
