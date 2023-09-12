(() => {

  let app = angular.module("AddressBook", [
    "ngRoute",
    "AddressBook.controllers",
    "AddressBook.filters",
  ]);

  app.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/contacts.html",
        controller: "ctrlContacts",
      })
      .when("/contact-list", {
        templateUrl: "views/contacts-list.html",
        controller: "ctrlContacts",
      })
      .when("/details/:id", {
        templateUrl: "views/contact-details.html",
        controller: "ctrlContactDetails",
      })
      .when("/add-new", {
        templateUrl: "views/add-new-contact.html",
        controller: "ctrlAddNew",
      })
      .when("/edit/:id", {
        templateUrl: "views/edit-contact.html",
        controller: "ctrlEdit",
      })
      .otherwise({
        templateUrl: "views/404.html",
      });
  });

  app.run(function ($rootScope, $http) {
    $rootScope.contacts = [];
    // API call to fetch data
    // $http.get("http://localhost/contactApp/getContactList.php").then(
    $http.get("persons.json").then(
      function (res) {
        // success
        // console.log(res.data);
        $rootScope.contacts = res.data;
      },
      function (res) {
        // failure
      }
    );
  });

})();
