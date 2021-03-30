<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Prize Pools joined</NavTitle>
    
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
          <th class="numeric-cell">Tickets</th>
          <th class="numeric-cell">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="numeric-cell">1</td>
          <td class="numeric-cell">1000</td>
          <td class="numeric-cell">Fri Sep 25 2020 09:22:45 GMT+0800 (Malaysia Time)</td>
        </tr>
        <tr>
          <td class="numeric-cell">2</td>
          <td class="numeric-cell">50</td>
          <td class="numeric-cell">Fri Sep 25 2020 09:22:45 GMT+0800 (Malaysia Time)</td>
        </tr>
        
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
    //dataClient.getWinnerList($row_count);
  });
  
</script>
