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
            <Row>
              <Col>
                <Chip outline text="Selected: {filter_selected}" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.tournamentCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.tournamentCount.draft}" color="red" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.tournamentCount.published}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.tournamentCount.archived}" color="gray" /></Link>
              </Col>
            </Row>
          </AccordionContent>
        </ListItem>
        <ListItem accordionItem title="Show/Hide fields">
          <AccordionContent>
            <List>
              
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
  import {show_status, row_count} from '../stores/ui';
  
  export let f7router;
  export let f7route;

  let innerWidth = 0;

  $: searchString = "";
  $: filter_selected = "Published";


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
    await dataClient.getTournamentList($row_count, offset, search, -1);
  }

  function onNewClick() {
    $dataClient.tournament = {
        id: 0, 
        title: "",
        status: 1
      };
    f7router.navigate("/newtournament/0/");
  };

  function onRowClick(tournament) {
    $dataClient.tournament = {
        id: tournament.id, 
        title: tournament.title,
        status: tournament.status
      };
    f7router.navigate("/newtournament/" + tournament.id + "/");
  };

  async function onFilterClick(status) {
    searchString = "";
    currentPage = 1;

    switch(status) {
      case -1:
        filter_selected = "Total";
        break;
      case 1:
        filter_selected = "Draft";
        break;
      case 2:
        filter_selected = "Published";
        break;
      case 3:
        filter_selected = "Archived/Disabled";
        break;
    }
    
    await dataClient.getTournamentList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getTournamentCount();
    await dataClient.getTournamentList($row_count, 0, "", f7route.params.st);
  });
  
</script>
