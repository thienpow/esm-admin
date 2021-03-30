<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Play Logs</NavTitle>
    
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
          <th class="numeric-cell">ID</th>
          <th class="numeric-cell">Prize ID</th>
          <th class="numeric-cell">Game ID</th>
          <th class="numeric-cell">Enter Timestamp</th>
          <th class="numeric-cell">Leave Timestamp</th>
          <th class="numeric-cell">Is Watched Ad</th>
          <th class="numeric-cell">Game Score</th>
        </tr>
      </thead>
      <tbody>
        {#each $dataClient.logGList as log}
        <tr>
          <td class="numeric-cell">{log.id}</td>
          <td class="numeric-cell">{log.prize_id}</td>
          <td class="numeric-cell">{log.game_id}</td>
          <td class="numeric-cell">{log.enter_timestamp}</td>
          <td class="numeric-cell">{log.leave_timestamp}</td>
          <td class="numeric-cell">{log.is_watched_ad}</td>
          <td class="numeric-cell">{log.game_score}</td>
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
  import { row_count } from '../stores/ui';
  
  export let f7route;
  const id = f7route.params.id;

  async function resetRows() {
    await dataClient.getGameList($row_count);
    searchString = null;
  }

  onMount(async () => {
    if (id > 0) {
      //
      await dataClient.getLogGList(id, 100);
    }
  })
  
</script>
