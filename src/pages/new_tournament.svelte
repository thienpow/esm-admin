<Page>
  <Navbar backLink title={title}></Navbar>

  
  <List noHairlinesMd form id="tournamentForm">
    <BlockTitle>Basic Details</BlockTitle>
    <Card noShadow>
      <CardContent>
        <Row>
          <Col>
            <ListInput
                class="item-content-input"
                label="Status"
                type="select"
                value={$dataClient.tournament.status}
                onInput={(e) => $dataClient.tournament.status = e.target.value}
                placeholder="Please choose...">

                {#each $dataClient.statusTypes as sT}
                <option value={sT.id}>{sT.title}</option>
                {/each}

            </ListInput>

          </Col>
          <Col>

            <ListInput
              class="item-content-input"
              label="Title"
              type="text"
              value={$dataClient.tournament.title}
              onInput={(e) => $dataClient.tournament.title = e.target.value}
              required
              validate />
            
          </Col>
        </Row>
        
      </CardContent>
      
    </Card>
    <BlockTitle>Format Sets</BlockTitle>
    <Card noShadow>
      <CardContent>
        <Row>
          <Col width="70">
            <ListItem 
              title="Find & Select Format Sets" 
              smartSelect smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search Format Set'}}
            >
              <span slot="media">
                <Icon md="material:search" aurora="f7:search" ios="f7:search" />
              </span>
              <select name="car" multiple bind:value={$dataClient.tournament.tour_set_ids}>
                {#each $dataClient.tournament_sets as set}
                <option value={set.id}>{set.title}</option>
                {/each}
              </select>
            </ListItem>
          </Col>
          <Col width="30">
  
            <ListInput
              class="item-content-input"
              label="Format Set IDs"
              type="text"
              value={$dataClient.tournament.tour_set_ids}
              onInput={(e) => $dataClient.tournament.tour_set_ids = e.target.value}
              required
              validate />
        
      
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
    Card, CardContent,
    Col,
    Page,
    Navbar,
    List,
    ListInput,
    ListItem,
    Icon,
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
    await dataClient.getTournamentSetList(1000, 0, "");
  });
  
</script>
