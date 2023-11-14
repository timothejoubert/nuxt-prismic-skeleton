// import mitt from "mitt";
//
// const emitter = mitt();
//
// // Vue Options API (legacy)
// // @see https://v3-migration.vuejs.org/breaking-changes/events-api.html#event-bus
// export default {
//   $on: (type: string, handler: (...args: unknown[]) => void) =>
//     emitter.on(type, handler),
//   // $once: (type: string, handler: (...args: any) => void) => {
//   //     const callback = (...args) => {
//   //         emitter.off(type, callback)
//   //         handler(...args)
//   //     }
//   //
//   //     emitter.on(type, callback)
//   // },
//   $off: (type: string, handler: (...args: unknown[]) => void) =>
//     emitter.off(type, handler),
//   $emit: (type: string) => emitter.emit(type),
// };
