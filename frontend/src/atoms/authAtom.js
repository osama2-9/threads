import {atom} from "recoil";

const authAtom = atom({
  key: "authScreenAtom",
  default: "login",
});

export default authAtom;
