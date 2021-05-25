<Page>
  <!-- Top Navbar -->
  <Navbar>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Dashboard</NavTitle>
    
  </Navbar>
  <br/><br/>
  <Row tag="p">
    <Col width="100" medium="60">
      <BlockTitle strong><Chip text="Current active prizes" color="green" /></BlockTitle>
      <Card>
        <CardContent>
          <div class="data-table">
            <table>
              <thead>
                <tr>
                  <td class="numeric-cell">Prize ID</td>
                  <td class="label-cell">Prize</td>
                  <td class="numeric-cell">Tickets in pool</td>
                  <td class="large-only">Game</td>
                  <td class="xlarge-only">Start-End</td>
                  
                </tr>
              </thead>
              <tbody>

                {#each $dataClient.prizeTodays as pt}

                  {#if pt.start_timestamp <= Date.now()}
                  <tr>
                    <td class="numeric-cell">{pt.prize_id}</td>
                    <td class="label-cell">{pt.prize_title}</td>
                    <td class="numeric-cell" style="font-size: 9px;">{pt.tickets_collected} <hr style="border-bottom: 0px;border-top: 1px solid #E6E6E3;">{pt.tickets_required}</td>
                    <td class="large-only">{pt.game_title}</td>
                    <td class="xlarge-only" style="font-size: 9px;">{pt.start_timestamp} -<br/>{pt.end_timestamp}</td>
                  </tr>
                  {/if}

                {/each}

              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
    </Col>
    <Col width="100" medium="40">

      <BlockTitle strong><Chip text="Last 20 Prizes Awarded" color="gray" /></BlockTitle>
      <Card>
        <CardContent>
          <div class="data-table">
            <table>
              <thead>
                <tr>
                  <td class="numeric-cell">Prize ID</td>
                  <td class="label-cell">Prize Title</td>
                  <td class="label-cell">Winner</td>
                </tr>
              </thead>
              <tbody>

                {#each $dataClient.winners as w}
                <tr>
                  <td class="numeric-cell">{w.prize_id}</td>
                  <td class="label-cell">{w.prize_title}</td>
                  <td class="label-cell">{w.user_nick_name}</td>
                </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      

    </Col>
  </Row>
  
</Page>
<script>
  import { Row, Col, Card, CardContent, Chip, Link, NavLeft, NavTitle, Page, Navbar, BlockTitle } from 'framework7-svelte';
  import { onMount } from 'svelte';
  
  import dataClient from '../stores/dataClient';
  
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
      await dataClient.getUserStatusTypeList();
      await dataClient.getWinnerStatusTypeList();
      await dataClient.getWinTypeList();
      await dataClient.getPrizeTypeList();
      await dataClient.getTimezonesList();

      await dataClient.getPrizeTodayList();
      await dataClient.getWinnerList(20, 0, "", 0);
    }
  })

</script>
