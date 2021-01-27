<Page>
  <Navbar backLink title={title}></Navbar>

  <BlockTitle>Status</BlockTitle>
  
  <Card>
    <CardContent>
      
      <Row>
        <Col width="100" medium="50">
          <List noHairlinesMd form id="userForm">
            <ListInput
              class="item-content-input"
              label="Status"
              type="select"
              value={$dataClient.user.status}
              onInput={(e) => $dataClient.user.status = e.target.value}
              placeholder="Please choose...">
              <option value={0}>Not Selected</option>
              <option value={1}>Active</option>
              <option value={2}>Blocked</option>
            </ListInput>
          </List>
        </Col>
        <Col width="100" medium="50">
            <List>
              <ListInput
                label="Avatar Url"
                type="text"
                value={$dataClient.user.avatar_url}
                readonly />
            </List>
        </Col>
      </Row>
    </CardContent>
  </Card>
  

  <Block strong>
    <Row tag="p">
      <Col><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Save & Back</Button></Col>
      <Col><Button class="col" large fill raised color="green" back animate={false}>Cancel</Button></Col>
    </Row>
  </Block>


  <BlockTitle>Basic Details</BlockTitle>
  
    <Card>
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
  
  <List>
    <ListItem link="/log_play/" view=".view-main" panelClose title="Play Logs"/>
    <ListItem link="/log_prize_pool/" view=".view-main" panelClose title="Prize Pools"/>
    <ListItem link="/user_address/" view=".view-main" panelClose title="Address"/>
    <ListItem link="/user_settings/" view=".view-main" panelClose title="Settings"/>
  </List>
</Page>
<script>
  import {
    f7,
    theme,
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
    Range,
    Toggle,
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
    if (id > 0) {
      result = await dataClient.updateUserStatus();
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

      f7router.navigate('/users/');
    }
    
  };


  onMount(async () => {
    if (id > 0) {
      //
    }
  })
</script>
<style>
  
</style>