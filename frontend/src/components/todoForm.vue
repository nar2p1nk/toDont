<template>
   
    <div class='post'>
        <form class="form" @submit.prevent='pushy'>
            <input type="text" :value='message' @change="$emit('update:message',$event.target.value)"> <button 
           type='submit'>submit</button>
        </form>
    </div>

</template>


<script>
export default {
    props:{message:String},
}
</script>
