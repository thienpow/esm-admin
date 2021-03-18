<Page>
  <Navbar title="Logged Out" />
  <Block strong>
    <p>You are safe to close the browser now.</p>
  </Block>
</Page>
<script>
  import { Page, Navbar, Block } from 'framework7-svelte';
  import dataClient from '../stores/dataClient';

  if ('serviceWorker' in navigator) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        console.log(cacheName);
        caches.delete(cacheName);
      });
    });
  }
  
  $dataClient.jwtToken = '';
</script>
