<Page>
  <Navbar title={title}></Navbar>

  <List noHairlinesMd form id="prizeForm">

    <BlockTitle>Basic Details</BlockTitle>
    <Card>
      <CardContent>
        <Row>
          <Col width="100" medium="50">

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
          <Col width="100" medium="50">
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
        </Row>
        <Row>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Title"
              type="text"
              value={$dataClient.prize.title}
              onInput={(e) => $dataClient.prize.title = e.target.value}
              required
              validate />
          </Col>
          <Col width="100" medium="50">
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
      </CardContent>
    </Card>
    
    <BlockTitle>Conditions</BlockTitle>
    <Card>
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
              <option value={0}>Malaysia (GMT +8)</option>
            </ListInput>
          </Col>
          <Col width="100" medium="50">

            <ListInput
            class="item-content-input"
            label="Scheduled On"
            calendarParams={{timePicker: true, dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}}}
            type="datepicker"
            value={$dataClient.prize.scheduled_on}
            on:calendarChange={(e) => $dataClient.prize.scheduled_on = e.detail[0]}
            required
            validate />

          </Col>
        </Row>
        <Row>
          <Col width="100" medium="20">
            <BlockTitle>Repeat</BlockTitle>
            <List>
              <ListItem radio value={$dataClient.prize.is_repeat} checked={$dataClient.prize.is_repeat == true} on:change={(e) => $dataClient.prize.is_repeat = e.detail[0].returnValue} name="radio-repeat" title="Yes" />
              <ListItem radio value={!$dataClient.prize.is_repeat} checked={$dataClient.prize.is_repeat == false} on:change={(e) => $dataClient.prize.is_repeat = !e.detail[0].returnValue} name="radio-repeat" title="No" />
            </List>
              
          </Col>
          <Col width="100" medium="80">
            <BlockTitle>Repeated On</BlockTitle>
            <Row>
              <Col>M</Col>
              <Col>T</Col>
              <Col>W</Col>
              <Col>T</Col>
              <Col>F</Col>
              <Col>S</Col>
              <Col>S</Col>
            </Row>
            <Row>
              <Col><ListItem checkbox title="Mon" name="cb-repeated" checked={$dataClient.prize.repeated_on_mon} on:change={(e) => $dataClient.prize.repeated_on_mon = e.detail[0].returnValue} /></Col>
              <Col><ListItem checkbox title="Tue" name="cb-repeated" checked={$dataClient.prize.repeated_on_tue} on:change={(e) => $dataClient.prize.repeated_on_tue = e.detail[0].returnValue} /></Col>
              <Col><ListItem checkbox title="Wed" name="cb-repeated" checked={$dataClient.prize.repeated_on_wed} on:change={(e) => $dataClient.prize.repeated_on_wed = e.detail[0].returnValue} /></Col>
              <Col><ListItem checkbox title="Thu" name="cb-repeated" checked={$dataClient.prize.repeated_on_thu} on:change={(e) => $dataClient.prize.repeated_on_thu = e.detail[0].returnValue} /></Col>
              <Col><ListItem checkbox title="Fri" name="cb-repeated" checked={$dataClient.prize.repeated_on_fri} on:change={(e) => $dataClient.prize.repeated_on_fri = e.detail[0].returnValue} /></Col>
              <Col><ListItem checkbox title="Sat" name="cb-repeated" checked={$dataClient.prize.repeated_on_sat} on:change={(e) => $dataClient.prize.repeated_on_sat = e.detail[0].returnValue} /></Col>
              <Col><ListItem checkbox title="Sun" name="cb-repeated" checked={$dataClient.prize.repeated_on_sun} on:change={(e) => $dataClient.prize.repeated_on_sun = e.detail[0].returnValue} /></Col>
            </Row>
          </Col>
        </Row>
        <BlockTitle>Linked Tournament</BlockTitle>
        <Card>
          <CardContent>
            <Row>
              <Col width="70">
                <ListItem 
                  title="Find & Select Tournaments" 
                  smartSelect smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search Tournament'}}
                >
                  <select name="car" multiple value={$dataClient.prize.tournament_ids}>
                    <option value={1}>test game 1</option>
                      <option value={2}>test game 2</option>
                      <option value={3}>test game 3</option>
                      <option value={4}>test game 4</option>
                      <option value={5}>test game 5</option>
                  </select>
                </ListItem>
              </Col>
              <Col width="30">
                <ListInput
                  label="Tournament Formats"
                  floatingLabel
                  type="text"
                  placeholder="example: 1,2,3"
                  errorMessage="Only numbers please!"
                  clearButton
                  value={$dataClient.prize.tournament_ids}
                  onInput={(e) => $dataClient.prize.tournament_ids = e.target.value}
                />
              </Col>
              
            </Row>
          </CardContent>
        </Card>
        
        {/if}
      </CardContent>
    </Card>
  </List>

  <BlockTitle></BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Save & Back</Button></Col>
      <Col><Button class="col" large fill raised color="green" back animate={false}>Cancel</Button></Col>
    </Row>
  </Block>

</Page>
<script>
import {
    f7,
    theme,
    Card, CardContent,
    Col,
    Page,
    Navbar,
    List,
    ListInput,
    ListItem,
    Toggle,
    BlockTitle,
    Row,
    Button,
    Range,
    Radio,
    Block
  } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  export let f7route;
  const id = f7route.params.id;

  $: title = id > 0 ? "Edit Prize" : "New Prize";

  let tournament_ids = [];

  async function doSave() {

    console.log(tournament_ids);
    const isValid = f7.input.validateInputs('#prizeForm');
    if (!isValid) {
      return;
    }

    $dataClient.prize.repeated_on = [];
    if ($dataClient.prize.repeated_on_mon)
      $dataClient.prize.repeated_on.push(1);
    if ($dataClient.prize.repeated_on_tue)
      $dataClient.prize.repeated_on.push(2);
    if ($dataClient.prize.repeated_on_wed)
      $dataClient.prize.repeated_on.push(3);
    if ($dataClient.prize.repeated_on_thu)
      $dataClient.prize.repeated_on.push(4);
    if ($dataClient.prize.repeated_on_fri)
      $dataClient.prize.repeated_on.push(5);
    if ($dataClient.prize.repeated_on_sat)
      $dataClient.prize.repeated_on.push(6);
    if ($dataClient.prize.repeated_on_sun)
      $dataClient.prize.repeated_on.push(7);

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

      f7router.navigate('/prizes/');
    }
    
  };

  onMount(async () => {
    
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
    
  });
  
</script>
