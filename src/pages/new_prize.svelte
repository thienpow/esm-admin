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
    
    
    <ListInput
      class="item-content-input"
      label="Tickets Required"
      type="number"
      step="1"
      value={$dataClient.prize.tickets_required}
      onInput={(e) => $dataClient.prize.tickets_required = e.target.value}
    ></ListInput>

    <ListInput
      class="item-content-input"
      label="Type"
      type="select"
      value={$dataClient.prize.type_id}
      onInput={(e) => $dataClient.prize.type_id = e.target.value}
      placeholder="Please choose..."
    >
      {#each $dataClient.prizeTypes as pT}
      <option value={pT.id}>{pT.title}</option>
      {/each}
    </ListInput>

    <ListInput
      class="item-content-input"
      label="RewardAmount"
      type="text"
      value={$dataClient.prize.reward_amount}
      onInput={(e) => $dataClient.prize.reward_amount = e.target.value}
      required
      validate

    ></ListInput>

    

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
    Block
  } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  export let f7route;
  const id = f7route.params.id;

  $: title = id > 0 ? "Edit Prize" : "New Prize";


  async function doSave() {

    const isValid = f7.input.validateInputs('#prizeForm');
    if (!isValid) {
      return;
    }

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

  });
  
</script>
