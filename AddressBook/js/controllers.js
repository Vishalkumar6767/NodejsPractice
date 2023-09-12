angular
  .module("AddressBook.controllers", [])
  .controller("ctrlContacts", function ($scope,$rootScope) {
    $scope.orderByField = "title";
    $scope.reverseOrder = false;
    $scope.searchType = "name";
    $scope.searchText = "";

    $scope.customOrderBy = (field) => {
      if ($scope.orderByField == field)
        $scope.reverseOrder = !$scope.reverseOrder;
      else {
        $scope.orderByField = field;
        $scope.reverseOrder = false;
      }
    };
    $scope.deleteContact = function (id) {
      //TODO api call to delete a person
      let idx = $rootScope.contacts.findIndex((contact) => {
        return contact.id == id;
      });
      $rootScope.contacts.splice(idx, 1);

    }
  })
  .controller(
    "ctrlContactDetails",
    function ($rootScope, $scope, $routeParams, $http,$location) {
      let id = $routeParams.id;
      // API call for person details
      // $http.get("http://localhost/contactApp/getContactDetails.php?id="+id).then(
      //   function (res) {
      //     // success
      //     // console.log(res.data);
      //     $scope.contact = res.data;
      //   },
      //   function (res) {
      //     // failure
      //   }
      // );
      $scope.contact = $rootScope.contacts.find((contact) => {
        return contact.id == id;
      });
      $scope.deleteContact = function (id) {
        // TODO api call to delete a person
        let idx = $rootScope.contacts.findIndex((contact) => {
          return contact.id == id;
        });
        $rootScope.contacts.splice(idx, 1);
        $location.path("/");

      };
    }

  )
  .controller("ctrlAddNew", function ($rootScope, $scope, $location) {
    $scope.newContact = {};
    $scope.addContact = function () {
      // TODO api call to save data
      // generating dummy id
      $scope.newContact.id = $rootScope.contacts.length + 5;
      $rootScope.contacts.push($scope.newContact);
      $location.path("/");

    }
  })
  .controller("ctrlEdit", function ($scope, $rootScope, $routeParams, $location) {
    let id = $routeParams.id;
    let existingContact = $rootScope.contacts.find((contact) => {
      return contact.id == id;
    });
    $scope.contact = angular.copy(existingContact);
    $scope.updateContact = function () {
      // TODO api call to save data
      let idx = $rootScope.contacts.findIndex((contact) => {
        return contact.id == id;
      });
      $rootScope.contacts.splice(idx, 1, $scope.contact);
      $location.path("/");
    };
  })
  ;
