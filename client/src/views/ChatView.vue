<script>
    import FriendLink from '../components/FriendLink.vue'
    
    export default {
        name: "ChatView",
        
        data(){
            return {
                status: "loading",
                message: "loading...",
                friends: null,
                users: null
            }
        },

        components: {FriendLink},

        async mounted(){
            console.log("voy a pedir los datos")
            const res = await fetch("http://localhost:3001/friends/get", {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk0ZTUwMi1jNDVkLTQ3MGEtOTExNy0xYTMzMWRkYjdiMzUiLCJ1c2VybmFtZSI6InBhYmxvIiwiaWF0IjoxNjY4MDQ5NzE3LCJleHAiOjE2NzA2NDE3MTd9.mgBP9il-qPTjs850JMrvr6kR1xlXAcFJaxts8tieH4Y"
                }
            })
            const data = await res.json()

            if(data.status === "error-token") {
                this.message = "No autorizado. Debe iniciar sesión"
                return
            }

            const res2 = await fetch("http://localhost:3001/user/get", {
                headers:{
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk0ZTUwMi1jNDVkLTQ3MGEtOTExNy0xYTMzMWRkYjdiMzUiLCJ1c2VybmFtZSI6InBhYmxvIiwiaWF0IjoxNjY4MDQ5NzE3LCJleHAiOjE2NzA2NDE3MTd9.mgBP9il-qPTjs850JMrvr6kR1xlXAcFJaxts8tieH4Y"
                }
            })
            const data2 = await res2.json()

            
            this.status = "data"
            this.friends = data
            this.users = data2
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
                    title="mis amigos"
                />
                
                
                
                <FriendLink 
                class="friends"
                :friends="users"
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