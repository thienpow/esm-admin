<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Claims</NavTitle>
    
  </Navbar>
  <!-- Body -->
  <BlockTitle>Summary</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span" width=5>
      </Col>
      <Col tag="span" width=90>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="This week: 2 claim" color="blue" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="This month: 2 claim" color="blue" /></Link>
        <Link href="#" animate={false} ignoreCache={true}><Chip text="Total: 2 claim" color="blue" /></Link>
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
          <th class="numeric-cell">ID</th>
          <th class="numeric-cell">Type</th>
          <th class="numeric-cell">Item</th>
          <th class="numeric-cell">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label-cell">apple@gmail.com</td>
          <td class="numeric-cell">123456</td>
          <td class="numeric-cell">Prize</td>
          <td class="numeric-cell">iPhoneX</td>
          <td class="numeric-cell">1</td>
        </tr>
        <tr>
          <td class="label-cell">thienpow@gmail.com</td>
          <td class="numeric-cell">887787</td>
          <td class="numeric-cell">Money</td>
          <td class="numeric-cell">USD</td>
          <td class="numeric-cell">300</td>
        </tr>
        
      </tbody>
    </table>
  </div>
</Page>
<script>
  import { NavLeft, NavTitle, NavRight, Link, Chip, Row, Col, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
</script>
