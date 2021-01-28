<Page>
  <Navbar backLink title={title}></Navbar>

  <BlockTitle></BlockTitle>
  
  <List noHairlinesMd form id="rankForm">

    <BlockTitle>Basic Details</BlockTitle>
    <Card>
      <CardContent>
        <Row>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Title"
              type="text"
              value={$dataClient.rank.title}
              onInput={(e) => $dataClient.rank.title = e.target.value}
              required
              validate />
          </Col>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Exp"
              type="number"
              value={$dataClient.rank.exp}
              onInput={(e) => $dataClient.rank.exp = e.target.value}
              pattern="[0-9]*" />
          </Col>
        </Row>
        <Row>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Gem"
              type="number"
              value={$dataClient.rank.gem}
              onInput={(e) => $dataClient.rank.gem = e.target.value}
              pattern="[0-9]*" />
          </Col>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Multiplier"
              type="number"
              step="0.1"
              value={$dataClient.rank.multiplier}
              onInput={(e) => $dataClient.rank.multiplier = e.target.value} />
          </Col>
        </Row>
      </CardContent>
    </Card>
    
  </List>

  
  <SaveCancel on:doSave={doSave} />


</Page>
<script>
  import SaveCancel from '../components/SaveCancel.svelte';
  import {
    f7,
    theme,
    ListItem,
    Card, CardContent,
    Col,
    Page,
    Navbar,
    List,
    ListInput,
    BlockTitle,
    Row,
    Button,
    Range,
    Toggle,
    Block
  } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  export let f7route;
  const id = f7route.params.id;
  
  $: title = id > 0 ? "Edit Rank" : "New Rank";


  async function doSave() {

    const isValid = f7.input.validateInputs('#rankForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateRank();
    } else {
      result = await dataClient.addRank();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/ranks/');
    }
    
  };


  onMount(async () => {
    if (id > 0) {
      //dataClient.getGameCode();
    }
  })
</script>
<style>
  
</style>