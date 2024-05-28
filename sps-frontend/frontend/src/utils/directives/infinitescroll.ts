import Vue from "vue";

const scrollListener = (binding: any) => {
    const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

    if (bottomOfWindow) {
        binding.value();
    }
};

Vue.directive("infinite-scroll", {
    bind: function (el, binding) {
        if (binding.value instanceof Function) {
            window.addEventListener("scroll", function () {
                scrollListener(binding);
            });
        }
    },
    unbind: function () {
        window.removeEventListener("scroll", scrollListener);
    },
});
