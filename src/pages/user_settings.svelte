<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>User Settings</NavTitle>
    
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
  <BlockTitle>Notifications Preferences</BlockTitle>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th class="text-cell">Settings</th>
          <th class="numeric-cell">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-cell">Is Notifiy Allowed</td>
          <td class="numeric-cell">Yes</td>
        </tr>
        <tr>
          <td class="text-cell">Is Notify New Reward</td>
          <td class="numeric-cell">Yes</td>
        </tr>
        <tr>
          <td class="text-cell">Is Notify New Tournament</td>
          <td class="numeric-cell">Yes</td>
        </tr>
        <tr>
          <td class="text-cell">Is Notify Tour Ending</td>
          <td class="numeric-cell">Yes</td>
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
