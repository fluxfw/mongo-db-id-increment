/** @typedef {import("mongodb").Collection} Collection */

export class IdIncrementService {
    /**
     * @type {Collection}
     */
    #collection;

    /**
     * @param {Collection} collection
     * @returns {IdIncrementService}
     */
    static new(collection) {
        return new this(
            collection
        );
    }

    /**
     * @param {Collection} collection
     * @private
     */
    constructor(collection) {
        this.#collection = collection;
    }

    /**
     * @param {string} service
     * @returns {Promise<void>}
     */
    async clear(service) {
        await (await import("../Command/ClearCommand.mjs")).ClearCommand.new(
            this.#collection
        )
            .clear(
                service
            );
    }

    /**
     * @param {string} service
     * @returns {Promise<number>}
     */
    async next(service) {
        return (await import("../Command/NextCommand.mjs")).NextCommand.new(
            this.#collection
        )
            .next(
                service
            );
    }
}
