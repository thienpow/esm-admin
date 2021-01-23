<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Users</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width={100} medium={15}>
      </Col>
      <Col tag="span" width={100} medium={80}>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: {$dataClient.userCount.total} users" color="blue" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Active: {$dataClient.userCount.active} users" color="green" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Blocked: {$dataClient.userCount.blocked} users" color="red" /></Link>
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
                title="last login"
                value={$show_last_login}
                checked={$show_last_login}
                onChange={(e) => $show_last_login = e.target.checked}
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
                title="gems"
                value={$show_gems}
                checked={$show_gems}
                onChange={(e) => $show_gems = e.target.checked}
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
          <th class="label-cell">Email</th>
          <th class="numeric-cell">ID</th>
          <th class="numeric-cell">FB ID</th>
          <th class="numeric-cell">Google ID</th>
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
          <th class="label-cell">Avatar Url</th>
          <th class="label-cell">Exp</th>
        </tr>
      </thead>
      <tbody>

        {#each filteredRows as user}
        <tr on:click={onRowClick(user)}>
          <td class="label-cell">{user.email}</td>
          <td class="numeric-cell">{user.id}</td>
          <td class="numeric-cell">{user.social_link_fb}</td>
          <td class="numeric-cell">{user.social_link_google}</td>
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
          <td class="label-cell">{user.avatar_url}</td>
          <td class="label-cell">{user.exp}</td>
        </tr>
        {/each}
        
      </tbody>
    </table>
  </div>
</Page>
<script>
  import { theme, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient.js';
  import { show_gems, show_last_login, show_status, row_count } from '../stores/ui.js';
  
  export let f7router;

  $: searchString = null;

  $: filteredRows = searchString ? filteredRows = $dataClient.users.filter(user => {
                      return user.email.toLowerCase().includes(searchString.toLowerCase()) || user.id == Number(searchString);
                   }) : $dataClient.users;

  async function resetRows() {
    await dataClient.getUserList($row_count);
    searchString = null;
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
