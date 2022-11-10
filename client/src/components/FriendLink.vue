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

        mounted(){
            console.log(this.$props.friends)
        },

        props: ["friends", "title"]
    }
</script>

<template>
    <div>
        <h3>{{title}} <hr/></h3>

        <div class="container">

            <div class="friend" v-for="friend in friends" key="friend._id">
                
                <div class="img-container">
                    <img 
                        class="img"
                        :src="!friend?.img ? placeholder : friend.img "
                    />
                </div>
                
                <p class="name">{{friend?.username}}</p>
            
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