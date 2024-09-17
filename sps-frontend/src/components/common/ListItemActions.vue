<template>
    <v-list-item-action>
        <v-menu
            offset-y
            bottom
            origin="center center"
            transition="scale-transition"
        >
            <template #activator="{ on }">
                <v-btn text icon v-on="on" @click.stop>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-if="showOpen" @click.stop="$emit('open')">
                    <v-list-item-title>
                        <v-icon class="mr-2"> mdi-folder-open </v-icon>
                        <span>Öffnen</span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="showEdit" @click.stop="$emit('edit')">
                    <v-list-item-title>
                        <v-icon class="mr-2"> mdi-pencil </v-icon>
                        <span>Bearbeiten</span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="showDelete" @click.stop="$emit('delete')">
                    <v-list-item-title>
                        <v-icon class="mr-2"> mdi-delete </v-icon>
                        <span>Löschen</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-list-item-action>
</template>

<script setup lang="ts">
  import { computed, useListeners } from "vue";

  const listeners = useListeners();

  const showOpen = computed(() => listeners.open != null);
  const showEdit = computed(() => listeners.edit != null);
  const showDelete = computed(() => listeners.delete != null);
</script>

<style scoped></style>
