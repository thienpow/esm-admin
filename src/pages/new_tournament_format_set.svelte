<Page>
  <Navbar backLink title={title}></Navbar>

  <List noHairlinesMd form id="setForm">
    
    <BlockTitle>Set Info</BlockTitle>
    <Card noShadow>
      <CardContent>
        <ListInput
          class="item-content-input"
          label="Title"
          type="text"
          value={$dataClient.tournament_set.title}
          onInput={(e) => $dataClient.tournament_set.title = e.target.value}
          required
          validate />

        <Row>

          <Col width="100" medium="30">
              
            <List>
              <ListItem radio value={$dataClient.tournament_set.is_group} checked={$dataClient.tournament_set.is_group == true} on:change={(e) => {delAllFromList(1);}} name="radio-repeat" title="Group" />
              <ListItem radio value={!$dataClient.tournament_set.is_group} checked={$dataClient.tournament_set.is_group == false} on:change={(e) => {delAllFromList(0);}} name="radio-repeat" title="Single" />
            </List>
              
          </Col>
          <Col width="100" medium="35">
    
            <ListInput
              class="item-content-input"
              label="Days"
              type="number"
              step="1"
              value={$dataClient.tournament_set.duration_days}
              onInput={(e) => $dataClient.tournament_set.duration_days = parseInt(e.target.value)} />
    
          </Col>
          <Col width="100" medium="35">
    
            <ListInput
            class="item-content-input"
            label="Hours"
            type="number"
            step="1"
            value={$dataClient.tournament_set.duration_hours}
            onInput={(e) => $dataClient.tournament_set.duration_hours = parseInt(e.target.value)} />
    
          </Col>
    
        </Row>
    
      </CardContent>
    </Card>

    <SaveCancel on:doSave={doSave} />
    <br/><br/>

    {#if (id > 0)}
    <BlockTitle>Linked Games</BlockTitle>
    <Card noShadow>
      <CardContent>
        <Row>
          <Col width="20">
            {#if $dataClient.tournament_set.is_group}
            <ListInput
              class="item-content-input"
              label="Group"
              type="select"
              value={group_id}
              onInput={(e) => group_id = e.target.value}
              placeholder="Please choose...">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </ListInput>
            {/if}

          </Col>
          <Col width="60">
            <ListItem 
              title="Find a Game" 
              smartSelect smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search Game'}}
            >
              <span slot="media">
                <Icon md="material:search" aurora="f7:search" ios="f7:search" />
              </span>
              <select bind:value={game_id} oninput={(e) => alert(e)}>
                <option value={0}>Not Selected</option>
                {#each $dataClient.games as game}
                <option value={game.id}>{game.title}</option>
                {/each}
              </select>
            </ListItem>
          </Col>
          <Col width="20">
            <ListInput
              label="Game"
              floatingLabel
              type="number"
              errorMessage="Only numbers please!"
              clearButton
              value={game_id}
              onInput={(e) => game_id = parseInt(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListInput
              class="item-content-input"
              label="Days"
              type="number"
              step="1"
              value={duration_days}
              onInput={(e) => duration_days = parseInt(e.target.value)} />
    
          </Col>
          <Col>
            <ListInput
            class="item-content-input"
            label="Hours"
            type="number"
            step="1"
            value={duration_hours}
            onInput={(e) => duration_hours = parseInt(e.target.value)} />
          </Col>
          <Col>
    
            <ListInput
              class="item-content-input"
              label="Minutes"
              type="number"
              step="1"
              value={duration_minutes}
              onInput={(e) => duration_minutes = parseInt(e.target.value)} />
    
          </Col>
          <Col>
            <Button fill raised color="blue" animate={false} on:click={addToList}>Add to list</Button>
          </Col>
        </Row>
              

      </CardContent>
    </Card>



    <BlockTitle>List  of Linked Games</BlockTitle>
    <Card noShadow>
      <CardContent>

        <div class="data-table">
          <table>
          <thead>
            <tr>
              <th class="numeric-cell">GameID</th>
              <th class="numeric-cell">Title</th>
              <th class="numeric-cell">Days</th>
              <th class="numeric-cell">Hours</th>
              <th class="numeric-cell">Minutes</th>
              {#if $dataClient.tournament_set.is_group}
              <th class="numeric-cell">GroupID</th>
              {/if}
              <th class="numeric-cell"></th>
            </tr>
          </thead>
          <tbody>
            {#each set_game_rules as set, i}
              <tr>
                <td class="numeric-cell">{set.game_id}</td>
                <td class="numeric-cell">{set.game_title}</td>
                <td class="numeric-cell">{set.duration_days}</td>
                <td class="numeric-cell">{set.duration_hours}</td>
                <td class="numeric-cell">{set.duration_minutes}</td>
                {#if $dataClient.tournament_set.is_group}
                <td class="numeric-cell">{set.group_id}</td>
                {/if}
                <td>
                  <Link ignoreCache={true} on:click={(e) => delFromList(set.id)}>
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
    Card, CardContent,
    Chip,
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

  let set_game_rules = [];
  let game_id = 0;
  let game_title = "";
  let duration_days = 0;
  let duration_hours = 0;
  let duration_minutes = 0;
  let group_id = 0;
  $: current_group_id = $dataClient.tournament_set.is_group ? group_id : 0;

  $: title = f7route.params.id > 0 ? "Edit Format Set" : "New Format Set";


  async function delFromList(id) {

    f7.dialog.confirm("Are you sure want to delete?", async function () {
      await dataClient.deleteTournamentSetGameRule(id);
      set_game_rules = set_game_rules.filter(set => set.id != id);
    });
    
  }

  async function delAllFromList(gid) {

  f7.dialog.confirm("Are you sure want to change Group/Single type? All Linked Games List below will be deleted!", async function () {
    $dataClient.tournament_set.is_group = gid > 0; 
    set_game_rules = [];
    group_id=gid;
    await dataClient.deleteAllTournamentSetGameRule(f7route.params.id);
  });

  }

  async function addToList() {

    if (game_id <= 0) {
      f7.dialog.alert("GameID must be > 0");
      return;
    }

    if (duration_days+duration_hours+duration_minutes <= 0) {
      f7.dialog.alert("Duration must be > 0");
      return;
    } 
    
    let id = await dataClient.addTournamentSetGameRule(f7route.params.id, game_id, duration_days, duration_hours, duration_minutes, group_id);    

    set_game_rules = [...set_game_rules, {
      id: id,
      game_id: game_id,
      game_title: game_title,
      duration_days: duration_days,
      duration_hours: duration_hours,
      duration_minutes: duration_minutes,
      group_id: current_group_id,
    }];

  }

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

      if (id > 0) {
        f7router.navigate('/formatsets/');
      } else {
        $dataClient.tournament_set.id = result;
        id = result;
      }
    }
    
  }

  onMount(async () => {

    if (id > 0) {
      await dataClient.getGameList(1000, 0, "", 2);
      await dataClient.getTournamentSetGameRuleList(id);
      set_game_rules = $dataClient.tournament_set_game_rules;
    }
    
  });
  
</script>
