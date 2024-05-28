import EntityApiService from "@/api/EntityApiService";
import Team from "@/types/Team";

export const TeamApiService = new EntityApiService<Team>("team", "teams");
