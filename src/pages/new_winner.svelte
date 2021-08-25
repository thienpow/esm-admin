<Page>
  <Navbar backLink title={title}></Navbar>

  <Row class="no-gap">
    
    <Col width="100" large="60" xlarge="70">

      <List noHairlinesMd form id="winnerForm">

        <BlockTitle>Status</BlockTitle>
        <Card noShadow>
          <CardContent>
            
            <Row>
              <Col width="100" medium="50">
                
                  <ListInput
                    class="item-content-input"
                    label="Status"
                    type="select"
                    value={$dataClient.winner.status}
                    onInput={(e) => $dataClient.winner.status = e.target.value}
                    placeholder="Please choose...">

                  {#each $dataClient.winnerStatusTypes as sT}
                    <option value={sT.id}>{sT.title}</option>
                  {/each}

                  </ListInput>
                
              </Col>
              <Col width="100" medium="50">
                <ListInput
                  label="Shipment Tracking"
                  type="text"
                  value={$dataClient.winner.ship_tracking}
                  onInput={(e) => $dataClient.winner.ship_tracking = e.target.value}
                />
              </Col>
            </Row>
          </CardContent>
        </Card>
        
  
        <SaveCancel on:doSave={doSave} />
  
  
        <BlockTitle>Basic Details</BlockTitle>
        <Card noShadow>
          <CardContent>
            <List>
              <Row>
                <Col width="100" medium="50">
                  <ListInput
                    label="Email"
                    type="text"
                    value={$dataClient.user.email}
                    readonly />
                </Col>
                <Col width="100" medium="50">
                  <ListInput
                    label="Username"
                    type="text"
                    value={$dataClient.user.username}
                    readonly />
                </Col>
              </Row>
              <Row>
                <Col width="100" medium="50">
                  <ListInput
                    label="Phone"
                    type="text"
                    value={$dataClient.user.phone}
                    readonly />
                </Col>
              </Row>
              <Row>
                <Col width="100" medium="50">
                  <ListInput
                    label="First Name"
                    type="text"
                    value={$dataClient.user.firstname}
                    readonly />
                </Col>
                <Col width="100" medium="50">
                  <ListInput
                    label="Last Name"
                    type="text"
                    value={$dataClient.user.lastname}
                    readonly />
                </Col>
              </Row>
              <Row>
                <Col width="100" medium="50">
                  <ListInput
                    label="FB ID"
                    type="text"
                    value={$dataClient.user.social_link_fb}
                    readonly />
                </Col>
                <Col width="100" medium="50">
                  <ListInput
                    label="Google ID"
                    type="text"
                    value={$dataClient.user.social_link_google}
                    readonly />
                </Col>
              </Row>
              <Row>
                <Col width="100" medium="50">
                  <ListInput
                    label="Exp"
                    type="text"
                    value={$dataClient.user.exp}
                    readonly />
                </Col>
                <Col width="100" medium="50">
                  <ListInput
                    label="Gem Balance"
                    type="text"
                    value={$dataClient.user.gem_balance}
                    readonly />
                </Col>
              </Row>
            </List>
          </CardContent>
        </Card>
      
      </List>
      
    </Col>
    <Col class="toolpanel" width="100" large="40" xlarge="30">

      <List>

        <ListItem accordionItem title="Details">
          <span slot="media">
            <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
          </span>
          <AccordionContent>
            <div class="data-table">
              <table>
                <tbody>
                  <tr>
                    <td class="text-cell">Fullname</td>
                    <td class="text-cell">{$dataClient.winner.full_name}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Email</td>
                    <td class="text-cell">{$dataClient.winner.email}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Country Code</td>
                    <td class="text-cell">{$dataClient.winner.country_code}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Phone</td>
                    <td class="text-cell">{$dataClient.winner.phone}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Address</td>
                    <td class="text-cell">{$dataClient.winner.address}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">City</td>
                    <td class="text-cell">{$dataClient.winner.city}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">State</td>
                    <td class="text-cell">{$dataClient.winner.state}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">ZipCode</td>
                    <td class="text-cell">{$dataClient.winner.zip_code}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Country</td>
                    <td class="text-cell">{$dataClient.winner.country}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>

        </ListItem>
        
      </List>

    </Col>

  </Row>
  
</Page>
<script>
  import SaveCancel from '../components/SaveCancel.svelte';
  import {
    f7,
    theme,
    AccordionContent,
    ListItem,
    Card, CardContent,
    Col,
    Page,
    Navbar,
    List,
    ListInput,
    BlockTitle,
    Row,
    Button,
    Icon,
    Block
  } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  export let f7route;
  const id = f7route.params.id;
  
  $: title = id > 0 ? "Edit Winner" : "Wrong Winner";


  async function doSave() {

    const isValid = f7.input.validateInputs('#winnerForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateWinner();
    } else {
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/winners/' + $dataClient.winner.status + '/');
    }
    
  };


  onMount(async () => {
    if (id > 0) {
      await dataClient.getUser($dataClient.winner.user_id);

    }
  })
</script>
<style>
  
</style>