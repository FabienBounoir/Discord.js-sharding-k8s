const dotenv = require('dotenv');
dotenv.config();

// Include discord.js ShardingManger
const { ShardingManager } = require('discord.js');
// const { setSlashCommand } = require('./src/utils/setSlashCommand')

// Create your ShardingManger instance
const manager = new ShardingManager('./bot.js', {
    totalShards: 4 || 'auto',
    token: process.env.TOKEN
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => {
    console.log(`\n\n\n------------------ Shard ${shard.id} launched ---------------------\n`);

    shard.on('ready', () => {
        console.log(`🔌 Shard ${shard.id} connected to Discord`);
        shard.send({ type: 'shardId', data: { shardId: shard.id } });
    });

    shard.on('disconnect', () => {
        console.log(`⚠️ Shard ${shard.id} disconnected from Discord`);
    });

    shard.on('message', (message) => {
        console.log(`💬 Shard ${shard.id} received message`);
        console.log(message);
    });

    shard.on('error', (error) => {
        console.log(`🧯 Error on shard ${shard.id}`);
        console.log(error);
    });

    shard.on('reconnecting', () => {
        console.log(`🔌 Shard ${shard.id} reconnecting to Discord`);
    });

    shard.on('resume', (replayed) => {
        console.log(`📲 Shard ${shard.id} resumed connection to Discord`);
        console.log(`🔄 Replayed ${replayed} events`);
    });
});

// Spawn your shards
manager.spawn();

//catch all exception not catch
process.on('unhandledRejection', error => { console.error('⚠️ Unhandled promise rejection:', error) });
process.on('uncaughtException', error => { console.error('⚠️ Uncaught exception:', error) });