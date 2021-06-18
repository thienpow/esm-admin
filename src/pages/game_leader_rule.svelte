<Page>
  <Navbar title={title}></Navbar>

  <BlockTitle></BlockTitle>
  
  <List noHairlinesMd form id="ruleForm">
    <Card>
      <CardContent>
        <Row>
          <Col width="100" medium="25">
            <ListInput
              class="item-content-input"
              label="Rank From"
              type="number"
              value={$dataClient.gameLeaderRule.rank_from}
              onInput={(e) => $dataClient.gameLeaderRule.rank_from = e.target.value}
              required
              validate />
          </Col>
          <Col width="100" medium="25">
            <ListInput
              class="item-content-input"
              label="Rank To"
              type="number"
              value={$dataClient.gameLeaderRule.rank_to}
              onInput={(e) => $dataClient.gameLeaderRule.rank_to = e.target.value}
              required
              validate />
          </Col>
          <Col width="100" medium="25">
            <ListInput
              class="item-content-input"
              label="Tickets"
              type="number"
              value={$dataClient.gameLeaderRule.tickets}
              onInput={(e) => $dataClient.gameLeaderRule.tickets = e.target.value}
              pattern="[0-9]*" />
          </Col>
          <Col width="100" medium="25">
            <ListInput
              class="item-content-input"
              label="Exp"
              type="number"
              value={$dataClient.gameLeaderRule.exp}
              onInput={(e) => $dataClient.gameLeaderRule.exp = e.target.value}
              pattern="[0-9]*" />
          </Col>
        </Row>
      </CardContent>
    </Card>

    <Block strong>
      <Row tag="p">
        <Col><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Add New</Button></Col>
        <Col><Button class="col" large fill raised color="green" back animate={false}>Back</Button></Col>
      </Row>
    </Block>
  
  </List>

  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th class="numeric-cell">Rank From</th>
          <th class="numeric-cell">Rank To</th>
          <th class="numeric-cell">Tickets</th>
          <th class="numeric-cell">Exp</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    
        {#each $dataClient.gameLeaderRules as rule}
        <tr>
          <td class="numeric-cell">{rule.rank_from}</td>
          <td class="numeric-cell">{rule.rank_to}</td>
          <td class="numeric-cell">
            <Input
              class="item-content-input"
              label="Tickets"
              type="number"
              value={rule.tickets}
              onInput={(e) => rule.tickets = e.target.value}
              pattern="[0-9]*" />
          </td>
          <td class="numeric-cell">
            <Input
              class="item-content-input"
              label="Exp"
              type="number"
              value={rule.exp}
              onInput={(e) => rule.exp = e.target.value}
              pattern="[0-9]*" />
          </td>
          <td><Button class="col" large small outline color="red" animate={true} transition="f7-fade" on:click={doUpdate(rule)}>Update</Button></td>
          <td><Button class="col" large small outline color="red" animate={true} transition="f7-fade" on:click={doDelete(rule.rank_from)}>Delete</Button></td>
        </tr>
        {/each}
        
      </tbody>
    </table>
  </div>
  
</Page>
<script>
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
    Input,
    BlockTitle,
    Row,
    Button,
    Range,
    Toggle,
    Block
  } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';
  //export let f7router;

  export let f7route;
  const id = f7route.params.id;

  $: title = id > 0 ? "Leaderboard Rules for GameID: " + id : "Wrong Access";


  async function doDelete(rank_from) {
    f7.dialog.confirm('Are you sure want to delete?', async function () {
      await dataClient.deleteGameLeaderRule(id, rank_from);
      await dataClient.getGameLeaderRuleList(id);
      $dataClient.gameLeaderRules.sort();
    });
  }

  async function doUpdate(rule) {
    
    f7.dialog.confirm('Are you sure want to update?', async function () {
      let result = await dataClient.updateGameLeaderRule(rule);

      if (result) {
        
        let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Updated for Rank ' + rule.rank_from,
          position: 'center',
          closeTimeout: 2000,
        });
        successToast.open();
      }
      
    });
  }

  async function doSave() {

    const isValid = f7.input.validateInputs('#ruleForm');
    if (!isValid) {
      return;
    }

    let result = false;
    result = await dataClient.addGameLeaderRule();
    await dataClient.getGameLeaderRuleList(id);
    $dataClient.gameLeaderRules.sort();
    
  };

  onMount(async () => {
    
    $dataClient.gameLeaderRule = {
      game_id:  id,
      rank_from: 0,
      rank_to: 0,
      tickets: 0,
      exp: 0,
    };

    await dataClient.getGameLeaderRuleList(id);
    $dataClient.gameLeaderRules.sort();
    
  })
</script>
<style>
  
</style>