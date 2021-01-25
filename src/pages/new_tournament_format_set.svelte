<Page>
  <Navbar title={title}></Navbar>

  <List noHairlinesMd form id="setForm">
    <ListInput
      class="item-content-input"
      label="Title"
      type="text"
      value={$dataClient.tournament_set.title}
      onInput={(e) => $dataClient.tournament_set.title = e.target.value}
      required
      validate

    ></ListInput>
    <BlockTitle>Durations</BlockTitle>
    <Card>
      <CardContent>

        <Row>

          <Col width="100" medium="50">
    
            <ListInput
              class="item-content-input"
              label="Days"
              type="number"
              step="1"
              value={$dataClient.tournament_set.duration_days}
              onInput={(e) => $dataClient.tournament_set.duration_days = e.target.value} />
    
          </Col>
          <Col width="100" medium="50">
    
            <ListInput
            class="item-content-input"
            label="Hours"
            type="number"
            step="1"
            value={$dataClient.tournament_set.duration_hours}
            onInput={(e) => $dataClient.tournament_set.duration_hours = e.target.value} />
    
          </Col>
    
        </Row>
    
      </CardContent>
    </Card>

    <BlockTitle>Type</BlockTitle>
    <Card>
      <CardContent>

          <Row>

            <Col width="100" medium="50">
              
              <List>
                <ListItem radio value={$dataClient.tournament_set.is_group} checked={$dataClient.tournament_set.is_group == true} on:change={(e) => $dataClient.tournament_set.is_group = e.detail[0].returnValue} name="radio-repeat" title="Group" />
                <ListItem radio value={!$dataClient.tournament_set.is_group} checked={$dataClient.tournament_set.is_group == false} on:change={(e) => $dataClient.tournament_set.is_group = !e.detail[0].returnValue} name="radio-repeat" title="Single" />
              </List>
                
            </Col>
          </Row>

      </CardContent>
    </Card>
    
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
    Card, CardContent,
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

  $: title = id > 0 ? "Edit Format Set" : "New Format Set";

  async function doSave() {

    const isValid = f7.input.validateInputs('#setForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateTournamentSet();
    } else {
      result = await dataClient.addTournamentSet();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/formatsets/');
    }
    
  }

  onMount(async () => {
  });
  
</script>
