<script>
    import imgPlaceholder from "../assets/placeholder.png"

    export default {
        name: "Register",

        data(){
            return {
                disabled: true,
                
                newUser: {
                    photo:"",
                    username: "",
                    password: ""
                },

                photoUrl: imgPlaceholder
            }
        },

        watch:{
            newUser: {
                handler(newValue, prev){
                    const {username, password} = newValue

                    this.disabled = !username || !password
                    console.log(newValue)
                },

                deep:true
            }
        },

        methods: {
            async register(){
                const res = await fetch("http://localhost:3001/user/create", {
                    method: "POST",
                    body: JSON.stringify(this.newUser),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

                const data = await res.json()

                console.log(data)
            },

            setPhoto(e){
                const [file] = e.target.files

                this.newUser.photo = file

                this.photoUrl = URL.createObjectURL(file)
            }
        }
    }
</script>

<template>
    <div class="container">
        <form @submit.prevent="register" class="form">
            <div>

                <div class="imgContainer">
                    <img class="img" :src="photoUrl"/>
                </div>
    
                <input @change="setPhoto" type="file">
            </div>

            <div class="data">
                <input v-model="newUser.username" class="input" type="text" placeholder="username"/>
                <input v-model="newUser.password" class="input" type="text" placeholder="password"/>
                <button :disabled="disabled" class="button">crear cuenta</button>
            </div>
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
            left: 100%;
            opacity: 0;
        }

        100%{
            left: 0;
            opacity: 1;
        }
    }

    .form{
        width: 90%;
        height: 90%;
        
        /* background-color: aqua; */
        
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        align-items: center;
    }

    .data{
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* background-color: #FF8787; */
    }

    .imgContainer{
        width: 300px;
        height: 300px;
    }
    
    .img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .input{
        padding-left: 10px;
        height: 80px;
        outline: 0;
        border: 0;
        border-radius: 10px;
        font-size: 60px;
    }

    .button{
        width: 200px;
        height: 50px;
        
        border: 0;
        border-radius: 10px;

        font-size: 30px;

        background-color: #FF8787;
        
        transition: box-shadow .8s;
    }

    .button:hover{
        cursor: pointer;
       
        box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, .7);

        transition: box-shadow .2s;
    }

    .button:disabled{
        cursor: auto;
        box-shadow: none;
        background-color: #ffb2b2;
    }
</style>