export class Test {
    #name = "foo";

    get name() {
        return this.#name;
    }

    testPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(1), 100);
        });
    }

    testObjectAssign() {
        return Object.assign({}, {x: 1}, {y: 2});
    }

    testArrayFrom() {
        return Array.from([1, 2, 3], x => x * x);
    }
}