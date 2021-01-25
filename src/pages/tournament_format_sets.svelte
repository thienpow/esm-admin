<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Tournaments</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width={100} medium={15}>
        <Link ignoreCache={true} on:click={onNewClick}>
          <Chip text="New Format" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" />
        </Link>
      </Col>
      <Col tag="span" width={100} medium={80}>
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
                title="status"
                value={$show_status}
                checked={$show_status}
                onChange={(e) => $show_status = e.target.checked}
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
          <th>Duration Days</th>
          <th>Duration Hours</th>
          <th>IsGroup</th>
        </tr>
      </thead>
      <tbody>
    
        {#each filteredRows as set}
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
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { theme, Searchbar, NavLeft, NavTitle, NavRight, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient.js';
  import {show_status} from '../stores/ui.js';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.tournament_sets.filter(set => {
                      return set.title.toLowerCase().includes(searchString.toLowerCase()) || set.id == Number(searchString);
                   }) : $dataClient.tournament_sets;


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
    //await dataClient.getTournamentCount();
    await dataClient.getTournamentSetList();
  });
  
</script>
