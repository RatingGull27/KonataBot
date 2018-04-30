const Command = require('../../structures/BaseCommand');

class FeedCommand extends Commmand {
    constructor(bot) {
        super(bot, {
            name: 'feed',
            desc: 'Feed someone!',
            usage: 'feed [@mention]'
        });
    }
}