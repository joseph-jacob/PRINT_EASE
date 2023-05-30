function sendEmail() {
    var params = {
        email: "johnsrajum@gmail.com",
        name:"johns",
    };

const serviceID = "service_lgqfta2";
const templateID = "template_cci5hjr";

  emailjs.send(serviceID, templateID, params).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("Your message has been sent successfully!");
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Error sending email: " + error);
    }
  );
}
