const groupId = '-306691525';

const CheckStandups = async (db, api) => {
  const collections = await db.collection('users').find().toArray();

  const notAnswered = collections.filter(item => {
    if(!item.completeToday) return true
  })

  const message = notAnswered.map(item => {
    return `${item.username} пропустил стендап\n`
  })

  api.sendMessage({ chat_id: groupId, text: message.join('') }, (err, res) => {
    if(!err) {
      db.collection('users').updateMany({}, {$set: {completeToday: false}})
    }
  })
}

module.exports = CheckStandups;