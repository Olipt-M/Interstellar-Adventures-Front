<script setup>
import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
import { ref } from "vue";

const displayLogin = ref(true);

</script>

<template>
    <H1TitleLayout>Interstellar Adventures</H1TitleLayout>
    <main>
        <div class="container-form">
            <div class="container-btn">
                <input type="radio" name="btn" class="btn connexion" id="btn_co" value="formLogin"
                    @click="!displayLogin ? displayLogin = !displayLogin : null" checked>
                <label for="btn_co" class="btn connexion">Connexion</label>

                <input type="radio" name="btn" class="btn inscription" id="btn_ins" value="formSignin"
                    @click="displayLogin ? displayLogin = !displayLogin : null">
                <label for="btn_ins" class="btn inscription">Inscription</label>
            </div>
            <form action="" v-if="displayLogin">
                <div class="container-login">
                    <div class="container-input">
                        <label for="email">Email :</label>
                        <input type="email" id="email" placeholder="myemail@mail.com">
                    </div>
                    <div class="container-input">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" placeholder="**********">
                    </div>
                </div>
                <input type="submit" id="submitBtnCo" value="Connexion">
            </form>

            <form action="" v-else="!displayLogin">
                <div class="container-signin">
                    <div class="container-form-left">
                        <div class="container-input">
                            <label for="firstname">Prénom :</label>
                            <input type="text" id="firstname" placeholder="Hector">
                        </div>
                        <div class="container-input">
                            <label for="email">Email :</label>
                            <input type="email" id="email" placeholder="myemail@mail.com">
                        </div>
                        <div class="container-input">
                            <label for="password">Mot de passe :</label>
                            <input type="password" id="password" placeholder="**********">
                        </div>
                    </div>
                    <div class="lign-form-middle">
                    </div>
                    <div class="container-form-right">
                        <div class="container-input">
                            <label for="lastname">Nom :</label>
                            <input type="text" id="lastname" placeholder="Lilas">
                        </div>
                        <div class="container-input">
                            <label for="confEmail">Confirmation de l'email :</label>
                            <input type="email" id="confEmail" placeholder="myemail@mail.com">
                        </div>
                        <div class="container-input">
                            <label for="confPassword">Confirmation du mot de passe :</label>
                            <input type="password" id="confPassword" placeholder="**********">
                        </div>
                    </div>
                </div>
                <input type="submit" id="submitBtnIns" value="Inscription">
            </form>
        </div>
    </main>
</template>

<style lang='scss' scoped>
@import '../assets/variables';

body {
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
    background-color: $color-dark-blue1;
}

main {
    height: 100%;
    width: 100%;
}

.container-form {
    display: flex;
    flex-direction: column;
    border: 1px solid $color-light;
    border-radius: 1%;
    width: 56%;
    margin-top: 3%;
    margin-bottom: 4%;
    margin-left: auto;
    margin-right: auto;
    background-color: $color-dark-blue2;
}

.container-btn {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 8.5%;
    margin-bottom: 8%;

    .btn.connexion {
        border-radius: 0.3rem 0 0 0.3rem;
        text-align: center;
    }

    .btn.inscription {
        border-radius: 0 0.3rem 0.3rem 0;
        text-align: center;
    }
}

input[type="radio"].btn {
    display: none;
}

input[type="radio"].btn+label {
    height: 5rem;
    width: 50%;
    border: 1px solid transparent;
    background-color: #9DC1D7;
    padding: 1rem;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
    color: black;
    transition: all 0.5s ease-in-out;
}

input[type="radio"].btn:checked+label {
    background-color: $color-light;
    border-color: $color-light;
}

.container-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5%;
}

.container-signin {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 3%;

    .container-form-left {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 50%;
        margin-right: 10%;
    }

    .lign-form-middle {
        height: 18rem;
        border-left: 2px solid $color-light;
        margin-bottom: 1rem;
    }

    .container-form-right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10%;
        width: 50%;
    }
}

.container-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 8%;

    label {
        margin-bottom: 2%;
        color: $color-light;
    }

    input {
        height: 2.8rem;
        width: 17rem;
        border-style: none;
        border-radius: 0.5rem;
        padding-left: 1rem;
    }
}

input:focus {
    outline: none;
}

input[type="submit"] {
    height: 4.5rem;
    width: 24%;
    margin-left: 38%;
    margin-top: 2%;
    margin-bottom: 7%;
    font-size: 2rem;
}
</style>
