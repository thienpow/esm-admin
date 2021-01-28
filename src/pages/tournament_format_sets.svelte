<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Tournament Format Sets</NavTitle>
    {#if innerWidth < 1024}
      <Searchbar class="searchbar-formatset" expandable bind:value={searchString} onChange={(e) => doSearch(e.target.value)} disableButton={!theme.aurora} />
    {:else}
        <div class="nav-container">
          <div class="nav-searchbar-container">
            <Searchbar class="searchbar-formatset" bind:value={searchString} onChange={(e) => doSearch(e.target.value)} disableButton={!theme.aurora} />
          </div>
        </div>
    {/if}
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Format" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      {#if innerWidth < 1024}
      <Link searchbarEnable=".searchbar-formatset" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
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
              <td class="label-cell">{set.duration_days}</td>
              <td class="label-cell">{set.duration_hours}</td>
              <td class="label-cell">{set.is_group}</td>

            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
  
    </Col>
    <Col class="toolpanel" width="100" xlarge="30">
  
      <!-- right section here -->
      <Paginator total={$dataClient.tournamentSetCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent></AccordionContent>
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
        <ListItem accordionItem title="Show rows">
          <AccordionContent></AccordionContent>
        </ListItem>
      </List>
  
    </Col>
  </Row>
  
  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import Paginator from '../components/Paginator.svelte';
  import { onMount } from 'svelte';
  import { AccordionContent, theme, Searchbar, NavLeft, NavTitle, NavRight, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_status, row_count} from '../stores/ui';

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
    await dataClient.getTournamentSetList($row_count, offset, search);
  }

  function onNewClick() {
    $dataClient.tournament_set = {
        id: 0, 
        title: "", 
        duration_days: 0,
        duration_hours: 0,
        is_group: false
      };
    f7router.navigate("/newformatset/0/");
  };

  function onRowClick(set) {
    $dataClient.tournament_set = set;
    f7router.navigate("/newformatset/" + set.id + "/");
  };

  onMount(async () => {
    await dataClient.getTournamentSetCount();
    await dataClient.getTournamentSetList($row_count);
  });
  
</script>
