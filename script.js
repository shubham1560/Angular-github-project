// Lecture 1: Javascript Patterns

// console.log("Hello! in the script file");

// var work = function () {
//     console.log("inside function!");
//     var a="shubhamsinha01";
//     return a;
// };

// var doWork = function (f) {
//     console.log("starting");
//     try {
//         var c = f();
//     } catch (error) {
//         console.log(error);
//     }   
//     console.log("ending with: "+c);

// };

// doWork(work);


// Lecture 2: Modular Programming; making objects in it

// i want to do something like this:

// Angular's way of modularity
// (function () {

//     var createWorker = function () {

//         var workCount = 0;
//         var workCounter = 100;
//         var task1 = function () {
//             workCount += 1;
//             workCounter = workCount;
//             console.log("Inside task1 " + workCount);
//         };

//         var task2 = function () {
//             workCount += 1;
//             workCounter = workCount;
//             console.log("inside task2 " + workCount);
//         };

//         return {
//             job1: task1,
//             job2: task2,
//             count: workCounter
//         };
//     };

//     var worker = createWorker();

//     worker.job1();
//     worker.job2();
//     worker.job1();
//     worker.job2();
//     worker.job1();
//     worker.job2();
//     worker.job1();
//     worker.job2();

//     console.log(worker);

//     var custom = function () {

//         var firstName = "Shubham";
//         var lastName = "Sinha";
//         var technology = "ServiceNow";
//         var position = "Junior Associate";

//         return {
//             firstName: firstName, lastName: lastName, technology: technology, position: position
//         };
//     };

//     var a = custom();

//     console.log(a);

// }());


// // Important

var app = angular.module("myApp", []);

app.controller("newApp", function($scope) {
    $scope.name = { firstName: "shubham", lastName: "sinha" };
    $scope.firstName = "shubham";
    $scope.lastName = "sinha";
    console.log($scope.firstName + " from newApp");
});


app.controller("HelloWorldCtrl", function($scope) {
    $scope.name = "shubham";
    $scope.message = "Hello";
    console.log($scope.message + " from HelloWorldCtrl");
});

app.controller("team", function($scope) {
    $scope.name = ["Shubham Sinha", "Arun Singh", "Harish Kumar", "Shivam Bhatnagar"];
});

app.controller("array", function($scope) {
    $scope.names = [
        { firstName: "Shubham ", lastName: "Sinha" },
        { firstName: "Harish", lastName: "Kumar" },
        { firstName: "Shivam ", lastName: "Bhatnagar" },
        { firstName: "Praveen ", lastName: "Kumar" }
    ]
});

app.controller("image", function($scope) {
    $scope.source = "wpaper.jpg";
    $scope.description = "Boxing Image";
});


app.controller("userName", function($rootScope, $scope, $http) {

    $rootScope.$on("CallSearchMethod", function() {
        $scope.search($scope.userName);
        console.log($scope.userName);
        return $scope.userName;
    });

    $scope.userName = "";

    $scope.search = function(username) {
        $http.get("https://api.github.com/users/" + username).then(function(response) {
            $scope.user = true;
            console.log(response.data);
            $scope.userData = response.data;
            $http.get(response.data.repos_url).then(function(response) {
                $scope.repos = response.data;
                console.log($scope.repos);
            })
        }, function(reason) {
            $scope.user = false;
            $scope.error = "No user with this name";
        });
    }
});

app.controller("countDown", function($rootScope, $scope, $interval) {
    var countDown = function() {
        $scope.countDown -= 1;
        $scope.message = "Either you search or i search for you!"
        if ($scope.countDown < 1) {
            $rootScope.$emit("CallSearchMethod", {})
                // console.log();
            console.log("Function is working");
        }
    }
    $scope.countDown = 5;

    // $interval(countDown, 1000, 5);


});
// app.controller('myController', function ($scope, $http) {

//     var request = {
//         method: 'get',
//         url: 'data.json',
//         dataType: 'json',
//         contentType: "application/json"
//     };

//     $scope.arrBirds = new Array;

//     $http(request).success(function (jsonData) {
//         $scope.arrBirds = jsonData;
//         $scope.list = $scope.arrBirds;
//         console.log("inside the json call");
//         console.log($scope);
//     })
//         .error(function () {

//         });
// });


//Many things were forbidden and probably wouldn't have worked
// app.controller("jsonFetch", function($scope, $http){
//     console.log("Inside Controller");
//     $http({
//         method: 'POST',
//         url: 'https://api.github.com/users/odetocode',
//         dataType:"json", 
//     }).then(function(data){
//         console.log("Getting the data!");
//         $scope.id = data.id;
//         console.log($scope.id);
//         console.log("Inside the JSON Response!");
//     });
// });



//worked the first time and then it got forbidden

app.controller("jsonFetch", function($scope, $http) {
    $http.get("https://api.github.com/users/odetocode").then(function(response) {
        console.log("Getting the data");
        $scope.userData = response.data;
        console.log($scope.userData);
    });
});