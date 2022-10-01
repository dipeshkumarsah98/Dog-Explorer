import { action, makeObservable, observable, runInAction } from "mobx";
import http from "../services/httpService";

class RandomDogStore {
  dogList = [];
  loading = false;
  error = "";
  constructor() {
    makeObservable(this, {
      dogList: observable,
      loading: observable,
      error: observable,
      getData: action,
    });
  }
  async getData() {
    try {
      const { data } = await http.get(
        "https://dog.ceo/api/breeds/image/random/9"
      );
      runInAction(() => {
        this.dogList = data.message;
        this.loading = false;
        this.error = "";
      });
    } catch (error) {
      console.log("Error::", error);
    }
  }
}

const randomDogStore = new RandomDogStore();

export default randomDogStore;
