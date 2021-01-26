<Page>
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Configs</NavTitle>
    
    <NavRight>
      
    </NavRight>
  </Navbar>
  <!-- Body -->
  <BlockTitle></BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <List noHairlinesMd form id="configForm">
          
          <ListInput
            label="Spin Tickes"
            floatingLabel
            type="text"
            placeholder="Tickets, example 1,2,3,4,5"
            errorMessage="Only numbers please!"
            clearButton
            value={$dataClient.config.spinner}
            onInput={(e) => $dataClient.config.spinner = e.target.value}
          />
            
          <ListInput
            label="Gems Per Invite"
            floatingLabel
            type="number"
            placeholder="Tickets a user can get per successfull invitation"
            errorMessage="Only numbers please!"
            pattern="[0-9]*"
            clearButton
            value={$dataClient.config.invites}
            onInput={(e) => $dataClient.config.invites = e.target.value}
          />

          <ListInput
            label="How many Games Per AD Popup"
            floatingLabel
            type="number"
            placeholder="How many Games Per AD Popup"
            errorMessage="Only numbers please!"
            pattern="[0-9]*"
            clearButton
            value={$dataClient.config.games_per_ad}
            onInput={(e) => $dataClient.config.games_per_ad = e.target.value}
          />
            
          <ListInput
            label="Days to claim prize"
            floatingLabel
            type="number"
            placeholder="How many days before expired to claim prize"
            errorMessage="Only numbers please!"
            pattern="[0-9]*"
            clearButton
            value={$dataClient.config.days_to_claim}
            onInput={(e) => $dataClient.config.days_to_claim = e.target.value}
          />
            
        </List>
        
      </Col>
    </Row>
  </Block>
  
  
  <BlockTitle></BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col width="0" medium="25" />
      <Col width="100" medium="50"><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Save</Button></Col>
      <Col width="0" medium="25" />
    </Row>
  </Block>

  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { f7, theme, ListInput, Button, List, ListItem, Searchbar, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
  import dataClient from '../stores/dataClient.js';
  
  //export let f7router;

  let innerWidth = 0;


  async function doSave() {

    const isValid = f7.input.validateInputs('#configForm');
    if (!isValid) {
      return;
    }

    let result = false;
    result = await dataClient.updateConfig();

    if (result) {
        
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

    }
  }


  onMount(async () => {
    await dataClient.getConfig();
  })
  
</script>
