<template>
    <v-dialog v-model="visible" persistent max-width="290">
        <v-card>
            <v-card-title class="text-h5"> Löschen? </v-card-title>
            <v-card-text v-if="props.descriptorString">
                Soll
                <span class="font-weight-bold">{{ descriptorString }}</span>
                wirklich gelöscht werden?
            </v-card-text>
            <v-card-text v-else>
                Soll der Datensatz wirklich gelöscht werden?
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text @click="cancel"> Abbrechen </v-btn>
                <v-btn
                    color="error"
                    text
                    :loading="props.isLoadingAnimation"
                    @click="deleteItem"
                >
                    Löschen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  export interface Props {
    /**
     * Gibt an ob der Dialog gezeigt werden soll.
     */
    value?: boolean;
    isLoadingAnimation?: boolean;
    descriptorString?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    isLoadingAnimation: false,
  });

  const emits = defineEmits<{
    (e: "input", v: boolean): void;
    (e: "delete"): void;
  }>();

  const visible = computed({
    get: () => props.value,
    set: (v) => emits("input", v ?? false),
  });

  function cancel() {
    visible.value = false;
  }

  function deleteItem() {
    emits("delete");
  }
</script>

<style scoped></style>
