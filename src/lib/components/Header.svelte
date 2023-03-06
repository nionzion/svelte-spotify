<script lang="ts">
    import type {ComponentType} from "svelte";
    import Navigation from "$lib/components/Navigation.svelte";
    import {theme} from "../stores/stores";
    import IconButton from "$lib/components/IconButton.svelte";
    import {browser} from "$app/environment";
    import {page} from "$app/stores";
    import {ChevronDown} from "lucide-svelte";

    import {
        Sun,
        Moon,
        ChevronLeft,
        ChevronRight
    } from "lucide-svelte";

    function toggleTheme() {
        if ($theme == 'light') {
            $theme = 'dark';
        } else {
            $theme = 'light';
        }
    }

    $: user = $page.data.user;

</script>

<div class="content">
    <div class="left">
        {#if browser}
            <Navigation desktop={false}/>
        {/if}
        <IconButton
                style="background-color: var(--medium-gray); margin-left: 10px; margin-right: 10px; border-radius: 20px"
                icon={ChevronLeft}/>
        <IconButton style="background-color: var(--medium-gray); border-radius: 20px" icon={ChevronRight}/>
    </div>

    <div class="right">
        <IconButton style="align-self: center; margin-right: 10px" on:click={toggleTheme} label="Toggle Theme"
                    icon={ $theme == 'light' ? Moon : Sun}/>

        <div id="profile-button">
            <button class="profile-button">
                {#if user.images && user.images.length > 0}
                    <img src={user.images[0].url} alt=""/>
                {/if}
                <span class="username">{user?.display_name}</span> <span
                    class="visually-hidden">Profile menu</span>
                <ChevronDown size={18} class="profile-arrow"/>
            </button>

        </div>
    </div>
</div>

<style lang="scss">
  .content {
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .right {
      display: flex;
    }

    .left {
      display: flex;
    }

    .profile-button {
      background-color: var(--medium-gray);
      border-radius: 30px;
      color: var(--text-color);
      border: none;
      font-weight: 700;
      font-size: functions.toRem(13);
      align-items: center;
      vertical-align: middle;
      padding: 5px;
      display: flex;

      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        @include breakpoint.up("sm") {
          margin-right: 10px;
        }
      }

      :global(.profile-arrow) {
        margin-left: 10px;
        margin-right: 5px;
        @include breakpoint.down("sm") {
          display: none;
        }
      }

      .username {
        @include breakpoint.down("sm") {
          display: none;
        }
      }
    }
  }


</style>