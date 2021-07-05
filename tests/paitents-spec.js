const { splitAtColon } = require("@angular/compiler/src/util");
const { browser, element } = require("protractor");

describe('Angular Assignment Test Suite - Paitent', function () {

  // Test Module - Login
  
  it('should display error message if provided incorrect credentails',function()
  {
    browser.get('http://localhost:4200/');
    element(by.xpath('.//input[@formcontrolName="username"]')).sendKeys('incorrect');
    element(by.xpath('.//input[@formcontrolName="password"]')).sendKeys('incorrect');
    element(by.xpath(".//button[contains(text(),'Login')]")).click()
    browser.sleep(1000);
    expect(element(by.xpath(".//span[text()='Username or password is incorrect']")).getText()).toEqual('Username or password is incorrect');
  });

  it('should display success message on successful registration as paitent',function()
  {
    browser.get('http://localhost:4200/');
    element.all(by.xpath("//*[contains(@class, 'btn btn-link')]")).first().click();

    element(by.xpath(".//input[@formcontrolName='firstName']")).sendKeys('PaitentTest');
    element(by.xpath(".//input[@formcontrolName='lastName']")).sendKeys('PaitentTest');
    element(by.xpath(".//input[@formcontrolName='username']")).sendKeys('PaitentTest');
    element(by.xpath(".//input[@formcontrolName='password']")).sendKeys('PaitentTest');

    element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();
    expect(element(by.xpath(".//*[text() = 'Registration successful']")).getText()).toEqual('Registration successful');

  });

  it('should display success message on successful login as paitent',function()
  {
    browser.get('http://localhost:4200/');
    element(by.xpath('.//input[@formcontrolName="username"]')).sendKeys('PaitentTest');
    element(by.xpath('.//input[@formcontrolName="password"]')).sendKeys('PaitentTest');
    element(by.xpath(".//button[contains(text(),'Login')]")).click();

    browser.sleep(500); // buffer
    browser.get('http://localhost:4200/users');
    browser.sleep(500); // buffer
    browser.get('http://localhost:4200/');
    browser.sleep(500); // buffer

    expect(element(by.xpath(".//p[contains(text(),'Paitent')]")).getText()).toContain('Paitent');


  });

   // Test Module - Appointments created by Paitent

   it('should redirect to appointments page and have correct titles',function()
   {
     browser.get('http://localhost:4200/appointment');
     expect(element(by.xpath(".//h1[contains(text(),'Appointment Schedule List')]")).getText()).toEqual('Appointment Schedule List');
   });

   it('should redirect to Appointment Creation page and have correct tittle',function()
   {
     browser.get('http://localhost:4200/appointment');
     element(by.xpath("//*[contains(@class, 'btn btn-sm btn-success mb-2')]")).click();
     expect(element(by.xpath(".//h4[contains(text(),'Appointment Creation')]")).getText()).toEqual('Appointment Creation');

   });

   it('should redirect to appointments page after new appointment creation',function()
   {
     browser.get('http://localhost:4200/appointment');
     element(by.xpath("//*[contains(@class, 'btn btn-sm btn-success mb-2')]")).click();

     element(by.cssContainingText("option",'GP Clinic 2')).click();
     element(by.cssContainingText("option",'8/7/2021, Thursday')).click();
     element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();

     expect(element(by.xpath(".//h1[contains(text(),'Appointment Schedule List')]")).getText()).toEqual('Appointment Schedule List');
     expect(element(by.xpath(".//td[contains(text(),'PaitentTest')]")).getText()).toEqual('PaitentTest');

   });

   it('should redirect to appointments page after new appointment creation - loop',function()
   {
     browser.get('http://localhost:4200/appointment');
     element(by.xpath("//*[contains(@class, 'btn btn-sm btn-success mb-2')]")).click();

     element(by.cssContainingText("option",'GP Clinic 1')).click();
     element(by.cssContainingText("option",'8/7/2021, Thursday')).click();
     element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();

     expect(element(by.xpath(".//h1[contains(text(),'Appointment Schedule List')]")).getText()).toEqual('Appointment Schedule List');
     expect(element.all(by.xpath(".//td[contains(text(),'PaitentTest')]")).first().getText()).toEqual('PaitentTest');

   });

   it('should remove one appointment created by the Paitent',function()
   {
     browser.get('http://localhost:4200/appointment');
     element.all(by.xpath("//button[contains(text(),'Cancel')]")).first().click();
     expect(element(by.xpath(".//td[contains(text(),'GP Clinic 1')]")).getText()).toEqual('GP Clinic 1');
   });

   it('should redirect to login page if successful log out',function()
   {
     element(by.xpath(".//a[contains(text(),'Logout')]")).click();
     browser.sleep(100);
   });
  

});
