<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Subscriptions</NavTitle>
    {#if innerWidth < 1024}
      <Searchbar class="searchbar-subscription" expandable value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
    {:else}
        <div class="nav-container">
          <div class="nav-searchbar-container">
            <Searchbar class="searchbar-subscription" value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
          </div>
        </div>
    {/if}
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Subscription" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      {#if innerWidth < 1024}
      <Link searchbarEnable=".searchbar-subscription" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
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
              {#if innerWidth >= 1024 }
              {#if $show_sub_title}
              <th class="label-cell">Subtitle</th>
              {/if}
              {#if $show_img_url}
              <th class="numeric-cell">Image URL</th>
                {/if}
              {/if}
              {#if $show_status}
              <th>Status</th>
              {/if}
              
              {#if $show_type}
              <th class="label-cell">Type</th>
              {/if}
              {#if $show_price}
              <th class="numeric-cell">Price</th>
              {/if}
              {#if $show_image}
              <th></th>
              {/if}
            </tr>
          </thead>
          <tbody>
        
            {#each filteredRows as subscription}
            <tr on:click={onRowClick(subscription)}>
              <td class="numeric-cell">{subscription.id}</td>
              <td class="label-cell">{subscription.title}</td>
              {#if innerWidth >= 1024 }
              {#if $show_sub_title}
              <td class="label-cell">{subscription.subtitle}</td>
              {/if}
              {#if $show_img_url}
              <td class="label-cell">{subscription.img_url}</td>
                {/if}
              {/if}
              {#if $show_status}
              <td class="label-cell">{dataClient.displayStatusTitle(subscription.status)}</td>
              {/if}
              {#if $show_type}
              <td class="labbel-cell">{dataClient.displaySubscriptionTypeTitle(subscription.type_id)}</td>
              {/if}
              {#if $show_price}
              <td class="numeric-cell">{subscription.amount}</td>
              {/if}
              {#if $show_image}
              <td ><img alt="" src={subscription.img_url} height="100%" /></td>
              {/if}
            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
      
  
    </Col>
    <Col class="toolpanel" width="100" xlarge="30">
  
      <!-- right section here -->

      <Paginator total={$dataClient.subscriptionCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.subscriptionCount.total}" color="blue" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.subscriptionCount.draft}" color="red" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.subscriptionCount.published}" color="green" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.subscriptionCount.archived}" color="gray" /></Link>
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
                title="status"
                value={$show_status}
                checked={$show_status}
                onChange={(e) => $show_status = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="type"
                value={$show_type}
                checked={$show_type}
                onChange={(e) => $show_type = e.target.checked}
              ></ListItem>
              <ListItem
                checkbox
                title="price"
                value={$show_price}
                checked={$show_price}
                onChange={(e) => $show_price = e.target.checked}
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
                onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
              ></ListItem>
              <ListItem
                radio
                radioIcon="end"
                title="50 Rows"
                value="50"
                name="row-count"
                checked={$row_count == 50}
                onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
              ></ListItem>
              <ListItem
                radio
                radioIcon="end"
                title="100 Rows"
                value="100"
                name="row-count"
                checked={$row_count == 100}
                onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
              ></ListItem>
              <ListItem
                radio
                radioIcon="end"
                title="200 Rows"
                value="200"
                name="row-count"
                checked={$row_count == 200}
                onChange={(e) => {$row_count = e.target.value; resetRows(0);}}
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
  import Paginator from '../components/Paginator.svelte';
  import { onMount } from 'svelte';
  import { AccordionContent, theme, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_price, row_count} from '../stores/ui';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.subscriptions.filter(subscription => {
                      return subscription.title.toLowerCase().includes(searchString.toLowerCase()) || subscription.id == Number(searchString);
                   }) : $dataClient.subscriptions;


  $: currentPage = 1;
  async function resetRows(offset) {
    if (offset === 0)
      currentPage = 1;
    await dataClient.getSubscriptionList($row_count, offset);
    searchString = null;
  }


  function onNewClick() {
    $dataClient.item = {
        id: 0, 
        title: "", 
        subtitle: "", 
        img_url: "", 
        content: "", 
        type_id: 0, 
        amount: 0, 
        status: 1
      };
    f7router.navigate("/newsub/0/");
  };

  function onRowClick(subscription) {
    $dataClient.subscription = subscription;
    f7router.navigate("/newsub/" + subscription.id + "/");
  };

  onMount(async () => {
    await dataClient.getSubscriptionCount();
    await dataClient.getSubscriptionList($row_count);
  });
  
  
</script>
