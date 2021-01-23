<Page>
  <Navbar title={title}></Navbar>

  <BlockTitle></BlockTitle>
  
  <List noHairlinesMd form id="ruleForm">
    <Card>
      <CardContent>
        <Row>
          <Col width="100" medium="33">
            <ListInput
              class="item-content-input"
              label="Rank"
              type="number"
              value={$dataClient.gameLeaderRule.rank}
              onInput={(e) => $dataClient.gameLeaderRule.rank = e.target.value}
              required
              validate />
          </Col>
          <Col width="100" medium="33">
            <ListInput
              class="item-content-input"
              label="Tickets"
              type="number"
              value={$dataClient.gameLeaderRule.tickets}
              onInput={(e) => $dataClient.gameLeaderRule.tickets = e.target.value}
              pattern="[0-9]*" />
          </Col>
          <Col width="100" medium="33">
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
          <th class="numeric-cell">Rank</th>
          <th class="numeric-cell">Tickets</th>
          <th class="numeric-cell">Exp</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    
        {#each $dataClient.gameLeaderRules as rule}
        <tr>
          <td class="numeric-cell">{rule.rank}</td>
          <td class="numeric-cell">{rule.tickets}</td>
          <td class="numeric-cell">{rule.exp}</td>
          <td><Button class="col" large small outline color="red" animate={true} transition="f7-fade" on:click={doDelete(rule.rank)}>Delete</Button></td>
        </tr>
        {/each}
        
      </tbody>
    </table>
  </div>
  
</Page>
<script>
  import {
    f7,
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
  //export let f7router;

  export let f7route;
  const id = f7route.params.id;

  $: title = id > 0 ? "Leaderboard Rules for GameID: " + id : "Wrong Access";


  async function doDelete(rank) {
    f7.dialog.confirm('Are you sure want to delete?', async function () {
      await dataClient.deleteGameLeaderRule(id, rank);
      await dataClient.getGameLeaderRuleList(id);
      $dataClient.gameLeaderRules.sort();
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
    
    $dataClient.gameLeaderRule.game_id = id;
    $dataClient.gameLeaderRule.rank = 0;
    $dataClient.gameLeaderRule.tickets = 0;
    $dataClient.gameLeaderRule.exp = 0;

    await dataClient.getGameLeaderRuleList(id);
    $dataClient.gameLeaderRules.sort();
    
  })
</script>
<style>
  
</style>