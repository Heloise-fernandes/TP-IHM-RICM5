class State {
    private transitionsFrom: Transition[] = [];
    //constructor() {}
    addTransitionFrom(t: Transition) {
        this.transitionsFrom.push( t );
    }
    disable() : this {
        this.transitionsFrom.forEach( (t) => t.disable() );
        return this;
    }
    enable() : this {
        this.transitionsFrom.forEach( (t) => t.enable()  );
        return this;
    }
}

class Transition {
    cb: EventListener;
    constructor ( fsm: FSM
                , private fromState: State, private toState: State
                , private eventTarget: EventTarget[], private eventNames: string[], private useCapture: boolean
                , private action : (evt?: Event, t?: Transition) => void ) {
        fromState.addTransitionFrom( this );
        this.cb = (evt: Event) => {
            if( this.action(evt, this) ) {
                fsm.setCurrentState(this.toState);
            }
        };
    }
    enable() {
        this.eventTarget.forEach( es => {
            this.eventNames.forEach( eventName => es.addEventListener( eventName, this.cb, this.useCapture ) );
        } );
    }
    disable() {
        this.eventTarget.forEach( es => {
            this.eventNames.forEach( eventName => es.removeEventListener( eventName, this.cb, this.useCapture ) );
        } );
    }
}

export interface TransitionSerialized<STATE> {
    from        : STATE;
    to          : STATE;
    eventTargets: EventTarget[];
    eventName   : string | string[];
    useCapture  : boolean;
    action      : (data?: any) => boolean;
}
export interface FSMSerialized<STATE> {
    initialState: STATE;
    states      : STATE[];
    transitions : TransitionSerialized<STATE>[];
}
export class FSM {
    private currentState    : State;
    private initialState    : State;
    //private states          : State[];
    //private transitions     : Transition[];
    setInitialState(initialState: State) {
        this.initialState   = initialState;
    }
    start() {
        this.setCurrentState( this.initialState );
    }
    stop() {
        this.setCurrentState( null );
    }
    setCurrentState(state?: State) : this {
        let changeState : boolean = this.currentState !== state;
        if(this.currentState && changeState) {this.currentState.disable();}
        this.currentState = state || this.currentState;
        if(this.currentState && changeState) {this.currentState.enable ();}
        return this;
    }
    public static parse<T>( serializedFSM: FSMSerialized<T> ) : FSM {
        let fsm     = new FSM();
        let states  = new Map<T, State>();
        for(let t of serializedFSM.states) {
            states.set(t, new State());
        }
        for(let t of serializedFSM.transitions) {
            let eventNames : string[];
            if(t.eventName instanceof Array) {
                eventNames = <string[]>t.eventName;
            } else {
                eventNames.push( <string>t.eventName );
            }
            new Transition  ( fsm
                            , states.get(t.from), states.get(t.to)
                            , t.eventTargets, eventNames, t.useCapture
                            , t.action
                            );
        }
        fsm.setInitialState( states.get(serializedFSM.initialState) );
        return fsm;
    }
}

