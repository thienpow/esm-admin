<Page>
  <Navbar backLink title={title}>
  </Navbar>

  <List noHairlinesMd form id="gameForm">

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
                  value={$dataClient.game.status}
                  onInput={(e) => $dataClient.game.status = e.target.value}
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
                  value={$dataClient.game.img_url}
                  onInput={(e) => $dataClient.game.img_url = e.target.value}
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
                  value={$dataClient.game.title}
                  onInput={(e) => $dataClient.game.title = e.target.value}
                  required
                  validate />
              </Col>
              <Col width="100" medium="60">
                <ListInput
                  class="item-content-input"
                  label="Sub-title"
                  type="text"
                  value={$dataClient.game.subtitle}
                  onInput={(e) => $dataClient.game.subtitle = e.target.value} />
              </Col>
            </Row>
            
            <ListInput
              class="item-content-input"
              type="textarea"
              label="Detailed Content"
              value={$dataClient.game.content}
              onInput={(e) => $dataClient.game.content = e.target.value} 
              resizable />
            
          
          </CardContent>
        </Card>
      
      </Col>
      <Col width="100" large="45" xlarge="40">

        <BlockTitle>Rules</BlockTitle>
        <Card noShadow>
          <CardContent>
    
            <Row>
              
              <Col width="100" medium="50">
    
                {#if id > 0}
                <ListItem link="/game_leader_rule/{id}/" view=".view-main" panelClose title="Leaderboard Rules"/>
                {/if}
              </Col>
              <Col width="100" medium="50">
    
                <ListInput
                  class="item-content-input"
                  label="Score Rule"
                  type="number"
                  value={$dataClient.game.score_rule}
                  onInput={(e) => $dataClient.game.score_rule = e.target.value}
                  pattern="[0-9]*" />
    
              </Col>
            </Row>
            <Row>
              <Col width="100" medium="50">
                <ListInput
                  class="item-content-input"
                  label="Watch AD get Tickets"
                  type="number"
                  value={$dataClient.game.watch_ad_get_tickets}
                  onInput={(e) => $dataClient.game.watch_ad_get_tickets = e.target.value}
                  pattern="[0-9]*" />
              </Col>
              <Col width="100" medium="50">
                <ListInput
                  class="item-content-input"
                  label="Watch AD get Exp"
                  type="number"
                  value={$dataClient.game.watch_ad_get_exp}
                  onInput={(e) => $dataClient.game.watch_ad_get_exp = e.target.value}
                  pattern="[0-9]*" />
              </Col>
            </Row>
            <Row>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Use How Many Gems"
                  type="number"
                  value={$dataClient.game.use_how_many_gems}
                  onInput={(e) => $dataClient.game.use_how_many_gems = e.target.value}
                  pattern="[0-9]*" />
              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Use Gem Get Tickets"
                  type="number"
                  value={$dataClient.game.use_gem_get_tickets}
                  onInput={(e) => $dataClient.game.use_gem_get_tickets = e.target.value}
                  pattern="[0-9]*" />
              </Col>
              <Col width="100" medium="33">
                <ListInput
                  class="item-content-input"
                  label="Use Gem Get Exp"
                  type="number"
                  value={$dataClient.game.use_gem_get_exp}
                  onInput={(e) => $dataClient.game.use_gem_get_exp = e.target.value}
                  pattern="[0-9]*" />
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>



    <BlockTitle>Code Details</BlockTitle>
    <Card noShadow>
      <CardContent>
        <Row>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="Game Version"
              type="text"
              value={$dataClient.game.version}
              onInput={(e) => $dataClient.game.version = e.target.value}
              pattern="[0-9]*" />
          </Col>
          <Col width="100" medium="50">
            <ListInput
              class="item-content-input"
              label="3D Engine"
              type="select"
              value={$dataClient.game.engine_id}
              onInput={(e) => $dataClient.game.engine_id = e.target.value}
              placeholder="Please choose...">
              <option value={0}>Not Selected</option>
              <option value={11}>PhaserJS v3</option>
              <option value={10}>PhaserJS v2</option>
              <option value={20}>PixiJS v5</option>
            </ListInput>
            
          </Col>
        </Row>
        <div id="edContainer">
          <CodeMirror
              height="580px"
              width="98%"
              config={code_mirror_config}
              initFinished={loadDone};
              on:textChange={textChange}
              on:editorChange={editorChange}
            />
        </div>
      </CardContent>
    </Card>

  </List>

  
  <SaveCancel on:doSave={doSave} />

  
</Page>
<script>
  import CodeMirror from '../components/CodeMirror.svelte';
  
  import URLHelp from '../components/URLHelp.svelte';
  import SaveCancel from '../components/SaveCancel.svelte';
  import {
    f7,
    theme,
    ListItem,
    Card,
    CardContent,
    Col,
    Page,
    Navbar,
    List,
    ListButton,
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
  
  $: title = id > 0 ? "Edit Game" : "New Game";

  let code_mirror_config = {
    language: 'javascript',
    lineNumbers: true,
    lineWrapping: false,
    lineHighlight: true
  };
  let code_mirror;

  async function doSave() {

    const isValid = f7.input.validateInputs('#gameForm');
    if (!isValid) {
      return;
    }

    let result = false;
    if (id > 0) {
      result = await dataClient.updateGame();
    } else {
      result = await dataClient.addGame();
    }

    if (result) {
      
      let successToast = f7.toast.create({
          icon: theme.ios || theme.aurora ? '<i class="f7-icons">checkmark</i>' : '<i class="material-icons">done</i>',
          text: 'Data is Saved!',
          position: 'center',
          closeTimeout: 2000,
      });
      successToast.open();

      f7router.navigate('/games/' + $dataClient.game.status + '/')
    }
    
  };

  function textChange(e) {
    $dataClient.game.game_code = e.detail.data.value;
  }
  function editorChange(e) {
    code_mirror = e.detail.data;
  }

  let loadDone = false;
  onMount(async () => {
    loadDone = true;
    if (id > 0) {
      
      await dataClient.getGameCode();
      code_mirror.setValue($dataClient.game.game_code);

    }
  })
</script>
<style>
  #edContainer {
    display: flex;
    height: 580px;
    width: 90%;
  }
</style>