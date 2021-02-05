<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Spinner Rule</NavTitle>
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New SpinnerRule" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
    </NavRight>
  </Navbar>
  <!-- Body -->
  <Row>
    <Col width="0" small="10" medium="20"></Col>
    <Col width="100" small="80" medium="60">
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th class="numeric-cell">Probability</th>
              <th class="numeric-cell">Win</th>
              <th class="numeric-cell">Reward Type</th>
              <th class="numeric-cell"></th>
            </tr>
          </thead>
          <tbody>
        
            {#each $dataClient.spinner_rules as sr}
            <tr >
              
              <td class="numeric-cell" on:click={onRowClick(sr)}>{sr.probability}</td>
              <td class="numeric-cell" on:click={onRowClick(sr)}>{sr.win}</td>
              <td class="numeric-cell" on:click={onRowClick(sr)}>{dataClient.displayWinTypeTitle(sr.type_id)}</td>
              <td class="numeric-cell" ><Button class="col" large small outline color="red" animate={true} transition="f7-fade" on:click={doDelete(sr.id)}>Delete</Button></td>

            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
    </Col>
    <Col width="0" small="10" medium="20"></Col>
  </Row>
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { f7, Button, theme, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  let innerWidth = 0;



  function doDelete(id) {
    f7.dialog.confirm('Are you sure want to delete?', async function () {
      await dataClient.deleteSpinnerRule(id);
      await dataClient.getSpinnerRuleList();
    });
  }

  function onNewClick() {
    $dataClient.spinner_rule = {
        id: 0, 
        probability: 0.0, 
        win: 0.0, 
        type_id: 1
      };
    f7router.navigate("/newspinner_rule/0/");
  };

  function onRowClick(sr) {
    $dataClient.spinner_rule = sr;
    f7router.navigate("/newspinner_rule/" + sr.id + "/");
  };

  onMount(async () => {
    await dataClient.getSpinnerRuleList();
  });
  
  
</script>
