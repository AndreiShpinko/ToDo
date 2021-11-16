let addBtn = document.querySelector('[data-info = add]');

addBtn.addEventListener('click', () => {
  if (document.querySelector('[data-info = add-input]').value.trim().length) {
    let text = `<div class="business">
    <input type="text" value="${document.querySelector('[data-info = add-input]').value.trim()}" disabled class="business__text" />
    <div class="btns">
    <button data-info="edit" class="business__edit"><i class="fas fa-pencil-alt"></i></button>
    <button data-info="delete" class="business__delete"><i class="far fa-trash-alt"></i></button>
    <button data-info="check" data-status="not-done" class="business__check"><i class="fas fa-check"></i></button>
    </div>
    </div>`;
    document.querySelector('.not-done').innerHTML += text;
    clickEditBtn();
    clickDeleteBtn();
    clickCheckBtn();
  }
  else if (!document.querySelector('.header.wrong')) {
    document.querySelector('[data-info = add-input]').classList.add('wrong');
    document.querySelector('.header').classList.add('wrong');
    setTimeout(() => {
      document.querySelector('[data-info = add-input]').classList.remove('wrong');
      document.querySelector('.header').classList.remove('wrong');
    }, 2000);
  }
  document.querySelector('[data-info = add-input]').value = "";
});

function clickEditBtn() {
  document.querySelectorAll("[data-info = edit]").forEach((el) => {
    if (!el.onclick) {
      el.onclick = () => {
        let businessEl = el.closest('.business');
        if (el.dataset.status == "active") {
          el.dataset.status = "";
          businessEl.querySelector("input").setAttribute("disabled", "");
          businessEl.querySelector("[data-info = delete]").removeAttribute("disabled");
          businessEl.querySelector("[data-info = check]").removeAttribute("disabled");
        } else {
          el.dataset.status = "active";
          businessEl.querySelector("input").removeAttribute("disabled");
          let value = businessEl.querySelector("input").value;
          businessEl.querySelector("input").value = ''
          businessEl.querySelector("input").focus();
          businessEl.querySelector("input").value = value;
          businessEl.querySelector("[data-info = delete]").setAttribute("disabled", "");
          businessEl.querySelector("[data-info = check]").setAttribute("disabled", "");
        }
      }
    }
  });
}

function clickDeleteBtn() {
  document.querySelectorAll("[data-info = delete]").forEach((el) => {
    if (!el.onclick) {
      el.onclick = () => {
        el.closest('.business').remove();
      }
    }
  });
}

function clickCheckBtn() {
  document.querySelectorAll("[data-info = check]").forEach((el) => {
    if (!el.onclick) {
      el.onclick = () => {
        let businessEl = el.closest('.business');
        if (el.dataset.status == 'not-done') {
          el.dataset.status = 'done';
          let newEl = businessEl.cloneNode(true); 
          businessEl.remove();
          document.querySelector('.done').prepend(newEl);
        }
        else {
          el.dataset.status = 'not-done';
          let newEl = businessEl.cloneNode(true); 
          businessEl.remove();
          document.querySelector('.not-done').prepend(newEl);
        }
        clickEditBtn();
        clickDeleteBtn();
        clickCheckBtn();
      }
    }
  });
}

clickEditBtn();
clickDeleteBtn();
clickCheckBtn();