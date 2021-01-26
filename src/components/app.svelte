<App params={ f7params } >
  
  {#if $dataClient.isLoggedIn}
  <!-- Left panel with cover effect when hidden -->
  <Panel themeDark left visibleBreakpoint={960}>
    <View>
      <Page>
        <Navbar title="ESM Admin"/>
        <List menuList>
          <ListItem link="/" view=".view-main" panelClose title="Dashboard" selected={selected === 'home'} onClick={() => (selected = 'home')}>
            <span slot="media">
              <Icon md="material:home" aurora="f7:house_fill" ios="f7:house_fill" />
            </span>
          </ListItem>
          <ListItem title="Configurations" >
            <span slot="media">
              <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
            </span>
          </ListItem>
          <li>
            <ul>
              
              <ListItem link="/prizes/" view=".view-main" panelClose title="Prizes"/>
              <ListItem link="/tournaments/" view=".view-main" panelClose title="Tournaments"/>
              <ListItem link="/formatsets/" view=".view-main" panelClose title="Format Sets"/>
              <ListItem link="/games/" view=".view-main" panelClose title="Games"/>
              
              <ListItem link="/items/" view=".view-main" panelClose title="IAP-Items"/>
              <ListItem link="/subscriptions/" view=".view-main" panelClose title="IAP-Subscriptions"/>

              <ListItem link="/ranks/" view=".view-main" panelClose title="Ranks"/>
              <ListItem link="/configs/" view=".view-main" panelClose title="Other Configs" />
            
            </ul>
          </li>
          
          <ListItem link="/users/" view=".view-main" panelClose title="Users">
            <span slot="media">
              <Icon md="material:person" aurora="f7:person_fill" ios="f7:person_fill" />
            </span>
          </ListItem>
          <ListItem title="Reports">
            <span slot="media">
              <Icon md="material:assessment" aurora="f7:chart_bar" ios="f7:chart_bar" />
            </span>
          </ListItem>
          <ListItem>
            <li>
              <ul>
                <ListItem link="/winners/" view=".view-main" panelClose title="Winners"/>
                <ListItem link="/sales/" view=".view-main" panelClose title="Sales"/>
                <ListItem link="/claims/" view=".view-main" panelClose title="Claims"/>
              </ul>
            </li>
          </ListItem>
          <ListItem divider title="" />
          <ListItem link="/profile/" view=".view-main" panelClose title="Security"/>
        </List>
      </Page>
    </View>
  </Panel>
  <!-- Your main view, should have "view-main" class -->
  
  <View main class="safe-areas" url="/" />
  {/if}

  <LoginScreen 
    id="my-login-screen"
    opened={!$dataClient.isLoggedIn}
  >
    <View>
      <Page loginScreen>
        <LoginScreenTitle>ESM Admin</LoginScreenTitle>
        <List form id="loginForm">
          <ListInput
            type="text"
            name="username"
            placeholder="Your username"
            value={$dataClient.username}
            onInput={(e) => $dataClient.username = e.target.value}
            required
          />
          <ListInput
            type="password"
            name="password"
            placeholder="Your password"
            value={$dataClient.password}
            onInput={(e) => $dataClient.password = e.target.value}
            required
          />
        </List>
        
        <BlockFooter>
          <Button onClick={doLogin} color="blue" fill >Sign In</Button>
        </BlockFooter>
      </Page>
    </View>
  </LoginScreen>
</App>
<script>
  import { onMount } from 'svelte';

  import {
    f7,
    f7ready,
    Icon,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    Button,
    BlockFooter
  } from 'framework7-svelte';

  import routes from '../js/routes';
  import dataClient from '../stores/dataClient.js';

  // Framework7 Parameters
  let f7params = {
    name: 'ESM Admin', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: routes,
  };

  let selected = 'home';

  dataClient.init();
    

  async function doLogin() {

    const isValid = f7.input.validateInputs('#loginForm');
    if (!isValid) {
      return;
    }

    dataClient.signIn();
  }

  onMount(() => {
    f7ready(() => {
      // Call F7 APIs here
      
      
    });
  })
</script>
<style>
</style>