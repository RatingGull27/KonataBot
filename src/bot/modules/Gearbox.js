class Gearbox {
    constructor(bot) {
        this.bot = bot;
    }

    report(err) {
        this.bot.createMessage({
            title: "Konata Izumi ;; Gearbox Report",
            description: "<@280158289667555328>: We have a problem here!\n" + this.bot.utils.codeblock(null, err.stack),
            color: this.bot.utils.color
        });
    }
}

module.exports = Gearbox;