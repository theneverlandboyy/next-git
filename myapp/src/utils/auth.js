

import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

const emptyAuth = {
  "token": "",
  "userId": ""
}

export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  return true
}

export function getUserId() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));

      return true
    }

    return false
  } catch {
    return false
  }
}

export async function authenticateUser(username, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: username,
        password
      })
    }
  );

  const res = await resp.json();

  if (resp.status == 200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.token,
      "userId": res.record.id
    }));

    return {
      success: true,
      res: res
    }
  }

  return {
    success: false,
    res: res
  }
}

//


// const createJobLink = document.getElementById("create-job-link");

// if (!isLoggedIn) {
//   createJobLink.style.display = "none"; //hide the link
//   document.getElementById("sign-in-link").style.display = "block"; // Show the sign-in link
// }

// showAlert("Authentication failed. Please try again.", "error");
// function showAlert(message, type) {
//   const alertElement = document.getElementById("alert");
//   alertElement.textContent = message;
//   alertElement.className = `alert ${type}`;
//   alertElement.style.display = "block";

//   setTimeout(() => {
//     alertElement.style.display = "none";
//   }, 3000);
// }
