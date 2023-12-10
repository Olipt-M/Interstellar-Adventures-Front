<script setup>
import H1TitleLayout from '@/components/layouts/H1TitleLayout.vue';
import MainButton from '@/components/buttons/MainButton.vue';
import { signIn, signUp } from '@/services/api.js';
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
import { useUserStore } from '@/stores/userStore.js';
const userStore = useUserStore();

const displayLogin = ref(true);

const user = ref({
  email: "",
  confEmail: "",
  password: "",
  confPassword: "",
  firstname: "",
  lastname: "",
});

const errorMessage = ref('');

const userSignUp = () => {
    signUp ({
        email: user.value.email, 
        email_confirmation: user.value.confEmail,
        password: user.value.password,
        password_confirmation: user.value.confPassword,
        firstname: user.value.firstname, 
        lastname: user.value.lastname
    })
    // .then(response => console.log(response))
    .then(response => {
        userStore.authenticateUser(response);
        router.push({ name: 'account' })
    })
    .catch(error => console.error(error));
}
const userSignIn = () => {
    signIn ({
        email: user.value.email, 
        password: user.value.password
    })
    // .then(response => console.log(response))
    .then(response => {
        userStore.authenticateUser(response);
        router.push({ name: 'account' })
    })
    .catch(error => {
        errorMessage.value = error.data.message;
        throw errorMessage.value;
    });
}
</script>

<template>
    <main>
        <H1TitleLayout v-if="displayLogin">Connexion</H1TitleLayout>
        <H1TitleLayout v-else>Inscription</H1TitleLayout>

        <div class="container-form">
            <div class="container-btn">
                <input type="radio" name="btn" class="btn connexion" id="btn_co" value="formLogin"
                    @click="!displayLogin ? displayLogin = !displayLogin : null" checked>
                <label for="btn_co" class="btn connexion">Connexion</label>

                <input type="radio" name="btn" class="btn inscription" id="btn_ins" value="formSignIn"
                    @click="displayLogin ? displayLogin = !displayLogin : null">
                <label for="btn_ins" class="btn inscription">Inscription</label>
            </div>
        </div>

        <div v-if="displayLogin">
            <form id="login" method="POST" @submit.prevent="userSignIn">
                <div class="login-container">
                    <div class="form-group">
                        <div class="form-item-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" v-model="user.email" autocomplete="email"/>
                        </div>
                        <div class="form-item-group">
                            <label for="password">Mot de passe</label>
                            <input type="password" name="password" v-model="user.password" autocomplete="current-password"/>
                        </div>
                    </div>

                    <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>

                    <MainButton type="submit" class="main-button">Valider</MainButton>
                </div>
            </form>
        </div>

        <section id="createAccount">
            <div v-if="!displayLogin">
                <form method="POST" @submit.prevent="userSignUp">
                    <div class="container">
                        <div class="form-group">
                            <div class="form-item-group">
                                <label for="inputFirstname">Prénom *</label>
                                <input type="text" name="firstname" id="inputFirstname" v-model="user.firstname" autocomplete="given-name"/>
                            </div>
                            <div class="form-item-group">
                                <label for="inputLastname">Nom *</label>
                                <input type="text" name="lastname" id="inputLastname" v-model="user.lastname" autocomplete="family-name"/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="form-item-group">
                                <label for="inputEmail">Email *</label>
                                <input type="email" name="email" id="email" v-model="user.email" autocomplete="email"/>
                            </div>
                            <div class="form-item-group">
                                <label for="inputEmailConfirm">Confirmer email *</label>
                                <input type="email" name="email_confirmation" id="inputEmailConfirm" v-model="user.confEmail" autocomplete="email"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-item-group">
                                <label for="inputPassword">Mot de passe *</label>
                                <input type="password" name="password" id="inputPassword" v-model="user.password" autocomplete="current-password"/>
                            </div>
                            <div class="form-item-group">
                                <label for="inputPasswordConfirm">Confirmer le mot de passe *</label>
                                <input type="password" name="password_confirmation" id="inputPasswordConfirm" v-model="user.confPassword" autocomplete="current-password"/>
                            </div>
                        </div>

                        <p>* Champs obligatoires</p>

                        <MainButton type="submit" class="main-button"> Valider</MainButton>
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>


<style lang='scss' scoped>

.main-button {
    display: block;
    margin: 0 auto;
}

p {
    text-align: center;
    color: $color-light;
}

#createAccount {
    width: 90vw;
    margin: 1rem auto;
    padding: 3rem;
    box-sizing: border-box;
}

#login{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    margin: 5rem auto;
    background-color: $color-dark-blue2;
    width: 40vw;
    padding: 3rem;
    box-sizing: border-box;
    border-radius: 1rem;

    .login-container {
        padding: 2rem;
    }

    form {
        width: 90%;
        padding: 4rem;

        label {
            display: none;
        }

        input {
            width: 100%;
            margin-bottom: 2rem;
            border-radius: 0.5rem;
        }

        input:not([type="submit"]) {
            background: transparent;
            color: $color-light;
            border: 0.1rem solid $color-dark-blue2;
            padding: 1rem 1.5rem;

            &:focus {
                outline: 0;
                border-color: darken($color-night-blue, 15%);
            }
        }
    }

    .btn {
        display: block;
        margin: 0 auto;
        width: 50%;
    }
}

.container-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-dark-blue1;
}

.container-form {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-dark-blue2;
    width: fit-content;
    margin: 2.5rem auto;
}

input[type="radio"].btn {
    display: none;
}

input[type="radio"].btn+label {
    width: 50%;
    border: 1px solid;
    border-radius: 0.5rem;
    margin: 0.5rem;
    padding: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    color: $color-light;
    text-align: center;
    transition: all 0.3s ease-in-out;
    background-color: $color-dark-blue2;

    &:hover {
        background-color: $color-light;
        border-color: $color-light;
        color: $color-night-blue;
    }

    @media (width <=$lg-breakpoint ) {
        font-size: 2.5rem;
    }
}

input[type="radio"].btn:checked+label {
    background-color: $color-light;
    border-color: $color-light;
    color: $color-night-blue;
}

.container {
    background: $color-dark-blue2;
    padding: 4rem;
    border-radius: 1rem;
}
.form-group {
    display: flex;
    justify-content: space-around;

    .form-item-group {
        flex-basis: 45%;
        margin-bottom: 3rem;

        display: flex;
        flex-direction: column;
        text-align: left;

        input {
            border-radius: 1rem;
        }
    }

    label {
        text-transform: uppercase;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: $color-light;
    }

    input {
        background: $color-light;
        color: $color-night-blue;
        border: 0.1rem solid $color-night-blue;
        padding: 1rem 1.5rem;

        &:focus {
            outline: 0;
            border-color: darken($color-dark-blue2, 35%);
        }
    }
}

.login-container .form-group {
    display: flex;
    gap: 3rem;
}

.errorMessage {
    color: $color-alert;
}
</style> 