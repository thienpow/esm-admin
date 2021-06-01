<App { ...f7params } themeDark={$is_dark_theme} on:darkThemeChange={(isDark) => $is_dark_theme = isDark}>
  
  {#if $dataClient.isLoggedIn}
  <!-- Left panel with cover effect when hidden -->
  
  <Panel left >
      <Navbar title="ESM Admin">
        
      </Navbar>
      <List menuList>
        <ListItem link="/" view=".view-main" title="Dashboard" selected={selected === 'home'} onClick={() => (selected = 'home')} >
          <span slot="media">
            <Icon md="material:home" aurora="f7:house_fill" ios="f7:house_fill" />
          </span>
        </ListItem>
        
        <ListItem link="/users/" view=".view-main" title="Users" selected={selected === 'users'} onClick={() => (selected = 'users')} >
          <span slot="media">
            <Icon md="material:person" aurora="f7:person_fill" ios="f7:person_fill" />
          </span>
        </ListItem>
        
    
        <ListItem accordionItem title="Prize & Tournament">
          <AccordionContent>
  
            <ListItem link="/prizes/" view=".view-main" title="Prizes" selected={selected === 'prizes'} onClick={() => (selected = 'prizes')}> 
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            <ListItem link="/tournaments/" view=".view-main" title="Tournaments" selected={selected === 'tournaments'} onClick={() => (selected = 'tournaments')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            <ListItem link="/formatsets/" view=".view-main" title="Format Sets" selected={selected === 'formatsets'} onClick={() => (selected = 'formatsets')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            <ListItem link="/games/" view=".view-main" title="Games" selected={selected === 'games'} onClick={() => (selected = 'games')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            
          </AccordionContent>
        </ListItem>
  
        
        <ListItem accordionItem title="Shop">
          <AccordionContent>
  
            <ListItem link="/items/" view=".view-main" title="IAP-Items" selected={selected === 'iap-items'} onClick={() => (selected = 'iap-items')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            <ListItem link="/subscriptions/" view=".view-main" title="IAP-Subscriptions" selected={selected === 'iap-sub'} onClick={() => (selected = 'iap-sub')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
  
          </AccordionContent>
        </ListItem>
  
        <ListItem accordionItem title="Configs">
          <AccordionContent>
  
            <ListItem link="/ranks/" view=".view-main" title="Ranks" selected={selected === 'ranks'} onClick={() => (selected = 'ranks')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            <ListItem link="/spinner_rules/" view=".view-main" title="Spinner Rules" selected={selected === 'spinner_rules'} onClick={() => (selected = 'spinner_rules')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
            <ListItem link="/configs/" view=".view-main" title="Other Configs"  selected={selected === 'other-configs'} onClick={() => (selected = 'other-configs')}>
              <span slot="media">
                <Icon md="material:settings" aurora="f7:gear_alt_fill" ios="f7:gear_alt_fill" />
              </span>
            </ListItem>
              
          </AccordionContent>
        </ListItem>
  
        <ListItem accordionItem title="Reports">
          <AccordionContent>
  
            <ListItem link="/winners/" view=".view-main" title="Winners Management" selected={selected === 'winners'} onClick={() => (selected = 'winners')}>
              <span slot="media">
                <Icon md="material:assessment" aurora="f7:chart_bar" ios="f7:chart_bar" />
              </span>
            </ListItem>    
            <ListItem link="/buys/" view=".view-main" title="Sales Management" selected={selected === 'sales'} onClick={() => (selected = 'sales')}>
              <span slot="media">
                <Icon md="material:assessment" aurora="f7:chart_bar" ios="f7:chart_bar" />
              </span>
            </ListItem>
  
          </AccordionContent>
        </ListItem>
  
        <ListItem accordionItem title="Admin">
          <AccordionContent>
  
            <ListItem link="/password/" view=".view-main" title="Password" selected={selected === 'security'} onClick={() => (selected = 'security')}>
              <span slot="media">
                <Icon md="material:lock" aurora="f7:lock" ios="f7:lock" />
              </span>
            </ListItem>
            <ListItem link title="Darkmode = {$is_dark_theme ? 'ON' : 'OFF'}" onClick={() => $is_dark_theme = !$is_dark_theme }>
              <span slot="media">
                {#if $is_dark_theme}
                  <Icon md="material:brightness_3" aurora="f7:lightbulb_slash" ios="f7:lightbulb_slash" />
                {:else}
                  <Icon md="material:brightness_5" aurora="f7:lightbulb" ios="f7:lightbulb" />
                {/if}
              </span>
            </ListItem>
            <ListItem link="/logout/" view=".view-main" title="Logout" onClick={() => (selected = '')}>
              <span slot="media">
                <Icon md="material:clear" aurora="f7:clear" ios="f7:clear" />
              </span>
            </ListItem>
          </AccordionContent>
        </ListItem>
  
      </List>
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
        <Block>
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
        </Block>
        <Block>
          <Button large fill raised color="blue" onClick={doLogin} >Sign In</Button>
        </Block>
      </Page>
    </View>
  </LoginScreen>
</App>
<script>
  import { onMount } from 'svelte';

  import {
    f7,
    f7ready,
    App,
    AccordionContent,
    Icon,
    Panel,
    View,
    Page,
    Navbar,
    Block,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    Button,
    BlockFooter
  } from 'framework7-svelte';

  import routes from '../js/routes';
  import dataClient from '../stores/dataClient';
  import {is_dark_theme} from '../stores/ui';

  let leftVisibleBreakPoint = 960;
  // Framework7 Parameters
  let f7params = {
    name: 'ESM Admin', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: routes,
    //serviceWorker: {
    //  path: '/service-worker.js',
    //},
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