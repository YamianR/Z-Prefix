class Item {
    constructor(knex) {
        this.knex = knex;
    }

    async create(userId, itemName, description, quantity) {
        return await this.knex('item').insert({ user_id: userId, item_name: itemName, description, quantity });
    }

    async getAll() {
        return await this.knex('item').select('*');
    }

    async getById(itemId) {
        return await this.knex('item').where('id', itemId).first();
    }

    async getByUserId(userId) {
        return await this.knex('item').where('user_id', userId);
    }

    async update(itemId, itemName, description, quantity) {
        return await this.knex('item').where('id', itemId).update({ item_name: itemName, description, quantity });
    }

    async delete(itemId) {
        return await this.knex('item').where('id', itemId).del();
    }

    async getByUserId(userId) {
        return await this.knex('item').where('user_id', userId);
    }
}

module.exports = Item;
