const admin = 'iraqifaisal';

const AcceptStandups = async (message, db, api) => {
  const text = message.text;
  const chat_id = message.chat.id;

  if (text.includes('@inpectorgadget_bot') && !text.includes('добавь')) {
    const newText = text.replace('@inpectorgadget_bot', '')
    const username = '@' + message.from.username;

    if(newText.length < 50) {
      api.sendMessage({
        chat_id,
        text: 'Мне кажется 🤔 или стендап слишком короткий'
      })

    } else {

      const usersCollection = db.collection('users');

      usersCollection.findOneAndUpdate({username}, { $set: { completeToday: true }}, {upsert: true}, (err, res) => {
        if(err) {
          api.sendMessage({
            chat_id,
            text: 'Произошла ошибка'
          })
        } else {
          api.sendMessage({
            chat_id,
            text: 'Спасибо стендап принят'
          })
        }
      })

    }
  }
}

module.exports = AcceptStandups; 