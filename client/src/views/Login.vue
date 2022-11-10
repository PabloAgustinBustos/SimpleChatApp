<script>
    export default {
        name: "Login",
        
        data(){
            return {
                disabled: true,
                userData: {
                    username: "",
                    password: ""
                }
            }
        },

        watch:{
            userData: {
                handler(newValue, prev){
                    const {username, password} = newValue

                    this.disabled = !username || !password
                },

                deep:true
            }
        },

        methods:{
            async logIn(){
                console.log(this.userData)

                const res = await fetch("http://localhost:3001/user/logIn", {
                    method: "POST",
                    body: JSON.stringify(this.userData),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await res.json()

                sessionStorage.setItem("token", data.token)

                this.$router.push({name: "Users"})
            }
        }
    }
</script>

<template>
    <div class="container">
        <form @submit.prevent="logIn" class="form">
            <input v-model="userData.username" type="text" placeholder="username"/>
            <input v-model="userData.password" type="text" placeholder="password"/>
            <button :disabled="disabled">Ingresar</button>
        </form>
    </div>
</template>

<style scoped>
    .container{
        width: 100%;
        height: 70%;
        /* background-color: blue; */

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        position: relative;
        animation-name: show;
        animation-duration: .7s;
        animation-timing-function: ease-in-out;
    }

    @keyframes show{
        0%{
            right: 100%;
            opacity: 0;
        }

        100%{
            right: 0;
            opacity: 1;
        }
    }

    .form{
        width: 65%;
        height: 90%;
        
        /* background-color: aqua; */
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* align-items: center; */
    }

    .form input{
        padding-left: 10px;
        outline: 0;
        border: 0;
        border-radius: 10px;
    }

    .form input, .form button{
        height: 80px;
        font-size: 50px;
    }

    .form button{
        border-radius: 10px;
        border: 0;
        background-color: #FF8787;
        transition: box-shadow .8s;
    }

    .form button:hover{
        cursor: pointer;
        box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, .7);

        transition: box-shadow .2s;
    }

    .form button:disabled{
        cursor: auto;
        box-shadow: none;
        background-color: #ffb2b2;
    }
</style>