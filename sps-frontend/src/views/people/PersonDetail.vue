<template>
    <v-container>
        <v-card flat>
            <v-progress-linear v-if="person === null" indeterminate />
            <template v-if="person !== null">
                <v-card-title>
                    Personendaten: {{ person.fullname }}
                </v-card-title>
                <v-simple-table>
                    <template #default>
                        <tbody>
                            <tr>
                                <td>Vorname</td>
                                <td>{{ person.firstname }}</td>
                            </tr>
                            <tr>
                                <td>Nachname</td>
                                <td>{{ person.lastname }}</td>
                            </tr>
                            <tr>
                                <td>E-Mail-Adresse</td>
                                <td>{{ person.email }}</td>
                            </tr>
                            <tr>
                                <td>Team</td>
                                <td>
                                    {{
                                        person.team
                                            ? person.team.name
                                            : "Kein Team vorhanden"
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-tooltip top>
                    <template #activator="{ on }">
                        <v-btn
                            id="edit-person"
                            v-security="`BEISPIELPROJEKT_BACKEND_WRITE_PERSON`"
                            bottom
                            right
                            fixed
                            fab
                            dark
                            color="accent"
                            :to="{ path: `/people/${person.id}/edit` }"
                            v-on="on"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ person.fullname }} bearbeiten</span>
                </v-tooltip>
            </template>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
  import Person from "@/types/Person";
  import { PersonApiService } from "@/api/PersonApiService";
  import { Levels } from "@/api/error";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router/composables";

  const route = useRoute();
  const router = useRouter();
  const snackbarStore = useSnackbarStore();

  const person = ref<Person | null>(null);

  onMounted(() => {
    load();
  });

  function load(): void {
    PersonApiService.get(route.params.id, ["team"])
      .then((p) => {
        person.value = p;
      })
      .catch((error) => {
        snackbarStore.showMessage({
          level: Levels.ERROR,
          message: error,
        });
        router.back();
      });
  }
</script>

<style scoped></style>
