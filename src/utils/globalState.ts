class GlobalState {
  static instance: GlobalState | null = null;
  private states: { [key: string]: any };

  constructor() {
    this.states = {};
  }
  set<T>(key: string, value: T) {
    this.states[key] = value;
    return { key, value };
  }
  get<T>(key?: string): T | { [key: string]: T } {
    if (key === undefined) {
      return this.states;
    }
    return this.states[key];
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new GlobalState();
    }
    return this.instance;
  }
}

const globalStateInstance = GlobalState.getInstance();
export default globalStateInstance;
