<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Format Sets</NavTitle>
    <SearchBar name="searchbar-formatset" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Format" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      <SearchBarIcon name="searchbar-formatset" />
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

              <th>Duration Days</th>
              <th>Duration Hours</th>
              <th>IsGroup</th>
            </tr>
          </thead>
          <tbody>
        
            {#each $dataClient.tournament_sets as set}
            <tr on:click={onRowClick(set)}>
              <td class="numeric-cell">{set.id}</td>
              <td class="label-cell">{set.title}</td>
              
              {#if $show_status}
              <td class="label-cell">{dataClient.displayStatusTitle(set.status)}</td>
              {/if}
    
              <td class="label-cell">{set.duration_days}</td>
              <td class="label-cell">{set.duration_hours}</td>
              <td class="label-cell">{set.is_group}</td>

            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
  
    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">
  
      <!-- right section here -->
      <Paginator total={$dataClient.tournamentSetCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

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
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.tournamentSetCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.tournamentSetCount.draft}" color="red" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.tournamentSetCount.published}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.tournamentSetCount.archived}" color="gray" /></Link>
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
  import { AccordionContent, NavLeft, NavTitle, NavRight, List, ListItem, Link, Chip, Row, Col, Page, Navbar } from 'framework7-svelte';
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
    await dataClient.getTournamentSetList($row_count, offset, search, -1);
  }

  function onNewClick() {
    $dataClient.tournament_set = {
        id: 0, 
        title: "", 
        duration_days: 0,
        duration_hours: 0,
        is_group: false,
        status: 1
      };
    f7router.navigate("/newformatset/0/");
  };

  function onRowClick(set) {
    $dataClient.tournament_set = {
        id: set.id, 
        title: set.title, 
        status: set.status,
        duration_days: set.duration_days,
        duration_hours: set.duration_hours,
        is_group: set.is_group
      };
    f7router.navigate("/newformatset/" + set.id + "/");
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
    
    await dataClient.getTournamentSetList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getTournamentSetCount();
    await dataClient.getTournamentSetList($row_count, 0, "", f7route.params.st);
  });
  
</script>
