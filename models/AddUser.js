const admin = 'iraqifaisal';

const AddUser = async (message, db, api) => {
  const text = message.text;
  const chatId = message.chat.id;

  if (text.includes('@inpectorgadget_bot добавь') && message.from.username === admin) {
    let username = text.replace('@inpectorgadget_bot добавь ', '').replace(' ', '');
    const usersCollection = db.collection('users');
    const concidence = await usersCollection.findOne({ username });

    if(!concidence) {
      usersCollection.insertOne({ username }, err => {
        if (err) api.sendMessage({ chat_id: chatId, text: err})
        else api.sendMessage({
          chat_id: chatId,
          text: `Я слежу за тобой ${username}`
        });
      });
    } else {
      api.sendMessage({
        chat_id: chatId,
        text: 'Данный пользователь уже добавлен'
      })
    }
  }
}

module.exports = AddUser;