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
              <th class="numeric-cell">ID</th>
              <th class="label-cell">Probability</th>
              <th class="numeric-cell">Win</th>
              <th class="numeric-cell">TypeID</th>
            </tr>
          </thead>
          <tbody>
        
            {#each $dataClient.spinner_rules as sr}
            <tr on:click={onRowClick(sr)}>
              <td class="numeric-cell">{sr.id}</td>
              <td class="numeric-cell">{sr.probability}</td>
              <td class="numeric-cell">{sr.win}</td>
              <td class="numeric-cell">{sr.type_id}</td>
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
  import { theme, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  let innerWidth = 0;



  function onNewClick() {
    $dataClient.spinner_rule = {
        id: 0, 
        probability: 0.0, 
        win: 0.0, 
        type_id: 0
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
