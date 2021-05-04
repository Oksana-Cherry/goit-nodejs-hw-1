// contacts.js  
 /*const fs = require('fs').promises
fs.readdir(__dirname)
  .then((files) => {
    return Promise.all(
      files.map(async (filename) => {
        const stats = await fs.stat(filename)
        return {
          Name: filename,
          Size: stats.size,
          Date: stats.mtime,
        }
      }),
    )
  })
  .then((result) => console.table(result))*/
/*fs.readFile('db/contacts.json', (err, data) => {
   console.log(data.toString())
 })*/

const fs = require('fs') 
const path = require('path')

  //Раскомментируй и запиши значение
  const contactsPath = path.join(__dirname,
  'db/contacts.json'
)
/*console.log(path.join(__dirname,
  './db/contacts.json'
))*/
// TODO: задокументировать каждую функцию

//# Получаем и выводим весь список контактов в виде таблицы (console.table) node index.js --action list
function listContacts() {
  // ...твой код
 fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err)
    }
    const contacts = data.toString()
    if (!contacts ) {
      process.exit(1)
    }
    const contactsList = JSON.parse(contacts )
    if (contactsList.length === 0) {
      console.log('No found contact!')
      return
    }
    console.table(contactsList)
  })
}

//  # Получаем контакт по id node index.js --action get --id 5  
function getContactById(contactId) {
  // ...твой код
    fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err)
    }
    const contacts  = data.toString()
    if (!contacts) {
      process.exit(1)
      }
  
    const contactsList = JSON.parse(contacts)
    const foundContact = contactsList.find(({ id }) => id === contactId)
    if (foundContact) {
      console.table([foundContact])
    } else {
      process.exit(1)
    }
  })
}
//# Удаляем контакт node index.js --action remove --id=3 
function removeContact(contactId) {
    fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message)
    }
    const contacts  = data.toString()
    if (!contacts ) {
      process.exit(1)
    }
    const contactsList = JSON.parse(contacts)
    const filterContacts = contactsList.filter(({ id }) => id !== contactId)//отфильтровать ,найти.
    if (contactsList.length !== filterContacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filterContacts), err => {
        if (err) {
          console.error(err.message)
          process.exit(1)
        }
      })
      }
     console.log(`Contact ${contactId} deleted!`) //контакт id=? удален
    console.table(contactsList)
  })
}

//# Добавялем контакт
//node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
function addContact(name, email, phone) {
   fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err)
    }
    const contacts  = data.toString()
    let contactsList
    let id
    if (!contacts ) {
      contactsList = []
      id = 1
    } else {
      contactsList = JSON.parse(contacts )
      id = contactsList.length === 0
          ? 1
          : contactsList[contactsList.length - 1].id + 1
    }

    if (name && email && phone) {
      contactsList.push({ id, name, email, phone })//свойства контакта
      fs.writeFile(contactsPath, JSON.stringify(contactsList), err => { //контакт в строку
        if (err) {
          console.error(err)
        }
        console.log('Contact saved successfully!')//Контакт успешно сохранен
        console.table(contactsList)
      })
    }
  })
}
module.exports = { listContacts, getContactById, addContact, removeContact } //removeContact, addContact,








