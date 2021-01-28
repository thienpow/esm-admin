<script>
  import { Block, Button, Row, Col} from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
	function doSave() {
		dispatch('doSave', {});
	}

</script>

<Block>
  <Row>
    <Col width="10" />
    <Col width="35"><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Save</Button></Col>
    <Col width="10" />
    <Col width="35"><Button class="col" large fill raised color="green" back animate={false}>Cancel</Button></Col>
    <Col width="10" />
  </Row>
</Block>
