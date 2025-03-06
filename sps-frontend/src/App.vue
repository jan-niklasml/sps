<template>
    <v-app>
        <the-snackbar />
        <v-app-bar app clipped-left dark color="primary">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

            <router-link to="/">
                <v-toolbar-title class="font-weight-bold">
                    <span class="secondary--text">Beispiel</span>
                    <span class="white--text">Projekt</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer />
            <v-text-field
                id="suchfeld"
                v-model="query"
                flat
                solo-inverted
                hide-details
                label="Suche"
                clearable
                prepend-inner-icon="mdi-magnify"
                color="black"
                @keyup.enter="search"
            />
            <v-spacer />
            <appswitcher
                v-if="appswitcherBaseUrl"
                :base-url="appswitcherBaseUrl"
                :tags="['global']"
            />
            <v-btn text fab>
                <v-icon class="white--text"> mdi-account-circle </v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list>
                <v-list-item :to="{ path: '/getstarted' }">
                    <v-list-item-content>
                        <v-list-item-title>Get started</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    :to="{ name: 'person.index' }"
                    :disabled="
                        !user ||
                        !user.authorities.includes(
                            'BEISPIELPROJEKT_BACKEND_READ_PERSON'
                        )
                    "
                >
                    <v-list-item-content>
                        <v-list-item-title>Person</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    :to="{ name: 'team.index' }"
                    :disabled="
                        !user ||
                        !user.authorities.includes(
                            'BEISPIELPROJEKT_BACKEND_READ_TEAM'
                        )
                    "
                >
                    <v-list-item-content>
                        <v-list-item-title>Teams</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container fluid>
                <v-fade-transition mode="out-in">
                    <router-view />
                </v-fade-transition>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
  import TheSnackbar from "@/components/TheSnackbar.vue";
  import { Appswitcher } from "@muenchen/appswitcher-vue";
  import InfoService from "@/api/InfoService";
  import User from "@/types/User";
  import UserService from "@/api/UserService";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { useUserStore } from "@/stores/user";
  import { computed, onMounted, ref, watch } from "vue";
  import { useRoute } from "vue-router/composables";

  const drawer = ref(true);
  const query = ref("");
  const appswitcherBaseUrl = ref<string | null>(null);

  const route = useRoute();
  const userStore = useUserStore();
  const snackbarStore = useSnackbarStore();

  const user = computed(() => userStore.getUser);

  onMounted(() => {
    query.value = route.params.query;
    loadUser();
    InfoService.getInfo()
      .then((content: any) => {
        appswitcherBaseUrl.value = content.appswitcher.url;
      })
      .catch((error) => {
        snackbarStore.showMessage(error);
      });
  });

  watch(
    () => route.params.query,
    (q: string) => {
      if (query.value !== q) {
        query.value = q;
      }
    }
  );

  /**
   * Lädt UserInfo vom Backend und setzt diese im Store.
   */
  function loadUser(): void {
    UserService.getUser()
      .then((user: User) => userStore.setUser(user))
      .catch(() => {
        // Keine Userinfo gekriegt, also Fallback
        if (import.meta.env.VITE_NODE_ENV !== "production") {
          userStore.setUser({
            user_name: "Local Development User",
            name: "Local Development User",
            authorities: [
              "BEISPIELPROJEKT_BACKEND_READ_PERSON",
              "BEISPIELPROJEKT_BACKEND_WRITE_PERSON",
              "BEISPIELPROJEKT_BACKEND_WRITE_PERSON",
              "BEISPIELPROJEKT_BACKEND_READ_PERSON",
              "BEISPIELPROJEKT_BACKEND_READ_TEAM",
              "BEISPIELPROJEKT_BACKEND_WRITE_TEAM",
              "BEISPIELPROJEKT_BACKEND_READ_TEAM",
              "BEISPIELPROJEKT_BACKEND_WRITE_TEAM",
            ],
          } as User);
        } else {
          userStore.setUser({
            user_name: "unauthorized",
            name: "unauthorized",
          } as User);
        }
      });
  }

  //Navigiert zur Seite mit den Suchergebnissen und sendet ein Event zum Auslösen weiterer Suchen.
  async function search(): Promise<void> {
    if (query.value !== "" && query.value !== null) {
      snackbarStore.showMessage({
        message: "Sie haben nach " + query.value + " gesucht. ;)",
      });
    }
  }
</script>

<style>
.main {
    background-color: white;
}
</style>
