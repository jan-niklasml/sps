<template>
    <v-container>
        <v-card flat>
            <h1 class="text-h5" style="margin-bottom: 1em">Team erstellen</h1>
            <team-form
                v-model="team"
                :is-saving-animation="isSavingAnimation"
                @submit="save"
            />
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
  import TeamForm from "@/components/teams/TeamForm.vue";
  import TeamFormData from "@/types/TeamFormData";
  import { TeamApiService } from "@/api/TeamApiService";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router/composables";

  const router = useRouter();
  const snackbarStore = useSnackbarStore();

  const team: TeamFormData = reactive({
    name: "",
    identifierString: "",
    teamleaderId: "",
  });

  const isSavingAnimation = ref(false);

  async function save() {
    isSavingAnimation.value = true;
    try {
      const t = await TeamApiService.create({
        id: undefined,
        name: team.name,
        identifierString: team.identifierString,
      });
      if (team.teamleaderId != "") {
        await TeamApiService.createRelation(
          t,
          "teamleader",
          "persons",
          team.teamleaderId
        );
      }
      await router.push({
        name: "team.detail",
        params: {
          id: t.id ? t.id : "",
        },
      });
    } catch (err) {
      snackbarStore.showMessage(err as any);
    }
    isSavingAnimation.value = false;
  }
</script>

<style scoped></style>
