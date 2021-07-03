<Page>
  <Navbar backLink title={title}></Navbar>

  <List noHairlinesMd form id="prizeForm">

    <Row class="no-gap">
      <Col width="100" large="50">


        <BlockTitle>Basic Details</BlockTitle>
        <Card noShadow>
          <CardContent>
            <Row>
              <Col width="100" medium="40">

                <ListInput
                  class="item-content-input"
                  label="Status"
                  type="select"
                  value={$dataClient.prize.status}
                  onInput={(e) => $dataClient.prize.status = e.target.value}
                        
                  placeholder="Please choose...">

                  {#each $dataClient.statusTypes as sT}
                    <option value={sT.id}>{sT.title}</option>
                  {/each}

                </ListInput>

              </Col>
              <Col width="80" medium="50">
                <ListInput
                  class="item-content-input"
                  label="Image URL"
                  type="url"
                  placeholder="upload the file by using DigitalOcean 'Space'."
                  value={$dataClient.prize.img_url}
                  onInput={(e) => $dataClient.prize.img_url = e.target.value}
                  required
                  validate />
                  
              </Col>
              <Col width="20" medium="10">
                <URLHelp />
              </Col>
            </Row>
            <Row>
              <Col width="100" medium="40">
                <ListInput
                  class="item-content-input"
                  label="Title"
                  type="text"
                  value={$dataClient.prize.title}
                  onInput={(e) => $dataClient.prize.title = e.target.value}
                  required
                  validate />
              </Col>
              <Col width="100" medium="60">
                <ListInput
                  class="item-content-input"
                  label="Sub-title"
                  type="text"
                  value={$dataClient.prize.subtitle}
                  onInput={(e) => $dataClient.prize.subtitle = e.target.value} />
              </Col>
            </Row>
            
            <ListInput
              class="item-content-input"
              type="textarea"
              label="Detailed Content"
              value={$dataClient.prize.content}
              onInput={(e) => $dataClient.prize.content = e.target.value}
              resizable />

            <Row>
              <Col width="100" medium="30" />
              <Col width="100" medium="40">
                  
                {#if $dataClient.prize.status_progress > 0 && $dataClient.prize.status_progress < 10}
                <Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSOSStop}>SOS Stop</Button>
                {/if}
                {#if $dataClient.prize.status_progress == 0}
                <Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doDelete}>Delete</Button>
                {/if}
                {#if $dataClient.prize.status_progress == 9999}
                  <div>Prize is under SOS Stopped. No more changes allowed until issue is resolved.</div>
                {/if}
              </Col>
              <Col width="100" medium="30" />
            </Row>
            
          </CardContent>
        </Card>
        

      </Col>
      <Col width="100" large="50">


        <BlockTitle>Conditions</BlockTitle>
        <Card noShadow>
          <CardContent>
            <Row>
              <Col width="100" medium="50">
    
                <ListInput
                    class="item-content-input"
                    label="Type"
                    type="select"
                    value={$dataClient.prize.type_id}
                    onInput={(e) => $dataClient.prize.type_id = e.target.value}
                    required validate
                    placeholder="Please choose...">
    
                  {#each $dataClient.prizeTypes as pT}
                  <option value={pT.id}>{pT.title}</option>
                  {/each}
    
                </ListInput>
                
              </Col>
              <Col width="100" medium="50">
    
                {#if $dataClient.prize.type_id == 1 || $dataClient.prize.type_id == 2}
                
                <ListInput
                  class="item-content-input"
                  label="Tickets Required"
                  type="number"
                  step="1"
                  value={$dataClient.prize.tickets_required}
                  onInput={(e) => $dataClient.prize.tickets_required = parseInt(e.target.value)} required validate />
    
                {/if}
                {#if $dataClient.prize.type_id == 3 || $dataClient.prize.type_id == 4}
                  <Row>
                    <Col width="100" medium="50">
    
                      <ListInput
                        class="item-content-input"
                        label="Days"
                        type="number"
                        step="1"
                        value={$dataClient.prize.duration_days}
                        onInput={(e) => $dataClient.prize.duration_days = parseInt(e.target.value)} required validate />
    
                    </Col>
                    <Col width="100" medium="50">
    
                      <ListInput
                      class="item-content-input"
                      label="Hours"
                      type="number"
                      step="1"
                      value={$dataClient.prize.duration_hours}
                      onInput={(e) => $dataClient.prize.duration_hours = parseInt(e.target.value)} required validate />
    
                    </Col>
                  </Row>
                {/if}
              </Col>
            </Row>
            {#if $dataClient.prize.type_id > 0 }
            <Row>
              <Col width="100" medium="50">
                <ListInput
                  class="item-content-input"
                  label="Time Zone"
                  type="select"
                  value={$dataClient.prize.timezone}
                  onInput={(e) => $dataClient.prize.timezone = e.target.value}
                  placeholder="Please choose...">
                  {#each $dataClient.timezones as tz}
                  <option value={tz.offset}>{tz.ltext}</option>
                  {/each}
                </ListInput>
              </Col>
              <Col width="100" medium="50">
    
                <ListInput
                  class="item-content-input"
                  label="Scheduled On"
                  calendarParams={{timePicker: true, dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}}}
                  type="datepicker"
                  value={[$dataClient.prize.scheduled_on]}
                  on:calendarChange={(e) => $dataClient.prize.scheduled_on = e.detail[0][0]}
                  required
                  validate />
    
              </Col>
            </Row>
            <Row>
              <Col width="100" medium="30">
                  <BlockTitle>Repeat</BlockTitle>
                  <List>
                    <ListItem radio value={true} checked={$dataClient.prize.is_repeat == true} on:change={(e) => $dataClient.prize.is_repeat = true} name="radio-repeat" title="Yes" />
                    <ListItem radio value={false} checked={$dataClient.prize.is_repeat == false} on:change={(e) => $dataClient.prize.is_repeat = false} name="radio-repeat" title="No" />
                  </List>
              </Col>
              <Col width="100" medium="70">
                <BlockTitle>Repeated On</BlockTitle>
                
                <Row>
                  <Col><ListItem title="Mon" /></Col>
                  <Col><ListItem title="Tue" /></Col>
                  <Col><ListItem title="Wed" /></Col>
                  <Col><ListItem title="Thu" /></Col>
                  <Col><ListItem title="Fri" /></Col>
                  <Col><ListItem title="Sat" /></Col>
                  <Col><ListItem title="Sun" /></Col>
                </Row>
                <Row>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_mon == true} on:change={(e) => $dataClient.prize.repeated_on_mon = !$dataClient.prize.repeated_on_mon} /></Col>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_tue == true} on:change={(e) => $dataClient.prize.repeated_on_tue = !$dataClient.prize.repeated_on_tue} /></Col>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_wed == true} on:change={(e) => $dataClient.prize.repeated_on_wed = !$dataClient.prize.repeated_on_wed} /></Col>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_thu == true} on:change={(e) => $dataClient.prize.repeated_on_thu = !$dataClient.prize.repeated_on_thu} /></Col>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_fri == true} on:change={(e) => $dataClient.prize.repeated_on_fri = !$dataClient.prize.repeated_on_fri} /></Col>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_sat == true} on:change={(e) => $dataClient.prize.repeated_on_sat = !$dataClient.prize.repeated_on_sat} /></Col>
                  <Col><ListItem checkbox checked={$dataClient.prize.repeated_on_sun == true} on:change={(e) => $dataClient.prize.repeated_on_sun = !$dataClient.prize.repeated_on_sun} /></Col>
                </Row>

              </Col>
            </Row>
            
            {/if}
          </CardContent>
        </Card>


      </Col>

    </Row>

    <SaveCancel on:doSave={doSave} />
    <br/><br/>
    
    {#if (id > 0 && $dataClient.prize.type_id != 4)}
    <BlockTitle>Linked Tournament</BlockTitle>
    <Card noShadow>
      <CardContent>
        <Row>
          <Col>

                <ListItem 
                  title="Find & Select Tournaments" 
                  smartSelect smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search Tournament'}}
                >
                  <span slot="media">
                    <Icon md="material:search" aurora="f7:search" ios="f7:search" />
                  </span>
                  <select bind:value={tour_id}>
                    <option value={0}>Not Selected</option>
                    {#each $dataClient.tournaments as tour}
                    <option value={tour.id}>{tour.title}</option>
                    {/each}
                  </select>
                </ListItem>

          </Col>
          <Col>

                <ListInput
                  label="Tournament"
                  floatingLabel
                  type="number"
                  errorMessage="Only numbers please!"
                  clearButton
                  value={tour_id}
                  onInput={(e) => tour_id = e.target.value}
                />

          </Col>
          <Col>
            <Button fill raised color="blue" animate={false} on:click={addToList}>Add to list</Button>
          </Col>
        </Row>
      </CardContent>
    </Card>
    <BlockTitle>List  of Linked Tournament</BlockTitle>
    <Card noShadow>
      <CardContent>

        <div class="data-table">
          <table>
          <thead>
            <tr>
              <th class="numeric-cell">TourID</th>
              <th class="label-cell">Title</th>
            </tr>
          </thead>
          <tbody>
            {#each prize_tours as p, i}
              <tr>
                <td class="numeric-cell">{p.tour_id}</td>
                <td class="label-cell">{p.tour_title}</td>
                <td>
                  <Link ignoreCache={true} on:click={(e) => delFromList(p.id)}>
                    <Chip text="Delete" mediaBgColor="red" iconIos="f7:minus_circle" iconAurora="f7:minus_circle" iconMd="material:remove_circle_outline" />
                  </Link>
                </td>
              </tr>
            {/each}
          </tbody>
          </table>
        </div>

      </CardContent>
    </Card>
    {/if}
  </List>

  

</Page>
<script>
  //import timezones from '../js/timezones';
  import URLHelp from '../components/URLHelp.svelte';
  import SaveCancel from '../components/SaveCancel.svelte';
  import {
      f7,
      theme,
      Button,
      Chip,
      Card, CardContent,
      Col,
      Page,
      Navbar,
      List,
      ListInput,
      ListItem,
      BlockTitle,
      Row,
      Link,
      Icon
    } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  export let f7route;
  let id = f7route.params.id;

  $: title = id > 0 ? "Edit Prize" : "New Prize";

  let prize_tours = [];
  let tour_id = 0;
  let original_prize_status = 0;


  async function doSOSStop() {
    f7.dialog.confirm('Use at Your Own Risk! Are you sure want to STOP the Prize/Tournament? All current scheduled timeline will be removed and Prize status will be forced to Disabled/Archived.  Please make sure you have read the T&C!', async function () {
      let result = await dataClient.sosStopPrize(id);
      if (result) {
        f7.dialog.alert("Damage Done!");
        f7router.navigate('/prizes/' + $dataClient.prize.status + '/');
      }
    });
  }

  async function doDelete() {
    f7.dialog.confirm('Use at Your Own Risk! Are you sure want to Delete the Prize?', async function () {
      let result = await dataClient.deletePrize(id);
      if (result) {
        f7.dialog.alert("Delete Done!");
        f7router.navigate('/prizes/' + $dataClient.prize.status + '/');
      }
        
    });
  }

  async function doSave() {

    const isValid = f7.input.validateInputs('#prizeForm');
    if (!isValid) {
      return;
    }

    if ($dataClient.prize.type_id == 0) {
      f7.dialog.alert("Please select a Type");
      return;
    }
    if ($dataClient.prize.status_progress >= 1 && $dataClient.prize.status_progress <= 2 && original_prize_status !== $dataClient.prize.status) {
      f7.dialog.alert("Modifying data after the prize started is not allowed!");
      return;
    }
    if ($dataClient.prize.scheduled_on < Date.now()) {
      f7.dialog.alert("Date must be after today/now!");
      return;
    }

    if ($dataClient.prize.status_progress == 9999) {
      f7.dialog.alert("Prize is under SOS Stopped. No more changes allowed until issue is resolved.");
      return;
    }


    let repeated_on = [];

    if ($dataClient.prize.repeated_on_mon)
      repeated_on.push(1);
    if ($dataClient.prize.repeated_on_tue)
      repeated_on.push(2);
    if ($dataClient.prize.repeated_on_wed)
      repeated_on.push(3);
    if ($dataClient.prize.repeated_on_thu)
      repeated_on.push(4);
    if ($dataClient.prize.repeated_on_fri)
      repeated_on.push(5);
    if ($dataClient.prize.repeated_on_sat)
      repeated_on.push(6);
    if ($dataClient.prize.repeated_on_sun)
      repeated_on.push(7);
    
    $dataClient.prize.repeated_on = repeated_on;
    
    let result = false;
    if (id > 0) {
      result = await dataClient.updatePrize();
    } else {
      result = await dataClient.addPrize();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();


      if (id > 0) {
        f7router.navigate('/prizes/' + $dataClient.prize.status + '/');
      } else {
        $dataClient.prize.id = result;
        id = result;

        if ($dataClient.prize.type_id == 4) {
          f7router.navigate('/prizes/' + $dataClient.prize.status + '/');
        }
      }
    }
    
  };

  async function delFromList(id) {

    f7.dialog.confirm("Are you sure want to delete?", async function () {
      await dataClient.deletePrizeTour(id);
      prize_tours = prize_tours.filter(p => p.id != id);
    });

  }

  async function addToList() {

    if (tour_id <= 0) {
      f7.dialog.alert("TourID must be > 0");
      return;
    }

    await dataClient.addPrizeTour(id, tour_id);
    await dataClient.getPrizeTourList(id);
    prize_tours = $dataClient.prize_tours;

  }

  onMount(async () => {

    await dataClient.getTournamentList(1000, 0, "", 2);
    if (id > 0) {
      original_prize_status = $dataClient.prize.status;

      await dataClient.getPrizeTourList(id);
      prize_tours = $dataClient.prize_tours;

      for (let x of $dataClient.prize.repeated_on.entries()) {
        if (x[1] == 1)
          $dataClient.prize.repeated_on_mon = true;
        if (x[1] == 2)
          $dataClient.prize.repeated_on_tue = true;
        if (x[1] == 3)
          $dataClient.prize.repeated_on_wed = true;
        if (x[1] == 4)
          $dataClient.prize.repeated_on_thu = true;
        if (x[1] == 5)
          $dataClient.prize.repeated_on_fri = true;
        if (x[1] == 6)
          $dataClient.prize.repeated_on_sat = true;
        if (x[1] == 7)
          $dataClient.prize.repeated_on_sun = true;
      }
      
    }
    
  });
  
</script>
