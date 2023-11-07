import {
  FSMStateOutput,
  FiniteStateMachine,
  transFunction,
} from './types/FiniteStateMachine';

/**
 * Modulo three based on the FSM
 */
export class ModThreeMachine {
  private _machine: FiniteStateMachine<number>;

  constructor() {
    this._machine = new FiniteStateMachine<number>();

    this._init();
  }

  /**
   * Init FSM machine for modulo three
   */
  private _init() {
    /**
     * Transition function for S0
     * 
     * @param data Binary number
     * @returns Next state
     */
    const f0: transFunction<number> = function (data: number) {
      return data == 1 ? { to: 'S1' } : { to: 'S0' };
    };

    /**
     * Transition function for S1
     * 
     * @param data Binary number
     * @returns Next state
     */
    const f1: transFunction<number> = function (data: number) {
      return data == 1 ? { to: 'S0' } : { to: 'S2' };
    };

    /**
     * Transition function for S2
     * 
     * @param data Binary number
     * @returns Next state
     */
    const f2: transFunction<number> = function (data: number) {
      return data == 1 ? { to: 'S2' } : { to: 'S1' };
    };

    this._machine.addState('S0');
    this._machine.addState('S1');
    this._machine.addState('S2');

    this._machine.addTransition('S0', f0);
    this._machine.addTransition('S1', f1);
    this._machine.addTransition('S2', f2);
  }

  /**
   * Run modulo three machine
   * 
   * @param input Binary string
   * @returns Module result by 3
   */
  public run(input: string) {
    const binary: number[] = input.split('').map((value) => Number(value));

    let state: FSMStateOutput<number> | null = this._machine.next(
      binary[0],
      'S0',
    );

    for (let i = 1; i < binary.length; ++i) {
      state = this._machine.next(binary[i]);
    }

    switch (state?.to) {
      case 'S0':
        return 0;
      case 'S1':
        return 1;
      case 'S2':
        return 2;
      default:
        return 0;
    }
  }
}
