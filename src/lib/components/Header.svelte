<script lang="ts">
    import type {ComponentType} from "svelte";

    import {Sun, Moon, type Icon} from "lucide-svelte";

    import Navigation from "$lib/components/Navigation.svelte";
    import {theme} from "../stores/stores";
    import IconButton from "$lib/components/IconButton.svelte";
    import {browser} from "$app/environment";

    function toggleTheme() {
        if ($theme == 'light') {
            $theme = 'dark';
        } else {
            $theme = 'light';
        }
    }

</script>

<div class="content">
    <div class="left">
        {#if browser}
            <Navigation desktop={false}/>
        {/if}
    </div>

    <div class="right">
        <IconButton on:click={toggleTheme} label="Toggle Theme" icon={ $theme == 'light' ? Moon : Sun}/>
    </div>
</div>

<style lang="scss">
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }


</style>