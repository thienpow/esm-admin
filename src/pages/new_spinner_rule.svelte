<Page>
  <Navbar backLink title={title}></Navbar>

  <BlockTitle></BlockTitle>
  <Row>
    <Col width="0" small="10" medium="20"></Col>
    <Col width="100" small="80" medium="60">
      <List noHairlinesMd form id="srForm">

        <BlockTitle>Basic Details</BlockTitle>
        <Card noShadow>
          <CardContent>
            <Row>
              <Col width="100" medium="50">

                <ListInput
                  class="item-content-input"
                  label="Reward Type"
                  type="select"
                  value={$dataClient.spinner_rule.type_id}
                  onInput={(e) => $dataClient.spinner_rule.type_id = e.target.value}
                  placeholder="Please choose...">

                  {#each $dataClient.winTypes as sT}
                    <option value={sT.id}>{sT.title}</option>
                  {/each}
                </ListInput>
              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Probability"
                  type="number"
                  value={$dataClient.spinner_rule.probability}
                  onInput={(e) => $dataClient.spinner_rule.probability = e.target.value}
                  step="0.01"
                  error-message="Only numbers please!"
                  required
                  validate />
              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Win"
                  type="number"
                  value={$dataClient.spinner_rule.win}
                  onInput={(e) => $dataClient.spinner_rule.win = e.target.value}
                  step="0.01"
                  error-message="Only numbers please!"
                  required
                  validate />
              </Col>
            </Row>
            
          </CardContent>
        </Card>
        
      </List>
    
      
      <SaveCancel on:doSave={doSave} />
    
    </Col>
    <Col width="0" small="10" medium="20"></Col>
  </Row>
  

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
  
  $: title = id > 0 ? "Edit Spinner Rule" : "New Spinner Rule";


  async function doSave() {

    const isValid = f7.input.validateInputs('#srForm');

    if ($dataClient.spinner_rule.type_id == 0)
      isValid = false;

    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateSpinnerRule();
    } else {
      result = await dataClient.addSpinnerRule();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/spinner_rules/');
    }
    
  };


  onMount(async () => {
    if (id > 0) {
    }
  })
</script>
<style>
  
</style>