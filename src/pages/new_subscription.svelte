<Page>
  <Navbar backLink title={title}></Navbar>

  <List noHairlinesMd form id="subscriptionForm">

    <Row class="no-gap">
      <Col width="100" large="55" xlarge="60">
        <BlockTitle>Basic Details</BlockTitle>
          <Card noShadow>
            <CardContent>
              <Row>
                <Col width="100" medium="40">
                  <ListInput
                    class="item-content-input"
                    label="Status"
                    type="select"
                    value={$dataClient.subscription.status}
                    onInput={(e) => $dataClient.subscription.status = e.target.value}
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
                    value={$dataClient.subscription.img_url}
                    onInput={(e) => $dataClient.subscription.img_url = e.target.value}
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
                    value={$dataClient.subscription.title}
                    onInput={(e) => $dataClient.subscription.title = e.target.value}
                    required
                    validate />

                </Col>
                <Col width="100" medium="60">
                  <ListInput
                    class="item-content-input"
                    label="Sub-title"
                    type="text"
                    value={$dataClient.subscription.subtitle}
                    onInput={(e) => $dataClient.subscription.subtitle = e.target.value} />

                </Col>
              </Row>
              <ListInput
                class="item-content-input"
                type="textarea"
                label="Detailed Content"
                value={$dataClient.subscription.content}
                onInput={(e) => $dataClient.subscription.content = e.target.value}
                resizable />
            </CardContent>
          </Card>
      </Col>
      <Col width="100" large="45" xlarge="40">

        <BlockTitle>Product Details</BlockTitle>
        <Card noShadow>
          <CardContent>
            <Row>
              
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Quantity"
                  type="number"
                  value={$dataClient.subscription.quantity}
                  onInput={(e) => $dataClient.subscription.quantity = e.target.value}
                  pattern="[0-9]*"
                  required
                  validate />

              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Subscription Type"
                  type="select"
                  value={$dataClient.subscription.type_id}
                  onInput={(e) => $dataClient.subscription.type_id = e.target.value}
                  placeholder="Please choose...">

                  {#each $dataClient.subscriptionTypes as sT}
                    <option value={sT.id}>{sT.title}</option>
                  {/each}

                </ListInput>

              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Price"
                  type="number"
                  value={$dataClient.subscription.price}
                  onInput={(e) => $dataClient.subscription.price = e.target.value}
                  step="0.01"
                  error-message="Only numbers please!"
                  required
                  validate >
                  
                </ListInput>

              </Col>
              
            </Row>

            <Row>
              
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="One Time Gem"
                  type="number"
                  value={$dataClient.subscription.one_time_gem}
                  onInput={(e) => $dataClient.subscription.one_time_gem = e.target.value}
                  required
                  validate />

              </Col>
              <!--
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="One Time Multiplier"
                  type="number"
                  step="0.01"
                  value={$dataClient.subscription.one_time_multiplier}
                  onInput={(e) => $dataClient.subscription.one_time_multiplier = e.target.value}>

                  <span slot="info">{Math.round($dataClient.subscription.one_time_multiplier * 100)}%</span>

                </ListInput>

              </Col>
             
              <Col width="100" medium="33">
                <p>Limited to FirstTime Purchase Only:
                  <Checkbox name="checkbox-1" checked={$dataClient.subscription.one_time_is_firstonly} onChange={(e) => $dataClient.subscription.one_time_is_firstonly = e.target.checked}/>
                </p>
                
              </Col>
               -->
            </Row>

            <Row>
              
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Daily Gem"
                  type="number"
                  value={$dataClient.subscription.daily_gem}
                  onInput={(e) => $dataClient.subscription.daily_gem = e.target.value}
                  required
                  validate />

              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Daily Multiplier"
                  type="number"
                  step="0.01"
                  value={$dataClient.subscription.daily_multiplier}
                  onInput={(e) => $dataClient.subscription.daily_multiplier = e.target.value}>

                  <span slot="info">{Math.round($dataClient.subscription.daily_multiplier * 100)}%</span>

                </ListInput>

              </Col>
              <Col width="100" medium="33">
              </Col>
              
            </Row>

          </CardContent>
        </Card>

      </Col>
    </Row>
    
  </List>

  
  <SaveCancel on:doSave={doSave} />


</Page>
<script>
  import URLHelp from '../components/URLHelp.svelte';
  import SaveCancel from '../components/SaveCancel.svelte';
  import {
    f7,
    theme,
    Checkbox,
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

  $: title = id > 0 ? "Edit Subscription" : "New Subscription";


  async function doSave() {

    const isValid = f7.input.validateInputs('#subscriptionForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateSubscription();
    } else {
      result = await dataClient.addSubscription();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/subscriptions/' + $dataClient.subscription.status + '/');
    }
    
  };

  onMount(async () => {

  })
</script>
