angular
  .module("AddressBook.filters", [])
  .filter("firstChar", function () {
    return function (name) {
      return name[0];
    };
  })
  .filter("searchFilter", function () {
    return function (contacts, searchType, searchText) {
      if (searchText == "")
        return contacts;
      let searchRegExp = new RegExp(searchText,"i");
      return contacts.filter((contact) => {
        switch (searchType) {
          case "name":
            return searchRegExp.test(
              contact.title + " " + contact.first_name + " " + contact.last_name
            );
          case "city":
            return searchRegExp.test(contact.address.city);
          case "state":
            return searchRegExp.test(contact.address.state);
        }
      });
    };
  });
