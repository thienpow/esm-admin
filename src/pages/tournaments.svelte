<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Tournaments</NavTitle>
    <SearchBar name="searchbar-tournament" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Tournament" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      <SearchBarIcon name="searchbar-tournament" />
    </NavRight>
  </Navbar>
  <!-- Body -->
  <Row class="no-gap">
  
    <Col width="100" large="60" xlarge="70">
  
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
        
            {#each $dataClient.tournaments as tournament}
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
    <Col class="toolpanel" width="100" large="40" xlarge="30">
  
      <!-- right section here -->

      <Paginator total={$dataClient.tournamentCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

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
        <ShowRows on:resetRows={(e) => resetRows(e.detail.offset)} />
      </List>
  
    </Col>
  </Row>
  
  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import Paginator from '../components/Paginator.svelte';
  import ShowRows from '../components/ShowRows.svelte';
  import SearchBar from '../components/SearchBar.svelte';
  import SearchBarIcon from '../components/SearchBarIcon.svelte';
  import { onMount } from 'svelte';
  import { AccordionContent, theme, Searchbar, NavLeft, NavTitle, NavRight, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {tour_set_ids, show_status, row_count} from '../stores/ui';
  
  export let f7router;

  let innerWidth = 0;

  $: searchString = "";

  async function doSearch(value) {
    resetRows(0, value);
  }

  $: currentPage = 1;
  async function resetRows(offset, search) {
    if (!search) {
      searchString = "";
      search = "";
    } else {
      offset = 0;
    }

    if (offset === 0)
      currentPage = 1;
    await dataClient.getTournamentList($row_count, offset, search);
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
