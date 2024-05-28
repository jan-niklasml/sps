<template>
    <v-container>
        <v-card flat>
            <h1 class="text-h5">Teams</h1>
            <team-list />
        </v-card>

        <v-tooltip top>
            <template #activator="{ on }">
                <v-btn
                    id="create-team"
                    v-security="'BEISPIELPROJEKT_BACKEND_WRITE_TEAM'"
                    bottom
                    right
                    fixed
                    fab
                    dark
                    color="accent"
                    :to="{ name: 'team.create' }"
                    v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Neues Team anlegen</span>
        </v-tooltip>
    </v-container>
</template>

<script setup lang="ts">
  import TeamList from "@/components/teams/TeamList.vue";
</script>

<style scoped></style>
