

<script>
  import {Link} from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';

  export let total;
  export let currentPage;
  export let row_count;

  $: currentFirstNum = currentPage > 1 ? ((currentPage-1) * row_count) + 1 : 1;
  $: currentLastNum = currentPage * row_count >= total ? total : currentPage * row_count;
  
  $: maxPage = Math.ceil(total / row_count);
  

  const dispatch = createEventDispatcher();
	function resetRows() {
    currentFirstNum = ((currentPage-1) * row_count) + 1;
    let offset = currentFirstNum - 1;
		dispatch('resetRows', {offset});
	}

</script>
<div class="data-table-footer">
  <div class="data-table-pagination">
    <span class="data-table-pagination-label">Showing record: {currentFirstNum}-{currentLastNum} of total {total}</span>
    <Link on:click={(e) => {currentPage = currentPage - 1; if (currentPage < 1) currentPage = 1; resetRows();}}>
      <i class="icon icon-prev color-gray"></i>
    </Link>
    <Link on:click={(e) => {currentPage = currentPage + 1; if (currentPage > maxPage) currentPage = maxPage; resetRows();}}>
      <i class="icon icon-next color-gray"></i>
    </Link>
  </div>
</div>