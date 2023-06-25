import axios from "axios";

const URL = 'https://file.notion.so/f/s/b697dfd0-4a6f-4555-bd14-60559f2a8179/users.json?id=cc13eeae-fbeb-4b40-9b71-228fe193a8f6&table=block&spaceId=a73b0a18-75ee-4904-8f1e-0681ca27036a&expirationTimestamp=1687770512045&signature=IQhA1zyD9h1de3aAy2ouZXL8t32djjLnjjjb9A-vrwc&downloadName=users.json'

const getUsers = async () => {
  const users = await axios.get(URL)
  return users.data
}


const usersService = {
  getUsers
}

export default usersService;