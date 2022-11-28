/** @typedef {import("mongodb").Collection} Collection */

export class ClearCommand {
    /**
     * @type {Collection}
     */
    #collection;

    /**
     * @param {Collection} collection
     * @returns {ClearCommand}
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
        await this.#collection.deleteMany({
            service
        });
    }
}
