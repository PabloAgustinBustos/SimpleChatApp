<script>
    import {io} from "socket.io-client"
    import FriendLink from '../components/FriendLink.vue'
    
    export default {
        name: "ChatView",
        
        data(){
            return {
                status: "loading",
                message: "loading...",
                friends: null,
                users: null,
                token: null,
                socket: null,
            }
        },

        components: {FriendLink},

        watch: {
            token(current, prev){
                if(current !== null){
                    this.socket = io("http://localhost:3002")

                    this.socket.on("update-list", (token) => {
                        if(token == this.token) {
                            console.log("se actualiza")
                            this.updateList()
                        }
                    })
                }
            }
        },

        beforeMount(){
            // this.socket = io("http://localhost:3002")
            const token = sessionStorage.getItem("token")

            this.token = token
        },

        async mounted(){
            this.updateList()
        },

        methods: {
            async updateList(){
                const res = await fetch("http://localhost:3001/friends/get", {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                const friends = await res.json()

                if(friends.status === "error-token") {
                    this.message = "No autorizado. Debe iniciar sesión"
                    return
                }

                const res2 = await fetch("http://localhost:3001/user/get", {
                    headers:{
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                const users = await res2.json()

                
                this.status = "data"
                this.friends = friends
                this.users = users
            }
        }
    }
</script>

<template>
    <!-- <div> -->
        <h1 v-if="status === 'loading'">{{message}}</h1>
        
        <div class="container" v-else-if="status === 'data'" >
            <div class="list">
                <FriendLink 
                    class="friends"
                    :friends="friends"
                    :socket="socket"
                    title="mis amigos"
                />
                
                <FriendLink 
                    class="friends"
                    :friends="users"
                    :socket="socket"
                    title="usuarios"
                />
            </div>
    
            <div class="chat"></div>
        </div>
    <!-- </div> -->
</template>

<style scoped>
    .container{
        width: 100%;
        height: 80vh;
        /* background-color: rgba(0, 255, 255, 0.5); */
        display: grid;
        grid-template-columns: 3fr 15fr;
        overflow-y: hidden;
    }

    /* .gradient{
        width: 100px;
        height: 100px;
        position: absolute;
    } */

    .list{
        height: 100%;
        display: grid;
        grid-auto-rows: 50%;
        position: relative;
        overflow-y: hidden;
        /* background-color: aqua; */
    }

    .friends{
        /* background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); */

        display: flex;
        flex-direction: column;
    }

    /* .friends::-webkit-scrollbar{
        display: none;
    } */

    .top{
        width: 80%;
        height: 10px;
        background-color: #146356;
        /* box-shadow: 0px -145px 15px -100px #146356; */
        /* box-shadow: 0px 0px 15px 20px #146356; */
        
        position: absolute;
        top: -15px;
    }

    .bottom{
        width: 100%;
        height: 5px;
        /* background-color: #146356; */
        /* background-color: aqua; */
        /* box-shadow: 0px -145px 15px -100px #146356; */
        /* box-shadow: 0px -25px 15px 20px #146356; */
        
        position: absolute;
        bottom: 50%;
    }

    .users{
        /* background-color: bisque; */
    }

    .chat{
        width: 100%;
        height: 100%;
        /* background-color: aquamarine; */
    }
</style>