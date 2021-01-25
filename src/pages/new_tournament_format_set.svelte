<Page>
  <Navbar title={title}></Navbar>

  <List noHairlinesMd form id="setForm">
    
    <BlockTitle>Set Info</BlockTitle>
    <Card>
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
              <ListItem radio value={$dataClient.tournament_set.is_group} checked={$dataClient.tournament_set.is_group == true} on:change={(e) => {$dataClient.tournament_set.is_group = e.detail[0].returnValue; set_game_rules = [];}} name="radio-repeat" title="Group" />
              <ListItem radio value={!$dataClient.tournament_set.is_group} checked={$dataClient.tournament_set.is_group == false} on:change={(e) => {$dataClient.tournament_set.is_group = !e.detail[0].returnValue; set_game_rules = [];}} name="radio-repeat" title="Single" />
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


    {#if f7route.params.id > 0}
    <BlockTitle>Linked Games</BlockTitle>
    <Card>
      <CardContent>
        <Row>
          <Col width="25">
            {#if $dataClient.tournament_set.is_group}
            <ListInput
              class="item-content-input"
              label="Group"
              type="select"
              value={group_id}
              onInput={(e) => group_id = e.target.value}
              placeholder="Please choose...">
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </ListInput>
            {/if}

          </Col>
          <Col width="50">
            <ListInput
              label="Game"
              floatingLabel
              type="number"
              placeholder="1"
              errorMessage="Only numbers please!"
              clearButton
              value={game_id}
              onInput={(e) => game_id = parseInt(e.target.value)}
            />
          </Col>
          <Col width="25">
            <Button fill raised color="blue" animate={false}>Find a Game</Button>
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
              
        <div class="data-table">
          <table>
          <thead>
            <tr>
              <th class="numeric-cell">GameID</th>
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
                <td class="numeric-cell">{set.duration_days}</td>
                <td class="numeric-cell">{set.duration_hours}</td>
                <td class="numeric-cell">{set.duration_minutes}</td>
                {#if $dataClient.tournament_set.is_group}
                <td class="numeric-cell">{set.group_id}</td>
                {/if}
                <td>
                  <Link ignoreCache={true} on:click={(e) => delFromList(set.id)}>
                    <Chip text="Delete" mediaBgColor="red" iconIos="f7:minus_circle" iconAurora="f7:minus_circle" iconMd="material:minus_circle" />
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
    Chip,
    Col,
    Page,
    Navbar,
    Link,
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
  
  let set_game_rules = [];
  let game_id = 0;
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
    if (f7route.params.id > 0) {
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
    if (f7route.params.id > 0) {
      await dataClient.getTournamentSetGameRuleList(f7route.params.id);
      set_game_rules = $dataClient.tournament_set_game_rules;
    }
    
  });
  
</script>
