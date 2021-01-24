<Page>
  <Navbar title={title}></Navbar>

  <BlockTitle></BlockTitle>
  <List noHairlinesMd form id="tournamentForm">
    <ListInput
      class="item-content-input"
      label="Title"
      type="text"
      value={$dataClient.tournament.title}
      onInput={(e) => $dataClient.tournament.title = e.target.value}
      required
      validate

    ></ListInput>

    <!--
      
    <ListInput
      class="item-content-input"
      label="Scheduled Off"
      calendarParams={{timePicker: true, dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}}}
      type="datepicker"
      value={$dataClient.tournament.scheduled_off}
      on:calendarChange={(e) => $dataClient.tournament.scheduled_off = e.detail[0]}
      required
      validate
    ></ListInput>

    -->
    
    <ListInput
      class="item-content-input"
      label="Set IDs"
      type="text"
      value={$dataClient.tournament.tour_set_ids}
      onInput={(e) => $dataClient.tournament.tour_set_ids = e.target.value}
      required
      validate

    ></ListInput>

    <ListInput
      class="item-content-input"
      label="Status"
      type="select"
      value={$dataClient.tournament.status}
      onInput={(e) => $dataClient.tournament.status = e.target.value}
      placeholder="Please choose..."
    >
      {#each $dataClient.statusTypes as sT}
      <option value={sT.id}>{sT.title}</option>
      {/each}
    </ListInput>

  </List>

  <BlockTitle></BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Save & Back</Button></Col>
      <Col><Button class="col" large fill raised color="green" back animate={false}>Cancel</Button></Col>
    </Row>
  </Block>

</Page>
<script>
  import {
    f7,
    theme,
    Col,
    Page,
    Navbar,
    List,
    ListInput,
    ListItem,
    Toggle,
    BlockTitle,
    Row,
    Button,
    Range,
    Block
  } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  export let f7route;
  const id = f7route.params.id;

  $: title = id > 0 ? "Edit Tournament" : "New Tournament";

  async function doSave() {

    const isValid = f7.input.validateInputs('#tournamentForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateTournament();
    } else {
      result = await dataClient.addTournament();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/tournaments/');
    }
    
  }

  onMount(async () => {
  });
</script>
