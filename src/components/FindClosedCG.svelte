<script>
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';
  import { 
    Row, Col,
    Block,
    Button,
    Sheet,
    Toolbar,
    Link,
    ListItem,
    ListInput,
    PageContent, } from 'framework7-svelte';

  $: selected_value = cg_id == 0 ? 'Not Selected' : cg_id + ': ' + cg_game_title;

  export let closed_date;
  export let prize_id;
  export let cg_id = 0;
  let cg_game_title = '';

  async function doFilterLeaderboardHistory(cg) {
    cg_id = cg.id;
    cg_game_title = cg.game_title;
    if (cg_id > 0) {
      await dataClient.getLeaderboardHistoryList(cg_id, 1000, 0);
    }
  };

  async function doFilterClosedCurrentGame() {
    if (prize_id > 0) {
      await dataClient.getClosedCurrentGameList(prize_id, 1000, 0, closed_date);
    }
  }

  onMount(async () => {
    await doFilterClosedCurrentGame();
  });

</script>
<ListInput
    label="Closed Date"
    type="date"
    bind:value={closed_date}
    placeholder="Please choose..."
  >
    <i class="icon demo-list-icon" slot="media"/>
</ListInput>
<ListItem link="#" sheetOpen=".help-sheet" title="Select Closed Games" after="{selected_value}">
  <i slot="media" class="icon material-icons">search</i>
</ListItem>
<Sheet class="help-sheet" 
push
style="height: 480px;"
swipeToClose
swipeToStep
on:sheetOpen={doFilterClosedCurrentGame}
>
<Toolbar>
  <div class="left"></div>
  <div class="right">
    <Link sheetClose>Close</Link>
  </div>
</Toolbar>
<!--  Scrollable sheet content -->
<PageContent>
  <Block>

    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th class="numeric-cell">CgID</th>
            <th class="numeric-cell">TourID</th>
            <th class="numeric-cell">SetID</th>
            <th class="numeric-cell">GameID</th>
            <th class="label-cell">GameTitle</th>
            <th class="label-cell">Start-End</th>
          </tr>
        </thead>
        <tbody>
          {#each $dataClient.closed_current_games as cg}
          <tr on:click="{() => {doFilterLeaderboardHistory(cg)}}">
            <td class="numeric-cell">
              <label class="item-radio item-radio-icon-start item-content">
                <input type="radio" name="demo-radio-start" value={cg.id} checked={cg_id == cg.id} />
                <i class="icon icon-radio"></i>
                {cg.id}
              </label>
            </td>
            <td class="numeric-cell">{cg.tour_id}</td>
            <td class="numeric-cell">{cg.set_id}</td>
            <td class="numeric-cell">{cg.game_id}</td>
            <td class="label-cell">{cg.game_title}</td>
            <td class="label-cell" style="font-size: 9px;">{cg.start_timestamp}<hr/>{cg.end_timestamp}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
  </Block>
</PageContent>
</Sheet>