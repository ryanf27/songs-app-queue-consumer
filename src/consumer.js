require("dotenv").config();
const amqp = require("amqplib");
const PlaylistService = require("./PlaylistService");
const MailSender = require("./MailSender");
const Listener = require("./Listener");

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue("export:playlist", {
    durable: true,
  });

  await channel.consume("export:playlist", listener.listen, { noAck: true });

  console.log(`Consumer berjalan pada ${process.env.RABBITMQ_SERVER}`);
};

init();
