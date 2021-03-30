<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Ranks</NavTitle>
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Rank" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
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
              <th class="label-cell">Level</th>
              <th class="numeric-cell">Exp</th>
              <th class="numeric-cell">Gem</th>
              <th class="numeric-cell">Multiplier</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        
            {#each filteredRows as rank}
            <tr>
              <td on:click={onRowClick(rank)} class="numeric-cell">{rank.id}</td>
              <td on:click={onRowClick(rank)} class="label-cell">{rank.title}</td>
              <td on:click={onRowClick(rank)} class="numeric-cell">{rank.exp}</td>
              <td on:click={onRowClick(rank)} class="numeric-cell">{rank.gem}</td>
              <td on:click={onRowClick(rank)} class="numeric-cell">{rank.multiplier} times / <b>{Math.round(rank.multiplier * 100)}%</b></td>
              <td><Button class="col" large small outline color="red" animate={true} transition="f7-fade" on:click={doDelete(rank.id)}>Delete</Button></td>
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
  import { f7, theme, Button, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.ranks.filter(rank => {
                      return rank.title.toLowerCase().includes(searchString.toLowerCase()) || rank.id == Number(searchString);
                   }) : $dataClient.ranks;


  async function resetRows() {
    await dataClient.getRankList();
    searchString = null;
  }


  async function doDelete(id) {
    f7.dialog.confirm('Are you sure want to delete?', async function () {
      await dataClient.deleteRank(id);
      await dataClient.getRankList(id);
      $dataClient.ranks.sort();
    });
  }

  function onNewClick() {
    $dataClient.rank = {
        id: 0, 
        title: "", 
        exp: 0, 
        gem: 0, 
        multiplier: 0
      };
    f7router.navigate("/newrank/0/");
  };

  function onRowClick(rank) {
    $dataClient.rank = {
        id: rank.id, 
        title: rank.title, 
        exp: rank.exp, 
        gem: rank.gem, 
        multiplier: rank.multiplier
      };
    f7router.navigate("/newrank/" + rank.id + "/");
  };

  onMount(async () => {
    await dataClient.getRankList();
  });
  
  
</script>
