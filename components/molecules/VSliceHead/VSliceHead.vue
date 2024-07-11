<script setup lang="ts">
import type {LinkField, ContentRelationshipField} from "@prismicio/types";
import VPrismicLink from "~/components/molecules/VPrismicLink/VPrismicLink.vue";

export interface VSliceHeadProps {
  title: string | null
  linkLabel?: string
  externalLinkReference?: LinkField
  internalLinkReference?: ContentRelationshipField
}

defineProps<VSliceHeadProps>()

</script>

<template>
  <header :class="$style.root">
    <h1 class="text-h3" :class="$style.title">{{title}}</h1>
    <VPrismicLink :link-label="linkLabel" :external-link-reference="externalLinkReference" :internal-link-reference="internalLinkReference" />
  </header>
</template>

<style lang="scss" module>
.root {
  @include property-fluid(padding-top, (xs: 36, xl: 60));
  @include property-fluid(padding-bottom, (xs: 26, xl: 20));

  display: flex;
  align-items: center;
  position: relative;
}

.title {

}

.content {
  margin-top: rem(6);
}
</style>
