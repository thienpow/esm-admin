<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Users</NavTitle>
    {#if innerWidth < 960}
      <Searchbar class="searchbar-user" expandable bind:value={searchString} onChange={(e) => doSearch(e.target.value)} disableButton={!theme.aurora} />
    {:else}
        <div class="nav-container">
          <div class="nav-searchbar-container">
            <Searchbar class="searchbar-user" bind:value={searchString} onChange={(e) => doSearch(e.target.value)} disableButton={!theme.aurora} />
          </div>
        </div>
    {/if}
    <NavRight>
      {#if innerWidth < 960}
      <Link searchbarEnable=".searchbar-user" iconIos="f7:search" iconMd="material:search" iconAurora="f7:search" />
      {/if}
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
              <th class="label-cell">Email</th>
              <th class="numeric-cell">ID</th>
              {#if $show_fbid}
              <th class="numeric-cell">FB ID</th>
              {/if}
              {#if $show_gid}
              <th class="numeric-cell">Google ID</th>
              {/if}
              <th class="label-cell">Username</th>
              <th class="numeric-cell">Role ID</th>
              {#if $show_last_login}
              <th class="label-cell">Last Login</th>
              {/if}
              {#if $show_status}
              <th class="label-cell">Status</th>
              {/if}
              {#if $show_gems}
              <th class="label-cell">Gems</th>
              {/if}
              {#if $show_exp}
              <th class="label-cell">Exp</th>
              {/if}
              {#if $show_avatar_url}
              <th class="label-cell">Avatar Url</th>
              {/if}
            </tr>
          </thead>
          <tbody>
    
            {#each $dataClient.users as user}
            <tr on:click={onRowClick(user)}>
              <td class="label-cell">{user.email}</td>
              <td class="numeric-cell">{user.id}</td>
              {#if $show_fbid}
              <td class="numeric-cell">{user.social_link_fb}</td>
              {/if}
              {#if $show_gid}
              <td class="numeric-cell">{user.social_link_google}</td>
              {/if}
              <td class="label-cell">{user.username}</td>
              <td class="numeric-cell">{user.role_id}</td>
              {#if $show_last_login}
              <td class="label-cell">{timeConverter(user.last_login)}</td>
              {/if}
              {#if $show_status}
              <td class="label-cell">{displayStatus(user.status)}</td>
              {/if}
              {#if $show_gems}
              <td class="label-cell">{user.gem_balance}</td>
              {/if}
              {#if $show_exp}
              <td class="label-cell">{user.exp}</td>
              {/if}
              {#if $show_avatar_url}
              <td class="label-cell">{user.avatar_url}</td>
              {/if}
            </tr>
            {/each}
            
          </tbody>
        </table>
      </div>
  
    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">
  
      <!-- right section here -->

      <Paginator total={$dataClient.userCount.total} row_count={$row_count} bind:currentPage on:resetRows={(e) => resetRows(e.detail.offset)} />

      <List accordionList>
        <ListItem accordionItem accordionItemOpened title="Summary">
          <AccordionContent>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.userCount.total}" color="blue" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Active: {$dataClient.userCount.active}" color="green" /></Link>
            <Link href="#" animate={false} ignoreCache={true}><Chip text="Blocked: {$dataClient.userCount.blocked}" color="red" /></Link>
          </AccordionContent>
        </ListItem>
        <ListItem accordionItem title="Show/Hide fields">
          <AccordionContent>
            <List>
              <ListItem
                checkbox
                title="Show FB ID"
                value={$show_fbid}
                checked={$show_fbid}
                onChange={(e) => $show_fbid = e.target.checked} />
              <ListItem
                checkbox
                title="Show Google ID"
                value={$show_gid}
                checked={$show_gid}
                onChange={(e) => $show_gid = e.target.checked} />
              <ListItem
                checkbox
                title="last login"
                value={$show_last_login}
                checked={$show_last_login}
                onChange={(e) => $show_last_login = e.target.checked} />
              <ListItem
                checkbox
                title="status"
                value={$show_status}
                checked={$show_status}
                onChange={(e) => $show_status = e.target.checked} />
              <ListItem
                checkbox
                title="gems"
                value={$show_gems}
                checked={$show_gems}
                onChange={(e) => $show_gems = e.target.checked} />
              <ListItem
                checkbox
                title="avatar url"
                value={$show_avatar_url}
                checked={$show_avatar_url}
                onChange={(e) => $show_avatar_url = e.target.checked} />
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
  import { AccordionContent, theme, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';
  import { show_fbid, show_gid, show_last_login, show_gems, show_exp, show_avatar_url, show_status, row_count } from '../stores/ui';
  
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
    await dataClient.getUserList($row_count, offset, search);
  }

  function displayStatus(status) {
    switch (status) {
      case 0: 
        return "Draft";
      case 1:
        return "Active";
      case 2: 
        return "Blocked";
    }
  }

  function timeConverter(UNIX_timestamp){
    return new Date(UNIX_timestamp * 1000);
  }

  function onRowClick(user) {
    $dataClient.user = user;
    f7router.navigate("/newuser/" + user.id + "/");
  };

  onMount(async () => {
    await dataClient.getUserCount();
    await dataClient.getUserList($row_count);
  });

</script>
