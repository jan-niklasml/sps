<template>
    <v-list
        id="infinite-scroll"
        v-infinite-scroll="loadMore"
        two-line
        infinite-scroll-disabled="busy"
    >
        <template v-for="(team, index) in teams">
            <team-list-item
                :key="`team-${team.id}`"
                :team="team"
                @deleted="teamDeleted"
            />
            <v-divider :key="`divider-${index}`" class="divider" />
        </template>
        <v-list-item v-if="allPagesLoaded">
            <v-list-item-content class="text--secondary d-flex justify-center">
                {{ totalElements }} Einträge insgesamt
            </v-list-item-content>
        </v-list-item>
        <template v-if="!busy && (teams === undefined || teams.length < 1)">
            <v-subheader>Keine Teams vorhanden</v-subheader>
        </template>
        <template v-if="busy">
            <v-progress-linear indeterminate color="accent" />
        </template>
    </v-list>
</template>

<script setup lang="ts">
  import TeamListItem from "@/components/teams/TeamListItem.vue";
  import { TeamApiService } from "@/api/TeamApiService";
  import Team from "@/types/Team";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { computed, onMounted, ref } from "vue";

  const snackbarStore = useSnackbarStore();

  const teams = ref<Team[]>([]);
  const busy = ref(false);
  const currentPage = ref(-1);
  const totalPages = ref(Number.MAX_VALUE);
  const totalElements = ref<number | null>(null);

  onMounted(() => {
    loadMore();
  });

  function loadMore(): void {
    busy.value = true;
    TeamApiService.getAllPaged(currentPage.value + 1)
      .then((pagedTeams) => {
        teams.value.push(...pagedTeams.data);
        currentPage.value = pagedTeams.page;
        totalPages.value = pagedTeams.totalPages;
        totalElements.value = pagedTeams.totalElements;
      })
      .catch((err) => {
        snackbarStore.showMessage(err);
      })
      .finally(() => {
        busy.value = false;
      });
  }

  function teamDeleted(team: Team): void {
    teams.value = teams.value.filter((t) => t.id != team.id);
  }

  const allPagesLoaded = computed(() => {
    return currentPage.value >= totalPages.value - 1;
  });
</script>

<style scoped></style>
