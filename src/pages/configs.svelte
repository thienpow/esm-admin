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
  <Row>
    <Col width=100 medium=25></Col>
    <Col width=100 medium=50>

      <Card noShadow>
        <CardContent>
          <Row>
            <Col>
              <List noHairlinesMd form id="configForm">
                
                <ListInput
                  label="Gems Per Invite"
                  floatingLabel
                  type="number"
                  placeholder="Tickets a user can get per successfull invitation"
                  errorMessage="Only numbers please!"
                  pattern="[0-9]*"
                  value={$dataClient.config.invites}
                  onInput={(e) => $dataClient.config.invites = e.target.value}
                  step="1"
                />
      
                <ListInput
                  label="How many Games Per AD Popup"
                  floatingLabel
                  type="number"
                  placeholder="How many Games Per AD Popup"
                  errorMessage="Only numbers please!"
                  pattern="[0-9]*"
                  value={$dataClient.config.games_per_ad}
                  onInput={(e) => $dataClient.config.games_per_ad = e.target.value}
                  step="1"
                />
                  
                <ListInput
                  label="Days to claim prize"
                  floatingLabel
                  type="number"
                  placeholder="How many days before expired to claim prize"
                  errorMessage="Only numbers please!"
                  pattern="[0-9]*"
                  value={$dataClient.config.days_to_claim}
                  onInput={(e) => $dataClient.config.days_to_claim = e.target.value}
                  step="1"
                />

                <ListInput
                  label="Freespin Per Day"
                  floatingLabel
                  type="number"
                  placeholder="How many freespins to give per day?"
                  errorMessage="Only numbers please!"
                  pattern="[0-9]*"
                  value={$dataClient.config.freespin_per_day}
                  onInput={(e) => $dataClient.config.freespin_per_day = e.target.value}
                  step="1"
                />
                <Row>
                  
                  <Col>
                    
                    <ListInput
                      label="Use how many Gems"
                      floatingLabel
                      type="number"
                      placeholder="Use how many Gems?"
                      errorMessage="Only numbers please!"
                      pattern="[0-9]*"
                      value={$dataClient.config.gems_per_spins_1}
                      onInput={(e) => $dataClient.config.gems_per_spins_1 = e.target.value}
                      step="1"
                    />
                  </Col>
                  <Col>
                    <ListInput
                      label="For how many Spins"
                      floatingLabel
                      type="number"
                      placeholder="For how many Spins?"
                      errorMessage="Only numbers please!"
                      pattern="[0-9]*"
                      value={$dataClient.config.gems_per_spins_2}
                      onInput={(e) => $dataClient.config.gems_per_spins_2 = e.target.value}
                      step="1"
                    />
                  </Col>
                
                </Row>
                <Row>
                  
                  <Col>
                    
                    <ListInput
                      label="Watch how many Ads"
                      floatingLabel
                      type="number"
                      placeholder="Watch how many Ads?"
                      errorMessage="Only numbers please!"
                      pattern="[0-9]*"
                      value={$dataClient.config.ads_per_spins_1}
                      onInput={(e) => $dataClient.config.ads_per_spins_1 = e.target.value}
                      step="1"
                    />
                  </Col>
                  <Col>
                    <ListInput
                      label="For how many Spins"
                      floatingLabel
                      type="number"
                      placeholder="For how many Spins?"
                      errorMessage="Only numbers please!"
                      pattern="[0-9]*"
                      value={$dataClient.config.ads_per_spins_2}
                      onInput={(e) => $dataClient.config.ads_per_spins_2 = e.target.value}
                      step="1"
                    />
                  </Col>
                
                </Row>
                

              </List>
              
            </Col>
          </Row>
        </CardContent>
      </Card>
      
      <Row tag="p">
        <Col width="10" medium="25" />
        <Col width="80" medium="50"><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Save</Button></Col>
        <Col width="10" medium="25" />
      </Row>
    
    </Col>
    <Col width=100 medium=25></Col>
  </Row>
  

  
</Page>

<svelte:window bind:innerWidth={innerWidth}/>

<script>
  import { onMount } from 'svelte';
  import { f7, theme, ListInput, Button, List, Card, CardContent, NavLeft, NavTitle, NavRight, Link, Row, Col, Chip, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon, Page, Navbar, Block, BlockTitle } from 'framework7-svelte';
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
