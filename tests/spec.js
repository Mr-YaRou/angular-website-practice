const { splitAtColon } = require("@angular/compiler/src/util");
const { browser, element } = require("protractor");

describe('Angular Assignment Test Suite - Self Cleaning =', function () {

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

  it('should display error message if missing credentails provided',function()
  {
    browser.get('http://localhost:4200/');
    element(by.xpath(".//button[contains(text(),'Login')]")).click()
    expect(element(by.xpath(".//*[text() = 'Username is required']")).getText()).toEqual('Username is required');
    expect(element(by.xpath(".//*[text() = 'Password is required']")).getText()).toEqual('Password is required');
  });

  it('should redirect to regsiter page when registering new account',function()
  {
    browser.get('http://localhost:4200/');
    element.all(by.xpath("//*[contains(@class, 'btn btn-link')]")).first().click(); // typeError is first() is used, should retrieve
    expect(element(by.xpath(".//h4[contains(text(),'Paitent Registration')]")).getText()).toEqual('Paitent Registration');
  });

  it('should display error message if missing registration details',function()
  {
    browser.get('http://localhost:4200/');
    element.all(by.xpath("//*[contains(@class, 'btn btn-link')]")).first().click();
    element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();

    expect(element(by.xpath(".//*[text() = 'First Name is required']")).getText()).toEqual('First Name is required');
    expect(element(by.xpath(".//*[text() = 'Last Name is required']")).getText()).toEqual('Last Name is required');
    expect(element(by.xpath(".//*[text() = 'Username is required']")).getText()).toEqual('Username is required');
    expect(element(by.xpath(".//*[text() = 'Password is required']")).getText()).toEqual('Password is required');
  });

  it('should display success message on successful registration',function()
  {
    browser.get('http://localhost:4200/');
    element.all(by.xpath("//*[contains(@class, 'btn btn-link')]")).first().click();

    element(by.xpath(".//input[@formcontrolName='firstName']")).sendKeys('Yralle');
    element(by.xpath(".//input[@formcontrolName='lastName']")).sendKeys('Lesly');
    element(by.xpath(".//input[@formcontrolName='username']")).sendKeys('yralleljg');
    element(by.xpath(".//input[@formcontrolName='password']")).sendKeys('yralleljg');

    element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();
    expect(element(by.xpath(".//*[text() = 'Registration successful']")).getText()).toEqual('Registration successful');
  });

  it('should redirect to home page if successful admin login',function()
  {
    browser.get('http://localhost:4200/');
    element(by.xpath('.//input[@formcontrolName="username"]')).sendKeys('yralleljg');
    element(by.xpath('.//input[@formcontrolName="password"]')).sendKeys('yralleljg');
    element(by.xpath(".//button[contains(text(),'Login')]")).click();

    browser.sleep(1000); // need buffer to load json data - force first user to be admin since we using in-memory for users
    browser.get('http://localhost:4200/users');
    element(by.xpath(".//a[contains(text(),'Edit')]")).click();
    element(by.cssContainingText("option",'Admin')).click();
    element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();
    browser.get('http://localhost:4200/');

    browser.sleep(100);
    
    expect(element(by.xpath(".//p[contains(text(),'Admin')]")).getText()).toContain('Admin');

  });

  it('should redirect to login page if successful log out',function()
  {
    element(by.xpath(".//a[contains(text(),'Logout')]")).click();
    browser.sleep(100);
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

    // Test Module - Appointments by Admin

    it('should redirect to home page if successful login as admin',function()
    {
      browser.get('http://localhost:4200/');
      element(by.xpath('.//input[@formcontrolName="username"]')).sendKeys('yralleljg');
      element(by.xpath('.//input[@formcontrolName="password"]')).sendKeys('yralleljg');
      element(by.xpath(".//button[contains(text(),'Login')]")).click();
  
      browser.sleep(500); // need buffer to load json data - force first user to be admin since we using in-memory for users
      browser.get('http://localhost:4200/users');
      browser.sleep(500);
      browser.get('http://localhost:4200/');
      browser.sleep(500);
      
      expect(element(by.xpath(".//p[contains(text(),'Admin')]")).getText()).toContain('Admin');
  
    });

    it('should redirect to appointments page and have correct titles',function()
    {
      browser.get('http://localhost:4200/appointment');
      expect(element(by.xpath(".//h1[contains(text(),'Appointment Schedule List')]")).getText()).toEqual('Appointment Schedule List');
      
   
    });

    it('should redirect to confirmation page and have correct titles ',function()
    {
      element(by.xpath("//*[contains(@class, 'btn btn-sm btn-primary mr-1')]")).click();

      expect(element(by.xpath(".//h4[contains(text(),'Appointment to Confirm')]")).getText()).toEqual('Appointment to Confirm');
      
   
    });

    it('should confrim appointment and redirect to appointment page ',function()
    {
      element(by.xpath("//*[contains(@class, 'btn btn-sm btn-primary mr-1')]")).click();

      expect(element(by.xpath(".//td[contains(text(),'Confirmed')]")).getText()).toEqual('Confirmed');
      
    });

    it('should cancel confirmed appointment and redirect to appointment page ',function()
    {
      element(by.xpath("//button[contains(text(),'Cancel')]")).click();

      expect(element(by.xpath(".//h2[contains(text(),'No Paitent Appointments')]")).getText()).toEqual('No Paitent Appointments');
      
    });


    // Test Module - Users Component (Admin)

    it('should redirect to Users page and have correct titles ',function()
    {
      element(by.xpath("//a[@routerlink='/users'][text()='Users']")).click();

      expect(element(by.xpath(".//h1[contains(text(),'Manage Users')]")).getText()).toEqual('Manage Users');
      
    });

    it('should redirect to Add user page and have correct titles ',function()
    {
      element(by.xpath("//a[@routerlink='add'][text()='Add User']")).click();

      expect(element(by.xpath(".//h1[contains(text(),'Add User')]")).getText()).toEqual('Add User');
      
    });

    it('should error when add users form is incomplete ',function()
    {
      element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();

      expect(element(by.xpath(".//*[text() = 'First Name is required']")).getText()).toEqual('First Name is required');
      expect(element(by.xpath(".//*[text() = 'Last Name is required']")).getText()).toEqual('Last Name is required');
      expect(element(by.xpath(".//*[text() = 'Username is required']")).getText()).toEqual('Username is required');
      expect(element(by.xpath(".//*[text() = 'Password is required']")).getText()).toEqual('Password is required');
      
    });

    it('should display error when password entered does not meet requirements',function()
    {
     
      element(by.xpath(".//input[@formcontrolName='firstName']")).sendKeys('Test-Create-User');
      element(by.xpath(".//input[@formcontrolName='lastName']")).sendKeys('Test-Create-User');
      element(by.xpath(".//input[@formcontrolName='username']")).sendKeys('Test-Create-User');
      element(by.xpath(".//input[@formcontrolName='password']")).sendKeys('Not-6');

      element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();
      expect(element(by.xpath(".//*[text() = 'Password must be at least 6 characters']")).getText()).toEqual('Password must be at least 6 characters');

      browser.sleep(1000);
      
    });

    it('should successfully register and create user',function()
    {
     
      element(by.xpath(".//input[@formcontrolName='password']")).sendKeys('Test-Create-User');

      element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();
      expect(element(by.xpath(".//*[text() = 'User added successfully']")).getText()).toEqual('User added successfully');
      expect(element.all(by.xpath(".//td[contains(text(),'Test-Create-User')]")).first().getText()).toEqual('Test-Create-User');
      
    });

    it('should select a user and redirect to edit user page with correct titles',function()
    {
     
      element.all(by.xpath("//*[contains(@class, 'btn btn-sm btn-primary mr-1')][text()='Edit']")).last().click(); 
      expect(element(by.xpath(".//*[text() = 'Edit User']")).getText()).toEqual('Edit User');
      
    });

    it('should update details of a user and redirect to user page with correct titles',function()
    {
     
      element(by.xpath(".//input[@formcontrolName='firstName']")).clear().sendKeys('Test-Edit-User');
      element(by.xpath(".//input[@formcontrolName='lastName']")).clear().sendKeys('Test-Edit-User');
      element(by.xpath(".//input[@formcontrolName='username']")).clear().sendKeys('Test-Edit-User');

      element(by.xpath("//*[contains(@class, 'btn btn-primary')]")).click();

      expect(element(by.xpath(".//*[text() = 'Update successful']")).getText()).toEqual('Update successful');
      expect(element.all(by.xpath(".//td[contains(text(),'Test-Edit-User')]")).first().getText()).toEqual('Test-Edit-User');

      browser.sleep(1000);
      
    });

    it('should delete selected users and display correct titles',function()
    {
      // delete Paitents created - revert app to original state

      element.all(by.xpath(".//span[text()='Delete']")).last().click();
      element.all(by.xpath(".//span[text()='Delete']")).first().click();

      browser.sleep(1000);
      
    });



    
  



});
