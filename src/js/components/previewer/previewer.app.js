var previewerApp = angular.module("ped.previewer", []);
previewerDirectives.previewer.$inject = ["$q", "$rootScope", "types"];
previewerApp.directive(previewerDirectives);
