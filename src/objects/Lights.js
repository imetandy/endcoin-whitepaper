import {
  Group,
  SpotLight,
  PointLight,
  AmbientLight,
  HemisphereLight,
  Color,
} from "three";

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xffffff, 1, 10, 1);
    const dir = new SpotLight(0xffffff, 0.8, 7, 0.8, 1, 1);
    const ambi = new AmbientLight(0xffffff, 0.66);
    //const hemi = new HemisphereLight(0xffffff, 0x080820, 1.15);

    dir.position.set(25, 3, 25);
    dir.target.position.set(0, 0, 0);

    point.position.set(15, 10, 5);
    point.intensity = 0.5;

    this.add(point, ambi, dir);
  }
}
