<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle>Winners Management</NavTitle>
    <SearchBar name="searchbar-winners" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <SearchBarIcon name="searchbar-winners" />
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
              <th class="numeric-cell">WinningID</th>
              <th class="label-cell">User</th>
              <th class="label-cell">User ID</th>
              <th class="label-cell">Prize Title</th>
              <th class="label-cell">Prize Type</th>
              <th class="label-cell">Status</th>
              <th class="label-cell">Created On | Claimed On</th>
            </tr>
          </thead>
          <tbody>
            {#each $dataClient.winners as winner}
            <tr on:click={onRowClick(winner)}>
              <td class="numeric-cell">{winner.id}</td>
              <td class="label-cell">{winner.user_nick_name}</td>
              <td class="label-cell">{winner.user_id}</td>
              <td class="label-cell">{winner.prize_title}</td>
              <td class="label-cell">{winner.prize_type_id}</td>
              <td class="label-cell">{dataClient.displayWinnerStatusTitle(winner.status)}</td>
              <td class="label-cell" style="font-size: 9px;">{winner.created_on}<hr/>{winner.claimed_on}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
      

    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <!-- right section here -->
      
      <Paginator total={$dataClient.winnerCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

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
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.winnerCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Unclaimed: {$dataClient.winnerCount.unclaimed}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Claimed: {$dataClient.winnerCount.claimed}" color="yellow" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Delivered: {$dataClient.winnerCount.delivered}" color="gray" /></Link>
                <Link on:click={(e) => onFilterClick(4)} href="#" animate={false} ignoreCache={true}><Chip text="Expired: {$dataClient.winnerCount.expired}" color="red" /></Link>
              </Col>
            </Row>
          </AccordionContent>
        </ListItem>
        <ListItem accordionItem title="Show/Hide fields">
          <AccordionContent>
            <List>
              
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
  import { AccordionContent, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Page, Navbar } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_timezone, show_scheduled_on, show_tickets_collected, row_count} from '../stores/ui';

  export let f7router;

  let innerWidth = 0;

  $: searchString = "";
  $: filter_selected = "Unclaimed";


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
    await dataClient.getWinnerList($row_count, offset, search, -1);
  }

  function onRowClick(winner) {
    
    $dataClient.winner = {
      id: winner.id,
      prize_id: winner.prize_id,
      prize_title: winner.prize_title,
      prize_type_id: winner.prize_type_id,
      user_id: winner.user_id,
      user_nick_name: winner.user_nick_name,
      status: winner.status,
      created_on: winner.created_on,
      claimed_on: winner.claimed_on,
      ship_tracking: winner.ship_tracking
    };

    
    f7router.navigate("/newwinner/" + winner.id + "/");
  };

  async function onFilterClick(status) {
    searchString = "";
    currentPage = 1;

    switch(status) {
      case -1:
        filter_selected = "Total";
        break;
      case 1:
        filter_selected = "Unclaimed";
        break;
      case 2:
        filter_selected = "Claimed";
        break;
      case 3:
        filter_selected = "Delivered";
        break;
      case 4:
        filter_selected = "Expired";
        break;
    }
    
    await dataClient.getWinnerList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getWinnerCount();
    await dataClient.getWinnerList($row_count, 0, "", 1);
  });
  
</script>
