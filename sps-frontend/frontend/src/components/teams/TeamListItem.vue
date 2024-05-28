<template>
    <v-list-item @click="openItem">
        <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
            <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <list-item-actions
            @open="openItem"
            @edit="editItem"
            @delete="deleteItem"
        />
        <delete-dialog
            v-model="deleteDialogVisible"
            :is-loading-animation="deleteDialogIsLoading"
            :descriptor-string="team.identifierString"
            @delete="deleteConfirmed"
        />
    </v-list-item>
</template>

<script setup lang="ts">
  import Team from "@/types/Team";
  import ListItemActions from "@/components/common/ListItemActions.vue";
  import DeleteDialog from "@/components/common/DeleteDialog.vue";
  import { TeamApiService } from "@/api/TeamApiService";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router/composables";

  const props = defineProps<{
    team: Team;
  }>();
  const emits = defineEmits<{
    (e: "deleted", v: Team): void;
  }>();
  const snackbarStore = useSnackbarStore();
  const router = useRouter();

  const deleteDialogVisible = ref(false);
  const deleteDialogIsLoading = ref(false);

  const title = computed(() => `${props.team.name}`);
  const subtitle = computed(() => ``);

  function openItem() {
    router.push({
      name: "team.detail",
      params: {
        id: props.team.id?.toString() ?? "",
      },
    });
  }

  function editItem() {
    router.push({
      name: "team.edit",
      params: {
        id: props.team.id?.toString() ?? "",
      },
    });
  }

  function deleteItem() {
    deleteDialogVisible.value = true;
  }

  function deleteConfirmed() {
    deleteDialogIsLoading.value = true;
    TeamApiService.delete(props.team.id)
      .then(() => {
        emits("deleted", props.team);
      })
      .catch((err: any) => {
        snackbarStore.showMessage(err);
      })
      .finally(() => {
        deleteDialogIsLoading.value = false;
        deleteDialogVisible.value = false;
      });
  }
</script>

<style scoped></style>
