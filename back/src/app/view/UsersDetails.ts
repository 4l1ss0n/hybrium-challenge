interface Input {
  user: {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    tellNumber: number;
    cpf: number;
    photo: string | null;
    defaultTimeInExpedient: string;
    defaultTimeInLunch:string;
    defaultTimeOutExpedient: string;
    defaultTimeOutLunch:string;
    isDeleted: boolean;
    createdAt: Date; 
    updatedAt: Date;
  }
  times: Array<{
    id: number;
    userId: string;
    day: Date;
    timeInExpedient: String;
    timeOutExpedient: String | null;
    timeInLunch: String | null;
    timeOutLunch: String | null;
    createdAt: Date; 
    updatedAt: Date;
  }> 
};

export function viewManyUsersDetails(userArray: [any]): Array<{}> {
  return userArray.map(user => viewSingleUsersDetails(user));
}

export function viewSingleUsersDetails(user: any): {} {
  return {
    id: user.user.id,
    name: user.user.name,
    email: user.user.email,
    tell: user.user.tellNumber,
    cpf: user.user.cpf,
    photo: user.user.photo,
    ocupation: user.user.ocupation,
    defaultTimeInExpedient: user.user.defaultTimeInExpedient,
    defaultTimeOutExpedient: user.user.defaultTimeOutExpedient,
    defaultTimeInLunch: user.user.defaultTimeInLunch,
    defaultTimeOutLunch: user.user.defaultTimeOutLunch,
    times: user.times.map((time: any) => ({
      id: time.id,
      day: time.day,
      timeInExpedient: time.timeInExpedient,
      timeOutExpedient: time.timeOutExpedient,
      timeInLunch: time.timeInLunch,
      timeOutLunch: time.timeOutLunch
    }))
  };
};