const username = "oak-store";
const repo = "Oak-Web/";
const usermod = "aglsk/";
const baseUrl = "https://" + username + ".github.io/" + repo + usermod + "?id=";
const url = '../../../../../aglsk/?id=';

function detailsApp(id) {
  open(url + id);
}

function open(uri) {
  window.location.href = uri;
}