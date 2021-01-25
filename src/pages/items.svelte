<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Items</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width={100} medium={15}>
        <Link ignoreCache={true} on:click={onNewClick}>
          <Chip text="New item" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" />
        </Link>
      </Col>
      <Col tag="span" width={100} medium={80}>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.itemCount.total}" color="blue" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.itemCount.draft}" color="red" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.itemCount.published}" color="green" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.itemCount.archived}" color="gray" /></Link>
      </Col>
      <Col tag="span">
      </Col>
    </Row>
  </Block>
  

  <!-- Search -->
  <Row>
    <Col width="0" medium="25">
    </Col>
    <Col width="75" medium="50">
      <Searchbar
        value={searchString}
        onChange={(e) => searchString = e.target.value}
        disableButton={!theme.aurora}
      />
    </Col>
    <Col width="25">
      <Menu class="menu-left">
        <MenuItem iconF7="table" dropdown>
          <MenuDropdown right>
            <List class="theme-dark">
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
          </MenuDropdown>
        </MenuItem>
        <MenuItem iconF7="square_list" dropdown>
          <MenuDropdown right>
            <List class="theme-dark">
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
          </MenuDropdown>
        </MenuItem>
      </Menu>
    </Col>
  </Row>
  
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
    
        {#each filteredRows as item}
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
          {#if $show_type}
          <td class="labbel-cell">{dataClient.displayItemTypeTitle(item.type_id)}</td>
          {/if}
          {#if $show_price}
          <td class="numeric-cell">{item.amount}</td>
          {/if}
          {#if $show_image}
          <td ><img alt="" src={item.img_url} height="100%" /></td>
          {/if}
        </tr>
        {/each}
        
      </tbody>
    </table>
  </div>
  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { theme, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient.js';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_price, row_count} from '../stores/ui.js';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.items.filter(item => {
                      return item.title.toLowerCase().includes(searchString.toLowerCase()) || item.id == Number(searchString);
                   }) : $dataClient.items;


  async function resetRows() {
    await dataClient.getItemList($row_count);
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
    f7router.navigate("/newitem/0/");
  };

  function onRowClick(item) {
    $dataClient.item = item;
    f7router.navigate("/newitem/" + item.id + "/");
  };

  onMount(async () => {
    await dataClient.getItemCount();
    await dataClient.getItemList($row_count);
  });
  
  
</script>
