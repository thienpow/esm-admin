<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Games</NavTitle>
    <SearchBar name="searchbar-game" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Game" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      <SearchBarIcon name="searchbar-game" />
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
              {#if $show_image}
              <th></th>
              {/if}
            </tr>
          </thead>
          <tbody>
        
            {#each $dataClient.games as game}
            <tr on:click={onRowClick(game)}>
              <td class="numeric-cell">{game.id}</td>
              <td class="label-cell">{game.title}</td>
              {#if innerWidth >= 1024 }
    
                {#if $show_sub_title}
              <td class="label-cell">{game.subtitle}</td>
                {/if}
                {#if $show_img_url}
              <td class="label-cell" style="font-size: 9px;">{game.img_url}</td>
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
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <!-- right section here -->

      <Paginator total={$dataClient.gameCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />
    
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
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.gameCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.gameCount.draft}" color="red" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.gameCount.published}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.gameCount.archived}" color="gray" /></Link>
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
  import { AccordionContent, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Icon, Page, Navbar } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, row_count} from '../stores/ui';
  

  export let f7router;

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
    await dataClient.getGameList($row_count, offset, search, -1);
    
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
        status: 1,
        score_rule: 0,
        watch_ad_get_tickets: 0,
        watch_ad_get_exp: 0,
        use_gem_get_tickets: 0,
        use_gem_get_exp: 0,
        use_how_many_gems: 0,
      };
    f7router.navigate("/newgame/0/");
  };

  async function onRowClick(game) {
    $dataClient.game = {
        id: game.id, 
        title: game.title, 
        subtitle: game.subtitle, 
        img_url: game.img_url, 
        content: game.content, 
        type_id: game.type_id, 
        game_code: "",
        engine_id: game.engine_id, 
        version: game.version, 
        status: game.status,
        score_rule: game.score_rule,
        watch_ad_get_tickets: game.watch_ad_get_tickets,
        watch_ad_get_exp: game.watch_ad_get_exp,
        use_gem_get_tickets: game.use_gem_get_tickets,
        use_gem_get_exp: game.use_gem_get_exp,
        use_how_many_gems: game.use_how_many_gems,
      };
    
    f7router.navigate("/newgame/" + game.id + "/");
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
    
    await dataClient.getGameList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getGameCount();
    await dataClient.getGameList($row_count, 0, "", 2);
  });
  
</script>
