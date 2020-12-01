"use strict"

function app(people) {
  let searchType = promptFor("Would you like to search by 'name' or 'trait'?", nameTrait).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'name':
      searchResults = searchByName(people);
      break;
    case 'trait':
      searchResults = searchByTrait(people)
    default: app(people);
      break;

  }
  if (searchResults.length === 1) {
    mainMenu(searchResults[0], people);
    return app(people); // restart
  }
  else {
    displayPeople(searchResults);
    askViewDetails(searchResults);
  }
}

function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      getFamily(person, people);
      break;
    case "descendants":
      let foundDescendants = findDescendants(person, people);
      if (foundDescendants.length > 0) {
        displayPeople(foundDescendants);
        askViewDetails(foundDescendants);
      }
      else {
        alert("No Known Descendants.")
      }
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}

function searchByTrait(people) {
  let traitToSearchBy = promptFor("What trait would you like to search by?\nEnter 'gender' or 'height' or 'weight' or 'eyecolor' or occupation'", traitSelect).toLowerCase();
  var traitSearchResults;
  switch (traitToSearchBy) {
    case 'gender':
      traitSearchResults = searchByGender(people);
      matchesFound(traitSearchResults);
      searchAgain(traitSearchResults);
      break;
    case 'height':
      traitSearchResults = searchByHeight(people);
      matchesFound(traitSearchResults);
      searchAgain(traitSearchResults);
      break;
    case 'weight':
      traitSearchResults = searchByWeight(people);
      matchesFound(traitSearchResults);
      searchAgain(traitSearchResults);
      break;
    case 'eyecolor':
      traitSearchResults = searchByEyeColor(people);
      matchesFound(traitSearchResults);
      searchAgain(traitSearchResults);
      break;
    case 'occupation':
      traitSearchResults = searchByOccupation(people);
      matchesFound(traitSearchResults);
      searchAgain(traitSearchResults);
      break;
  }
}

function searchAgain(traitSearchResults) {
  let response = promptFor("Would you like to search further?\nEnter 'yes' or 'no'", yesNo).toLowerCase();
  let tempArray = traitSearchResults;
  switch (response) {
    case 'yes':
      searchByTrait(traitSearchResults);
      break;
    case 'no':
      displayPeople(tempArray);
      askViewDetails(traitSearchResults);
      break;
  }
}

function matchesFound(people) {
  let numMatches = people.length;
  alert(`${numMatches} Matches found`);
}

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.gender === gender) {
      return true;
    }
    else {
      return false;
    }
  })
  if (foundPerson == 0) {
    alert("No matches, returning to start.")
    return app(people);
  }
  else {
    return foundPerson;
  }
}

function searchByHeight(people) {
  let height = promptFor("What is the person's height(in inches)?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.height == height) {
      return true;
    }
    else {
      return false;
    }
  })
  if (foundPerson == 0) {
    alert("No matches, returning to start.");
    return app(people);
  }
  else {
    return foundPerson;
  }
}

function searchByWeight(people) {
  let weight = promptFor("What is the person's weight(in pounds)?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  })
  if (foundPerson == 0) {
    alert("No matches, returning to start.");
    return app(people);
  }
  else {
    return foundPerson;
  }
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  })
  if (foundPerson == 0) {
    alert("No matches, returning to start.");
    return app(people);
  }
  else {
    return foundPerson;
  }
}

function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", chars);
  let foundPerson = people.filter(function (person) {
    if (person.occupation === occupation) {
      return true;
    }
    else {
      return false;
    }
  })
  if (foundPerson == 0) {
    alert("No matches, returning to start.");
    return app(people);
  }
  else {
    return foundPerson;
  }
}

function findDescendants(person, people, descendants = []) {
  people.map(function (el) {
    if (el.parents.includes(person.id)) {
      descendants.push(el)
      return findDescendants(el, people, descendants);
    }
  });
  return descendants;
}

function findParents(person, people) {
  let parentals = people.filter(function (el) {
    if (el.id == person.parents) {
      return true;
    }
    else {
      return false;
    }
  });
  return parentals;
}

function findSpouse(person, people) {
  let spouse = people.filter(function (el) {
    if (el.id == person.currentSpouse) {
      return true;
    }
    else {
      return false;
    }
  });
  return spouse;
}

function findSiblings(person, people) {
  for (let i = 0; i < person.parents.length; i++) {
    var siblings = people.filter(function (el) {
      if ((person.parents[i] === el.parents[0] || person.parents[i] === el.parents[1]) && person.id !== el.id) {
        return true;
      }
      else {
        return false;
      }
    });

  }
  return siblings;
}

function getFamily(person, people) {
  let displayFamily = "";
  let parents = findParents(person, people);
  let spouse = findSpouse(person, people);
  let siblings = findSiblings(person, people);
  if (parents.length != 0) {
    parents.forEach(function (parent) {
      displayFamily += "Parents: " + parent.firstName + " " + parent.lastName + "\n";
    });
  }
  else {
    displayFamily += "Parents: No known parents.\n";
  }
  if (spouse.length != 0) {
    displayFamily += "Spouse: " + spouse[0].firstName + " " + spouse[0].lastName + "\n";
  }
  else {
    displayFamily += "Spouse: No known spouse.\n";
  }
  if (siblings != null) {
    siblings.forEach(function (sibling) {
      displayFamily += "Siblings: " + sibling.firstName + " " + sibling.lastName + "\n";
    });
  }
  else {
    displayFamily += "Siblings: No known siblings.\n";
  }
  displayFamily += "*****\nTo view the details of any found relatives, start a new search using their first and last name."
  alert(displayFamily);
}

function displayPeople(people) {
  alert(people.map(function (person) {
    var i = (people.indexOf(person) + 1);
    return i + ") " + person.firstName + " " + person.lastName;
  }).join("\n"));
}

function askViewDetails(people) {
  let response = promptFor("Would you like to view person detials?\nEnter 'yes' or 'no'", yesNo).toLowerCase();
  switch (response) {
    case 'yes':
      selectPerson(people);
      break;
    case 'no':
      return displayPeople(people);
  }
}

function selectPerson(people){
  alert("Take a look at the list again AND remember selection number");
  displayPeople(people);
  let response = promptFor("Input selection number", chars);
  displayPerson(people[response-1]);
}

function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

function nameTrait(input) {
  return input.toLowerCase() == "name" || input.toLowerCase() == "trait";
}
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function traitSelect(input) {
  return input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "height"
    || input.toLowerCase() == "weight" || input.toLowerCase() == "eyecolor" || input.toLowerCase() == "occupation"
    || input.toLowerCase() == "parents" || input.toLowerCase() == "spouse";
}
function chars(input) {
  return true;
}
