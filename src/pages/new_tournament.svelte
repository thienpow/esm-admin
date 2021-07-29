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

    <SaveCancel on:doSave={doSave} />
    <br/><br/>

    {#if (id > 0)}
    <BlockTitle>Linked Format Sets</BlockTitle>
    <Card noShadow>
      <CardContent>
        <Row>
          <Col>
            <ListItem 
              title="Find & Select Format Sets" 
              smartSelect smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search Format Set'}}
            >
              <span slot="media">
                <Icon md="material:search" aurora="f7:search" ios="f7:search" />
              </span>
              <select name="car" bind:value={set_id}>
                <option value={0}>Not Selected</option>
                {#each $dataClient.tournament_sets as set}
                <option value={set.id}>{set.title}</option>
                {/each}
              </select>
            </ListItem>
          </Col>
          <Col>
  
            <ListInput
              class="item-content-input"
              label="Format Set ID"
              type="text"
              value={set_id}
              onInput={(e) => set_id = e.target.value}
              required
              validate />
        
      
          </Col>
          <Col>
            <Button fill raised color="blue" animate={false} on:click={addToList}>Add to list</Button>
          </Col>
        </Row>
      </CardContent>
    </Card>

    <BlockTitle>List  of Linked Tournament</BlockTitle>
    <Card noShadow>
      <CardContent>

        <div class="data-table">
          <table>
          <thead>
            <tr>
              <th class="numeric-cell">SetID</th>
              <th class="label-cell">Title</th>
            </tr>
          </thead>
          <tbody>
            {#each tour_sets as p, i}
              <tr>
                <td class="numeric-cell">{p.set_id}</td>
                <td class="label-cell">{p.set_title}</td>
                <td>
                  <Link ignoreCache={true} on:click={(e) => delFromList(p.id)}>
                    <Chip text="Delete" mediaBgColor="red" iconIos="f7:minus_circle" iconAurora="f7:minus_circle" iconMd="material:remove_circle_outline" />
                  </Link>
                </td>
              </tr>
            {/each}
          </tbody>
          </table>
        </div>

      </CardContent>
    </Card>
    {/if}
  </List>

  
</Page>
<script>
  import SaveCancel from '../components/SaveCancel.svelte';
  import {
    f7,
    theme,
    Chip,
    Card, CardContent,
    Col,
    Page,
    Navbar,
    Link,
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
  let id = f7route.params.id;

  $: title = id > 0 ? "Edit Tournament" : "New Tournament";

  let tour_sets = [];
  let set_id = 0;

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


      if (id > 0) {
        f7router.navigate('/tournaments/' + $dataClient.tournament.status + '/');
      } else {
        $dataClient.tournament.id = result;
        id = result;
      }
    }
    
  }

  async function delFromList(id) {

    f7.dialog.confirm("Are you sure want to delete?", async function () {
      await dataClient.deleteTourSet(id);
      tour_sets = tour_sets.filter(p => p.id != id);
    });

  }

  async function addToList() {

    if (set_id <= 0) {
      f7.dialog.alert("TourID must be > 0");
      return;
    }

    await dataClient.addTourSet(id, set_id);
    await dataClient.getTourSetList(id);
    tour_sets = $dataClient.tour_sets;

  }

  onMount(async () => {

    await dataClient.getTournamentSetList(1000, 0, "", 2);
    if (id > 0) {
      await dataClient.getTourSetList(f7route.params.id);
      tour_sets = $dataClient.tour_sets;
    }
    
  });
  
</script>
