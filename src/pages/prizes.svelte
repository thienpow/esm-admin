<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle>Prizes</NavTitle>
    {#if innerWidth < 1024}
      <Searchbar class="searchbar-top" expandable value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
    {:else}
        <div class="nav-container">
          <div class="nav-searchbar-container">
            <Searchbar class="searchbar-top" value={searchString} onChange={(e) => searchString = e.target.value} disableButton={!theme.aurora} />
          </div>
        </div>
    {/if}
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Game" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      {#if innerWidth < 1024}
      <Link searchbarEnable=".searchbar-top" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
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
              <th class="numeric-cell">TypeID</th>
              {/if}
              {#if $show_tickets_collected}
              <th class="numeric-cell">TicketsCollected</th>
              {/if}
              {#if $show_scheduled_on}
              <th class="numeric-cell">ScheduledOn</th>
              {/if}
              {#if $show_image}
              <th></th>
              {/if}
            </tr>
          </thead>
          <tbody>
        
            {#each filteredRows as prize}
            <tr on:click={onRowClick(prize)}>
              <td class="numeric-cell">{prize.id}</td>
              <td class="label-cell">{prize.title}</td>
              {#if innerWidth >= 1024 }
              {#if $show_sub_title}
              <td class="label-cell">{prize.subtitle}</td>
              {/if}
                {#if $show_img_url}
              <td class="label-cell">{prize.img_url}</td>
                {/if}
              {/if}
              {#if $show_status}
              <td class="label-cell">{dataClient.displayStatusTitle(prize.status)}</td>
              {/if}
              {#if $show_type}
              <td class="numeric-cell">{dataClient.displayPrizeTypeTitle(prize.type_id)}</td>
              {/if}
              {#if $show_tickets_collected}
              <td class="numeric-cell">{prize.tickets_collected}</td>
              {/if}
              {#if $show_scheduled_on}
              <td class="numeric-cell">{prize.scheduled_on}</td>
              {/if}
              {#if $show_image}
              <td ><img alt="" src={prize.img_url} height="100%" /></td>
              {/if}
            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
        
      

    </Col>
    <Col class="toolpanel" width="100" xlarge="30">

      <!-- right section here -->
      
      <Paginator total={$dataClient.prizeCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.prizeCount.total}" color="blue" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.prizeCount.draft}" color="red" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.prizeCount.published}" color="green" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.prizeCount.archived}" color="gray" /></Link>
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
  import { Panel, AccordionContent,theme, Card, CardHeader, CardContent, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Icon, Page, Navbar, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_reward_amount, show_scheduled_on, show_tickets_collected, row_count} from '../stores/ui';
  

  export let f7router;

  let innerWidth = 0;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.prizes.filter(prize => {
                      return prize.title.toLowerCase().includes(searchString.toLowerCase()) || prize.id == Number(searchString);
                   }) : $dataClient.prizes;

  
  $: currentPage = 1;
  async function resetRows(offset) {
    if (offset === 0)
      currentPage = 1;
    await dataClient.getPrizeList($row_count, offset);
    searchString = null;
  }

  function onNewClick() {
    $dataClient.prize = {
        id: 0, 
        title: "", 
        subtitle: "", 
        img_url: "", 
        content: "", 
        type_id: 0, 
        tickets_required: 0,
        duration_days: 0,
        duration_hours: 0,
        timezone: 0,
        scheduled_on: 0,
        is_repeat: false,
        repeated_on: [], 
        repeated_on_mon: false,
        repeated_on_tue: false,
        repeated_on_wed: false,
        repeated_on_thu: false,
        repeated_on_fri: false,
        repeated_on_sat: false,
        repeated_on_sun: false,
        status: 0,
        status_prize: 0,
        tickets_collected: 0,
        tournament_ids: [], 
      };
    f7router.navigate("/newprize/0/");
  };

  function onRowClick(prize) {
    $dataClient.prize = prize;
    f7router.navigate("/newprize/" + prize.id + "/");
  };

  onMount(async () => {
    await dataClient.getPrizeCount();
    await dataClient.getPrizeList($row_count);
  });
  
</script>
