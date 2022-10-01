import { action, makeObservable, observable, runInAction } from "mobx";
import http from "../services/httpService";

class DogBreedStore {
  breedList = [];
  dogImageList = [];
  loading = true;
  error = "";
  constructor() {
    makeObservable(this, {
      breedList: observable,
      dogImageList: observable,
      loading: observable,
      error: observable,
      getData: action,
      getDogDetail: action,
    });
  }
  async getData() {
    try {
      const { data } = await http.get("https://dog.ceo/api/breeds/list/all");
      const breeds = Object.keys(data.message);
      runInAction(() => {
        this.breedList = breeds;
        this.loading = false;
        this.error = "";
      });
    } catch (error) {
      console.log("error::", error);
    }
  }
  async getDogDetail(breed) {
    runInAction(() => {
      this.loading = true;
    });
    try {
      const { data } = await http.get(
        `https://dog.ceo/api/breed/${breed}/images`
      );
      const dogs = data.message;
      runInAction(() => {
        this.dogImageList = dogs;
        this.loading = false;
        this.error = "";
      });
    } catch (error) {
      console.log("errors:: ", error);
    }
  }
}

const dogBreedStore = new DogBreedStore();

export default dogBreedStore;
