System.register(["./MT_interactions"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MT_interactions_1;
    var PromesseDocumentPret;
    return {
        setters:[
            function (MT_interactions_1_1) {
                MT_interactions_1 = MT_interactions_1_1;
            }],
        execute: function() {
            PromesseDocumentPret = new Promise((resolve) => {
                if (document.readyState === "complete") {
                    resolve();
                }
                else {
                    document.onreadystatechange = () => document.readyState === "complete" ? resolve() : null;
                }
            });
            PromesseDocumentPret.then(() => {
                MT_interactions_1.$(".multiTouchCopntainer img, .multiTouchCopntainer video");
            });
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUVJLG9CQUFvQjs7Ozs7OztZQUFwQixvQkFBb0IsR0FBRyxJQUFJLE9BQU8sQ0FBRSxDQUFDLE9BQU87Z0JBQzVDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixRQUFRLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxLQUFHLFVBQVUsR0FBQyxPQUFPLEVBQUUsR0FBQyxJQUFJLENBQUM7Z0JBQ3hGLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILG9CQUFvQixDQUFDLElBQUksQ0FBRTtnQkFDdkIsbUJBQUMsQ0FBRSx3REFBd0QsQ0FBRSxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyAkIH0gZnJvbSBcIi4vTVRfaW50ZXJhY3Rpb25zXCI7XG5cbmxldCBQcm9tZXNzZURvY3VtZW50UHJldCA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSkgPT4ge1xuICAgIGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4gZG9jdW1lbnQucmVhZHlTdGF0ZT09PVwiY29tcGxldGVcIj9yZXNvbHZlKCk6bnVsbDtcbiAgICB9XG59KTtcblxuUHJvbWVzc2VEb2N1bWVudFByZXQudGhlbiggKCkgPT4ge1xuICAgICQoIFwiLm11bHRpVG91Y2hDb3BudGFpbmVyIGltZywgLm11bHRpVG91Y2hDb3BudGFpbmVyIHZpZGVvXCIgKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
