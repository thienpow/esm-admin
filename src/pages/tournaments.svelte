<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Tournaments</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width={100} medium={15}>
        <Link ignoreCache={true} on:click={onNewClick}>
          <Chip text="New Tournament" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" />
        </Link>
      </Col>
      <Col tag="span" width={100} medium={80}>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.tournamentCount.total} prizes" color="blue" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.tournamentCount.draft} prizes" color="red" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.tournamentCount.published} prizes" color="green" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.tournamentCount.archived} prizes" color="gray" /></Link>
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
      <Searchbar
        value={searchString}
        onChange={(e) => searchString = e.target.value}
        disableButton={!theme.aurora}
      />
    </Col>
    <Col width="25">
      <Menu class="menu-left">
        <MenuItem iconF7="table" dropdown>
          <MenuDropdown right>
            <List class="theme-dark">
              
              <ListItem
                checkbox
                title="set_ids"
                value={$tour_set_ids}
                checked={$tour_set_ids}
                onChange={(e) => $tour_set_ids = e.target.checked}
              ></ListItem>

              <ListItem
                checkbox
                title="status"
                value={$show_status}
                checked={$show_status}
                onChange={(e) => $show_status = e.target.checked}
              ></ListItem>
              
            </List>
          </MenuDropdown>
        </MenuItem>
        <MenuItem iconF7="square_list" dropdown>
          <MenuDropdown right>
            <List class="theme-dark">
              <ListItem
                radio
                radioIcon="end"
                title="20 Rows"
                value="20"
                name="row-count"
                checked={$row_count == 20}
                onChange={(e) => {$row_count = e.target.value; resetRows();}}
              ></ListItem>
              <ListItem
                radio
                radioIcon="end"
                title="50 Rows"
                value="50"
                name="row-count"
                checked={$row_count == 50}
                onChange={(e) => {$row_count = e.target.value; resetRows();}}
              ></ListItem>
              <ListItem
                radio
                radioIcon="end"
                title="100 Rows"
                value="100"
                name="row-count"
                checked={$row_count == 100}
                onChange={(e) => {$row_count = e.target.value; resetRows();}}
              ></ListItem>
              <ListItem
                radio
                radioIcon="end"
                title="200 Rows"
                value="200"
                name="row-count"
                checked={$row_count == 200}
                onChange={(e) => {$row_count = e.target.value; resetRows();}}
              ></ListItem>
            </List>
          </MenuDropdown>
        </MenuItem>
      </Menu>
    </Col>
  </Row>
  
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th class="numeric-cell">ID</th>
          <th class="label-cell">Title</th>
          
          {#if $tour_set_ids}
          <th class="numeric-cell">Format Set IDs</th>
          {/if}

          {#if $show_status}
          <th>Status</th>
          {/if}
          
        </tr>
      </thead>
      <tbody>
    
        {#each filteredRows as tournament}
        <tr on:click={onRowClick(tournament)}>
          <td class="numeric-cell">{tournament.id}</td>
          <td class="label-cell">{tournament.title}</td>

          {#if $tour_set_ids}
          <td class="numeric-cell">{tournament.tour_set_ids}</td>
          {/if}

          {#if $show_status}
          <td class="label-cell">{dataClient.displayStatusTitle(tournament.status)}</td>
          {/if}

        </tr>
        {/each}
        
      </tbody>
    </table>
  </div>
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { theme, Searchbar, NavLeft, NavTitle, NavRight, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient.js';
  import {tour_set_ids, show_status, row_count} from '../stores/ui.js';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.tournaments.filter(tournament => {
                      return tournament.title.toLowerCase().includes(searchString.toLowerCase()) || tournament.id == Number(searchString);
                   }) : $dataClient.tournaments;


  async function resetRows() {
    await dataClient.getGameList($row_count);
    searchString = null;
  }

  function onNewClick() {
    $dataClient.tournament = {
        id: 0, 
        title: "", 
        tour_set_ids: [],
        status: 0
      };
    f7router.navigate("/newtournament/0/");
  };

  function onRowClick(tournament) {
    $dataClient.tournament = tournament;
    f7router.navigate("/newtournament/" + tournament.id + "/");
  };

  onMount(async () => {
    await dataClient.getTournamentCount();
    await dataClient.getTournamentList($row_count);
  });
  
</script>
