import Person from "@/types/Person";

interface Team {
    id: string | undefined;
    name: string;
    identifierString: string;
    teamleader?: Person;
    members?: {
        people: Person[];
    };
}

export default Team;
