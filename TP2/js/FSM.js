System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var State, Transition, FSM;
    return {
        setters:[],
        execute: function() {
            State = class State {
                constructor() {
                    this.transitionsFrom = [];
                }
                //constructor() {}
                addTransitionFrom(t) {
                    this.transitionsFrom.push(t);
                }
                disable() {
                    this.transitionsFrom.forEach((t) => t.disable());
                    return this;
                }
                enable() {
                    this.transitionsFrom.forEach((t) => t.enable());
                    return this;
                }
            };
            Transition = class Transition {
                constructor(fsm, fromState, toState, eventTarget, eventNames, useCapture, action) {
                    this.fromState = fromState;
                    this.toState = toState;
                    this.eventTarget = eventTarget;
                    this.eventNames = eventNames;
                    this.useCapture = useCapture;
                    this.action = action;
                    fromState.addTransitionFrom(this);
                    this.cb = (evt) => {
                        if (this.action(evt, this)) {
                            fsm.setCurrentState(this.toState);
                        }
                    };
                }
                enable() {
                    this.eventTarget.forEach(es => {
                        this.eventNames.forEach(eventName => es.addEventListener(eventName, this.cb, this.useCapture));
                    });
                }
                disable() {
                    this.eventTarget.forEach(es => {
                        this.eventNames.forEach(eventName => es.removeEventListener(eventName, this.cb, this.useCapture));
                    });
                }
            };
            FSM = class FSM {
                //private states          : State[];
                //private transitions     : Transition[];
                setInitialState(initialState) {
                    this.initialState = initialState;
                }
                start() {
                    this.setCurrentState(this.initialState);
                }
                stop() {
                    this.setCurrentState(null);
                }
                setCurrentState(state) {
                    let changeState = this.currentState !== state;
                    if (this.currentState && changeState) {
                        this.currentState.disable();
                    }
                    this.currentState = state || this.currentState;
                    if (this.currentState && changeState) {
                        this.currentState.enable();
                    }
                    return this;
                }
                static parse(serializedFSM) {
                    let fsm = new FSM();
                    let states = new Map();
                    for (let t of serializedFSM.states) {
                        states.set(t, new State());
                    }
                    for (let t of serializedFSM.transitions) {
                        let eventNames;
                        if (t.eventName instanceof Array) {
                            eventNames = t.eventName;
                        }
                        else {
                            eventNames.push(t.eventName);
                        }
                        new Transition(fsm, states.get(t.from), states.get(t.to), t.eventTargets, eventNames, t.useCapture, t.action);
                    }
                    fsm.setInitialState(states.get(serializedFSM.initialState));
                    return fsm;
                }
            };
            exports_1("FSM", FSM);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxFQUFFLENBQUMsRUFDcEMsQ0FBQyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FDVCxDQUFDO29CQUN0QixDQUFDO29CQUNELEdBQUcsQ0FBQyxlQUFlLENBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUUsQ0FBQztvQkFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDZixDQUFDO1lBQ0wsQ0FBQztZQTNDRCxxQkEyQ0MsQ0FBQSIsImZpbGUiOiJGU00uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdGF0ZSB7XG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uc0Zyb206IFRyYW5zaXRpb25bXSA9IFtdO1xuICAgIC8vY29uc3RydWN0b3IoKSB7fVxuICAgIGFkZFRyYW5zaXRpb25Gcm9tKHQ6IFRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uc0Zyb20ucHVzaCggdCApO1xuICAgIH1cbiAgICBkaXNhYmxlKCkgOiB0aGlzIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uc0Zyb20uZm9yRWFjaCggKHQpID0+IHQuZGlzYWJsZSgpICk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbmFibGUoKSA6IHRoaXMge1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25zRnJvbS5mb3JFYWNoKCAodCkgPT4gdC5lbmFibGUoKSAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5jbGFzcyBUcmFuc2l0aW9uIHtcbiAgICBjYjogRXZlbnRMaXN0ZW5lcjtcbiAgICBjb25zdHJ1Y3RvciAoIGZzbTogRlNNXG4gICAgICAgICAgICAgICAgLCBwcml2YXRlIGZyb21TdGF0ZTogU3RhdGUsIHByaXZhdGUgdG9TdGF0ZTogU3RhdGVcbiAgICAgICAgICAgICAgICAsIHByaXZhdGUgZXZlbnRUYXJnZXQ6IEV2ZW50VGFyZ2V0W10sIHByaXZhdGUgZXZlbnROYW1lczogc3RyaW5nW10sIHByaXZhdGUgdXNlQ2FwdHVyZTogYm9vbGVhblxuICAgICAgICAgICAgICAgICwgcHJpdmF0ZSBhY3Rpb24gOiAoZXZ0PzogRXZlbnQsIHQ/OiBUcmFuc2l0aW9uKSA9PiB2b2lkICkge1xuICAgICAgICBmcm9tU3RhdGUuYWRkVHJhbnNpdGlvbkZyb20oIHRoaXMgKTtcbiAgICAgICAgdGhpcy5jYiA9IChldnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiggdGhpcy5hY3Rpb24oZXZ0LCB0aGlzKSApIHtcbiAgICAgICAgICAgICAgICBmc20uc2V0Q3VycmVudFN0YXRlKHRoaXMudG9TdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5ldmVudFRhcmdldC5mb3JFYWNoKCBlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TmFtZXMuZm9yRWFjaCggZXZlbnROYW1lID0+IGVzLmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcy5jYiwgdGhpcy51c2VDYXB0dXJlICkgKTtcbiAgICAgICAgfSApO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmV2ZW50VGFyZ2V0LmZvckVhY2goIGVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnROYW1lcy5mb3JFYWNoKCBldmVudE5hbWUgPT4gZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggZXZlbnROYW1lLCB0aGlzLmNiLCB0aGlzLnVzZUNhcHR1cmUgKSApO1xuICAgICAgICB9ICk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zaXRpb25TZXJpYWxpemVkPFNUQVRFPiB7XG4gICAgZnJvbSAgICAgICAgOiBTVEFURTtcbiAgICB0byAgICAgICAgICA6IFNUQVRFO1xuICAgIGV2ZW50VGFyZ2V0czogRXZlbnRUYXJnZXRbXTtcbiAgICBldmVudE5hbWUgICA6IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgIHVzZUNhcHR1cmUgIDogYm9vbGVhbjtcbiAgICBhY3Rpb24gICAgICA6IChkYXRhPzogYW55KSA9PiBib29sZWFuO1xufVxuZXhwb3J0IGludGVyZmFjZSBGU01TZXJpYWxpemVkPFNUQVRFPiB7XG4gICAgaW5pdGlhbFN0YXRlOiBTVEFURTtcbiAgICBzdGF0ZXMgICAgICA6IFNUQVRFW107XG4gICAgdHJhbnNpdGlvbnMgOiBUcmFuc2l0aW9uU2VyaWFsaXplZDxTVEFURT5bXTtcbn1cbmV4cG9ydCBjbGFzcyBGU00ge1xuICAgIHByaXZhdGUgY3VycmVudFN0YXRlICAgIDogU3RhdGU7XG4gICAgcHJpdmF0ZSBpbml0aWFsU3RhdGUgICAgOiBTdGF0ZTtcbiAgICAvL3ByaXZhdGUgc3RhdGVzICAgICAgICAgIDogU3RhdGVbXTtcbiAgICAvL3ByaXZhdGUgdHJhbnNpdGlvbnMgICAgIDogVHJhbnNpdGlvbltdO1xuICAgIHNldEluaXRpYWxTdGF0ZShpbml0aWFsU3RhdGU6IFN0YXRlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFN0YXRlICAgPSBpbml0aWFsU3RhdGU7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRTdGF0ZSggdGhpcy5pbml0aWFsU3RhdGUgKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5zZXRDdXJyZW50U3RhdGUoIG51bGwgKTtcbiAgICB9XG4gICAgc2V0Q3VycmVudFN0YXRlKHN0YXRlPzogU3RhdGUpIDogdGhpcyB7XG4gICAgICAgIGxldCBjaGFuZ2VTdGF0ZSA6IGJvb2xlYW4gPSB0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gc3RhdGU7XG4gICAgICAgIGlmKHRoaXMuY3VycmVudFN0YXRlICYmIGNoYW5nZVN0YXRlKSB7dGhpcy5jdXJyZW50U3RhdGUuZGlzYWJsZSgpO31cbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZSB8fCB0aGlzLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgJiYgY2hhbmdlU3RhdGUpIHt0aGlzLmN1cnJlbnRTdGF0ZS5lbmFibGUgKCk7fVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBwYXJzZTxUPiggc2VyaWFsaXplZEZTTTogRlNNU2VyaWFsaXplZDxUPiApIDogRlNNIHtcbiAgICAgICAgbGV0IGZzbSAgICAgPSBuZXcgRlNNKCk7XG4gICAgICAgIGxldCBzdGF0ZXMgID0gbmV3IE1hcDxULCBTdGF0ZT4oKTtcbiAgICAgICAgZm9yKGxldCB0IG9mIHNlcmlhbGl6ZWRGU00uc3RhdGVzKSB7XG4gICAgICAgICAgICBzdGF0ZXMuc2V0KHQsIG5ldyBTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHQgb2Ygc2VyaWFsaXplZEZTTS50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgbGV0IGV2ZW50TmFtZXMgOiBzdHJpbmdbXTtcbiAgICAgICAgICAgIGlmKHQuZXZlbnROYW1lIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBldmVudE5hbWVzID0gPHN0cmluZ1tdPnQuZXZlbnROYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudE5hbWVzLnB1c2goIDxzdHJpbmc+dC5ldmVudE5hbWUgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uICAoIGZzbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhdGVzLmdldCh0LmZyb20pLCBzdGF0ZXMuZ2V0KHQudG8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0LmV2ZW50VGFyZ2V0cywgZXZlbnROYW1lcywgdC51c2VDYXB0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0LmFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZnNtLnNldEluaXRpYWxTdGF0ZSggc3RhdGVzLmdldChzZXJpYWxpemVkRlNNLmluaXRpYWxTdGF0ZSkgKTtcbiAgICAgICAgcmV0dXJuIGZzbTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
