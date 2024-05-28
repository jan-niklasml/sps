import Team from "@/types/Team";

interface Person {
    id: string | undefined;
    lastname: string;
    firstname: string;
    fullname: string;
    email: string;
    team?: Team;
}

export default Person;
