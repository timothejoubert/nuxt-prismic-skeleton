type UseEventId = "pageTransitionEnter";

interface useEventOptions {
    id: UseEventId;
    type: "emit" | "on" | "off";
    args?: Record<string, unknown>;
    callback?: (args: useEventOptions["args"]) => void;
}

type StoredEvent = Partial<
    Record<useEventOptions["id"], useEventOptions["callback"]>
>;

export function useEvent(options: useEventOptions) {
    const storedCallback = reactive<StoredEvent>({});
    const id = options.id;
    const initCallback = options.callback && !storedCallback[id];

    if (initCallback) {
        Object.assign(storedCallback, { [id]: options.callback });
    }

    if (options.type === "on" && storedCallback[id])
        storedCallback[id](options.args);
    else if (options.type === "off" && storedCallback[id])
        delete storedCallback[id];

    return {};
}
