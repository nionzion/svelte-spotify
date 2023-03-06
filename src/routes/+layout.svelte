<script lang="ts">
    import "modern-normalize/modern-normalize.css";
    import "../styles/main.scss";
    import type {LayoutData} from "./$types";
    import Navigation from "$lib/components/Navigation.svelte";
    import Header from "$lib/components/Header.svelte";
    import {theme} from "$lib/stores/stores.js";

    let topBar: HTMLElement;
    let scrollY: number;
    let headerOpacity = 0;

    export let data: LayoutData;

    $: if (topBar) {
        headerOpacity = scrollY / topBar.offsetHeight < 1 ? scrollY / topBar.offsetHeight : 1;
    }

    $: user = data.user;


</script>
<!--<svelte:head>-->
<!--    <link rel="stylesheet" href={`src/styles/${$theme == 'dark' ? 'main' : 'light'}.scss`}/>-->
<!--    <link rel="stylesheet" href="src/styles/main.scss"/>-->
<!--</svelte:head>-->
<svelte:window bind:scrollY/>

<div id="main">
    {#if user}
        <div id="sidebar">
            <Navigation desktop="{true}"/>
        </div>
    {/if}
    <div id="content">
        {#if user}
            <div id="top-bar" bind:this={topBar}>
                <div class="top-bar-bg" style:background-color="var(--header-color)" style:opacity={`${headerOpacity}`}>
                </div>
                <Header/>
            </div>
        {/if}
        <main id="main-content" class:logged-in={user}>
            <slot/>

        </main>
    </div>
</div>

<style lang="scss">
  #main {
    display: flex;
    height: 2000px;

    #content {
      flex: 1;

      #top-bar {
        position: fixed;
        height: var(--header-height);
        padding: 0 15px;
        display: flex;
        align-items: center;
        width: 100%;
        z-index: 100;

        .top-bar-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
        }

        @include breakpoint.up("md") {
          padding: 30px 30px 60px;
          width: calc(100% - var(--sidebar-width));
        }
      }

      main#main-content {
        padding: 30px 15px 60px;
        @include breakpoint.up('md') {
          padding: 30px 30px 60px;
        }

        &.logged-in {
          padding-top: calc(30px + var(--header-height));
        }
      }
    }
  }

</style>