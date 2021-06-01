<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle>Prizes</NavTitle>
    <SearchBar name="searchbar-prize" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <Link ignoreCache={true} on:click={onNewClick}><Chip text="New Prize" mediaBgColor="blue" iconIos="f7:plus_circle" iconAurora="f7:plus_circle" iconMd="material:add_circle" /></Link>
      <SearchBarIcon name="searchbar-prize" />
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
              <th>Progress</th>
              {/if}
              {#if $show_type}
              <th class="numeric-cell">TypeID</th>
              {/if}
              {#if $show_tickets_collected}
              <th class="numeric-cell">TicketsCollected</th>
              {/if}
              {#if $show_timezone}
              <th class="numeric-cell">TimeZone</th>
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
        
            {#each $dataClient.prizes as prize}
            <tr on:click={onRowClick(prize)}>
              <td class="numeric-cell">{prize.id}</td>
              <td class="label-cell">{prize.title}</td>
              {#if innerWidth >= 1024 }
              {#if $show_sub_title}
              <td class="label-cell">{prize.subtitle}</td>
              {/if}
                {#if $show_img_url}
              <td class="label-cell" style="font-size: 9px;">{prize.img_url}</td>
                {/if}
              {/if}
              {#if $show_status}
              <td class="label-cell">{dataClient.displayStatusTitle(prize.status)}</td>
              <td class="label-cell">{dataClient.displayStatusProgressTitle(prize.status_progress)}</td>
              {/if}
              {#if $show_type}
              <td class="numeric-cell">{dataClient.displayPrizeTypeTitle(prize.type_id)}</td>
              {/if}
              {#if $show_tickets_collected}
              <td class="numeric-cell">{prize.tickets_collected}</td>
              {/if}
              {#if $show_timezone}
              <td class="numeric-cell">{getTimezone(prize.timezone)}</td>
              {/if}
              {#if $show_scheduled_on}
              <td class="numeric-cell">{formatDT(prize.scheduled_on)}</td>
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
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <!-- right section here -->
      
      <Paginator total={$dataClient.prizeCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

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
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.prizeCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Draft: {$dataClient.prizeCount.draft}" color="red" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Published: {$dataClient.prizeCount.published}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.prizeCount.archived}" color="gray" /></Link>
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
  //import timezones from '../js/timezones';
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
  $: filter_selected = "Published";


  const zeroPad = (num, places) => String(num).padStart(places, '0');
  function formatDT(dt) {
    return ( zeroPad(dt.getDate(), 2) + "-" + zeroPad((dt.getMonth() + 1), 2) + "-" + dt.getFullYear() + " " + zeroPad(dt.getHours(), 2) + ":" + zeroPad(dt.getMinutes(), 2) );
  }

  function getTimezone(tz) {

    let foundTimezone = $dataClient.timezones.filter(zone => {
      return zone.offset == tz;
    });
    return foundTimezone[0].stext;
  }

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
    await dataClient.getPrizeList($row_count, offset, search, -1);
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
        scheduled_on: new Date(),
        is_repeat: false,
        repeated_on: [], 
        repeated_on_mon: false,
        repeated_on_tue: false,
        repeated_on_wed: false,
        repeated_on_thu: false,
        repeated_on_fri: false,
        repeated_on_sat: false,
        repeated_on_sun: false,
        status: 1,
        status_progress: 0,
        tickets_collected: 0,
      };
    f7router.navigate("/newprize/0/");
  };

  function onRowClick(prize) {
    $dataClient.prize = {
        id: prize.id, 
        title: prize.title, 
        subtitle: prize.subtitle, 
        img_url: prize.img_url, 
        content: prize.content, 
        type_id: prize.type_id, 
        tickets_required: prize.tickets_required,
        duration_days: prize.duration_days,
        duration_hours: prize.duration_hours,
        timezone: prize.timezone,
        scheduled_on: prize.scheduled_on,
        is_repeat: prize.is_repeat,
        repeated_on: prize.repeated_on, 
        repeated_on_mon: prize.repeated_on_mon,
        repeated_on_tue: prize.repeated_on_tue,
        repeated_on_wed: prize.repeated_on_wed,
        repeated_on_thu: prize.repeated_on_thu,
        repeated_on_fri: prize.repeated_on_fri,
        repeated_on_sat: prize.repeated_on_sat,
        repeated_on_sun: prize.repeated_on_sun,
        status: prize.status,
        status_progress: prize.status_progress,
        tickets_collected: prize.tickets_collected,
      };
    f7router.navigate("/newprize/" + prize.id + "/");
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
    
    await dataClient.getPrizeList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getPrizeCount();
    await dataClient.getPrizeList($row_count, 0, "", 2);
  });
  
</script>
