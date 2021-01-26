<Page>
  <!-- Top Navbar -->
  <Navbar large sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Dashboard</NavTitle>
    
    <NavRight>
      
    </NavRight>
    
    <NavTitleLarge>ESM Admin</NavTitleLarge>
  </Navbar>
  <br/><br/>
  <Row tag="p">
    <Col width="100" medium="50">
      <BlockTitle strong><Chip text="Today Prizes Running" color="green" /></BlockTitle>
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <td class="numeric-cell">ID</td>
              <td class="label-cell">Title</td>
              <td class="numeric-cell">Amount</td>
              <td class="numeric-cell">GameID</td>
              <td class="numeric-cell">Tickets in Pool</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="numeric-cell">1</td>
              <td class="label-cell">iPhone 12</td>
              <td class="numeric-cell">1</td>
              <td class="numeric-cell">101</td>
              <td class="numeric-cell">887788</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Col>
    <Col width="100" medium="50">

      <BlockTitle strong><Chip text="Last 20 Prizes Awarded" color="gray" /></BlockTitle>
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <td class="numeric-cell">ID</td>
              <td class="label-cell">Title</td>
              <td class="numeric-cell">Amount</td>
              <td class="numeric-cell">GameID</td>
              <td class="numeric-cell">Tickets in Pool</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="numeric-cell">1</td>
              <td class="label-cell">iPhone 11</td>
              <td class="numeric-cell">1</td>
              <td class="numeric-cell">10</td>
              <td class="numeric-cell">887788</td>
            </tr>
            <tr>
              <td class="numeric-cell">1</td>
              <td class="label-cell">iPhone X</td>
              <td class="numeric-cell">1</td>
              <td class="numeric-cell">11</td>
              <td class="numeric-cell">559966</td>
            </tr>
            <tr>
              <td class="numeric-cell">1</td>
              <td class="label-cell">iPhone 8</td>
              <td class="numeric-cell">1</td>
              <td class="numeric-cell">12</td>
              <td class="numeric-cell">338833</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Col>
  </Row>
  
  <!--

  <Block strong>
    {#if $dataClient.isLoggedIn}
      <p>esm-datastore is <Chip text="connected" color="green" /></p>
      
    {:else}
      <p>esm-datastore is <Chip text="disconnected" color="red" /></p>
    {/if}
  </Block>

  <Block strong>
    <Row tag="p">
      <Col><Button class="col" large raised color="red" on:click={resetCache}>Reset serviceWorker Cache</Button></Col>
    </Row>
  </Block>

  -->
</Page>
<script>
  import { Row, Col, Button, Chip, Link, NavLeft, NavRight, NavTitle, NavTitleLarge, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient.js';
  
  function resetCache() {
    
    if ('serviceWorker' in navigator) {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          console.log(cacheName);
          caches.delete(cacheName);
        });
      });
    }
  }

  onMount(async () => {
    if ($dataClient.isLoggedIn) {
      await dataClient.getItemTypeList();
      await dataClient.getSubscriptionTypeList();
      await dataClient.getStatusTypeList();
      await dataClient.getPrizeTypeList();
    }
  })

</script>
