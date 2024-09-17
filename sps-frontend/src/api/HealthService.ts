import HealthState from "@/types/HealthState";
import FetchUtils from "@/api/FetchUtils";

export default class HealthService {
    private static base: string | undefined = import.meta.env
        .VITE_VUE_APP_API_URL;

    static checkHealth(): Promise<HealthState> {
        return fetch(`${this.base}/actuator/health`, FetchUtils.getGETConfig())
            .then((response) => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            })
            .catch((err) => {
                FetchUtils.defaultResponseHandler(err);
            });
    }
}
