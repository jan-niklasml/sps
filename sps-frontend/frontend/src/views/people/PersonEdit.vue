<template>
    <v-container>
        <v-card flat>
            <v-progress-linear v-if="isLoading" indeterminate />
            <template v-else>
                <h1 class="text-h5" style="margin-bottom: 1em">
                    Person bearbeiten
                </h1>
                <person-form
                    v-model="personData"
                    :is-saving-animation="isSavingAnimation"
                    @save="save"
                />
            </template>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
  import PersonForm from "@/components/people/PersonForm.vue";
  import { PersonApiService } from "@/api/PersonApiService";
  import { Levels } from "@/api/error";
  import PersonFormData from "@/types/PersonFormData";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router/composables";

  const route = useRoute();
  const router = useRouter();
  const snackbarStore = useSnackbarStore();

  const personData = ref<PersonFormData>({
    firstname: "",
    lastname: "",
    email: "",
    teamId: "",
  });
  const isLoading = ref(true);
  const isSavingAnimation = ref(false);
  const personId = ref("");

  onMounted(() => {
    personId.value = route.params.id;
    loadPerson();
  });

  function loadPerson(): void {
    PersonApiService.get(personId.value, ["team"])
      .then((person) => {
        personData.value = {
          firstname: person.firstname,
          lastname: person.lastname,
          email: person.email,
          teamId: person.team?.id ?? "",
        };
        isLoading.value = false;
      })
      .catch((err) => {
        snackbarStore.showMessage(err);
        router.push({
          name: "person.detail",
          params: {
            id: personId.value,
          },
        });
      });
  }

  function save(): void {
    isSavingAnimation.value = true;
    PersonApiService.update({
      id: personId.value,
      firstname: personData.value.firstname,
      lastname: personData.value.lastname,
      fullname: personData.value.firstname + " " + personData.value.lastname,
      email: personData.value.email,
    })
      .then((updatedPerson) => {
        PersonApiService.createRelation(
          updatedPerson,
          "team",
          "teams",
          personData.value.teamId ? personData.value.teamId : ""
        )
          .then(() => {
            if (!updatedPerson) return;
            router.push({
              name: "person.detail",
              params: {
                id: updatedPerson.id
                  ? updatedPerson.id.toString()
                  : "",
              },
            });
          })
          .catch((err) =>
            snackbarStore.showMessage({
              level: Levels.ERROR,
              message: err,
            })
          )
          .finally(() => (isSavingAnimation.value = false));
      })
      .catch((err) => {
        snackbarStore.showMessage({
          level: Levels.ERROR,
          message: err,
        });
        isSavingAnimation.value = false;
      });
  }
</script>

<style scoped></style>
