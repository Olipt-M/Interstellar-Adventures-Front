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
                    <div class="container-input-login">
                        <label for="email">Email :</label>
                        <input type="email" id="email" placeholder="myemail@mail.com">
                    </div>
                    <div class="container-input-login">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" placeholder="**********">
                    </div>
                </div>
            </form>

            <form action="" v-else="!displayLogin">
                <div class="container-signin">
                    <div class="container-form-up">
                        <div class="container-input-signin">
                            <label for="firstname">Prénom :</label>
                            <input type="text" id="firstname" placeholder="Hector">
                        </div>
                        <div class="lign-form-middle">
                        </div>
                        <div class="container-input-signin">
                            <label for="lastname">Nom :</label>
                            <input type="text" id="lastname" placeholder="Lilas">
                        </div>
                        <div class="container-form-middle">
                            <div class="container-input-signin">
                                <label for="email">Email :</label>
                                <input type="email" id="email" placeholder="myemail@mail.com">
                            </div>
                            <div class="lign-form-middle">
                            </div>
                            <div class="container-input-signin">
                                <label for="confEmail">Confirmation de l'email :</label>
                                <input type="email" id="confEmail" placeholder="myemail@mail.com">
                            </div>
                        </div>
                    </div>
                    <div class="container-form-low">
                        <div class="container-input-signin">
                            <label for="password">Mot de passe :</label>
                            <input type="password" id="password" placeholder="**********">
                        </div>
                        <div class="lign-form-middle">
                        </div>
                        <div class="container-input-signin">
                            <label for="confPassword">Confirmation du mot de passe :</label>
                            <input type="password" id="confPassword" placeholder="**********">
                        </div>
                    </div>
                </div>
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
    display: flex;
    justify-content: center;
    height: calc(100vh - 200px);
}

.container-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    border: 1px solid $color-light;
    border-radius: 1%;
    margin-top: 5%;
    background-color: $color-dark-blue2;
}

.container-btn {
    display: flex;
    flex-direction: row;
    width: 80%;
    margin-top: 10%;
    margin-bottom: 10%;

    .btn.connexion {
        border-radius: 0.3rem 0 0 0.3rem;
        text-align: center;
    }

    .btn.inscription {
        border-radius: 0 0.3rem 0.3rem 0;
        text-align: center;
    }

    @media (width <=$sm-breakpoint) {
        margin-bottom: 20%;
    }
}

input[type="radio"].btn {
    display: none;
}

input[type="radio"].btn+label {
    width: 50%;
    border: 1px solid transparent;
    padding: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    color: black;
    transition: all 0.5s ease-in-out;
    background-color: #9DC1D7;

    @media (width <=$lg-breakpoint ) {
        font-size: 2.5rem;
    }
}

input[type="radio"].btn:checked+label {
    background-color: $color-light;
    border-color: $color-light;
}

.container-login {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container-signin {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    .container-form-left {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 40%;
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
        width: 40%;
        margin-left: 10%;
    }
}

.container-input-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30%;

    label {
        margin-bottom: 5%;
        color: $color-light;

        @media (width <=$lg-breakpoint ) {
            font-size: 2rem;
        }
    }

    input {
        border-style: none;
        border-radius: 0.5rem;
        padding-left: 1rem;

        @media (width <=$lg-breakpoint ) {
            width: 30rem;
            border-style: none;
            border-radius: 0.5rem;
            padding: 1rem;
            font-size: 2rem;
        }
    }
}

.container-input-signin {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10%;

    label {
        margin-bottom: 5%;
        color: $color-light;

        @media (min-width: $lg-breakpoint ) {
            font-size: 2rem;
        }
    }

    input {
        width: 10rem;
        border-style: none;
        border-radius: 0.5rem;
        padding-left: 1rem;

        @media (width <=$sm-breakpoint) {
            width: 15rem;
            padding: 1rem;
            font-size: 1.5rem;
        }

        @media ($sm-breakpoint < width <=$md-breakpoint ) {
            width: 20rem;
            padding: 1rem;
            font-size: 1.5rem;
        }

        @media (min-width: $lg-breakpoint) {
            width: 30rem;
            padding: 1rem;
            font-size: 2rem;
        }
    }
}


input:focus {
    outline: none;
}

input[type="submit"] {
    width: 24%;
    margin-left: 38%;
    margin-top: 2%;
    margin-bottom: 7%;
    padding: 1rem;
    font-size: 2rem;
}

// @media (width <= $sm-breakpoint) {

// }

// @media ($sm-breakpoint < width <= $md-breakpoint ) {

// }

// @media (width <= $lg-breakpoint ) {

// }

// @media (width <= $xl-breakpoint ) {

// }

// pas besoin de préciser que la width est > à breakpoint précédent </style>
