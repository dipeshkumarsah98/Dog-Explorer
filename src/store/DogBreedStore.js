import { action, makeObservable, observable, runInAction } from "mobx";
import http from "../services/httpService";

class DogBreedStore {
  breedList = [];
  loading = true;
  error = "";
  constructor() {
    makeObservable(this, {
      breedList: observable,
      loading: observable,
      error: observable,
      getData: action,
    });
  }
  async getData() {
    try {
      const { data } = await http.get("https://dog.ceo/api/breeds/list/all");
      console.log(data);
      runInAction(() => {
        this.breedList = data;
        this.loading = false;
        this.error = "";
      });
    } catch (error) {
      console.log("error::", error);
    }
  }
}

const dogBreedStore = new DogBreedStore();

export default dogBreedStore;
