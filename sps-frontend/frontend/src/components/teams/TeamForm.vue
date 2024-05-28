<template>
    <div>
        <v-form ref="form" v-model="formValid" @submit="save">
            <v-row>
                <v-col class="col">
                    <v-text-field
                        v-model="team.name"
                        label="Teambezeichnung*"
                        :rules="[rules.RULE_REQUIRED]"
                        dense
                        outlined
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="col">
                    <v-text-field
                        v-model="team.identifierString"
                        label="Teamkürzel*"
                        :rules="[rules.RULE_REQUIRED]"
                        dense
                        outlined
                    />
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        v-model="team.teamleaderId"
                        label="Teamleiter*"
                        dense
                        outlined
                        :disabled="isLoadingPeople"
                        :items="people"
                        item-text="fullname"
                        item-value="id"
                        :loading="isLoadingPeople"
                        :rules="[rules.RULE_REQUIRED]"
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
                    <v-btn
                        text
                        exact
                        :to="{ name: 'team.index' }"
                        class="ml-auto"
                    >
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
  import Person from "@/types/Person";
  import { PersonApiService } from "@/api/PersonApiService";
  import TeamFormData from "@/types/TeamFormData";
  import { useRules } from "@/composables/rules";
  import { Levels } from "@/api/error";
  import { useSnackbarStore } from "@/stores/snackbar";
  import Vue, { computed, onMounted, ref } from "vue";

  const props = defineProps<{
    value: TeamFormData;
    isSavingAnimation: boolean;
  }>();
  const emits = defineEmits<{
    (e: "input", v: TeamFormData): void;
    (e: "submit"): void;
  }>();
  const snackbarStore = useSnackbarStore();
  const rules = useRules();

  const people = ref<Person[]>([]);
  const isLoadingPeople = ref(true);
  const formValid = ref(false);
  const form = ref<(Vue & { validate: () => void }) | null>(null);

  onMounted(() => {
    loadPeople();
  });

  function loadPeople() {
    PersonApiService.getAllPaged(0, 1000)
      .then((page) => {
        people.value = page.data;
      })
      .catch((err) => snackbarStore.showMessage(err))
      .finally(() => {
        isLoadingPeople.value = false;
      });
  }

  function save() {
    form.value?.validate();
    if (!formValid.value) {
      snackbarStore.showMessage({
        level: Levels.WARNING,
        message: "Formular nicht korrekt ausgefüllt.",
        show: true,
      });
      return;
    }
    emits("submit");
  }

  const team = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
  });
</script>

<style scoped></style>
