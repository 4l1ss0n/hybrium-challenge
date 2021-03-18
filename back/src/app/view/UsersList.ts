interface Input {
  id: string;
  name: string;
  photo: string | null;
}


export function viewManyUserList(usersList: [any]): Array<{}> {
  return usersList.map(userList => viewSingleUserList(userList))
}

export function viewSingleUserList(userList: any): {} {
  return {
    id: userList.id,
    photo: userList.photo,
    name: userList.name
  }
}