<script lang="ts">
  import { createEventDispatcher } from "svelte";


    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");
    
    let backdrop;
    let modal;


</script>

<div class={"static top-0 left-0 w-100 h-100 bg-slate-800 opacity-30 blur-sm"}>&nbsp;</div>