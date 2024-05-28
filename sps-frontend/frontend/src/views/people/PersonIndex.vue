<template>
    <v-container>
        <v-card flat>
            <v-card-title>Personen</v-card-title>
            <person-list />
        </v-card>

        <v-tooltip top>
            <template #activator="{ on }">
                <v-btn
                    id="create-person"
                    v-security="`BEISPIELPROJEKT_BACKEND_WRITE_PERSON`"
                    bottom
                    right
                    fixed
                    fab
                    dark
                    color="accent"
                    :to="{ path: '/people/create' }"
                    v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Neue Person anlegen</span>
        </v-tooltip>
    </v-container>
</template>

<script setup lang="ts">
  import PersonList from "@/components/people/PersonList.vue";
</script>

<style scoped></style>
