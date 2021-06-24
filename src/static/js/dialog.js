let Dialog = {
  openIdx: 0,
  init: function(option,size) {
    let modalWrap =$(".modal_wrap");
    let overlay;
    let motion = '';
    let w_size = size
    console.log(option)
    if(option.overlay) overlay = 'has_overlay';
    else overlay = '';
    if(option.motion !== '') motion = 'has_motion ' +  option.motion
    modalWrap.addClass("is_show " + overlay + ' '+ motion);
    modalWrap.addClass("w_" + w_size);
    let html = "";
    html += "<div class=\"modal\" dialog-idx=\"" + this.openIdx + "\">";
    html += "<div class=\"modal_inner\">";
    html += "<div class=\"modal_body\">";
    if (option.title) {
      html += "<p class=\"ttl\">" + option.title + "</p>";
    }
    html += "<p class=\"txt\">" + option.msg + "</p>";
    html += "</div>";
    html += "<div class=\"modal_foot\">";
    html += "<div class=\"btn_area full_btn_area grid grid_5\">";
    if (option.btns.cancel) {
      html += "<button type=\"button\" class=\"btn h_m line w_m col col_6 confirm\" dialog-btn=\"cancel\">" + option.btns.cancel.label + "</button>";
      html += "<button type=\"button\" class=\"btn h_m strong w_m col col_6 confirm\" dialog-btn=\"ok\">" + option.btns.submit.label + "</button>";
    }
    else {
      html += "<button type=\"button\" class=\"btn h_m strong w_m col col_12 confirm\" dialog-btn=\"ok\">" + option.btns.submit.label + "</button>";
    }
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    modalWrap.append(html);
    $("[dialog-btn=\"ok\"]").bind("click", function() {
      option.btns.submit.onClick();
    });
    if (option.btns.cancel) {
      $("[dialog-btn=\"cancel\"]").bind("click", function() {
        option.btns.cancel.onClick();
      });
    }
    if(motion !== '') {
      setTimeout(function(){
        modalWrap.addClass('is_on')
      }, 10)
    }
    isModal();
    this.openIdx++;
  },
  close: function(dialog) {
    $(dialog).closest('.modal_wrap').removeClass().addClass('modal_wrap');
    $(dialog).remove();
    isModal();
  },
  alert: function(msg, fnc, opt, size) {
    let option = {};
    let dialog = "[dialog-idx=" + this.openIdx + "]";
    let that = this;
    let w_size
    w_size = size
    opt = (opt == undefined) ? {} : opt;
    option.motion = (opt.motion != undefined) ? opt.motion : '';
    option.overlay = (opt.overlay != undefined) ? opt.overlay : false;
    option.title = (opt.title != undefined) ? opt.title : "";
    option.btns = (opt.btns == undefined) ? {
      submit: {
        label: "확인",
        onClick: function() {
          if (typeof fnc == "function") {
            fnc();
          }
          that.close(dialog);
        },
      },
    } : opt.btns;
    console.log(option.btns.submit.onClick);
    if (!option.btns.submit.onClick) {
      option.btns.submit.onClick = function() {
        if (typeof fnc == "function") {
          fnc();
        }
        that.close(dialog);
      };
    }
    option.msg = msg;
    this.init(option,w_size);
  },
  confirm: function(msg, fnc, cancelFnc, opt,size) {
    let option = {};
    let dialog = "[dialog-idx=" + this.openIdx + "]";
    let that = this;
    let w_size
    w_size = size
    opt = (opt == undefined) ? {} : opt;
    option.motion = (opt.motion != undefined) ? opt.motion : '';
    option.overlay = (opt.overlay != undefined) ? opt.overlay : "";
    option.title = (opt.title != undefined) ? opt.title : "";
    option.btns = (opt.btns == undefined) ? {
      submit: {
        label: "확인",
        onClick: function() {
          if (typeof fnc == "function") {
            fnc();
          }
          that.close(dialog);
        },
      }, cancel: {
        label: "취소",
        onClick: function() {
          if (typeof cancelFnc == "function") {
            cancelFnc();
          }
          that.close(dialog);
        },
      },
    } : opt.btns;
    if (!option.btns.submit.onClick) {
      option.btns.submit.onClick = function() {
        if (typeof fnc == "function") {
          fnc();
        }
        that.close(dialog);
      };
    }
    if (!option.btns.cancel.onClick) {
      option.btns.cancel.onClick = function() {
        if (typeof cancelFnc == "function") {
          cancelFnc();
        }
        that.close(dialog);
      };
    }
    option.msg = msg;
    this.init(option,w_size);
  },
};

function isModal() {
  let modals = document.querySelectorAll(".modal_wrap");
  if(modals.length < 1) return
  let html = document.querySelector("html");
  for (let i = 0; i < modals.length; i++) {
    if (modals[i].classList.contains("is_show")) {
      html.style.overflow = "hidden";
      break;
    } else {
      html.style.overflow = "auto";
    }
  }
  if (modals.length < 1) {
    html.style.overflow = "auto";
  }
}

// Snackbar
let snackbarNo = 0;
const openSnackbar = function(text){
  const beforeSnack = document.querySelector('.snackbar_area[data-snackno="'+ snackbarNo +'"]')
  if(beforeSnack) beforeSnack.remove()
  snackbarNo += 1;
  const snackWrap = document.querySelector('.snackbar_wrap')
  let snack = document.createElement('div')
  let snackClose = document.createElement('button')
  let snackCloseIcon = document.createElement('i')

  snack.textContent = text;
  snack.classList.add('snackbar_area');
  snackClose.classList.add('close_snack');
  snackCloseIcon.classList.add('ic_close_w');
  snackCloseIcon.classList.add('ic');
  snack.setAttribute('data-snackno', snackbarNo);
  snack.appendChild(snackClose);
  snackClose.appendChild(snackCloseIcon);
  snackWrap.appendChild(snack);
  snackClose.addEventListener('click', function (){
    snack.remove()
  })

  setTimeout(removeSnackbar, 100000, snackbarNo);
}
function removeSnackbar(no){
  document.querySelector('.snackbar_area[data-snackno="'+ no +'"]').remove()
}


