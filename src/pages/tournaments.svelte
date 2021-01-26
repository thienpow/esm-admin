<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Tournaments</NavTitle>
    {#if innerWidth < 1024}
      <Searchbar class="searchbar-top" expandable value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
    {:else}
        <div class="nav-container">
          <div class="nav-searchbar-container">
            <Searchbar class="searchbar-top" value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
          </div>
        </div>
    {/if}
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Tournament" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      {#if innerWidth < 1024}
      <Link searchbarEnable=".searchbar-top" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
      {/if}
    </NavRight>
  </Navbar>
  <!-- Body -->
  <Row class="no-gap">
  
    <Col width="100" xlarge="70">
  
      <!-- data-table here -->
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
  
    </Col>
    <Col class="toolpanel" width="100" xlarge="30">
  
      <!-- right section here -->
      <div class="data-table-footer">
        <div class="data-table-pagination">
          <span class="data-table-pagination-label">Showing record: {currentFirstNum}-{currentLastNum} of total {total}</span>
          <Link on:click={(e) => {currentPage = currentPage - 1; if (currentPage < 1) currentPage = 1; resetRows();}}>
            <i class="icon icon-prev color-gray"></i>
          </Link>
          <Link on:click={(e) => {currentPage = currentPage + 1; if (currentPage > maxPage) currentPage = maxPage; resetRows();}}>
            <i class="icon icon-next color-gray"></i>
          </Link>
        </div>
      </div>

      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.tournamentCount.total}" color="blue" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.tournamentCount.draft}" color="red" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.tournamentCount.published}" color="green" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.tournamentCount.archived}" color="gray" /></Link>
          </AccordionContent>
        </ListItem>
        <ListItem accordionItem title="Show/Hide fields">
          <AccordionContent>
            <List>
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
          </AccordionContent>
        </ListItem>
        <ListItem accordionItem title="Show rows">
          <AccordionContent>
            <List>
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
          </AccordionContent>
        </ListItem>
      </List>
  
    </Col>
  </Row>
  
  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { AccordionContent, theme, Searchbar, NavLeft, NavTitle, NavRight, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient.js';
  import {tour_set_ids, show_status, row_count} from '../stores/ui.js';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.tournaments.filter(tournament => {
                      return tournament.title.toLowerCase().includes(searchString.toLowerCase()) || tournament.id == Number(searchString);
                   }) : $dataClient.tournaments;


  $: total = $dataClient.tournamentCount.total;
  $: currentPage = 1;
  $: currentFirstNum = currentPage > 1 ? ((currentPage-1) * $row_count) + 1 : 1;
  $: currentLastNum = currentPage * $row_count >= total ? total : currentPage * $row_count;
  $: maxPage = Math.ceil(total / $row_count);

  async function resetRows() {
    currentFirstNum = ((currentPage-1) * $row_count) + 1;
    await dataClient.getTournamentList($row_count, currentFirstNum - 1);
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
