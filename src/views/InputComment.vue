<!-- @format -->

<template>
  <div class="textcomment">
    <button
      class="btnComent"
      v-on:click="textOk = true"
      placeholder="Ajout-Comment"
      v-show="!textOk"
    >
      Ajout-Comment
    </button>
    <div class="commentaire" v-show="textOk">
      <textarea
        id=""
        cols="30"
        rows="2"
        placeholder="Comment"
        v-model="content"
      >
      </textarea>
      <button class="btnComent" @click="Comment">comment</button>
    </div>
  </div>
</template>

<script>
const InputComment = {
  props: {
    successCallback: Function,
    id: String,
  },

  data() {
    return {
      content: "",
      textOk: false,
    };
  },

  methods: {
    // Function promesse pour pouvoir commenter un post et qui prend comme parametre l'id de chaque post
    // ce parametre id va se retrouver dans l'appel de notre fonction sur le bouton commenter ci-dessus
    async Comment() {
      let response = await fetch(
        "https://snapi-ghis.osc-fr1.scalingo.io/post/comment",
        {
          method: "POST",
          body: JSON.stringify({
            postId: this.id,
            content: this.content,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("local"),
          },
        }
      );

      // Condition qui donne l'acces pour commenter
      if (response.status === 200) {
        // Rappel de la fonction qui affiche les posts
        this.successCallback();
        this.content = "";
        this.textOk = false;
      }
    },
  },
};
export default InputComment;
</script>
<style scoped>
.btnComent {
  background-color: rgba(0, 0, 0, 0.445);
  text-decoration: none;
  color: white;
  border: solid 1px;
  padding: 5px 25px 5px 25px;
  font-family: "Roboto", sans-serif;
}
.commentaire {
  font-family: "Roboto", sans-serif;
  background: #8dd7d0;
  border: none;
  padding: 1rem 0.5rem;
  color: #fff;
  font-size: 11px;
  text-align: left;
  min-width: 5rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
}

.textcomment {
  font-family: "Roboto", sans-serif;
  background: #8dd7d0;
  border: none;
  padding: 1rem 0.5rem;
  color: #fff;
  font-size: 11px;
  text-align: left;
  min-width: 5rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
