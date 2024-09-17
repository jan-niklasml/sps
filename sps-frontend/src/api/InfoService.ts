import FetchUtils from "@/api/FetchUtils";

export default class InfoService {
    private static base: string | undefined = import.meta.env
        .VITE_VUE_APP_API_URL;

    static getInfo(): Promise<any> {
        return fetch(`${this.base}/actuator/info`, FetchUtils.getGETConfig())
            .then((response) => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            })
            .catch((err) => {
                FetchUtils.defaultResponseHandler(err);
            });
    }
}
