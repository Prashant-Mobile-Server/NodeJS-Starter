export class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    addListener(eventName, fn) {
        this.on(eventName, fn);
    }

    on(eventName, fn) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(fn);
    }

    removeListener(eventName, fn) {
        this.off(eventName, fn);
    }

    off(eventName, fn) {
        if (!this.listeners[eventName]) return;

        const index = this.listeners[eventName].indexOf(fn);
        if (index !== -1) {
            this.listeners[eventName].splice(index, 1);
        }
    }

    once(eventName, fn) {
        const oncefn = (...args) => {
            fn(...args);
            this.off(eventName, oncefn);
        };
        this.on(eventName, oncefn);
    }

    emit(eventName, ...args) {
        if (!this.listeners[eventName]) return;
        this.listeners[eventName].forEach((listener) => listener(...args));
    }

    listenerCount(eventName) {
        return this.listeners[eventName] ? this.listeners[eventName].length : 0;
    }

    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
}