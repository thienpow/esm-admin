<script>
  import { Link } from 'framework7-svelte';

  let innerWidth = 0;

  export let name;

</script>

<svelte:window bind:innerWidth={innerWidth}/>

{#if innerWidth < 960}
  <Link searchbarEnable=".{name}" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
{/if}