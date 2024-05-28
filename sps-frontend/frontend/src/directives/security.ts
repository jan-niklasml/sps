import Vue from "vue";
import { useUserStore } from "@/stores/user";

Vue.directive("security", {
    inserted: function (el, binding) {
        const userStore = useUserStore();
        //binding.value ist die geforderte Rolle

        const user = userStore.getUser;
        if (
            (user && user.authorities.includes(binding.value)) ||
            import.meta.env.VITE_VUE_APP_NO_SECURITY === "true"
        ) {
            // Explizit nichts machen, da Rechte vorhanden
        } else {
            // Default Case, wenn User / Rechte nicht vorhanden
            // Wenn der User nicht die geforderte Rolle besitzt, dann wird das Element nicht angezeigt.
            el.style.display = "none";
        }
    },
});
