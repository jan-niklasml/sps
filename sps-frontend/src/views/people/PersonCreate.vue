<template>
    <v-container>
        <v-card flat>
            <h1 class="text-h5" style="margin-bottom: 1em">Person erstellen</h1>
            <person-form
                v-model="person"
                :is-saving-animation="isSavingAnimation"
                @save="save"
            />
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
  import PersonForm from "@/components/people/PersonForm.vue";
  import { PersonApiService } from "@/api/PersonApiService";
  import { Levels } from "@/api/error";
  import PersonFormData from "@/types/PersonFormData";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router/composables";

  const snackbarStore = useSnackbarStore();
  const router = useRouter();

  const person: PersonFormData = reactive({
    firstname: "",
    lastname: "",
    email: "",
    teamId: "",
  });
  const isSavingAnimation = ref(false);

  async function save() {
    isSavingAnimation.value = true;
    try {
      const createdPerson = await PersonApiService.create({
        id: undefined,
        firstname: person.firstname,
        lastname: person.lastname,
        fullname: person.firstname + " " + person.lastname,
        email: person.email,
      });
      if (person.teamId != "") {
        await PersonApiService.createRelation(
          createdPerson,
          "team",
          "teams",
          person.teamId ? person.teamId : ""
        );
      }
      await router.push({
        name: "person.detail",
        params: {
          id: createdPerson.id ? createdPerson.id : "",
        },
      });
    } catch (err) {
      snackbarStore.showMessage({
        level: Levels.ERROR,
        message: err as string | undefined,
      });
    }
    isSavingAnimation.value = false;
  }
</script>

<style scoped></style>
