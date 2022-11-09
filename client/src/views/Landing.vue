<script>
    export default {
        name: "Landing",

        methods: {
            go(e){
                const {id} = e.target
                const {container} = this.$refs

                container.classList.add(id=="Register" ? "leave-left" : "leave-right")

                setTimeout(() => {
                    this.$router.push({name: id})
                }, 450)
            }
        }
    }
</script>

<template>
    <div ref="container" class="options-container">
        <button @click="go" id="Login" class="button">Loguearse</button>
        <button @click="go" id="Register" class="button">Registrarse</button>
    </div>
</template>

<style scoped>
    

    .options-container{
        width: 100%;
        height: 70%;
        /* background-color: blue; */

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .button{
        width: 500px;
        height: 150px;

        background-color: #F3C892;
        font-size: 80px;

        border: 0;
        border-radius: 20px;
        transition: box-shadow .8s;
    }
    
    .button:hover{
        cursor: pointer;
        
        box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, .7);

        transition: box-shadow .2s;
    }
</style>