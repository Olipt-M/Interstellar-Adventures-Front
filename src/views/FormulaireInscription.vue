<script setup>

</script>

<template>

    <main>
        <form action="">
            <div class="container-btn">
                <input type="radio" name="btn" class="btn connexion" id="btn_co" checked>
                <label for="btn_co" class="btn connexion">Connexion</label>

                <input type="radio" name="btn" class="btn inscription" id="btn_ins">
                <label for="btn_ins" class="btn inscription">Inscription</label>
            </div>
            <div class="container">
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
                        <label for="confPassword">Mot de passe :</label>
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
            <input type="submit" id="submitBtn" value="Inscription">
        </form>
    </main>
</template>

<style lang='scss' scoped>
  body {
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
    background-color: black;
}

main {
    height: 100%;
    width: 100%;
}

form {
    display: flex;
    flex-direction: column;
    border: 1px solid #E7F6FF;
    border-radius: 1%;
    width: 50%;
    height: 70%;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    background-color: #1D3B4D;
}

.container-btn {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 9%;
    margin-bottom: 10%;
}

input[type="radio"].btn {
    display: none;
}

input[type="radio"].btn+label {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    color: black;
    background-color: #9DC1D7;
    border: 1px solid transparent;
    transition: all 0.5s ease-in-out;
    width: 50%;
}

input[type="radio"].btn:checked+label {
    background-color: #E7F6FF;
    border-color: #E7F6FF;
}

.btn.connexion {
    border-radius: 0.3rem 0 0 0.3rem;
    text-align: center;
}

.btn.inscription {
    border-radius: 0 0.3rem 0.3rem 0;
    text-align: center;
}

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.container-form-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
}

.lign-form-middle {
    height: 70%;
    border-left: 2px solid #E7F6FF;
    margin-bottom: 1%;
}

.container-form-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
}

.container-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 8%;
}

label {
    margin-bottom: 2%;
    color: #E7F6FF;
}

input {
    height: 2rem;
    width: 17rem;
    border-style: none;
    border-radius: 0.5rem;
    padding-left: 1rem;
}

input:focus {
    outline: none;
}

input[type="submit"] {
    height: 6%;
    width: 25%;
    margin: auto;
}
</style>