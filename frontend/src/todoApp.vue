<script>

import todosData from './data'

export default {
    name:'todoApp',
    data(){
        return{
            todos:todosData,
            message:''
        }
    },
    methods:{
      postSubmit:function(msg){
        var todos = this.todos
        const data = {id:todos.length + 1,todo:msg,completed:false}
        todos.push(data)
        console.log(data)
        this.message = null;
        },
        loggedList:function(item){
          console.log(item)
        },
        remove:function(id){
          console.log(id)
          let index = this.todos.findIndex(i => i.id == id)
          console.log(index)
          if(index > -1){
            this.todos.splice(index,1)
          }
    }
}}
</script>


<template>
    <div class='app'>
        <h1>todo-App</h1>
        <div class="post">
            <form class='post' @submit.prevent='postSubmit(message)'>
                <input type="text" v-model='message'> <button type='submit'>submit</button>
            </form>
        </div>
        <div class="list">
            <h2></h2>
            <!--form -->
            <div v-if="todos.length == 0">
              <h2>there is nothing todo</h2>
            </div>
                <ul>
                    <li v-for='item in todos' :key='item.id'>
                        <h3>
                            <label :for='item.id'>{{item.todo}}</label>
                            <label class='switch'>
                              <input type="checkbox"
                                v-model="item.completed"
                                @change="loggedList(item)">

                                <span class='slider round'></span>
                            </label>
                            <button class='remove'
                              @click.once='remove(item.id)'>X</button>
                        </h3>
                    </li>
                </ul>
            <!--/form-->
        </div>
    </div>
</template>


<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
html{
    background-color: #1a1a1a;
    color: white;
    font-family: 'poppins',sans-serif;
}
.app{
    display: flex;
    align-self: center;
    align-items: center;
    flex-direction: column;
}

ul{
    padding: 0;
    list-style: none;
}
li{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;
}
label{
    display: inline-block;
    width: 200px;
}
.check{
    float: right;
}
 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #352d68;
}

input:focus + .slider {
  box-shadow: 0 0 1px #352d68;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.remove{
  border: 0;
  font-size: 20px;
  font-weight: bold;
  transition: .2s;
  cursor: pointer;
  margin-left:10px;
}
.remove:hover{
    color:red;
}
</style>
