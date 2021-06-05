<Page>
  <Navbar backLink title={title}></Navbar>

  <Row class="no-gap">
    
    <Col width="100" large="60" xlarge="70">

      <List noHairlinesMd form id="userForm">

        <BlockTitle>Status</BlockTitle>
        <Card noShadow>
          <CardContent>
            
            <Row>
              <Col width="100" medium="50">
                
                  <ListInput
                    class="item-content-input"
                    label="Status"
                    type="select"
                    value={$dataClient.user.status}
                    onInput={(e) => $dataClient.user.status = e.target.value}
                    placeholder="Please choose...">

                  {#each $dataClient.userStatusTypes as sT}
                    <option value={sT.id}>{sT.title}</option>
                  {/each}

                  </ListInput>
                
              </Col>
              <Col width="100" medium="50">
                <ListInput
                  label="Gem Balance"
                  type="number"
                  value={$dataClient.user.gem_balance}
                  onInput={(e) => $dataClient.user.gem_balance = e.target.value}
                  step="1"
                  error-message="Only numbers please!"
                  required
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
                <Col width="100" medium="50">
                  <ListInput
                    label="Avatar Url"
                    type="text"
                    value={$dataClient.user.avatar_url}
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
                    label="Last Login"
                    type="text"
                    value={$dataClient.user.last_login}
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
        <ListItem link="/log_play/{id}/" view=".view-main" panelClose title="Play Logs">
          <span slot="media">
            <Icon md="material:assessment" aurora="f7:chart_bar" ios="f7:chart_bar" />
          </span>
        </ListItem>
        <ListItem link="/log_prize_pool/{id}/" view=".view-main" panelClose title="Prize Pools">
          <span slot="media">
            <Icon md="material:assessment" aurora="f7:chart_bar" ios="f7:chart_bar" />
          </span>
        </ListItem>

        <ListItem accordionItem title="Address">
          <span slot="media">
            <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
          </span>
          <AccordionContent>
            <div class="data-table">
              <table>
                <tbody>
                  <tr>
                    <td class="text-cell">Fullname</td>
                    <td class="text-cell">{$dataClient.user.full_name}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Address</td>
                    <td class="text-cell">{$dataClient.user.address}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">City</td>
                    <td class="text-cell">{$dataClient.user.city}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">State</td>
                    <td class="text-cell">{$dataClient.user.state}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">ZipCode</td>
                    <td class="text-cell">{$dataClient.user.zip_code}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Country</td>
                    <td class="text-cell">{$dataClient.user.country}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Country Code</td>
                    <td class="text-cell">{$dataClient.user.country_code}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>

        </ListItem>
        <ListItem accordionItem title="App Settings">
          <span slot="media">
            <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
          </span>
          <AccordionContent>
            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th class="text-cell">Settings</th>
                    <th class="numeric-cell">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-cell">nick_name</td>
                    <td class="numeric-cell">{$dataClient.user.nick_name}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Is Notifiy Allowed</td>
                    <td class="numeric-cell">{$dataClient.user.is_notify_allowed}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Is Notify New Reward</td>
                    <td class="numeric-cell">{$dataClient.user.is_notify_new_reward}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Is Notify New Tournament</td>
                    <td class="numeric-cell">{$dataClient.user.is_notify_new_tournament}</td>
                  </tr>
                  <tr>
                    <td class="text-cell">Is Notify Tour Ending</td>
                    <td class="numeric-cell">{$dataClient.user.is_notify_tour_ending}</td>
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
  
  $: title = id > 0 ? "Edit User" : "New User";


  async function doSave() {

    const isValid = f7.input.validateInputs('#userForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 1) {
      result = await dataClient.updateUserStatusGemBalance();
    } else {
      f7.dialog.alert("root user is not allowed to change status.");
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/users/');
    }
    
  };


  onMount(async () => {
    if (id > 0) {
      
    }
  })
</script>
<style>
  
</style>