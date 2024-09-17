import FetchUtils from "./FetchUtils";
import User from "@/types/User";

export default class UserService {
    //TODO wenn aufs neue API-Gateway umgestellt wird, hier auch den Endpoint umstellen
    private static base: string | undefined =
        import.meta.env.VITE_VUE_APP_API_URL + "/api/sso/userinfo/";
    //private static base: string | undefined =
    //  import.meta.env.VITE_VUE_APP_API_URL + "/api/permissionprovider/permissions";

    //Verschiedene Konstellationen für lokale Tests - liegen unter /public
    //private static base: string | undefined =  "http://localhost:8081/userinfo-partly-authorized.json";
    //private static base: string | undefined =  "http://localhost:8081/userinfo-unauthorized.json";
    //private static base: string | undefined =  "http://localhost:8081/userinfo.json";

    /**
     * Holt die Userdaten von der URL base.
     */
    static getUser(): Promise<User> {
        return fetch(`${this.base}`, FetchUtils.getGETConfig())
            .catch(FetchUtils.defaultCatchHandler)
            .then((response) => {
                FetchUtils.defaultResponseHandler(
                    response,
                    `Beim laden des Users ist ein Fehler aufgetreten.`
                );
                return new Promise((resolve) => resolve(response.json()));
            });
    }
}
