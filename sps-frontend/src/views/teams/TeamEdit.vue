<template>
    <v-container>
        <v-card flat>
            <v-progress-linear v-if="isLoading" indeterminate />
            <template v-else>
                <h1 class="text-h5" style="margin-bottom: 1em">
                    Team bearbeiten: {{ team?.name }}
                </h1>
                <team-form
                    v-if="team != null"
                    v-model="team"
                    :is-saving-animation="isSaving"
                    @submit="save"
                />
            </template>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
  import TeamForm from "@/components/teams/TeamForm.vue";
  import { TeamApiService } from "@/api/TeamApiService";
  import TeamFormData from "@/types/TeamFormData";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router/composables";

  const snackbarStore = useSnackbarStore();
  const route = useRoute();
  const router = useRouter();

  const isLoading = ref(true);
  const team = ref<TeamFormData | null>(null);
  const teamId = ref("");
  const isSaving = ref(false);

  onMounted(() => {
    teamId.value = route.params.id;
    loadTeam();
  });

  function loadTeam(): void {
    TeamApiService.get(teamId.value, ["teamleader"])
      .then((t) => {
        team.value = {
          name: t.name,
          identifierString: t.identifierString,
          teamleaderId: t.teamleader?.id || "",
        };
        isLoading.value = false;
      })
      .catch((err) => {
        snackbarStore.showMessage(err);
        router.back();
      })
      .finally(() => (isLoading.value = false));
  }

  function save(): void {
    if (team.value == null) return;
    isSaving.value = true;
    TeamApiService.update({
      id: teamId.value,
      name: team.value.name,
      identifierString: team.value.identifierString,
    })
      .then((t) => {
        if (team.value == null) return;
        TeamApiService.createRelation(
          t,
          "teamleader",
          "persons",
          team.value.teamleaderId
        )
          .then(() => {
            isSaving.value = false;
            router.push({
              name: "team.detail",
              params: {
                id: teamId.value,
              },
            });
          })
          .catch((reason) => snackbarStore.showMessage(reason))
          .finally(() => (isSaving.value = false));
      })
      .catch((reason) => {
        snackbarStore.showMessage(reason);
        isSaving.value = false;
      });
  }
</script>

<style scoped></style>
