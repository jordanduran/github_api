$(function() {
  $("#user_form").submit(function(event) {
    event.preventDefault();
    let userInput = $("#user_input").val();
    let url = `https://api.github.com/users/${userInput}/repos`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`);
      });
  });
});

function displayResults(responseJson) {
    console.log(responseJson);
    let repoHtml = "";
    for (let i = 0; i < responseJson.length; i++) {
        repoHtml += `<div><h3>Name:</h3>${responseJson[i].name} <h3>URL:</h3>${responseJson[i].url}</div>`
    }
    console.log(repoHtml);
    $("#results").html(repoHtml);
}