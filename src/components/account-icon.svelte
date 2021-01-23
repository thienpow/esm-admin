<script>
  import { onMount } from 'svelte';
  import { isLoggedIn, displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } from "../stores/user.js"

  import { 
    f7,
    Chip, Icon,
    Link
  } from 'framework7-svelte';
  
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';

  onMount(() => {

    if (Device.cordova) {
      

    } else {


      
    }
    //f7.dialog.alert("In: " + $displayName);
  })

</script>
{#if $isLoggedIn}
  <Link href={`/profile/0/`}>
    <Chip text="{$displayName}">
      <img slot="media" src="{$photoURL}" alt="{$displayName}" />
    </Chip>
    
  </Link>
{:else}
  <Link href={`/profile/0/`} iconIos="f7:person" iconAurora="f7:person" iconMd="material:perm_identity" />


{/if}