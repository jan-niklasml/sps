<template>
    <v-list-item @click="openPerson">
        <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
            <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <list-item-actions
            v-if="showDelete"
            @open="openPerson"
            @edit="editPerson"
            @delete="deleteRequested"
        />
        <list-item-actions v-else @open="openPerson" @edit="editPerson" />
        <delete-dialog
            v-model="deleteDialogVisible"
            :is-loading-animation="deleteDialogIsLoading"
            :descriptor-string="`${props.person.firstname} ${props.person.lastname}`"
            @delete="deleteConfirmed"
        />
    </v-list-item>
</template>

<script setup lang="ts">
  import ListItemActions from "@/components/common/ListItemActions.vue";
  import DeleteDialog from "@/components/common/DeleteDialog.vue";
  import { PersonApiService } from "@/api/PersonApiService";
  import Person from "@/types/Person";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { computed, ref, useListeners } from "vue";
  import { useRouter } from "vue-router/composables";

  const props = defineProps<{
    person: Person;
  }>();
  const emits = defineEmits<{
    (e: "deleted", p: Person): void;
  }>();
  const snackbarStore = useSnackbarStore();
  const router = useRouter();
  const listeners = useListeners();

  const deleteDialogVisible = ref(false);
  const deleteDialogIsLoading = ref(false);

  const title = computed(
    () => `${props.person.firstname} ${props.person.lastname}`
  );
  const subtitle = computed(() => props.person.team?.identifierString);

  function openPerson() {
    router.push({
      name: "person.detail",
      params: {
        id: props.person.id?.toString() ?? "",
      },
    });
  }

  function editPerson() {
    router.push({
      name: "person.edit",
      params: {
        id: props.person.id?.toString() ?? "",
      },
    });
  }

  function deleteRequested(): void {
    deleteDialogVisible.value = true;
  }

  function deleteConfirmed(): void {
    deleteDialogIsLoading.value = true;
    PersonApiService.delete(props.person.id || "")
      .then(() => {
        emits("deleted", props.person);
      })
      .catch((err: any) => {
        snackbarStore.showMessage(err);
      })
      .finally(() => {
        deleteDialogIsLoading.value = false;
        deleteDialogVisible.value = false;
      });
  }

  const showDelete = computed(() => listeners.deleted != null);
</script>

<style scoped></style>
