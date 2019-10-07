window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "20px";
  }
}

$("form#order").submit(function(event) {
  event.preventDefault();

  // the data from the form
  var name = $("input#name").val();
  var email = $("input#email").val();

  var crust = $("select#IG2").val();
  var size = $("select#IG1").val();
  var toppings = [];
  $.each($("input[name='toppings']:checked"), function(){
      toppings.push($(this).val());
  });
  var area = $("input#area-name").val();
  var apartment=$("input#apartment-no").val();
  var door = $("input#door-no").val();
  var estate = $("input#estate").val();

  function order(name,email,size,crust,toppings){
    this.Name = name;
    this.Email = email;
    this.Size = size;
    this.Crust = crust;
    this.Toppings = toppings;
  }

  var neworder = new order(name,email,size,toppings,crust);
  console.log(neworder)

  resetFields();

});
function resetFields(){
  $("input#name").val("");
  $("input#email").val("");
  $("input[name='toppings']").prop('checked',false);
  $("select#IG2").val("");
  $("select#IG1").val("");
};