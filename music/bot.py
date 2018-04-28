import discord, traceback, config
from discord.ext import commands

class KonataMusicBot(commands.Bot):
    def __init__(self, *kwargs):
        super().__init__(command_prefix=commands.when_mentioned_or(*config.prefixes))

        for cog in config.cogs:
            try:
                print('[Konata]: Loading {}..'.format(cog))
                self.load_extension(cog)
                print('[Konata]: Loaded {}!'.format(cog))
            except Exception as e:
                print('[Konata]: An error has occured while loading cog {}:'.format(cog))
                print(traceback.format_exc())

    async def on_ready(self):
        print('[Konata]: Konata has logged in!')

    async def on_command_error(self, ctx, e):
        if isinstance(e, commands.errors.MissingRequiredArgument):
            command = ctx.invoked_subcommand or ctx.command
            _help = await ctx.bot.formatter.format_help_for(ctx, command)

            for page in _help:
                await ctx.send(page)

        elif isinstance(e, commands.errors.CommandInvokeError):
            e = e.original
            _traceback = traceback.format_tb(e.__traceback__)
            _traceback = ''.join(_traceback)

            error = (':x: **|** `{0}` has errored with `{1}`:\n```py\n-- KONATA TRACEBACK\n{2}{1}: {3}\n````')\
                .format(type(e).__name__, ctx.command.qualified_name, _traceback, e)

            await ctx.send(error)

        elif isinstance(e, commands.errors.CommandOnCooldown):
            await ctx.send('You can use that command in `{0:.0f}sec`.'.format(e.retry_after))

        else:
            ctx.send("```py\n{0}```".format(e))

    async def on_message(self, msg):
        if msg.author.bot:
            return

        await self.process_commands(msg)

bot = KonataMusicBot()
bot.remove_command('help')
bot.run(config.token)