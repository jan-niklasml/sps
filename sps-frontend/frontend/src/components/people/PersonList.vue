<template>
    <v-list
        id="infinite-scroll"
        v-infinite-scroll="loadMore"
        two-line
        infinite-scroll-disabled="busy"
    >
        <template v-for="(person, index) in people">
            <person-list-item
                :key="`person-${person.id}`"
                :person="person"
                @deleted="itemDeleted"
            />
            <v-divider :key="`divider-${index}`" class="divider" />
        </template>
        <v-list-item v-if="allPagesLoaded">
            <v-list-item-content class="text--secondary d-flex justify-center">
                {{ totalElements }} Einträge insgesamt
            </v-list-item-content>
        </v-list-item>
        <template v-if="!busy && (people === undefined || people.length < 1)">
            <v-subheader>Keine Personen vorhanden</v-subheader>
        </template>
        <template v-if="busy">
            <v-progress-linear indeterminate color="accent" />
        </template>
    </v-list>
</template>

<script setup lang="ts">
  import PersonListItem from "@/components/people/PersonListItem.vue";
  import Person from "@/types/Person";
  import { PersonApiService } from "@/api/PersonApiService";
  import { useSnackbarStore } from "@/stores/snackbar";
  import { computed, onMounted, ref } from "vue";

  const snackbarStore = useSnackbarStore();

  const people = ref<Person[]>([]);

  const busy = ref(false);

  const currentPage = ref(-1);

  const totalPages = ref(Number.MAX_VALUE);

  const totalElements = ref<number | null>(null);

  onMounted(() => {
    loadMore();
  });

  function loadMore(): void {
    busy.value = true;
    PersonApiService.getAllPaged(currentPage.value + 1, 20, "personListItem")
      .then((pagedPeople) => {
        people.value.push(...pagedPeople.data);
        currentPage.value = pagedPeople.page;
        totalPages.value = pagedPeople.totalPages;
        totalElements.value = pagedPeople.totalElements;
      })
      .catch((err) => {
        snackbarStore.showMessage(err);
      })
      .finally(() => {
        busy.value = false;
      });
  }

  function itemDeleted(person: Person): void {
    people.value = people.value.filter((p) => p.id != person.id);
  }

  const allPagesLoaded = computed(() => {
    return currentPage.value >= totalPages.value - 1;
  });
</script>

<style scoped></style>
