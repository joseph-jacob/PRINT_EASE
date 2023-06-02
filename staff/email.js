var email = sessionStorage.getItem("email")
var Fname = sessionStorage.getItem("Fname")
var price = sessionStorage.getItem("price")

var params = {
    email: email,
    Fname:Fname,
    price:price,
};

const serviceID = "service_lgqfta2";
const templateID = "template_cci5hjr";

emailjs.send(serviceID, templateID, params).then(
function (response) {
  console.log("SUCCESS!", response.status, response.text);
  window.location.href = pdfDownloadURL;
},
function (error) {
  console.log("FAILED...", error);
  alert("Error sending email: " + error);
}
);

