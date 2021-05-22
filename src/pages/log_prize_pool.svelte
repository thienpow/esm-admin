<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Prize Pools</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width=5>
      </Col>
      <Col tag="span" width=90>
      </Col>
      <Col tag="span" width=5>
      </Col>
    </Row>
  </Block>
  <BlockTitle>List</BlockTitle>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th class="numeric-cell">Prize ID</th>
          <th class="numeric-cell">Game ID</th>
          <th class="numeric-cell">WinFrom</th>
          <th class="numeric-cell">Tickets</th>
          <th class="label-cell">Timestamp</th>
          <th class="label-cell">IsClosed</th>
        </tr>
      </thead>
      <tbody>
        {#each $dataClient.prizePools as p}
        <tr>
          <td class="numeric-cell">{p.id}</td>
          <td class="numeric-cell">{p.prize_id}</td>
          <td class="numeric-cell">{p.game_id}</td>
          <td class="numeric-cell">{p.win_from}</td>
          <td class="label-cell">{p.created_on}</td>
          <td class="label-cell">{p.is_closed}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>


  <Block strong>
    <Row tag="p">
      <Col><Button class="col" large fill raised color="green" back animate={false}>Back</Button></Col>
    </Row>
  </Block>
</Page>
<script>
  import { Button, NavLeft, NavTitle, NavRight, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7route;
  const id = f7route.params.id;

  onMount(async () => {
    await dataClient.getPrizePoolList(id);
  });
  
</script>
