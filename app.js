// animation setup
function isInViewport(element, X_or_Y) {
  const rect = element.getBoundingClientRect();
  if(X_or_Y == "x"){
    return (
      rect.top <= ((window.innerHeight || document.documentElement.clientHeight) - 25)
    );
  }else{
    return(
      rect.top <= ((window.innerHeight || document.documentElement.clientHeight) + 50)
    )
  }
}
const animLeft = document.querySelectorAll(".fade-left");
const animRight = document.querySelectorAll(".fade-right");
const animBottom = document.querySelectorAll(".fade-bottom");
function fade(){
  animLeft.forEach((anim) => {
    if(!anim.classList.contains("fade") && isInViewport(anim,"x")){
      anim.classList.add("fade");
    }
  });
  animRight.forEach((anim) => {
    if(!anim.classList.contains("fade") && isInViewport(anim,"x")){
      anim.classList.add("fade");
    }
  });
  animBottom.forEach((anim) => {
    if(!anim.classList.contains("fade") && isInViewport(anim,"y")){
      anim.classList.add("fade");
    }
  });
};
const logo = document.querySelector(".logo-name");
logo.ontransitionend = function(){
  this.classList.add("logo-anim")
}
// end animation setup
const popup = document.querySelector(".popup");
window.onload = function () {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-off");
  loader.ontransitionend = function () {
    loader.style.display = "none";
  };
  popup.classList.add("dgrid");
  setTimeout(()=>{
    fade();
  },700)
  downloadImage();
};
function downloadImage() {
  const sec5 = document.querySelector("#sec-5");
  const workDiv = sec5.querySelectorAll(".work");
  const siteIMGArr = [];
  workDiv.forEach((work) => {
    siteIMGArr.push(work.dataset.img);
  });
  let num = 0;
  siteIMGArr.forEach((src) => {
    let downloadImg = new Image();
    downloadImg.onload = function () {
      const img = document.createElement("img");
      img.alt = "website";
      img.src = this.src;
      workDiv[num].appendChild(img);
      workDiv[num].classList.add("work-h-remove");
      num++;
    };
    downloadImg.src = src;
  });
}
const recentWork = document.querySelector(".recent-work");
recentWork.onclick = function () {
  const sec5 = document.querySelector("#sec-5");
  const s5info = sec5.getBoundingClientRect();
  window.scrollBy({
    top: s5info.top,
    left: 0,
    behavior: "smooth",
  });
};
// theme change=========================
const roundBtn = document.querySelector(".btn-inside");
const themeImg = roundBtn.querySelector("img");
const btnOutside = document.querySelector(".btn-outside");
if (theme === "dark") {
  themeAdd();
} else {
  themeRemove();
}
roundBtn.addEventListener("click", function () {
  const a = themeImg.src.split("/");
  const imgSrc = a[a.length - 1];
  if (imgSrc == "moon.svg") {
    themeAdd();
    modeAdder("dark");
  } else {
    themeRemove();
    modeAdder("light");
  }
});
function themeAdd() {
  roundBtn.classList.add("inside-active");
  themeImg.src = "images/sun.svg";
  btnOutside.classList.add("outside-active");
}
function themeRemove() {
  roundBtn.classList.remove("inside-active");
  themeImg.src = "images/moon.svg";
  btnOutside.classList.remove("outside-active");
}
function modeAdder(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
// nav position change
const menuBar = document.querySelector(".menu-bar");
const mode = menuBar.querySelector(".mode");
window.onscroll = function () {
  const y = this.scrollY;
  if (y >= 15) {
    menuBar.classList.add("menu-active");
    mode.classList.add("mode-active");
  } else {
    menuBar.classList.remove("menu-active");
    mode.classList.remove("mode-active");
  }
  fade();
};
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
// page edit=================================
const editBtn = document.querySelector(".edit-page");
const rcs = document.querySelector(".reset-cancel-save");
editBtn.addEventListener("click", () => {
  const cancel = document.querySelector(".cancel");
  const yes = document.querySelector(".yes");
  popup.classList.add("popup-active");
  cancel.addEventListener("click", () => {
    popup.classList.remove("popup-active");
    edit = false;
  });
  yes.addEventListener("click", () => {
    popup.classList.remove("popup-active");
    const edPopup = document.querySelector(".educational-popup");
    edPopup.classList.add("ed-popup-active");
    edit = true;
    rcs.classList.add("rcs-active");
    setTimeout(() => {
      edPopup.classList.remove("ed-popup-active");
    }, 5000);
  });
});
const rcsCancel = rcs.querySelector(".cancel-edit");
rcsCancel.addEventListener("click", () => {
  edit = false;
  editPopupPos("-100%", "-100%");
  rcs.className = "reset-cancel-save uneditable";
});
const resetStyle = rcs.querySelector(".reset-style");
resetStyle.addEventListener("click", () => {
  localStorage.removeItem("CSSJSON");
  window.location.reload();
});
const rcsSave = document.querySelector(".save-edit");
const editPopup = document.querySelector(".main-edit-popup");
const closeEdit = editPopup.querySelector(".close-editor");
const position = editPopup.querySelector(".position");
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function removeAttr(element, attrname) {
  element.removeAttribute(attrname);
}
function addAttr(element, attr, value) {
  element.setAttribute(attr, value);
}
let elm;
const inFSize = document.querySelector(".in-font-size");
const inColor = document.querySelector(".in-color");
const inFWeight = document.querySelector(".in-font-weight");
const fFamily = document.querySelector(".font-family");
const inLetterSpacing = document.querySelector(".in-letter-spacing");
const inTextTransform = document.querySelector(".in-text-transform");
const inTextAlign = document.querySelector(".in-text-align");
const styleBox = document.querySelector(".style-boxes");
const bold = styleBox.querySelector(".bold");
const italic = styleBox.querySelector(".italic");
const underline = styleBox.querySelector(".underline");
const overline = styleBox.querySelector(".overline");
const del = styleBox.querySelector(".delete");
const tempJSON = {
  unique: false,
  identify: {
    className: "",
    tag: "",
    parent: "",
    section: "",
    sectionTag: "",
  },
  css: false,
};
document.addEventListener("click", (e) => {
  if (edit) {
    const el = e.target;
    if (
      !el.classList.contains("yes") &&
      !el.classList.contains("cancel") &&
      !el.classList.contains("snone") &&
      !el.classList.contains("uneditable")
    ) {
      if (
        el.innerText !== "" &&
        !el.classList.contains("main-edit-popup") &&
        !editPopup.contains(el)
      ) {
        elm = el;
        const parents = ["section", "nav", "footer"];
        parents.forEach((p) => {
          if (el.closest(p) !== undefined && el.closest(p) !== null) {
            tempJSON.identify.section = el.closest(p);
          }
        });
        tempJSON.identify.sectionTag =
          tempJSON.identify.section.tagName.toLowerCase();
        if (tempJSON.identify.section.id) {
          tempJSON.identify.section = "#" + tempJSON.identify.section.id;
        } else {
          tempJSON.identify.section = "";
        }
        tempJSON.identify.tag = e.target.tagName.toLowerCase();
        if (e.target.className) {
          const classLen = e.target.classList.length;
          tempJSON.unique = true;
          tempJSON.identify.parent = "";
          let targetedEl;
          if (classLen === 1) {
            targetedEl = document.querySelector("." + e.target.className);
            tempJSON.identify.className = "." + e.target.className;
          } else {
            targetedEl = document.querySelector("." + e.target.classList[1]);
            tempJSON.identify.className = "." + e.target.classList[1];
          }
        } else {
          tempJSON.identify.className = "";
          tempJSON.unique = false;
          if (e.target.parentElement.className) {
            tempJSON.identify.parent = "." + e.target.parentElement.className;
          } else if (e.target.parentElement.parentElement.className) {
            tempJSON.identify.parent =
              "." + e.target.parentElement.parentElement.className;
          } else {
            tempJSON.identify.parent = "";
          }
        }
        const fontSize = window
          .getComputedStyle(el, null)
          .getPropertyValue("font-size");
        const color = window
          .getComputedStyle(el, null)
          .getPropertyValue("color");
        const fontFamily = window
          .getComputedStyle(el, null)
          .getPropertyValue("font-family");
        const fontWeidth = window
          .getComputedStyle(el, null)
          .getPropertyValue("font-weight");
        const letterSpacing = window
          .getComputedStyle(el, null)
          .getPropertyValue("letter-spacing");
        const textTransform = window
          .getComputedStyle(el, null)
          .getPropertyValue("text-transform");
        const textAlign = window
          .getComputedStyle(el, null)
          .getPropertyValue("text-align");
        const fontStyle = window
          .getComputedStyle(el, null)
          .getPropertyValue("font-style");
        const fWeightOption = inFWeight.querySelector(
          `option[value="${fontWeidth}"]`
        );
        const oldFWOSelected = inFWeight.querySelector(
          `option[selected="true"]`
        );
        const oldTTSelected = inTextTransform.querySelector(
          `option[selected="true"]`
        );
        const tTOption = inTextTransform.querySelector(
          `option[value="${textTransform}"]`
        );
        let tAoption = "";
        if (inTextAlign.querySelector(`option[value="${textAlign}"]`)) {
          tAoption = inTextAlign.querySelector(`option[value="${textAlign}"]`);
        } else {
          tAoption = inTextAlign.querySelector('option[value="custom"]');
          tAoption.innerText = textAlign;
          tAoption.value = textAlign;
        }
        const oldTAOSelected = inTextAlign.querySelector(
          'option[selected="true"]'
        );
        inLetterSpacing.value = letterSpacing;
        removeAttr(oldTAOSelected, "selected");
        addAttr(tAoption, "selected", "true");
        removeAttr(oldTTSelected, "selected");
        addAttr(tTOption, "selected", "true");
        removeAttr(oldFWOSelected, "selected");
        addAttr(fWeightOption, "selected", "true");
        if (fontWeidth == "700" || fontWeidth == "bold") {
          bold.classList.add("style-box-active");
        } else {
          bold.className = "bold";
        }
        if (fontStyle == "italic") {
          italic.classList.add("style-box-active");
        } else {
          italic.className = "italic";
        }
        if (elm.style.textDecoration == "underline") {
          underline.classList.add("style-box-active");
        } else {
          underline.className = "underline";
        }
        if (elm.style.textDecoration == "overline") {
          overline.classList.add("style-box-active");
        } else {
          overline.className = "overline";
        }
        if (elm.style.textDecoration == "line-through") {
          del.classList.add("style-box-active");
        } else {
          del.className = "delete";
        }
        fFamily.innerText = fontFamily;
        inFSize.value = parseInt(fontSize);
        const rgbArr = color.slice(4).split(",");
        const rgb = [];
        rgbArr.forEach((c) => {
          rgb.push(parseInt(c));
        });
        inColor.value = rgbToHex(rgb[0], rgb[1], rgb[2]);
        editPopupPos(e.y + "px", e.x + "px");
      } else {
        if (
          !el.classList.contains("main-edit-popup") &&
          !editPopup.contains(el)
        ) {
          editPopupPos("-100%", "-100%");
        }
      }
    }
  }
});
closeEdit.addEventListener("click", () => editPopupPos("-100%", "-100%"));
function editPopupPos(top, left) {
  editPopup.style.transform = `translate(${left}, ${top})`;
  editPopup.style.top = 0;
  editPopup.style.left = 0;
}
// all input setup===================================
inFSize.addEventListener("change", function () {
  elm.style.fontSize = this.value + "px";
  editStore("fontSize", this.value + "px");
});
inColor.addEventListener("input", function () {
  elm.style.color = this.value;
  editStore("color", this.value);
});
inFWeight.addEventListener("change", function () {
  elm.style.fontWeight = this.value;
  editStore("fontWeight", this.value);
});
inLetterSpacing.addEventListener("input", function () {
  elm.style.letterSpacing = this.value;
  editStore("letterSpacing", this.value);
});
inTextTransform.addEventListener("change", function () {
  elm.style.textTransform = this.value;
  editStore("textTransform", this.value);
});
inTextAlign.addEventListener("change", function () {
  elm.style.textAlign = this.value;
  editStore("textAlign", this.value);
});
bold.addEventListener("click", () => {
  styleBoxClss(bold, "fontWeight", "bold");
});
italic.addEventListener("click", () => {
  styleBoxClss(italic, "fontStyle", "italic");
});
underline.addEventListener("click", () => {
  styleBoxClss(underline, "textDecoration", "underline");
});
overline.addEventListener("click", () => {
  styleBoxClss(overline, "textDecoration", "overline");
});
del.addEventListener("click", () => {
  styleBoxClss(del, "textDecoration", "line-through");
});
function styleBoxClss(e, property, value) {
  if (
    e.classList.contains("underline") ||
    e.classList.contains("overline") ||
    e.classList.contains("delete")
  ) {
    underline.className = "underline";
    overline.className = "overline";
    del.className = "delete";
  }
  e.classList.toggle("style-box-active");
  let s = e.classList.contains("style-box-active") ? value : "unset";
  elm.style[property] = s;
  editStore(property, s);
}
let mainJSON = []; // main json file this has all of data
if (localStorage.getItem("CSSJSON")) {
  const cssJSON = JSON.parse(localStorage.getItem("CSSJSON"));
  mainJSON = cssJSON;
  cssJSON.forEach((eachEl) => {
    const identify = document.querySelector(eachEl.identify);
    const css = eachEl.css;
    identify.style.fontSize = css.fontSize;
    identify.style.color = css.color;
    identify.style.fontWeight = css.fontWeight;
    identify.style.letterSpacing = css.letterSpacing;
    identify.style.textTransform = css.textTransform;
    identify.style.textAlign = css.textAlign;
    identify.style.fontStyle = css.fontStyle;
    identify.style.textDecoration = css.textDecoration;
  });
}
function editStore(property, value) {
  const identify =
    tempJSON.identify.sectionTag +
    tempJSON.identify.section +
    " " +
    tempJSON.identify.parent +
    " " +
    tempJSON.identify.tag +
    tempJSON.identify.className;
  const oldOne = mainJSON.find((x) => x.identify === `${identify}`);
  let editJSON;
  if (oldOne) {
    oldOne.css[property] = value;
  } else {
    editJSON = {
      identify: identify,
      css: {
        fontSize: "",
        color: "",
        fontWeight: "",
        letterSpacing: "",
        textTransform: "",
        textAlign: "",
        fontStyle: "",
        textDecoration: "",
      },
    };
    editJSON.css[property] = value;
    mainJSON.push(editJSON);
  }
}
// editor window position setup===================================
document.addEventListener("touchstart", dragStart);
document.addEventListener("touchend", dragEnd);
document.addEventListener("touchmove", drag);
document.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);
document.addEventListener("mousemove", drag);

var active = false;
var currentX, currentY, initialX, initialY, pX, pY;
var xOffset = 0;
var yOffset = 0,
  draging = false;
position.addEventListener("mousedown", (e) => {
  pX = e.offsetX;
  pY = e.offsetY;
  draging = true;
});
position.addEventListener("touchstart", (e)=>{
  const pVal = position.getBoundingClientRect();
  pX = e.touches[0].clientX - pVal.left;
  pY = e.touches[0].clientY - pVal.top;
});
function dragStart(e) {
  if (edit) {
    editPopup.style.transition = "unset";
    if (e.type === "mousedown") {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    } else {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    }
    if (e.target === position) {
      active = true;
    }
  }
}
function dragEnd() {
  if (edit) {
    editPopup.style.transition = "";
    initialX = currentX;
    initialY = currentY;
    active = false;
  }
}
function drag(e) {
  if (edit) {
    if (active) {
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, editPopup);
    }
  }
}
function setTranslate(xPos, yPos, el) {
  el.style.transform =
    "translate(" +
    (xPos + (initialX - pX)) +
    "px, " +
    (yPos + (initialY - pY)) +
    "px)";
}
// document key setup
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 90) {
    edit = false;
    editPopupPos("-100%", "-100%");
  }
  if (e.ctrlKey && e.keyCode == 83) {
    e.preventDefault();
    if (edit && mainJSON.length !== 0) {
      localStorage.setItem("CSSJSON", JSON.stringify(mainJSON));
    } else {
      alert("You haven't changed anything..");
    }
  }
};
rcsSave.addEventListener("click", (e) => {
  if (edit && mainJSON.length !== 0) {
    localStorage.setItem("CSSJSON", JSON.stringify(mainJSON));
  } else {
    alert("You haven't changed anything..");
  }
  edit = false;
  editPopupPos("-100%", "-100%");
  rcs.className = "reset-cancel-save uneditable";
});
// form submission
const name = document.querySelector(".name"),
  phone = document.querySelector(".phone"),
  email = document.querySelector(".email"),
  subject = document.querySelector(".subject"),
  message = document.querySelector(".message"),
  submitButton = document.querySelector(".form-submit");
submitButton.addEventListener("click", () => {
  const submitText = submitButton.querySelector(".submit-text");
  const submitLoader = submitButton.querySelector(".submit-loader");
  if (name.value !== "" && email.value !== "" && message.value !== "") {
    const xht = new XMLHttpRequest();
    submitText.style.display = "none";
    submitLoader.classList.add("submit-loader-active");
    xht.onload = function () {
        if(this.responseText == "ok"){
            name.value = "";
            phone.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
            submitText.style.display = "";
            submitLoader.className = "submit-loader";
            alert("Thank You!\nYour message has been sent");
            window.scrollTo({top:0,left:0,behavior: 'smooth'});
        }else{
            alert("Cannot Send Message!\nPlease try again later...");
        }
    };
    xht.open("POST", "submit.php", true);
    xht.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xht.send(
      `name=${name.value}&phone=${phone.value}&email=${email.value}&subject=${subject.value}&message=${message.value}`
    );
  } else {
    alert("Fill the input field...");
  }
});
document.querySelectorAll(".work").forEach((work) => work.addEventListener("click", function(){
  window.location = this.dataset.sitesrc;
}));
// more projects
const moreProjects = document.querySelector(".more-projects");
moreProjects.addEventListener("click", ()=>{
  const projectsContainer = document.querySelector(".more-projects-container");
  const projectsWrapperH = projectsContainer.querySelector(".projects-main-wrapper").getBoundingClientRect().height;
  moreProjects.classList.toggle("more-projects-active");
  if(moreProjects.classList.contains('more-projects-active')){
    projectsContainer.style.height = projectsWrapperH + "px";
  }else{
    projectsContainer.style.height = "0";
  }
});



// 19/10/2024 update
window.addEventListener('load', () => {
  alert("This is my old portfolio, recently i lost my server so i've to use this old portfolio with github free hosting")
})