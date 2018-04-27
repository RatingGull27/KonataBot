module.exports = bot = ({
    createGuild: async(Id) => {
        await bot.r.table('guilds').insert({
            prefix: bot.config.prefix,
            disabledCommands: [],
            modlog: null, // This is a string, will be null since you will need to enabled via (konata!settings set modlog channelid).
            id: Id
        }).run();

        return this.getGuild(Id);
    },
    getGuild: (Id) => {
        return bot.r.table('guilds').get(Id).run();
    },
    deleteGuild: (Id) => {
        return bot.r.table('guilds').get(Id).delete().run();
    },
    addCoins: (Id, coinAmount)  => {
        let coins = this.getCoins(Id);
        coins.coin += coinAmount;

        return bot.r.table('users')
            .insert(coins, { conflict: 'update' })
    },
    getCoins: async (id) => {
        const coins = await Bot.r.table('users').get(id).default({ id, coin: 0 }).run();
  
        return coins
    },
    removeCoins: async(id, amount) => {
        let coins = await this.getCoins(id);
        coins.coin = Math.max(0, coins.coin - amount);
    
        return bot.r.table('users')
            .insert(coins, { conflict: 'update' });
    },
    getUser: (id) => {
        return bot.r.table('users').get(id).run();
    },
    createUser: (id) => {
        return bot.r.table('users').insert({
            id: id,
            coin: 0,
            upvoter: false
        }).run();
    }
});