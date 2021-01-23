<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>User Address</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle>User Settings</BlockTitle>
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
  <BlockTitle>Address Preferences</BlockTitle>
  <div class="data-table">
    <table>
      <tbody>
        <tr>
          <td class="text-cell">Fullname</td>
          <td class="text-cell">Ken Chong</td>
        </tr>
        <tr>
          <td class="text-cell">Address</td>
          <td class="text-cell">B-18-12, Tri Pinnacle</td>
        </tr>
        <tr>
          <td class="text-cell">City</td>
          <td class="text-cell">Tanjung Tokong</td>
        </tr>
        <tr>
          <td class="text-cell">State</td>
          <td class="text-cell">Penang</td>
        </tr>
        <tr>
          <td class="text-cell">ZipCode</td>
          <td class="text-cell">10470</td>
        </tr>
        <tr>
          <td class="text-cell">Country</td>
          <td class="text-cell">Malaysia</td>
        </tr>
        <tr>
          <td class="text-cell">Country Code</td>
          <td class="text-cell">60</td>
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
  import dataClient from '../stores/dataClient.js';
  import { row_count } from '../stores/ui.js';


  async function resetRows() {
    await dataClient.getGameList($row_count);
    searchString = null;
  }

  onMount(async () => {
    //dataClient.getWinnerList($row_count);
  });
  
</script>
