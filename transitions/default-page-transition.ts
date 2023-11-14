import type { TransitionProps } from "vue";

const defaultPageTransition: TransitionProps = {
    css: false,
    mode: "out-in",
    onLeave(_el, done) {
        done();
    },
    onEnter(_el, done) {
        useEvent({ id: "pageTransitionEnter", type: "emit" });
        done();
    },
};

export { defaultPageTransition };
