import EntityApiService from "@/api/EntityApiService";
import Person from "@/types/Person";

export const PersonApiService = new EntityApiService<Person>(
    "person",
    "people"
);
