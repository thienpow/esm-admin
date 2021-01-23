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
                title="scheduled on"
                value={$show_scheduled_on}
                checked={$show_scheduled_on}
                onChange={(e) => $show_scheduled_on = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="scheduled off"
                value={$show_scheduled_off}
                checked={$show_scheduled_off}
                onChange={(e) => $show_scheduled_off = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="prize ids"
                value={$prize_ids}
                checked={$prize_ids}
                onChange={(e) => $prize_ids = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="game ids"
                value={$game_ids}
                checked={$game_ids}
                onChange={(e) => $game_ids = e.target.checked}
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
          {#if innerWidth >= 1024 }
            {#if $show_scheduled_on}
          <th class="label-cell">Scheduled On</th>
            {/if}
            {#if $show_scheduled_off}
          <th class="label-cell">Scheduled Off</th>
            {/if}
          {/if}
          {#if $prize_ids}
          <th class="numeric-cell">Prize IDs</th>
          {/if}
          {#if $game_ids}
          <th class="numeric-cell">Game IDs</th>
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
          {#if innerWidth >= 1024 }
            {#if $show_scheduled_on}
          <td class="label-cell">{tournament.scheduled_on[0]}</td>
            {/if}
            {#if $show_scheduled_off}
          <td class="label-cell">{tournament.scheduled_off[0]}</td>
            {/if}
          {/if}
          {#if $prize_ids}
          <td class="numeric-cell">{tournament.prize_ids}</td>
          {/if}
          {#if $game_ids}
          <td class="numeric-cell">{tournament.game_ids}</td>
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
  import {show_scheduled_on, show_scheduled_off, prize_ids, game_ids, show_status, row_count} from '../stores/ui.js';
  

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
        scheduled_on: [new Date()],
        scheduled_off: [new Date()],
        prize_ids: [], 
        game_ids: [],
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
