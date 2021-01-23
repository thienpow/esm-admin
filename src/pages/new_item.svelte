<Page>
  <Navbar title={title}></Navbar>

  <List noHairlinesMd form id="itemForm">


    <BlockTitle>Basic Details</BlockTitle>
    <Card>
      <CardContent>

        <Row>
          <Col width="100" medium="50">

            <ListInput
              class="item-content-input"
              label="Status"
              type="select"
              value={$dataClient.item.status}
              onInput={(e) => $dataClient.item.status = e.target.value}
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
              value={$dataClient.item.img_url}
              onInput={(e) => $dataClient.item.img_url = e.target.value}
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
            value={$dataClient.item.title}
            onInput={(e) => $dataClient.item.title = e.target.value}
            required
            validate />

          </Col>
          <Col width="100" medium="50">

            <ListInput
            class="item-content-input"
            label="Sub-title"
            type="text"
            value={$dataClient.item.subtitle}
            onInput={(e) => $dataClient.item.subtitle = e.target.value} />
            
          </Col>
        </Row>
        <ListInput
          class="item-content-input"
          type="textarea"
          label="Detailed Content"
          value={$dataClient.item.content}
          onInput={(e) => $dataClient.item.content = e.target.value}
          resizable />
        
      </CardContent>
    </Card>

    <BlockTitle>Product Details</BlockTitle>
    <Card>
      <CardContent>
        <Row>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Type"
              type="select"
              value={$dataClient.item.type_id}
              onInput={(e) => $dataClient.item.type_id = e.target.value}
              placeholder="Please choose...">

              {#each $dataClient.itemTypes as iT}
                <option value={iT.id}>{iT.title}</option>
              {/each}

            </ListInput>

          </Col>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Price"
              type="text"
              value={$dataClient.item.amount}
              onInput={(e) => $dataClient.item.amount = e.target.value}
              pattern="[0-9]*"
              required
              validate />

          </Col>
        </Row>
      </CardContent>
    </Card>

  </List>

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

  $: title = id > 0 ? "Edit Item" : "New Item";


  async function doSave() {

    const isValid = f7.input.validateInputs('#itemForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateItem();
    } else {
      result = await dataClient.addItem();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();
      
      f7router.navigate('/items/');
    }
    
  };

  onMount(async () => {
    
  })
</script>
