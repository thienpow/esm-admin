<Page>
  <!-- Top Navbar -->
  <Navbar>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>Change Password</NavTitle>
    
  </Navbar>
  <!-- Body -->
  <Row>
    <Col width=100 medium=25></Col>
    <Col width=100 medium=50>
      <BlockTitle>Change Password</BlockTitle>
      <Card noShadow>
        <CardContent>

          <List noHairlinesMd form id="passForm">
            <ListInput
              label="Old Password"
              type="password"
              placeholder="existing password here"
              value="{old_password}"
              onInput={(e) => old_password = e.target.value}
              required
              validate
            ></ListInput>
            <ListInput
              label="New Password"
              type="password"
              placeholder="new password here"
              value="{new_password}"
              onInput={(e) => new_password = e.target.value}
              required
              validate
              pattern={pattern}
            ></ListInput>
            <ListInput
              label="Again, New Password"
              type="password"
              placeholder="new password here"
              value="{confirm_password}"
              onInput={(e) => confirm_password = e.target.value}
              validate
              pattern="{new_password}"
              info={confirm_password != "" && confirm_password == new_password ? "Ready to go!" : "Password must be same as new password above."}
            ></ListInput>
          </List>
        </CardContent>
      </Card>
      
    
      <Block>
        <Row>
          <Col><Button class="col" large fill raised color="red" animate={true} transition="f7-fade" on:click={doSave}>Change NOW!</Button></Col>
          <Col><Button class="col" large fill raised color="green" back animate={false}>Cancel</Button></Col>
        </Row>
      </Block>
    </Col>
    <Col width=100 medium=25></Col>
  </Row>
  

</Page>
<script>
  import {
    f7,
    Card, CardContent,
    NavLeft, NavTitle, NavRight, Link,
    Col,
    Page,
    Navbar,
    List,
    ListInput,
    BlockTitle,
    Row,
    Button,
    Range,
    Block
  } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';

  export let f7router;

  let pattern = `(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\|,.<>\\/? ]).{10,}`;
  let old_password = "";
  let new_password = "";
  let confirm_password = "";


  async function doSave() {

    const isValid = f7.input.validateInputs('#passForm') && confirm_password == new_password;
    if (!isValid) {
      return;
    }

    await dataClient.changePassword(f7router, old_password, new_password);
  }

</script>
