import Vue, { watch } from "vue";
import Router from "vue-router";
import { Levels } from "@/api/error";
import User from "@/types/User";
import { useSnackbarStore } from "@/stores/snackbar";
import { useUserStore } from "@/stores/user";

Vue.use(Router);

/*
 * Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 * */
/* eslint-disable @typescript-eslint/no-explicit-any */
const routerMethods = ["push", "replace"];
routerMethods.forEach((method: string) => {
    const originalCall = (Router.prototype as any)[method];
    (Router.prototype as any)[method] = function (
        location: any,
        onResolve: any,
        onReject: any
    ): Promise<any> {
        if (onResolve || onReject) {
            return originalCall.call(this, location, onResolve, onReject);
        }
        return originalCall.call(this, location).catch((err: any) => err);
    };
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const router = new Router({
    base: import.meta.env.VITE_BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/MainView.vue"),
            meta: {},
        },
        {
            path: "/people",
            name: "person.index",
            component: () => import("@/views/people/PersonIndex.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_READ_PERSON" },
        },
        {
            path: "/people/:id/edit",
            name: "person.edit",
            component: () => import("@/views/people/PersonEdit.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_WRITE_PERSON" },
        },
        {
            path: "/people/create",
            name: "person.create",
            component: () => import("@/views/people/PersonCreate.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_WRITE_PERSON" },
        },
        {
            path: "/people/:id",
            name: "person.detail",
            component: () => import("@/views/people/PersonDetail.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_READ_PERSON" },
        },
        {
            path: "/teams",
            name: "team.index",
            component: () => import("@/views/teams/TeamIndex.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_READ_TEAM" },
        },
        {
            path: "/teams/create",
            name: "team.create",
            component: () => import("@/views/teams/TeamCreate.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_WRITE_TEAM" },
        },
        {
            path: "/teams/:id",
            name: "team.detail",
            component: () => import("@/views/teams/TeamDetail.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_READ_TEAM" },
        },
        {
            path: "/teams/:id/edit",
            name: "team.edit",
            component: () => import("@/views/teams/TeamEdit.vue"),
            meta: { authority: "BEISPIELPROJEKT_BACKEND_WRITE_TEAM" },
        },
        {
            path: "/getstarted",
            name: "getstarted",
            component: () => import("./views/GetStarted.vue"),
        },
        { path: "*", redirect: "/" }, //Fallback 2
    ],
});

/**
 * Navigation Guard, prüft vor jeder Navigation ob diese zu den Berechtigungen des Users passt.
 */
router.beforeEach((to, _from, next) => {
    const snackbarStore = useSnackbarStore();
    const userStore = useUserStore();
    const checkPermissionAndRoute = (userState: User | null) => {
        if (to.name === "home") {
            //home ist immer erlaubt
            next();
        } else if (
            to.matched.some((record) => !record.meta || !record.meta.authority)
        ) {
            //kein meta-Element oder kein Authority-Element im meta-Element --> erlaubt
            next();
        } else if (!userState || !userState.authorities) {
            //user (noch) nicht geladen --> erstmal nach home
            snackbarStore.showMessage({
                level: Levels.WARNING,
                message: "Kein User-Objekt. Navigiere zu Startseite.",
            });
            next({ name: "home" });
        } else if (
            to.matched.some((record) =>
                userState.authorities.includes(record.meta.authority)
            )
        ) {
            //user hat benötigte Authority --> wie gewünscht navigieren
            next();
        } else {
            //an sonsten (keine Authority) immer nach home
            snackbarStore.showMessage({
                level: Levels.WARNING,
                message:
                    "Keine ausreichende Berechtigung. Navigiere zu Startseite.",
            });
            next({ name: "home" });
        }
    };

    const user: User | null = userStore.getUser;
    if (!user || !user.authorities) {
        watch(
            () => userStore.user,
            () => {
                checkPermissionAndRoute(userStore.getUser);
            }
        );
    } else {
        checkPermissionAndRoute(user);
    }
});

export default router;
