/** @typedef {import("mongodb").Collection} Collection */
/** @typedef {import("../../Service/IdIncrement/Port/IdIncrementService.mjs").IdIncrementService} IdIncrementService */

export class IdIncrementApi {
    /**
     * @type {Collection}
     */
    #collection;
    /**
     * @type {IdIncrementService | null}
     */
    #id_increment_service = null;

    /**
     * @param {Collection} collection
     * @returns {IdIncrementApi}
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
        await (await this.#getIdIncrementService()).clear(
            service
        );
    }

    /**
     * @param {string} service
     * @returns {Promise<number>}
     */
    async next(service) {
        return (await this.#getIdIncrementService()).next(
            service
        );
    }

    /**
     * @returns {Promise<IdIncrementService>}
     */
    async #getIdIncrementService() {
        this.#id_increment_service ??= (await import("../../Service/IdIncrement/Port/IdIncrementService.mjs")).IdIncrementService.new(
            this.#collection
        );

        return this.#id_increment_service;
    }
}
