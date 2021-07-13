export default class Animation {
  private name: string;
  private duration: number;
  private delay: number;
  private easing: string;

  constructor(name: string, duration: number, delay: number, easing: string) {
      this.name = name;
      this.duration = duration;
      this.delay = delay;
      this.easing = easing;
  }

  public getName(): string {
      return this.name;
  }

  public getDuration(): number {
      return this.duration;
  }

  public getDelay(): number {
      return this.delay;
  }

  public getEasing(): string {
      return this.easing;
  }

  public setName(name: string): void {
      this.name = name;
  }

  public setDuration(duration: number): void {
      this.duration = duration;
  }

  public setDelay(delay: number): void {
      this.delay = delay;
  }

  public setEasing(easing: string): void {
      this.easing = easing;
  }

  public toString(): string {
      return `Animation: ${this.name} (${this.duration}s, ${this.delay}s, ${this.easing})`;
  }

  public clone(): Animation {
      return new Animation(this.name, this.duration, this.delay, this.easing);
  }

  public equals(other: Animation): boolean {
      return this.name === other.name && this.duration === other.duration && this.delay === other.delay && this.easing === other.easing;
  }

  public static parse(animation: string): Animation {
      const [name, duration, delay, easing] = animation.split(",");
      return new Animation(name, parseFloat(duration), parseFloat(delay), easing);
  }

  public static parseArray(animations: string[]): Animation[] {
      const parsedAnimations: Animation[] = [];
      for (let i = 0; i < animations.length; i++) {
          parsedAnimations.push(Animation.parse(animations[i]));
      }
      return parsedAnimations;
  }

  public static parseFromObject(animation: Animation): Animation {
      return new Animation(animation.name, animation.duration, animation.delay, animation.easing);
  }

  public static parseArrayFromObject(animations: Animation[]): Animation[] {
      const parsedAnimations: Animation[] = [];
      for (let i = 0; i < animations.length; i++) {
          parsedAnimations.push(Animation.parseFromObject(animations[i]));
      }
      return parsedAnimations;
  }

  public static equals(animation1: Animation, animation2: Animation): boolean {
      return animation1.name === animation2.name && animation1.duration === animation2.duration && animation1.delay === animation2.delay && animation1.easing === animation2.easing;
  }

  public static clone(animation: Animation): Animation {
      return Animation.parse(animation.toString());
  }

  public static getEasingValues(): string[] {
      return ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
  }

  public static getEasingValuesArray(): string[] {
      return ["linear", "ease", "ease-in", "ease-out", "ease-in-out"].map(easing => `${easing} (cubic-bezier(${easing}))`);
  }

  public static getEasingValuesObject(): { [key: string]: string } {
      return Animation.getEasingValuesArray().reduce((acc: any, easing) => {
          acc[easing] = easing;
          return acc;
      }, {});
  }

  public static getEasingValuesObjectArray(): { [key: string]: string }[] {
      return Animation.getEasingValuesArray().map(easing => ({ [easing]: easing }));
  }

  public static getEasingValuesObjectArrayWithCubicBezier(): { [key: string]: string }[] {
      return Animation.getEasingValuesArray().map(easing => ({ [easing]: `${easing} (cubic-bezier(${easing}))` }));
  }
}