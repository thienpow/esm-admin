<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Ranks</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width={100} medium={15}>
        <Link ignoreCache={true} on:click={onNewClick}>
          <Chip text="New rank" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" />
        </Link>
      </Col>
      <Col tag="span" width={100} medium={80}>
        
      </Col>
      <Col tag="span">
      </Col>
    </Row>
  </Block>
  

  <!-- Search -->
  <Row>
    <Col width="0" medium="25">
    </Col>
    <Col width="75" medium="50">
      
    </Col>
    <Col width="25">
      
    </Col>
  </Row>
  
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th class="numeric-cell">ID</th>
          <th class="label-cell">Level</th>
          <th class="numeric-cell">Exp</th>
          <th class="numeric-cell">Gem</th>
          <th class="numeric-cell">Multiplier</th>
        </tr>
      </thead>
      <tbody>
    
        {#each filteredRows as rank}
        <tr on:click={onRowClick(rank)}>
          <td class="numeric-cell">{rank.id}</td>
          <td class="label-cell">{rank.title}</td>
          <td class="numeric-cell">{rank.exp}</td>
          <td class="numeric-cell">{rank.gem}</td>
          <td class="numeric-cell">{rank.multiplier}</td>
        </tr>
        {/each}
        
      </tbody>
    </table>
  </div>
  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { theme, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient.js';
  

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
    $dataClient.rank = rank;
    f7router.navigate("/newrank/" + rank.id + "/");
  };

  onMount(async () => {
    await dataClient.getRankList();
  });
  
  
</script>
