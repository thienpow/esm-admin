<script>
  import { 
    Block,
    Button,
    Sheet,
    Toolbar,
    Link,
    PageContent, } from 'framework7-svelte';
</script>
<Button round raised sheetOpen=".help-sheet">url ?</Button>
<Sheet class="help-sheet" 
push
style="height: 380px; --f7-sheet-bg-color: #fff"
swipeToClose
swipeToStep
>
<Toolbar>
  <div class="left"></div>
  <div class="right">
    <Link sheetClose>Close</Link>
  </div>
</Toolbar>
<!--  Scrollable sheet content -->
<PageContent>
  <Block>
    <p>Steps to create a URL.</p>
    <p>1. go to https://cloud.digitalocean.com/spaces and go in esm-cdn project</p>
    <p>2. create a (prize/game/item/subscription) folder or open if existed.</p>
    <p>3. create a folder name with the (prize/game/item/subscription) title</p>
    <p>4. upload an image file and name it as img.png</p>
    <p>5. move the mouse cursor and point to the img.png filename, it will popup a panel with a copy url button, press copy url and paste the url to ESM Admin's Image URL input.</p>
    <p>6. upload the rest of img-xs.png img-s.png img-m.png img-l.png img-xl.png, make sure you have standardized xs s m l xl. Example width pixel: xs=480px s=568px m=768px l=1024px xl=1200px</p>
  </Block>
</PageContent>
</Sheet>