import FetchUtils from "./FetchUtils";
import { ApiError, Levels } from "./error";

const BASE_URL = `${
    import.meta.env.VITE_VUE_APP_API_URL
}/api/beispielprojekt-backend-service`;

const enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

const ALL_HTTP_METHODS = [
    HttpMethod.GET,
    HttpMethod.POST,
    HttpMethod.PUT,
    HttpMethod.PATCH,
    HttpMethod.DELETE,
];

type ErrorMessageDefinition = {
    methods: HttpMethod[];
    statusCode: number;
    message: string;
};

const ERROR_MESSAGES: ErrorMessageDefinition[] = [
    {
        methods: ALL_HTTP_METHODS,
        statusCode: 404,
        message: "Dieser Datensatz wurde nicht gefunden.",
    },
    {
        methods: [HttpMethod.DELETE],
        statusCode: 409,
        message:
            "Dieser Datensatz kann nicht gelöscht werden, da er von anderen Teilen des Programms noch benötigt wird.",
    },
];

const DEFAULT_ERROR_MESSAGE =
    "Ein unbekannter Fehler ist aufgetreten, bitte den Administrator informieren.";

type Id = string | undefined;

interface PagedEntity<T> {
    data: T[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

interface Idable {
    id: Id;
}

/**
 *
 */
export default class EntityApiService<T extends Idable> {
    private readonly entitySingular: string;
    private readonly entityPlural: string;
    private readonly entityBaseUrl: string;

    constructor(entitySingular: string, entityPlural: string) {
        this.entitySingular = entitySingular;
        this.entityPlural = entityPlural;
        this.entityBaseUrl = `${BASE_URL}/${entityPlural}`;
    }

    /**
     * Get Request für ein Item mit gegebener Id
     * @param id
     * @param loadRelations Namen der Relationen der Enität, welche ebenfalls geladen werden sollen.
     */
    public get(id: Id, loadRelations: string[] = []): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(`${this.entityBaseUrl}/${id}`, FetchUtils.getGETConfig())
                .then((res) => {
                    if (res.status != 200) {
                        EntityApiService.handleWrongResponse(
                            HttpMethod.GET,
                            res
                        );
                        reject();
                    }
                    res.json()
                        .then((entity) => {
                            const relationPromises = loadRelations.map(
                                (relationName) =>
                                    new Promise<void>(
                                        (resolveRelation, rejectRelation) => {
                                            fetch(
                                                EntityApiService.removeProjectionsFromUrl(
                                                    entity["_links"][
                                                        relationName
                                                    ]["href"]
                                                ),
                                                FetchUtils.getGETConfig()
                                            ).then((res) => {
                                                if (res.ok) {
                                                    res.json()
                                                        .then(
                                                            (relationData) => {
                                                                if (
                                                                    "_embedded" in
                                                                    relationData
                                                                ) {
                                                                    const entityType =
                                                                        Object.keys(
                                                                            relationData[
                                                                                "_embedded"
                                                                            ]
                                                                        )[0];
                                                                    relationData =
                                                                        relationData[
                                                                            "_embedded"
                                                                        ][
                                                                            entityType
                                                                        ];
                                                                }
                                                                entity[
                                                                    relationName
                                                                ] =
                                                                    relationData;
                                                                resolveRelation();
                                                            }
                                                        )
                                                        .catch((err) =>
                                                            rejectRelation(
                                                                EntityApiService.handleError(
                                                                    err
                                                                )
                                                            )
                                                        );
                                                } else if (res.status == 404) {
                                                    entity[relationName] = null;
                                                    resolveRelation();
                                                } else {
                                                    EntityApiService.handleWrongResponse(
                                                        HttpMethod.GET,
                                                        res
                                                    );
                                                    rejectRelation();
                                                }
                                            });
                                        }
                                    )
                            );
                            Promise.all(relationPromises)
                                .then(() => {
                                    resolve(entity);
                                })
                                .catch((err) =>
                                    reject(EntityApiService.handleError(err))
                                );
                        })
                        .catch((err) =>
                            reject(EntityApiService.handleError(err))
                        );
                })
                .catch((err) => reject(EntityApiService.handleError(err)));
        });
    }

    /**
     * Get Request für alle Items. Paginiert, deswegen Seite mit angeben.
     * @param pageIndex Bei 0 beginnend.
     * @param pageSize
     * @param projection
     */
    public getAllPaged(
        pageIndex: number,
        pageSize = 20,
        projection: string | null = null
    ): Promise<PagedEntity<T>> {
        return new Promise<PagedEntity<T>>((resolve, reject) => {
            let url = `${this.entityBaseUrl}?page=${pageIndex}&size=${pageSize}`;
            if (projection !== null) url = `${url}&projection=${projection}`;
            fetch(url, FetchUtils.getGETConfig())
                .then((res) => {
                    if (res.status != 200) {
                        EntityApiService.handleWrongResponse(
                            HttpMethod.GET,
                            res
                        );
                        return reject();
                    }
                    res.json()
                        .then((json) => {
                            const data: T[] =
                                json["_embedded"][this.entityPlural];
                            resolve({
                                data: data,
                                page: json["page"]["number"],
                                pageSize: json["page"]["size"],
                                totalElements: json["page"]["totalElements"],
                                totalPages: json["page"]["totalPages"],
                            });
                        })
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(EntityApiService.handleError(err)));
        });
    }

    /**
     * Löscht das Item mit der gegebenen Id.
     * @param id
     * @returns Promise<void>
     */
    public delete(id: Id): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch(`${this.entityBaseUrl}/${id}`, FetchUtils.getDELETEConfig())
                .then((res) => {
                    if (res.ok) return resolve();
                    EntityApiService.handleWrongResponse(
                        HttpMethod.DELETE,
                        res
                    );
                })
                .catch((err) => reject(EntityApiService.handleError(err)));
        });
    }

    /**
     * Erzeugt eine Instanz des Models im Backend und gibt diese als Objekt in einem Promise zurück.
     * @param instance
     * @returns Promise
     */
    public create(instance: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(`${this.entityBaseUrl}`, FetchUtils.getPOSTConfig(instance))
                .then((res) => {
                    res.json()
                        .then((createdInstance) => {
                            if (res.ok) return resolve(createdInstance);
                            EntityApiService.handleWrongResponse(
                                HttpMethod.POST,
                                res
                            );
                            reject();
                        })
                        .catch((reason) =>
                            reject(EntityApiService.handleError(reason))
                        );
                })
                .catch((reason) =>
                    reject(EntityApiService.handleError(reason))
                );
        });
    }

    /**
     *
     * @param entity
     * @param relation
     * @param foreignEntityName Name der Entität zu welcher eine relation abgebildet werden soll.
     * @param foreignEntityId
     */
    public createRelation(
        entity: T,
        relation: string,
        foreignEntityName: string,
        foreignEntityId: string
    ): Promise<void> {
        const config = FetchUtils.getPUTConfig("");
        (config.headers as Headers).set("Content-Type", "text/uri-list");
        config.body = `${BASE_URL}/${foreignEntityName}/${foreignEntityId}`;
        return new Promise<void>((resolve, reject) => {
            fetch(
                `${this.entityBaseUrl}/${entity.id}/${relation}`,
                config
            ).then((res) => {
                if (res.ok) return resolve();
                EntityApiService.handleWrongResponse(HttpMethod.PUT, res);
                reject();
            });
        });
    }

    /**
     * Aktualisiert die Daten einer Instanz eines Models im Backend, hierbei werden alle Daten mit den Daten aus dem
     * übergebenem Objekt überschrieben.
     *
     * @param instance Instanz des Models mit den aktuellen Daten
     * @returns instanz des Models mit dem aktuellem Stand vom Server
     */
    public update(instance: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(
                `${this.entityBaseUrl}/${instance.id?.toString()}`,
                FetchUtils.getPUTConfig(instance)
            )
                .then((res) => {
                    res.json()
                        .then((newInstance) => {
                            if (res.ok) return resolve(newInstance);
                            EntityApiService.handleWrongResponse(
                                HttpMethod.PUT,
                                res
                            );
                            reject();
                        })
                        .catch((reason) =>
                            reject(EntityApiService.handleError(reason))
                        );
                })
                .catch((reason) =>
                    reject(EntityApiService.handleError(reason))
                );
        });
    }

    /**
     * Handled nicht erfolgreiche Status-Codes und wandelt diese in nicht-technische Meldungen für den Benutzer um.
     *
     * @param httpMethod
     * @param res
     */
    private static handleWrongResponse(
        httpMethod: HttpMethod,
        res: Response
    ): void {
        for (const errorMessage of ERROR_MESSAGES) {
            if (
                errorMessage.methods.includes(httpMethod) &&
                res.status == errorMessage.statusCode
            )
                throw new ApiError({
                    level: Levels.ERROR,
                    message: errorMessage.message,
                });
        }
        throw new ApiError({
            level: Levels.ERROR,
            message: `${DEFAULT_ERROR_MESSAGE} - HTTP Status Code: ${res.status}`,
        });
    }

    private static handleError(err: any): Error {
        if (err.level !== undefined)
            // check for already existing ApiError
            return err;
        return new ApiError({
            message: DEFAULT_ERROR_MESSAGE,
        });
    }

    private static removeProjectionsFromUrl(url: string): string {
        const regex = /{?[^{}]+}/gm;
        while (url.indexOf("{?") >= 0) {
            url = url.replace(regex, "");
        }
        return url;
    }
}
