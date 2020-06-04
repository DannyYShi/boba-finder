'use strict';

const apiKey = 'AIzaSyAa4hMa1A5TzCoiUdbP3NrS6zlyk5xVSGg';
const searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.results.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.results[i].name}</h3>
            <p>Google Rating: ${responseJson.results[i].rating}</p>
            <p>${responseJson.results[i].formatted_address}</p>
            </li>`)
  }
  $('#results').removeClass('hidden');
}

function getBoba(location, maxResults = 10) {
  const params = {
    key: apiKey,
    query: 'boba+in+' + $('#location').val(),
    //limit: maxResults
  }
  const queryString = formatQueryParams(params);
  const url = 'https://cors-anywhere.herokuapp.com/' + searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#location').val();
    const maxResults = $('#js-max-results').val();
    getBoba (searchTerm, maxResults);
  });
}

$(watchForm);