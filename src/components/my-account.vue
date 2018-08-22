<template>
<div>
  <md-card class="md-primary" md-theme="green-card" md-with-hover>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Account</div>
        <div class="md-subhead">Subtitle here</div>
      </md-card-header-text>
    </md-card-header>

    <md-card-actions>
      <md-button>Action</md-button>
      <md-button>Action</md-button>
    </md-card-actions>
  </md-card>
</div>
</template>

<script>
import {MdCard} from 'vue-material/dist/components'
import Vue from 'vue'
export default {
  name: 'ThemeColors',
  beforeCreate () {
    Vue.use(MdCard)
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

@include md-register-theme("green-card", (
primary: md-get-palette-color(green, 500)
));

@include md-register-theme("black-card", (
primary: md-get-palette-color(black, 500)
));

@include md-register-theme("purple-card", (
primary: md-get-palette-color(purple, 500)
));

@include md-register-theme("orange-card", (
primary: md-get-palette-color(orange, 500)
));

@import "~vue-material/dist/base/theme";
@import "~vue-material/dist/components/MdCard/theme";

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: bottom;
}
</style>
