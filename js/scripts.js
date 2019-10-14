 window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
     document.getElementById("navbar").style.top = "0";
   } else {
     document.getElementById("navbar").style.top = "20px";
   }
 }

// constructor for the order
function Order(name,email,size,crust,toppings){
  this.Name = name;
  this.Email = email;
  this.Size = size;
  this.Crust = crust;
  this.Toppings = [toppings];
  this.Addresses = [];

};

// constructor for the address
function Address(area,estate,apartment,door){
  this.Area = area;
  this.Estate = estate;
  this.Apartment = apartment;
  this.Door = door;
};

$("#delivery").click(function(){
  alert("Our Delivery fee is KSh.150");
  $(".addr").show();
  $(".addrss").show();
});


// form submission event
$("form#new-order").submit(function(event) {
  event.preventDefault();


  // the data from the form
  var name = $("input#name").val();
  var email = $("input#email").val();
  var crust = $("select#IG2").val();
  var size = $("select#IG1").val();
  var top = [];
  $.each($("input[name='topping']:checked"), function(){
      top.push($(this).val());
  });

  var area = $("input#areaname").val();
  var estate = $("input#estate").val();
  var apartment = $("input#apartment-no").val();
  var door = $("input#door-no").val();


  // Structure of th constructor ***Order(name,phone,size,crust,toppings )***
  // creating the object for the order made by the user
  var newOrder = new Order(name,email,size,crust,top);
  console.log(newOrder);


  // structure for the constructor ***Address(street,estate,apartment,floor)***
  // creating the object for the address given for delivery
  var newAddress = new Address(area,estate,apartment,door);
  console.log(newAddress);
  newOrder.Addresses.push(newAddress);


  billCalculation(newOrder);

  displayData(newOrder);

  // putting the orders into an array
  var totalOrders = [];
  totalOrders.push(newOrder);
  console.log(totalOrders);


  // this is for emptying the fields after clicking submit
 
  resetFields();

});

// CALCULATION FUNCTION
function billCalculation(newOrder){
  var sizePrice = parseInt(newOrder.Size.split(", ")[1]);
  console.log(sizePrice);

  var crustPrice = parseInt(newOrder.Crust.split(", ")[1]);
  console.log(crustPrice);

  
  var topp = newOrder.Toppings;
  console.log(topp);

  var toppingPrice = 0;

  // for getting toppings
  for(var i = 0; i < topp.length; i++ ){
      var unitPrice = parseInt(topp[i].split(", ")[1]);

      toppingPrice += unitPrice;
  }
  
  function deliveryFee(){
      var delivery = newOrder.Addresses;
      console.log(delivery);
      var deliveryPrice;

      if(delivery[0].Estate==null || delivery[0].Estate=="" && delivery[0].Area==null || delivery[0].Area=="" && delivery[0].Apartment==null || delivery[0].Apartment=="" && delivery[0].Door==null || delivery[0].Door==""){
          deliveryPrice = 0;
          return deliveryPrice;
      }else{
          deliveryPrice = 150;
          return deliveryPrice;
      };
  }

  var deliveryTag = deliveryFee();
  console.log(deliveryTag);

  var price = sizePrice + crustPrice + toppingPrice + deliveryTag;
  console.log(price);

  // total
  $("#total").text(price);

}



// Structure of th constructor ***Order(name,phone,size,crust,toppings )***
// function for displaying  data
function displayData(newOrder){
  var name = newOrder.Name;
  var email = newOrder.Email;

  var size = newOrder.Size.split(", ")[0];
  var sizePrice = newOrder.Size.split(", ")[1];

  var crust = newOrder.Crust.split(", ")[0];
  var crustPrice = newOrder.Crust.split(", ")[1];

  var toppings;
  var toppingsPrice;

  var tops = newOrder.Toppings;
  tops.forEach(function(topps) {
     
      toppings = topps.split(", ")[0];
      toppingsPrice = topps.split(", ")[1]; 
      // displaying the list of arrays
      $("ul#new-topping").append("<li><span class=''>" + toppings + " " + " -KSh." + toppingsPrice + "</span></li>");
  });

  // print outs
  $("#new-name").text(name);
  $("#new-email").text(email);
  $("#new-size").text(size + " -KSh." + sizePrice);
  $("#new-crust").text(crust + " -KSh." + crustPrice);

  // printing the address
  var ad = newOrder.Addresses;
  $("#new-estate").text(ad[0].Estate);
  $("#new-area").text(ad[0].Area);
  $("#new-apartment").text(ad[0].Apartment);
  $("#new-door").text(ad[0].Door);

}


// for emptying the fields


function resetFields(){
  $("input#name").val("");
  $("input#email").val("");
  $("input[name='topping']").prop('checked',false);
  $("select#IG2").val("");
  $("select#IG1").val("");
};