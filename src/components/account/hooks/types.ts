export interface UserInfo {
  userName: string;
  email: string;
  password: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
}

export interface UpdateUserInfoParams {
  newData: FormDataEntryValue | null;
  modalType: string;
}
