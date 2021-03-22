const api_url = (username) => `https://api.github.com/users/${username}/repos`;
const submitButton = document.querySelector("#submit-button");
const mainContainer = document.querySelector("#main");

function parseHTML(html) {
  var t = document.createElement("template");
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

// Search method
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  let username = document.querySelector("#username").value;
  mainContainer.innerHTML = "";

  fetch(api_url(username))
    .then((response) => {
      if (response.status == 200) return response.json();
      else throw new Error("Repository not found");
    })
    .then((json) => {
      mainContainer.append(
        parseHTML(
          `<h2>${json.length} repositories were found from ${username}</h2>`
        )
      );

      for (let repo of json) {
        repoSection = parseHTML(`
        <section>
            <h1>${repo.name}</h1>
            <p>
                ${repo.description}
            </p>
            <div class="flex">
                <p>Created at: ${repo.created_at}</p>
                <p>Updated at: ${repo.updated_at}</p>
            </div>
            <a href="${repo.url}" target="_blank">Acessar repositório</a>
        </section>
        `);

        mainContainer.append(repoSection);
      }
    })
    .catch((err) => {
      console.log(err);
      mainContainer.append(
        parseHTML(`
        <div class="error">
            <p>${err}</p>
        </div>
        `)
      );
    });
});
