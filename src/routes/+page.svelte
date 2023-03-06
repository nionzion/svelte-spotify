<div style="height: 1000px"/>

<style lang="scss">

  h1 {
    color: red;
    font-size: functions.toRem(36);
    @include breakpoint.up('md') {
      color: green;
    }
    @include breakpoint.up('lg') {
      color: blue;
    }
  }
</style>