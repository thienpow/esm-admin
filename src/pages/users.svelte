<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Users</NavTitle>
    <SearchBar name="searchbar-user" bind:searchString on:doSearch={(e) => doSearch(e.detail.value)} />
    <NavRight>
      <SearchBarIcon name="searchbar-user" />
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
              <td class="label-cell" style="font-size: 9px;">{user.last_login}</td>
              {/if}
              {#if $show_status}
              <td class="label-cell">{dataClient.displayUserStatusTitle(user.status)}</td>
              {/if}
              {#if $show_gems}
              <td class="label-cell">{user.gem_balance}</td>
              {/if}
              {#if $show_exp}
              <td class="label-cell">{user.exp}</td>
              {/if}
              {#if $show_avatar_url}
              <td class="label-cell" style="font-size: 9px;">{user.avatar_url}</td>
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
            <Row>
              <Col>
                <Chip outline text="Selected: {filter_selected}" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Link on:click={(e) => onFilterClick(-1)} href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.userCount.total}" color="blue" /></Link>
                <Link on:click={(e) => onFilterClick(1)} href="#" animate={false} ignoreCache={true}><Chip text="Active: {$dataClient.userCount.active}" color="green" /></Link>
                <Link on:click={(e) => onFilterClick(2)} href="#" animate={false} ignoreCache={true}><Chip text="Blocked: {$dataClient.userCount.blocked}" color="red" /></Link>
                <Link on:click={(e) => onFilterClick(3)} href="#" animate={false} ignoreCache={true}><Chip text="Pending Delete: {$dataClient.userCount.pending_delete}" color="yellow" /></Link>
                <Link on:click={(e) => onFilterClick(4)} href="#" animate={false} ignoreCache={true}><Chip text="Archived: {$dataClient.userCount.archived}" color="gray" /></Link>
              </Col>
            </Row>
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
  import SearchBar from '../components/SearchBar.svelte';
  import SearchBarIcon from '../components/SearchBarIcon.svelte';
  import { AccordionContent, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Page, Navbar } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';
  import { show_fbid, show_gid, show_last_login, show_gems, show_exp, show_avatar_url, show_status, row_count } from '../stores/ui';
  
  export let f7router;
  export let f7route;

  let innerWidth = 0;

  $: searchString = "";
  $: filter_selected = "Active";


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
    await dataClient.getUserList($row_count, offset, search, -1);
  }

  function onRowClick(user) {
    $dataClient.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      firstname: user.firstname,
      lastname: user.lastname,
      created_on: user.created_on,
      last_login: user.last_login,
      role_id: user.role_id,
      status: user.status,
      gem_balance: user.gem_balance,
      social_link_fb: user.social_link_fb,
      social_link_google: user.social_link_google,
      avatar_url:  user.avatar_url,
      exp: user.exp,
      full_name: user.full_name,
      address: user.address,
      city: user.city,
      state: user.state,
      zip_code: user.zip_code,
      country: user.country,
      country_code: user.country_code,
      is_notify_allowed: user.is_notify_allowed,
      is_notify_new_reward: user.is_notify_new_reward,
      is_notify_new_tournament: user.is_notify_new_tournament,
      is_notify_tour_ending: user.is_notify_tour_ending,
      nick_name: user.nick_name,
    };
    f7router.navigate("/newuser/" + user.id + "/");
  };

  async function onFilterClick(status) {
    searchString = "";
    currentPage = 1;

    switch(status) {
      case -1:
        filter_selected = "Total";
        break;
      case 1:
        filter_selected = "Active";
        break;
      case 2:
        filter_selected = "Blocked";
        break;
      case 3:
        filter_selected = "Pending Delete";
        break;
      case 4:
        filter_selected = "Archived";
        break;
    }
    
    await dataClient.getUserList($row_count, 0, "", status);
  }

  onMount(async () => {
    await dataClient.getUserCount();
    await dataClient.getUserList($row_count, 0, "", f7route.params.st);
  });

</script>
