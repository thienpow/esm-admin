<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle>Sales Management</NavTitle>
    <SearchBar name="searchbar-buy" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
      <NavRight>
        <SearchBarIcon name="searchbar-buy" />
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
              <th class="numeric-cell">Id</th>
              <th class="numeric-cell">Type</th>
              <th class="numeric-cell">Item ID</th>
              <th class="label-cell">Title</th>
              <th class="numeric-cell">UserID</th>
              <th class="label-cell">Nickname</th>
              <th class="label-cell">Email</th>
              <th class="label-cell">Payment Detail</th>
            </tr>
          </thead>
          <tbody>
            {#each $dataClient.buys as buy}
            <tr on:click={onRowClick(buy)}>
              <td class="numeric-cell">{buy.id}</td>
              <td class="numeric-cell">{buy.item_type_id}</td>
              <td class="numeric-cell">{buy.item_id}</td>
              <td class="label-cell">{buy.item_title}</td>
              <td class="numeric-cell">{buy.user_id}</td>
              <td class="label-cell">{buy.user_nick_name}</td>
              <td class="label-cell">{buy.user_email}</td>
              <td class="label-cell" style="font-size: 9px;">${buy.price} | {buy.payment_id}<hr/>{buy.created_on}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
      

    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <!-- right section here -->
      
      <Paginator total={$dataClient.buyCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

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
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.buyCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(101)} href="#" animate={false} ignoreCache={true}><Chip text="Subscription: {$dataClient.buyCount.subscription}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(201)} href="#" animate={false} ignoreCache={true}><Chip text="Item: {$dataClient.buyCount.item}" color="yellow" /></Link>
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
  export let f7route;

  let innerWidth = 0;

  $: searchString = "";
  $: filter_selected = "Total";


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
    await dataClient.getBuyList($row_count, offset, search, -1);
  }

  function onRowClick(buy) {
    
    $dataClient.buy = {
      id: buy.id,
      item_type_id: buy.item_type_id,
      item_id: buy.item_id,
      item_title: buy.item_title,
      user_id: buy.user_id,
      user_nick_name: buy.user_nick_name,
      user_email:  buy.user_email,
      payment_id: buy.payment_id,
      price: buy.price,
      created_on: buy.created_on
    };

    
    //f7router.navigate("/newbuy/" + buy.id + "/");
  };

  async function onFilterClick(status) {
    searchString = "";
    currentPage = 1;

    switch(status) {
      case -1:
        filter_selected = "Total";
        break;
      case 101:
        filter_selected = "Subscription";
        break;
      case 201:
        filter_selected = "Item";
        break;
    }
    
    await dataClient.getBuyList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getBuyCount();
    await dataClient.getBuyList($row_count, 0, "", f7route.params.st);
  });
  
</script>
