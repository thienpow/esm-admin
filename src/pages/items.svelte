<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Items</NavTitle>
    <SearchBar name="searchbar-item" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Item" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      <SearchBarIcon name="searchbar-item" />
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
              
              {#if $show_quantity}
              <th class="numeric-cell">Quantity</th>
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
        
            {#each $dataClient.items as item}
            <tr on:click={onRowClick(item)}>
              <td class="numeric-cell">{item.id}</td>
              <td class="label-cell">{item.title}</td>
              {#if innerWidth >= 1024 }
              {#if $show_sub_title}
              <td class="label-cell">{item.subtitle}</td>
              {/if}
              {#if $show_img_url}
              <td class="label-cell">{item.img_url}</td>
                {/if}
              {/if}
              {#if $show_status}
              <td class="label-cell">{dataClient.displayStatusTitle(item.status)}</td>
              {/if}

              {#if $show_quantity}
              <td class="numeric-cell">{item.quantity}</td>
              {/if}
              {#if $show_type}
              <td class="labbel-cell">{dataClient.displayItemTypeTitle(item.type_id)}</td>
              {/if}
              {#if $show_price}
              <td class="numeric-cell">{item.price}</td>
              {/if}
              
              {#if $show_image}
              <td ><img alt="" src={item.img_url} height="100%" /></td>
              {/if}
            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
  
    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">
  
      <!-- right section here -->
      
      <Paginator total={$dataClient.itemCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />
    
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
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.itemCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.itemCount.draft}" color="red" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.itemCount.published}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.itemCount.archived}" color="gray" /></Link>
              </Col>
            </Row>
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
                title="quantity"
                value={$show_quantity}
                checked={$show_quantity}
                onChange={(e) => $show_quantity = e.target.checked}
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
  import { AccordionContent, List, ListItem, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_price, show_quantity, row_count} from '../stores/ui';
  

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
    await dataClient.getItemList($row_count, offset, search, -1);
  }

  function onNewClick() {
    $dataClient.item = {
        id: 0, 
        title: "", 
        subtitle: "", 
        img_url: "", 
        content: "", 
        type_id: 0, 
        price: 0.0,
        quantity: 0, 
        status: 1
      };
    f7router.navigate("/newitem/0/");
  };

  function onRowClick(item) {
    $dataClient.item = {
        id: item.id, 
        title: item.title, 
        subtitle: item.subtitle, 
        img_url: item.img_url, 
        content: item.content, 
        type_id: item.type_id, 
        price: item.price,
        quantity: item.quantity, 
        status: item.status
      };
    f7router.navigate("/newitem/" + item.id + "/");
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
    
    await dataClient.getItemList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getItemCount();
    await dataClient.getItemList($row_count, 0, "", f7route.params.st);
  });
  
  
</script>
