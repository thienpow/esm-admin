<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle>Winners Management</NavTitle>
    <SearchBar name="searchbar-prize" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    
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
              <th class="label-cell">Email</th>
              <th class="label-cell">Prize Type</th>
              <th class="label-cell">Prize Title</th>
              <th class="label-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr on:click={onRowClick($dataClient.winner)}>
              <td class="numeric-cell">1</td>
              <td class="label-cell">wukong</td>
              <td class="label-cell">thienpow@gmail.com</td>
              <td class="label-cell">FEATURED</td>
              <td class="label-cell">SteelSeries Rival 60</td>
              <td class="label-cell">Unclaimed</td>
            </tr>
            <tr on:click={onRowClick($dataClient.winner)}>
              <td class="numeric-cell">2</td>
              <td class="label-cell">wukong</td>
              <td class="label-cell">thienpow@gmail.com</td>
              <td class="label-cell">FEATURED</td>
              <td class="label-cell">SteelSeries Rival 60</td>
              <td class="label-cell">Claimed</td>
            </tr>
            <tr on:click={onRowClick($dataClient.winner)}>
              <td class="numeric-cell">3</td>
              <td class="label-cell">wukong</td>
              <td class="label-cell">thienpow@gmail.com</td>
              <td class="label-cell">FEATURED</td>
              <td class="label-cell">SteelSeries Rival 60</td>
              <td class="label-cell">Delivered</td>
            </tr>
            <tr on:click={onRowClick($dataClient.winner)}>
              <td class="numeric-cell">4</td>
              <td class="label-cell">wukong</td>
              <td class="label-cell">thienpow@gmail.com</td>
              <td class="label-cell">FEATURED</td>
              <td class="label-cell">SteelSeries Rival 60</td>
              <td class="label-cell">Expired</td>
            </tr>
          </tbody>
        </table>
      </div>
      

    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <!-- right section here -->
      
      <Paginator total={$dataClient.prizeCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Unclaimed: 1" color="green" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Claimed: 1" color="yellow" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Delivered: 1" color="blue" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Expired: 1" color="red" /></Link>
          </AccordionContent>
        </ListItem>
        <ListItem accordionItem title="Show/Hide fields">
          <AccordionContent>
            <List>
              <ListItem
                checkbox
                title="sub_title"
                value={$show_sub_title}
                checked={$show_sub_title}
                onChange={(e) => $show_sub_title = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="img_url"
                value={$show_img_url}
                checked={$show_img_url}
                onChange={(e) => $show_img_url = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="image"
                value={$show_image}
                checked={$show_image}
                onChange={(e) => $show_image = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="tickets_collected"
                value={$show_tickets_collected}
                checked={$show_tickets_collected}
                onChange={(e) => $show_tickets_collected = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="show_timezone"
                value={$show_timezone}
                checked={$show_timezone}
                onChange={(e) => $show_timezone = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="scheduled_on"
                value={$show_scheduled_on}
                checked={$show_scheduled_on}
                onChange={(e) => $show_scheduled_on = e.target.checked}
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
  import { AccordionContent, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Page, Navbar } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_timezone, show_scheduled_on, show_tickets_collected, row_count} from '../stores/ui';
  

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
    await dataClient.getPrizeList($row_count, offset, search, 0);
  }

  function onRowClick(winner) {
    $dataClient.winner = winner;
    f7router.navigate("/newwinner/" + winner.id + "/");
  };

  onMount(async () => {
    //dataClient.getWinnerList($row_count, 0, "", 0);
  });
  
</script>
