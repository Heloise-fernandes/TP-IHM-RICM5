System.register(["./FSM", "./transfo"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FSM_1, transfo;
    var $;
    //lancer sur ecrantactile :
    //>> gulp default
    //>>node miniServerHTTP.js
    //......!8080
    function multiTouch(element) {
        let pointerId_1, Pt1_coord_element, Pt1_coord_parent, pointerId_2, Pt2_coord_element, Pt2_coord_parent, originalMatrix, getRelevantDataFromEvent = (evt) => {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                let touch = evt.changedTouches.item(i);
                if (touch.identifier === pointerId_1 || touch.identifier === pointerId_2) {
                    return touch;
                }
            }
            return null;
        };
        var MT_STATES;
        (function (MT_STATES) {
            MT_STATES[MT_STATES["Inactive"] = 0] = "Inactive";
            MT_STATES[MT_STATES["Translating"] = 1] = "Translating";
            MT_STATES[MT_STATES["Rotozooming"] = 2] = "Rotozooming";
        })(MT_STATES || (MT_STATES = {}));
        let fsm = FSM_1.FSM.parse({
            initialState: MT_STATES.Inactive,
            states: [MT_STATES.Inactive, MT_STATES.Translating, MT_STATES.Rotozooming],
            transitions: [
                { from: MT_STATES.Inactive, to: MT_STATES.Translating,
                    eventTargets: [element],
                    eventName: ["touchstart"],
                    useCapture: false,
                    action: (evt) => {
                        //selection de l'identifiant du premier doigt
                        pointerId_1 = evt.changedTouches.item(0).identifier;
                        //Initialiser les coordonées et la ma matrice du premier point
                        let touch = getRelevantDataFromEvent(evt);
                        Pt1_coord_parent = transfo.getPoint(touch.clientX, touch.clientY);
                        originalMatrix = transfo.getMatrixFromElement(element);
                        //premiere translation
                        Pt1_coord_element = Pt1_coord_parent.matrixTransform(originalMatrix.inverse());
                        return true;
                    }
                },
                { from: MT_STATES.Translating, to: MT_STATES.Translating,
                    eventTargets: [document],
                    eventName: ["touchmove"],
                    useCapture: true,
                    action: (evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        //modifier les coordonnées du point
                        let touch = getRelevantDataFromEvent(evt);
                        Pt1_coord_parent = transfo.getPoint(touch.clientX, touch.clientY);
                        //translater
                        transfo.drag(element, originalMatrix, Pt1_coord_element, Pt1_coord_parent);
                        return true;
                    }
                },
                { from: MT_STATES.Translating,
                    to: MT_STATES.Inactive,
                    eventTargets: [document],
                    eventName: ["touchend"],
                    useCapture: true,
                    action: (evt) => {
                        //mettre à null l'identifiant du doigt
                        pointerId_1 = null;
                        return true;
                    }
                },
                { from: MT_STATES.Translating, to: MT_STATES.Rotozooming,
                    eventTargets: [element],
                    eventName: ["touchstart"],
                    useCapture: false,
                    action: (evt) => {
                        //selection de l'identifiant du deuxième doigt
                        pointerId_2 = evt.changedTouches.item(0).identifier;
                        //intialisation du pointeur 2
                        let touch = getRelevantDataFromEvent(evt);
                        Pt2_coord_parent = transfo.getPoint(touch.clientX, touch.clientY);
                        Pt2_coord_element = Pt2_coord_parent.matrixTransform(originalMatrix.inverse());
                        return true;
                    }
                },
                { from: MT_STATES.Rotozooming, to: MT_STATES.Rotozooming,
                    eventTargets: [document],
                    eventName: ["touchmove"],
                    useCapture: true,
                    action: (evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        //changer le pointeur 1 ou 2 en fonction de l'évenement reçu
                        for (let i = 0; i < evt.changedTouches.length; i++) {
                            let touch = evt.changedTouches.item(i);
                            if (touch.identifier === pointerId_2) {
                                Pt2_coord_parent = transfo.getPoint(touch.clientX, touch.clientY);
                            }
                            else {
                                Pt1_coord_parent = transfo.getPoint(touch.clientX, touch.clientY);
                            }
                        }
                        //rotate
                        transfo.rotozoom(element, originalMatrix, Pt1_coord_element, Pt1_coord_parent, Pt2_coord_element, Pt2_coord_parent);
                        return true;
                    }
                },
                { from: MT_STATES.Rotozooming,
                    to: MT_STATES.Translating,
                    eventTargets: [document],
                    eventName: ["touchend"],
                    useCapture: true,
                    action: (evt) => {
                        let touch = getRelevantDataFromEvent(evt);
                        //modifier les valeurs du pointeur 1 en fonction du doigt enlevé
                        if (touch.identifier === pointerId_1) {
                            pointerId_1 = pointerId_2;
                            Pt1_coord_element = Pt2_coord_element;
                            Pt1_coord_parent = Pt2_coord_parent;
                        }
                        pointerId_2 = null;
                        Pt2_coord_parent = null;
                        Pt2_coord_element = null;
                        //réinitialiser la matrice
                        originalMatrix = transfo.getMatrixFromElement(element);
                        return true;
                    }
                }
            ]
        });
        fsm.start();
    }
    //______________________________________________________________________________________________________________________
    //______________________________________________________________________________________________________________________
    //______________________________________________________________________________________________________________________
    function isString(s) {
        return typeof (s) === "string" || s instanceof String;
    }
    return {
        setters:[
            function (FSM_1_1) {
                FSM_1 = FSM_1_1;
            },
            function (transfo_1) {
                transfo = transfo_1;
            }],
        execute: function() {
            exports_1("$", $ = (sel) => {
                let L = [];
                if (isString(sel)) {
                    L = Array.from(document.querySelectorAll(sel));
                }
                else if (sel instanceof Element) {
                    L.push(sel);
                }
                else if (sel instanceof Array) {
                    L = sel;
                }
                L.forEach(multiTouch);
            });
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1UX2ludGVyYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBNEpXLENBQUM7SUF2SlosMkJBQTJCO0lBQzNCLGlCQUFpQjtJQUNqQiwwQkFBMEI7SUFDMUIsYUFBYTtJQUNiLG9CQUFvQixPQUFvQjtRQUNwQyxJQUFJLFdBQW9CLEVBQUUsaUJBQTRCLEVBQUUsZ0JBQTJCLEVBQy9FLFdBQW9CLEVBQUUsaUJBQTRCLEVBQUUsZ0JBQTJCLEVBQy9FLGNBQTBCLEVBQzFCLHdCQUF3QixHQUFHLENBQUMsR0FBZ0I7WUFDeEMsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM1QyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBQ04sSUFBSyxTQUE4QztRQUFuRCxXQUFLLFNBQVM7WUFBRSxpREFBUSxDQUFBO1lBQUUsdURBQVcsQ0FBQTtZQUFFLHVEQUFXLENBQUE7UUFBQSxDQUFDLEVBQTlDLFNBQVMsS0FBVCxTQUFTLFFBQXFDO1FBQ25ELElBQUksR0FBRyxHQUFHLFNBQUcsQ0FBQyxLQUFLLENBQWE7WUFDNUIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQ2hDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQzFFLFdBQVcsRUFBRztnQkFDVixFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsV0FBVztvQkFDakQsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3pCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsQ0FBQyxHQUFnQjt3QkFDckIsNkNBQTZDO3dCQUM3QyxXQUFXLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO3dCQUVwRCw4REFBOEQ7d0JBQzlELElBQUksS0FBSyxHQUFHLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMxQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNqRSxjQUFjLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUV2RCxzQkFBc0I7d0JBQ3RCLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFFL0UsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDcEIsQ0FBQztpQkFDQTtnQkFDRCxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsV0FBVztvQkFDcEQsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3hCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixNQUFNLEVBQUUsQ0FBQyxHQUFnQjt3QkFDckIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBRXRCLG1DQUFtQzt3QkFDbkMsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRWpFLFlBQVk7d0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLGlCQUFpQixFQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0o7Z0JBQ0QsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVc7b0JBQ3pCLEVBQUUsRUFBRSxTQUFTLENBQUMsUUFBUTtvQkFDdEIsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3ZCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixNQUFNLEVBQUUsQ0FBQyxHQUFnQjt3QkFDckIsc0NBQXNDO3dCQUN0QyxXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKO2dCQUNELEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxXQUFXO29CQUNwRCxZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDekIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLE1BQU0sRUFBRSxDQUFDLEdBQWdCO3dCQUNyQiw4Q0FBOEM7d0JBQzlDLFdBQVcsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7d0JBRXBELDZCQUE2Qjt3QkFDN0IsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pFLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFFL0UsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjtnQkFDRCxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsV0FBVztvQkFDcEQsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3hCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixNQUFNLEVBQUUsQ0FBQyxHQUFnQjt3QkFDckIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBRXRCLDREQUE0RDt3QkFDNUQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUM1QyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUNuQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN0RSxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3RFLENBQUM7d0JBQ0wsQ0FBQzt3QkFFRCxRQUFRO3dCQUNSLE9BQU8sQ0FBQyxRQUFRLENBQUUsT0FBTyxFQUNyQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsZ0JBQWdCLENBQ25CLENBQUE7d0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjtnQkFDRCxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVztvQkFDekIsRUFBRSxFQUFFLFNBQVMsQ0FBQyxXQUFXO29CQUN6QixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDdkIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE1BQU0sRUFBRSxDQUFDLEdBQWdCO3dCQUdyQixJQUFJLEtBQUssR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFMUMsZ0VBQWdFO3dCQUNoRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLFdBQVcsR0FBRyxXQUFXLENBQUM7NEJBQzFCLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDOzRCQUN0QyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQzt3QkFBQSxDQUFDO3dCQUN6QyxXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7d0JBQ3hCLGlCQUFpQixHQUFDLElBQUksQ0FBQzt3QkFFdkIsMEJBQTBCO3dCQUMxQixjQUFjLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKO2FBQ0o7U0FDSixDQUFFLENBQUM7UUFDSixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHdIQUF3SDtJQUN4SCx3SEFBd0g7SUFDeEgsd0hBQXdIO0lBQ3hILGtCQUFrQixDQUFPO1FBQ3JCLE1BQU0sQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsWUFBWSxNQUFNLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7OztZQUVVLGVBQUEsQ0FBQyxHQUFHLENBQUMsR0FBa0M7Z0JBQzlDLElBQUksQ0FBQyxHQUFlLEVBQUUsQ0FBQztnQkFDdkIsRUFBRSxDQUFBLENBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDakIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFTLEdBQUcsQ0FBQyxDQUFFLENBQUM7Z0JBQzdELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMvQixDQUFDLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRSxDQUFDO2dCQUNsQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDWixDQUFDO2dCQUNELENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBVSxDQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiTVRfaW50ZXJhY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4vRlNNXCI7XG5pbXBvcnQgKiBhcyB0cmFuc2ZvIGZyb20gXCIuL3RyYW5zZm9cIjtcblxuXG5cbi8vbGFuY2VyIHN1ciBlY3JhbnRhY3RpbGUgOlxuLy8+PiBndWxwIGRlZmF1bHRcbi8vPj5ub2RlIG1pbmlTZXJ2ZXJIVFRQLmpzXG4vLy4uLi4uLiE4MDgwXG5mdW5jdGlvbiBtdWx0aVRvdWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA6IHZvaWQge1xuICAgIGxldCBwb2ludGVySWRfMSA6IG51bWJlciwgUHQxX2Nvb3JkX2VsZW1lbnQgOiBTVkdQb2ludCwgUHQxX2Nvb3JkX3BhcmVudCA6IFNWR1BvaW50LFxuICAgICAgICBwb2ludGVySWRfMiA6IG51bWJlciwgUHQyX2Nvb3JkX2VsZW1lbnQgOiBTVkdQb2ludCwgUHQyX2Nvb3JkX3BhcmVudCA6IFNWR1BvaW50LFxuICAgICAgICBvcmlnaW5hbE1hdHJpeCA6IFNWR01hdHJpeCxcbiAgICAgICAgZ2V0UmVsZXZhbnREYXRhRnJvbUV2ZW50ID0gKGV2dCA6IFRvdWNoRXZlbnQpIDogVG91Y2ggPT4ge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZXZ0LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZXZ0LmNoYW5nZWRUb3VjaGVzLml0ZW0oaSk7XG4gICAgICAgICAgICAgICAgaWYodG91Y2guaWRlbnRpZmllciA9PT0gcG9pbnRlcklkXzEgfHwgdG91Y2guaWRlbnRpZmllciA9PT0gcG9pbnRlcklkXzIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvdWNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIGVudW0gTVRfU1RBVEVTIHtJbmFjdGl2ZSwgVHJhbnNsYXRpbmcsIFJvdG96b29taW5nfVxuICAgIGxldCBmc20gPSBGU00ucGFyc2U8TVRfU1RBVEVTPigge1xuICAgICAgICBpbml0aWFsU3RhdGU6IE1UX1NUQVRFUy5JbmFjdGl2ZSxcbiAgICAgICAgc3RhdGVzOiBbTVRfU1RBVEVTLkluYWN0aXZlLCBNVF9TVEFURVMuVHJhbnNsYXRpbmcsIE1UX1NUQVRFUy5Sb3Rvem9vbWluZ10sXG4gICAgICAgIHRyYW5zaXRpb25zIDogW1xuICAgICAgICAgICAgeyBmcm9tOiBNVF9TVEFURVMuSW5hY3RpdmUsIHRvOiBNVF9TVEFURVMuVHJhbnNsYXRpbmcsXG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXRzOiBbZWxlbWVudF0sXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiBbXCJ0b3VjaHN0YXJ0XCJdLFxuICAgICAgICAgICAgICAgIHVzZUNhcHR1cmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGV2dCA6IFRvdWNoRXZlbnQpIDogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0aW9uIGRlIGwnaWRlbnRpZmlhbnQgZHUgcHJlbWllciBkb2lndFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVySWRfMSA9IGV2dC5jaGFuZ2VkVG91Y2hlcy5pdGVtKDApLmlkZW50aWZpZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9Jbml0aWFsaXNlciBsZXMgY29vcmRvbsOpZXMgZXQgbGEgbWEgbWF0cmljZSBkdSBwcmVtaWVyIHBvaW50XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGdldFJlbGV2YW50RGF0YUZyb21FdmVudChldnQpO1xuICAgICAgICAgICAgICAgICAgICBQdDFfY29vcmRfcGFyZW50ID0gdHJhbnNmby5nZXRQb2ludCh0b3VjaC5jbGllbnRYLHRvdWNoLmNsaWVudFkpO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE1hdHJpeCA9IHRyYW5zZm8uZ2V0TWF0cml4RnJvbUVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9wcmVtaWVyZSB0cmFuc2xhdGlvblxuICAgICAgICAgICAgICAgICAgICBQdDFfY29vcmRfZWxlbWVudCA9IFB0MV9jb29yZF9wYXJlbnQubWF0cml4VHJhbnNmb3JtKG9yaWdpbmFsTWF0cml4LmludmVyc2UoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBmcm9tOiBNVF9TVEFURVMuVHJhbnNsYXRpbmcsIHRvOiBNVF9TVEFURVMuVHJhbnNsYXRpbmcsXG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXRzOiBbZG9jdW1lbnRdLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogW1widG91Y2htb3ZlXCJdLFxuICAgICAgICAgICAgICAgIHVzZUNhcHR1cmU6IHRydWUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoZXZ0IDogVG91Y2hFdmVudCkgOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAvL21vZGlmaWVyIGxlcyBjb29yZG9ubsOpZXMgZHUgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZ2V0UmVsZXZhbnREYXRhRnJvbUV2ZW50KGV2dCk7XG4gICAgICAgICAgICAgICAgICAgIFB0MV9jb29yZF9wYXJlbnQgPSB0cmFuc2ZvLmdldFBvaW50KHRvdWNoLmNsaWVudFgsdG91Y2guY2xpZW50WSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy90cmFuc2xhdGVyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm8uZHJhZyhlbGVtZW50LG9yaWdpbmFsTWF0cml4LFB0MV9jb29yZF9lbGVtZW50LFB0MV9jb29yZF9wYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBmcm9tOiBNVF9TVEFURVMuVHJhbnNsYXRpbmcsXG4gICAgICAgICAgICAgICAgdG86IE1UX1NUQVRFUy5JbmFjdGl2ZSxcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldHM6IFtkb2N1bWVudF0sXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiBbXCJ0b3VjaGVuZFwiXSxcbiAgICAgICAgICAgICAgICB1c2VDYXB0dXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGV2dCA6IFRvdWNoRXZlbnQpIDogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vbWV0dHJlIMOgIG51bGwgbCdpZGVudGlmaWFudCBkdSBkb2lndFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVySWRfMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IGZyb206IE1UX1NUQVRFUy5UcmFuc2xhdGluZywgdG86IE1UX1NUQVRFUy5Sb3Rvem9vbWluZyxcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldHM6IFtlbGVtZW50XSxcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6IFtcInRvdWNoc3RhcnRcIl0sXG4gICAgICAgICAgICAgICAgdXNlQ2FwdHVyZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoZXZ0IDogVG91Y2hFdmVudCkgOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3Rpb24gZGUgbCdpZGVudGlmaWFudCBkdSBkZXV4acOobWUgZG9pZ3RcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcklkXzIgPSBldnQuY2hhbmdlZFRvdWNoZXMuaXRlbSgwKS5pZGVudGlmaWVyO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaW50aWFsaXNhdGlvbiBkdSBwb2ludGV1ciAyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGdldFJlbGV2YW50RGF0YUZyb21FdmVudChldnQpO1xuICAgICAgICAgICAgICAgICAgICBQdDJfY29vcmRfcGFyZW50ID0gdHJhbnNmby5nZXRQb2ludCh0b3VjaC5jbGllbnRYLHRvdWNoLmNsaWVudFkpO1xuICAgICAgICAgICAgICAgICAgICBQdDJfY29vcmRfZWxlbWVudCA9IFB0Ml9jb29yZF9wYXJlbnQubWF0cml4VHJhbnNmb3JtKG9yaWdpbmFsTWF0cml4LmludmVyc2UoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgZnJvbTogTVRfU1RBVEVTLlJvdG96b29taW5nLCB0bzogTVRfU1RBVEVTLlJvdG96b29taW5nLFxuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0czogW2RvY3VtZW50XSxcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6IFtcInRvdWNobW92ZVwiXSxcbiAgICAgICAgICAgICAgICB1c2VDYXB0dXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGV2dCA6IFRvdWNoRXZlbnQpIDogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2VyIGxlIHBvaW50ZXVyIDEgb3UgMiBlbiBmb25jdGlvbiBkZSBsJ8OpdmVuZW1lbnQgcmXDp3VcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZXZ0LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG91Y2ggPSBldnQuY2hhbmdlZFRvdWNoZXMuaXRlbShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSBwb2ludGVySWRfMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFB0Ml9jb29yZF9wYXJlbnQgPSB0cmFuc2ZvLmdldFBvaW50KHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQdDFfY29vcmRfcGFyZW50ID0gdHJhbnNmby5nZXRQb2ludCh0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vcm90YXRlXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm8ucm90b3pvb20oIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE1hdHJpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFB0MV9jb29yZF9lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgUHQxX2Nvb3JkX3BhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFB0Ml9jb29yZF9lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgUHQyX2Nvb3JkX3BhcmVudFxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgZnJvbTogTVRfU1RBVEVTLlJvdG96b29taW5nLFxuICAgICAgICAgICAgICAgIHRvOiBNVF9TVEFURVMuVHJhbnNsYXRpbmcsXG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXRzOiBbZG9jdW1lbnRdLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogW1widG91Y2hlbmRcIl0sXG4gICAgICAgICAgICAgICAgdXNlQ2FwdHVyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IChldnQgOiBUb3VjaEV2ZW50KSA6IGJvb2xlYW4gPT4ge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZ2V0UmVsZXZhbnREYXRhRnJvbUV2ZW50KGV2dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9tb2RpZmllciBsZXMgdmFsZXVycyBkdSBwb2ludGV1ciAxIGVuIGZvbmN0aW9uIGR1IGRvaWd0IGVubGV2w6lcbiAgICAgICAgICAgICAgICAgICAgaWYodG91Y2guaWRlbnRpZmllcj09PXBvaW50ZXJJZF8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVySWRfMSA9IHBvaW50ZXJJZF8yO1xuICAgICAgICAgICAgICAgICAgICAgICAgUHQxX2Nvb3JkX2VsZW1lbnQgPSBQdDJfY29vcmRfZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFB0MV9jb29yZF9wYXJlbnQgPSBQdDJfY29vcmRfcGFyZW50O31cbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcklkXzIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBQdDJfY29vcmRfcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgUHQyX2Nvb3JkX2VsZW1lbnQ9bnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAvL3LDqWluaXRpYWxpc2VyIGxhIG1hdHJpY2VcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxNYXRyaXggPSB0cmFuc2ZvLmdldE1hdHJpeEZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9ICk7XG4gICAgZnNtLnN0YXJ0KCk7XG59XG5cbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1xuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cbmZ1bmN0aW9uIGlzU3RyaW5nKHMgOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZihzKSA9PT0gXCJzdHJpbmdcIiB8fCBzIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuXG5leHBvcnQgbGV0ICQgPSAoc2VsIDogc3RyaW5nIHwgRWxlbWVudCB8IEVsZW1lbnRbXSkgOiB2b2lkID0+IHtcbiAgICBsZXQgTCA6IEVsZW1lbnRbXSA9IFtdO1xuICAgIGlmKCBpc1N0cmluZyhzZWwpICkge1xuICAgICAgICBMID0gQXJyYXkuZnJvbSggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCg8c3RyaW5nPnNlbCkgKTtcbiAgICB9IGVsc2UgaWYoc2VsIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICBMLnB1c2goIHNlbCApO1xuICAgIH0gZWxzZSBpZihzZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBMID0gc2VsO1xuICAgIH1cbiAgICBMLmZvckVhY2goIG11bHRpVG91Y2ggKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
