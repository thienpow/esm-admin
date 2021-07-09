
<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle>Leaderboard History</NavTitle>
    
  </Navbar>
  <!-- Body -->

  <Row class="no-gap">
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <List accordionList>
        
        <ListItem accordionItem accordionItemOpened title="Published Prizes">
          <AccordionContent>
            
          <ListItem 
              title="Select Prize" 
              smartSelect smartSelectParams={
                { openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search',
                  on: {
                    closed: function () {
                      //doFilterClosedCurrentGame();
                    }
                  }
                }}>
            <span slot="media">
              <Icon md="material:search" aurora="f7:search" ios="f7:search" />
            </span>
            <select bind:value={prize_id}>
              <option value={0}>Not Selected</option>
              {#each $dataClient.prizes.filter(p=>p.type_id<4) as prize}
                <option value={prize.id}>{prize.title}</option>
              {/each}
            </select>
          </ListItem>

          <FindClosedCG bind:closed_date bind:prize_id />

          </AccordionContent>
        </ListItem>
        
      </List>
      
    </Col>
    <Col width="100" large="60" xlarge="70">
      

      <!-- data-table here -->

      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th class="numeric-cell">Rank</th>
              <th class="numeric-cell">UserID</th>
              <th class="label-cell">Nick</th>
              <th class="numeric-cell">Exp</th>
              <th class="numeric-cell">Score</th>
              <th class="numeric-cell">Tickets</th>
            </tr>
          </thead>
          <tbody>
            {#each $dataClient.leaderboard_history as lh}
            <tr >
              <td class="numeric-cell">{lh.rank}</td>
              <td class="numeric-cell">{lh.user_id}</td>
              <td class="label-cell">{lh.nick_name}</td>
              <td class="numeric-cell">{lh.exp}</td>
              <td class="numeric-cell">{lh.game_score}</td>
              <td class="numeric-cell">{lh.tickets}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
      

    </Col>
    
  </Row>


</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>

  import FindClosedCG from '../components/FindClosedCG.svelte';
  import ShowRows from '../components/ShowRows.svelte';
  import { onMount } from 'svelte';
  import { AccordionContent, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, List, ListItem, Page, Navbar, Icon } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';
  import {show_sub_title, show_img_url, show_image, show_status, show_type, show_timezone, show_scheduled_on, show_tickets_collected, row_count} from '../stores/ui';
  

  export let f7router;
  export let f7route;

  let innerWidth = 0;


  let prize_id = 0;
  let now = new Date();
  let closed_date = now.getFullYear() + '-' + pad(now.getMonth() + 1, 2) + '-' + pad(now.getDate(), 2);

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }

  onMount(async () => {
    await dataClient.getPrizeList(1000, 0, "", 2);
  });
  
</script>
