import Times from "../../src/app/models/Times";
import Users from "../../src/app/models/Users";


export default async () => {
  await Users.truncate({force: true});
  await Times.truncate({force: true});

  return 'clear';
}