<template>
    <div>
        <v-form ref="form" v-model="formValid" @submit="save">
            <v-row>
                <v-col class="col">
                    <v-text-field
                        v-model="person.firstname"
                        label="Vorname*"
                        :rules="[rules.RULE_REQUIRED]"
                        dense
                        outlined
                    />
                </v-col>
                <v-col class="col">
                    <v-text-field
                        v-model="person.lastname"
                        label="Nachname*"
                        :rules="[rules.RULE_REQUIRED]"
                        dense
                        outlined
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="person.email"
                        label="E-Mail Adresse*"
                        :rules="[rules.RULE_REQUIRED, rules.RULE_MAIL]"
                        dense
                        outlined
                    />
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        v-model="person.teamId"
                        label="Team"
                        dense
                        outlined
                        :disabled="isLoadingTeams"
                        :items="teams"
                        item-text="name"
                        item-value="id"
                        :loading="isLoadingTeams"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p>
                        Alle mit Sternchen* gekennzeichneten Felder sind
                        Pflichtfelder.
                    </p>
                </v-col>
                <v-col class="text-right">
                    <v-btn text exact :to="{ name: 'people' }" class="ml-auto">
                        Abbrechen
                    </v-btn>
                    <v-btn
                        color="primary"
                        :loading="isSavingAnimation"
                        @click="save"
                    >
                        Speichern
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script setup lang="ts">
  import { Levels } from "@/api/error";
  import { useRules } from "@/composables/rules";
  import Team from "@/types/Team";
  import { TeamApiService } from "@/api/TeamApiService";
  import PersonFormData from "@/types/PersonFormData";
  import Vue, { computed, onMounted, ref } from "vue";
  import { useSnackbarStore } from "@/stores/snackbar";

  const props = defineProps<{
    value: PersonFormData;
    isSavingAnimation: boolean;
  }>();
  const emits = defineEmits<{
    (e: "input", v: PersonFormData): void;
    (e: "save"): void;
  }>();
  const rules = useRules();
  const snackbarStore = useSnackbarStore();

  const form = ref<(Vue & { validate: () => void }) | null>(null);

  const isLoadingTeams = ref(false);
  const teams = ref<Team[]>([]);
  const formValid = ref(false);

  onMounted(() => {
    loadTeams();
  });

  function save(): void {
    form.value?.validate();
    if (!formValid.value) {
      snackbarStore.showMessage({
        level: Levels.WARNING,
        message: "Das Formular ist nicht richtig ausgefüllt.",
        show: true,
      });
      return;
    }
    emits("save");
  }

  const person = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
  });

  function loadTeams() {
    isLoadingTeams.value = true;
    TeamApiService.getAllPaged(0)
      .then((pagedTeams) => {
        teams.value = pagedTeams.data;
      })
      .catch((err) => {
        snackbarStore.showMessage(err);
      })
      .finally(() => (isLoadingTeams.value = false));
  }
</script>

<style scoped></style>
