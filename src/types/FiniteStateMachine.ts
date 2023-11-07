/**
 * Output from a state transition is the 'to' state and optional data obtained from the transition function
 */
export interface FSMStateOutput<T> {
  to: string;

  data?: T;
}

/**
 * The transition function is Mealy-style, that is a transition to a new state is based on prior state and
 * input data.  Since state is optional in this interface, pass the state name as data and a Moore-style
 * machine can be implemented.
 */
export interface transFunction<T> {
  (data: T, state?: string): FSMStateOutput<T>;
}

export class FiniteStateMachine<T> {
  public static INIT = 'INIT';

  protected _curState: string; // name of the current state

  protected _states: Set<string>; // collection of state names
  protected _transitions: Record<string, transFunction<T>>; // collection of state transition functions

  constructor() {
    this._curState = FiniteStateMachine.INIT;
    this._states = new Set<string>();
    this._transitions = {};
  }

  /**
   * Add a named state to this machine
   *
   * @param {string} stateName State name
   */
  public addState(stateName: string): void {
    if (stateName !== undefined && stateName != '') {
      this._states.add(stateName);
    }
  }

  /**
   * Add a transition from a named state to this machine and return {true} if the addition was successful
   *
   * @param {string} from Name of the 'from' state
   *
   * @param {transFunction} to Function that computes the next transition state and any associated data
   */
  public addTransition(from: string, to: transFunction<T>): boolean {
    // does the from state exist?
    const hasFrom: boolean = this._states.has(from);

    if (!hasFrom) return false;

    // has a transition already been defined?
    if (this._transitions[from] !== undefined) return false;

    // add the transition
    this._transitions[from] = to;
    return true;
  }

  /**
   * Transition to the next state based on current state and input data
   *
   * @param input Input data or may be a prior state name for a Moore-style machine
   *
   * @param {string} initialState The initial state to use for the machine
   */
  public next(input: T, initialState?: string): FSMStateOutput<T> | null {
    if (initialState !== undefined && initialState != '') {
      this._curState = initialState;
    }

    const transFcn: transFunction<T> = this._transitions[this._curState];
    if (transFcn !== undefined) {
      const toState: FSMStateOutput<T> = transFcn(input, this._curState);

      this._curState = toState.to;

      return {
        to: this._curState,
        data: toState.data ? toState.data : input,
      };
    }

    return null;
  }

  /**
   * Clear this machine and prepare for new data The only machine parameter that remains unaltered is the name.  The
   * machine is set to the {INIT} state.
   */
  public clear(): void {
    this._states.clear();
    this._transitions = {};

    this._curState = FiniteStateMachine.INIT;
  }
}
