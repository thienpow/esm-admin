<script>
  import { Searchbar } from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';

  let innerWidth = 0;

  export let searchString;
  export let name;

  const dispatch = createEventDispatcher();
	function doSearch(value) {
		dispatch('doSearch', {value});
	}
</script>

<svelte:window bind:innerWidth={innerWidth}/>

{#if innerWidth < 960}
  <Searchbar class="{name}" expandable bind:value={searchString} onChange={(e) => doSearch(e.target.value)} />
{:else}
    <div class="nav-container">
      <div class="nav-searchbar-container">
        <Searchbar class="{name}" bind:value={searchString} onChange={(e) => doSearch(e.target.value)} />
      </div>
    </div>
{/if}