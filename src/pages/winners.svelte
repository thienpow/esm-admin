<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Winners</NavTitle>
    
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
        <Link href="#" animate={false} ignoreCache={true}><Chip text="This Week Winners: 2" color="blue" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Archived/Claimed Winners: 202" color="gray" /></Link>
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
          <th class="label-cell">Email</th>
          <th class="numeric-cell">User ID</th>
          <th class="numeric-cell">Prize ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label-cell">apple@gmail.com</td>
          <td class="numeric-cell">123456</td>
          <td class="numeric-cell">88558</td>
        </tr>
        <tr>
          <td class="label-cell">thienpow@gmail.com</td>
          <td class="numeric-cell">887787</td>
          <td class="numeric-cell">88559</td>
        </tr>
        
      </tbody>
    </table>
  </div>
</Page>
<script>
  import { NavLeft, NavTitle, NavRight, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';
  import { row_count } from '../stores/ui';


  async function resetRows() {
    await dataClient.getGameList($row_count);
    searchString = null;
  }

  onMount(async () => {
    //dataClient.getWinnerList($row_count);
  });
  
</script>
