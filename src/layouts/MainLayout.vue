<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Blank</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-page main class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-vue-router main :animated="false"/> -->
    <slot />
  </ion-page>
</template>

<script>
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
export default {
  name: "MainLayout",
  components: {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
};
</script>
