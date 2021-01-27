<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Games</NavTitle>
    {#if innerWidth < 1024}
      <Searchbar class="searchbar-game" expandable value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
    {:else}
        <div class="nav-container">
          <div class="nav-searchbar-container">
            <Searchbar class="searchbar-game" value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
          </div>
        </div>
    {/if}
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Game" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      {#if innerWidth < 1024}
      <Link searchbarEnable=".searchbar-game" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
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
              {#if $show_image}
              <th></th>
              {/if}
            </tr>
          </thead>
          <tbody>
        
            {#each filteredRows as game}
            <tr on:click={onRowClick(game)}>
              <td class="numeric-cell">{game.id}</td>
              <td class="label-cell">{game.title}</td>
              {#if innerWidth >= 1024 }
    
                {#if $show_sub_title}
              <td class="label-cell">{game.subtitle}</td>
                {/if}
                {#if $show_img_url}
              <td class="label-cell">{game.img_url}</td>
                {/if}
              {/if}
              {#if $show_status}
              <td class="label-cell">{dataClient.displayStatusTitle(game.status)}</td>
              {/if}
              {#if $show_image}
              <td ><img alt="" src={game.img_url} height="100%" /></td>
              {/if}
            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
    </Col>
    <Col class="toolpanel" width="100" xlarge="30">

      <!-- right section here -->

      <Paginator total={$dataClient.gameCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />
    
      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.gameCount.total}" color="blue" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.gameCount.draft}" color="red" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.gameCount.published}" color="green" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.gameCount.archived}" color="gray" /></Link>
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
  import { onMount } from 'svelte';
  import { AccordionContent, theme, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Icon, Page, Navbar } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, row_count} from '../stores/ui';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.games.filter(game => {
                      return game.title.toLowerCase().includes(searchString.toLowerCase()) || game.id == Number(searchString);
                   }) : $dataClient.games;


  $: currentPage = 1;
  async function resetRows(offset) {
    if (offset === 0)
      currentPage = 1;
    await dataClient.getGameList($row_count, offset);
    searchString = null;
  }

  function onNewClick() {
    $dataClient.game = {
        id: 0, 
        title: "", 
        subtitle: "", 
        img_url: "", 
        content: "", 
        type_id: 0, 
        game_code: "",
        engine_id: 11, 
        version: 0, 
        status: 1
      };
    f7router.navigate("/newgame/0/");
  };

  async function onRowClick(game) {
    $dataClient.game = game;
    f7router.navigate("/newgame/" + game.id + "/");
  };

  onMount(async () => {
    await dataClient.getGameCount();
    await dataClient.getGameList($row_count, 0);
  });
  
</script>
