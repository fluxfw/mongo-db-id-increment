import { ReturnDocument } from "mongodb";

/** @typedef {import("mongodb").Collection} Collection */

export class NextCommand {
    /**
     * @type {Collection}
     */
    #collection;

    /**
     * @param {Collection} collection
     * @returns {NextCommand}
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
     * @returns {Promise<number>}
     */
    async next(service) {
        return (await this.#collection.findOneAndUpdate({
            service
        }, {
            $inc: {
                last_id: 1
            }
        }, {
            returnDocument: ReturnDocument.AFTER,
            upsert: true
        })).value.last_id;
    }
}
