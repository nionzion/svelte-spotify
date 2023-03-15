<script lang="ts">
    import type {ComponentType} from "svelte";
    import {Home, Search, ListMusic, type Icon, Menu, X} from "lucide-svelte";
    import logo from "$assets/Spotify_Logo_RGB_White.png";
    import logo_green from "$assets/Spotify_Logo_RGB_Green.png";
    import {page} from "$app/stores";
    import {fade} from 'svelte/transition';
    import {tick} from "svelte";
    import {beforeNavigate} from "$app/navigation";
    import IconButton from "$lib/components/IconButton.svelte";
    import {theme} from "$lib/stores/stores.js";

    export let desktop: boolean;

    let isMobileMenuOpen = false;
    $: isOpen = desktop || isMobileMenuOpen;

    let openMenuButton: IconButton;
    let closeMenuButton: IconButton;
    let lastFocusableElement: HTMLAnchorElement;

    const menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [
        {
            path: "/",
            label: "Home",
            icon: Home
        },
        {
            path: "/search",
            label: "Search",
            icon: Search
        },
        {
            path: "/playlists",
            label: "Playlists",
            icon: ListMusic
        }
    ]
    const openMenu = async () => {
        isMobileMenuOpen = true;
        await tick();
        closeMenuButton.getButton().focus();
    };
    const closeMenu = () => {
        isMobileMenuOpen = false;
        openMenuButton.getButton().focus();
    };

    const moveFocusToBottom = (e: KeyboardEvent) => {
        if (desktop) return;
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            lastFocusableElement.focus();
        }
    };

    const moveFocusToTop = (e: KeyboardEvent) => {
        if (desktop) return;
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            closeMenuButton.getButton().focus();
        }
    };

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }

    beforeNavigate(() => {
        isMobileMenuOpen = false;
    });

</script>

<svelte:head>
    {#if !desktop && isMobileMenuOpen}
        <style lang="scss">
          body {
            overflow: hidden;
          }
        </style>
    {/if}
</svelte:head>

<div class="nav-content" class:desktop class:mobile={!desktop}>
    {#if !desktop && isMobileMenuOpen}
        <div class="overlay" on:keyup={handleEscape} on:click={closeMenu} transition:fade={{duration: 200}}/>
    {/if}
    <nav aria-label="Main">
        {#if !desktop}
            <IconButton on:click={openMenu} bind:this={openMenuButton} aria-expanded="{isOpen}" icon={Menu}
                        label="Open Menu" class="menu-button"/>
        {/if}
        <div class="nav-content-inner" on:keyup={handleEscape} style:visibility="{isOpen ? 'visible' : 'hidden'}"
             class:is-hidden={!isOpen}>
            {#if !desktop}
                <IconButton on:click={closeMenu} on:keydown={moveFocusToBottom} bind:this={closeMenuButton} icon={X}
                            label="Close Menu" class="close-menu-button"/>
            {/if}
            <img src={$theme === 'light' ? logo_green : logo} class="logo" alt="Spotify Logo"/>
            <ul>
                {#each menuItems as menuItem, index}
                    <li class:active={menuItem.path === $page.url.pathname}>
                        {#if menuItems.length === index + 1}
                            <a bind:this={lastFocusableElement} on:keydown={moveFocusToTop} href={menuItem.path}>
                                <svelte:component this={menuItem.icon} focusable="false" color="var(--text-color)"
                                                  aria-hidden="true" size={26} strokeWidth={2}/>

                                {menuItem.label}
                            </a>
                        {:else}
                            <a href={menuItem.path}>
                                <svelte:component this={menuItem.icon} focusable="false" color="var(--text-color)"
                                                  aria-hidden="true" size={26} strokeWidth={2}/>

                                {menuItem.label}
                            </a>
                        {/if}
                    </li>
                {/each}
            </ul>

        </div>
    </nav>
</div>

<style lang="scss">
  .nav-content {
    z-index: 200;
    padding-right: 1px;
    @include breakpoint.up("md") {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 1px 0 rgba(0, 0, 0, 0.19);

    }

    .logo {
      max-width: 100%;
      width: 130px;

    }

    .overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: var(--sidebar-color);
      opacity: 0.75;
      @include breakpoint.up("md") {
        display: none;
      }
    }

    .nav-content-inner {
      padding: 20px;
      min-width: var(--sidebar-width);
      background-color: var(--sidebar-color);
      height: 100vh;
      overflow: auto;
      display: none;

      ul {
        padding: 0;
        margin: 20px 0 0;
        list-style: none;

        li {
          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--text-color);
            font-size: functions.toRem(14);
            font-weight: 500;
            padding: 5px;
            margin: 10px 0;
            opacity: 0.7;
            transition: opacity 0.2s;

            &:hover, &:focus {
              opacity: 1;
            }

            :global(svg) {
              margin-right: 12px;
            }
          }

          &.active {
            a {
              opacity: 1;
            }
          }
        }
      }
    }

    &.desktop {
      position: sticky;
      top: 0;

      .nav-content-inner {
        @include breakpoint.up("md") {
          display: block;
        }
      }
    }

    &.mobile .nav-content-inner {
      position: fixed;
      top: 0;
      left: 0;
      z-index: inherit;
      transition: transform 200ms, opacity 200ms;

      &.is-hidden {
        transform: translateX(-100%);
        opacity: 0;
        transition: transform 200ms, opacity 200ms, visibility 200ms;
      }

      @include breakpoint.down("md") {
        display: block;
      }
    }

    :global(.menu-button) {

      @include breakpoint.up("md") {
        display: none;
      }
    }

    :global(.close-menu-button) {
      position: absolute;
      right: 20px;
      top: 20px;
    }

  }
</style>