import { Group } from "three";
import Flower from "./Flower/Flower.js";
import BasicLights from "./Lights.js";

export default class SeedScene extends Group {
  constructor() {
    super();

    const flower = new Flower();
    const lights = new BasicLights();

    this.add(flower, lights);
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 10000;
  }
}
