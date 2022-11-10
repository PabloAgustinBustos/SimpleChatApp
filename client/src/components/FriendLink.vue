<script>
    import placeholder from "../assets/placeholder.png"
    
    export default {
        name: "FriendLink",

        data(){
            return {
                // friends: []
                
                placeholder
            }
        },

        props: ["friends", "title", "socket"],

        methods: {
            async handleClick(e){ 
                const token = sessionStorage.getItem("token")
                const identity = e.target.getAttribute("identity")

                await fetch("http://localhost:3001/user/addFriend", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        friendId: identity
                    })
                })

                this.socket.emit("new-friend", token)
            }
        }
    }
</script>

<template>
    <div>
        <h3>{{title}} <hr/></h3>

        <div class="container">
            <div 
                class="friend" 
                v-for="friend in friends" 
                key="friend._id"
                :identity="friend._id"
                @click="handleClick"
            >
                
                <div class="img-container">
                    <img 
                        :identity="friend._id"
                        class="img"
                        :src="!friend?.img ? placeholder : friend.img "
                    />
                </div>
                
                <p class="name" :identity="friend._id">{{friend?.username}}</p>
            
            </div>
        </div>
    </div>
    <!-- <slot></slot> -->
</template>

<style scoped>
    .container{
        overflow-y: auto;
    }

    .container::-webkit-scrollbar{
        display: none;
    }

    .friend{
        padding: 10px;
        /* margin-bottom: 15px; */
        display: flex;
        align-items: center;

        /* overflow-y: hidden; */
    }

    .friend:hover{
        cursor: pointer;
    }

    .img-container{
        width: 50px;
        height: 50px;

    }

    .img{
        width: 100%;
        /* width: 80px;
        height: 80px; */
        border-radius: 50%;
    }

    .name{
        margin-left: 10px;
        font-size: 30px;
    }
</style>