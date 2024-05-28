<template>
    <v-container>
        <v-card flat>
            <v-progress-linear v-if="team === null" indeterminate />
            <template v-if="team !== null">
                <h1>Teamdaten: {{ team.identifierString }}</h1>
                <v-simple-table>
                    <template #default>
                        <tbody>
                            <tr>
                                <td>Volle Bezeichnung</td>
                                <td>{{ team.name }}</td>
                            </tr>
                            <tr>
                                <td>Kurzbezeichnung</td>
                                <td>{{ team.identifierString }}</td>
                            </tr>
                            <tr>
                                <td>Teamleiter</td>
                                <td v-if="team.teamleader">
                                    <router-link
                                        :to="{
                                            name: 'person.detail',
                                            params: {
                                                id: team.teamleader.id || '',
                                            },
                                        }"
                                    >
                                        {{ team.teamleader.firstname }}
                                        {{ team.teamleader.lastname }}
                                    </router-link>
                                </td>
                                <td v-else>(kein Teamleiter vorhanden)</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <h2>Teammitglieder</h2>
                <template v-for="(member, index) in team.members?.people">
                    <person-list-item
                        v-if="team.members != undefined"
                        :key="`member-${member.id}`"
                        :person="member"
                    />
                    <v-divider
                        :key="`member-divider-${index}`"
                        class="divider"
                    />
                </template>
                <v-tooltip top>
                    <template #activator="{ on }">
                        <v-btn
                            id="edit-person"
                            v-security="'BEISPIELPROJEKT_BACKEND_WRITE_TEAM'"
                            bottom
                            right
                            fixed
                            fab
                            dark
                            color="accent"
                            :to="{ name: 'team.edit', params: { id: team.id } }"
                            v-on="on"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ team.identifierString }} bearbeiten</span>
                </v-tooltip>
            </template>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
  import Team from "@/types/Team";
  import { TeamApiService } from "@/api/TeamApiService";
  import PersonListItem from "@/components/people/PersonListItem.vue";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router/composables";

  const route = useRoute();
  const router = useRouter();
  const snackbarStore = useSnackbarStore();

  const team = ref<Team | null>(null);

  onMounted(() => {
    load();
  });
  function load(): void {
    const id = route.params.id;
    TeamApiService.get(id, ["teamleader", "members"])
      .then((t) => {
        team.value = t;
      })
      .catch((err) => {
        snackbarStore.showMessage(err);
        router.back();
      });
  }
</script>

<style scoped>
h1,
h2 {
    margin-top: 2em;
    margin-bottom: 1em;
}
</style>
