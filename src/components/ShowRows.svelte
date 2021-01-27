<script>
  import { AccordionContent, List, ListItem} from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';

  import {row_count} from '../stores/ui';

  const dispatch = createEventDispatcher();
	function resetRows(offset) {
		dispatch('resetRows', {offset});
	}

</script>

<ListItem accordionItem title="Show rows">
  <AccordionContent>
    <List>
      <ListItem
        radio
        radioIcon="end"
        title="20 Rows"
        value="20"
        name="row-count"
        checked={$row_count == 20}
        onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
      ></ListItem>
      <ListItem
        radio
        radioIcon="end"
        title="50 Rows"
        value="50"
        name="row-count"
        checked={$row_count == 50}
        onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
      ></ListItem>
      <ListItem
        radio
        radioIcon="end"
        title="100 Rows"
        value="100"
        name="row-count"
        checked={$row_count == 100}
        onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
      ></ListItem>
      <ListItem
        radio
        radioIcon="end"
        title="200 Rows"
        value="200"
        name="row-count"
        checked={$row_count == 200}
        onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
      ></ListItem>
    </List>
  </AccordionContent>
</ListItem>
