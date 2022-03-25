
Orange - Dashboard
======================================

The dashboard will be the loading interface with Login Page, Protected Routes, Protected Routes, Product Preview and 404 Page
<!-- toc -->
* [Login Page](#Login)
* [Panels Nested Routes](#Panels)
* [Add Product Panel](#Add-Product-Panel)
* [Page Not Found](#Page-Not-Found)

<!-- tocstop -->
# Login
## Pre Flight Check List
Install [react-toastify](https://fkhadra.github.io/react-toastify/introduction) we will use this for error handeling in our form.
```bash
   npm i react-toastify
```
<br/>
Check your package.json file and make sure that following packages are installed.

```bash   
   "firebase": "^9.6.7",
   "react-router-dom": "^6.2.1",
   "react-toastify": "^8.2.0",
```
<br/>
Check your authentication service in the firebase dashboard. Make sure you have created the following user and have enabled the sign in with email and password message. 

```
   user: jim@home.com
   password: 123456
```
<br/>

## Adding Toast Messages
To add toast message you need to download and install react-toastify.
```bash
   npm install react-toastify
```
Next import the ToastContainer and the toast control component into the LoginPage.js
```jsx
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
```
Then define a notify function this function will be called from the login form Submit Event Handler. 

```jsx
  const notify = (error) => toast.error(error.code,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
  
    });
```

Login form Event Handler function
```jsx
function onHandleSignIn (e){
         e.preventDefault()
         signInWithEmailAndPassword(auth, email,password)
         .then(res=>{
             notifySuccess("done")
         })
         .catch(error=>{
             
           notifyError(error)
         })
         

    }
```

# Panels
These names should match up with the nested route paths that you create in the App.js component.
## View All Panel (default panel)
View All Panel Route Path: all

## Add New Product Panel
Add New Panel Route Path: add

## Edit Products Panel
Edit Panel Route Path: edit

App.js
```javascript
function App() {
 
  return (
       <>
         <Routes>
           <Route path="/"  element={<LoginPage/>}/>
           <Route path="dashboard"  element={<DashBoardPage/>}>
              <Route index element={<HomePanel title="All Products" />}/>
              <Route path="orders" element={<OrdersPanel title="Orders" />}/>
              <Route path="add" element={<AddProductsPanel title="Add Product" />}/>
              <Route path="edit" element={<EditProductsPanel title="Edit Product" />}/>
              <Route path="customers" element={<CustomersPanel title="Customers" />}/>
           </Route>
           <Route path="*"  element={<PageNotFound/>}/>
         </Routes>
       </>
  );
}

```

# Add Product Panel
## AddProductPanel.js Using widget AddProduct.js to add new product
the function addproduct will useState() to set and handle submit data: product name, price, description, image, loader and number formatter
```javascript
  const [isWriting, setIsWriting] = useState(false)
  const [productName, setProductName] = useState(defaults.name)
  const [productPrice, setProductPrice] = useState(defaults.price)
  const [productDescription, setProductDescription] = useState(defaults.description)
  const [productImage, setProductImage] = useState({previewImage:PlaceHolderImage, file:null})
  const [loading, productLoader] = useAddNewProduct();
  const formatter = useNumberFormat()

```  
## Product Editor
Gathering product entry form and product preview
```javascript
function ProductEditor ({children, productName, productPrice, productDescription, productImage, handleSubmit, handleProductName, handleProductPrice, handleProductDescription, setProductImage, ...props})  {
  return (
        <ProductEditorStyles  {...props}>
           <ProductDataEntryForm 
            handleProductName={handleProductName}
            handleProductPrice={handleProductPrice}
            handleProductDescription={handleProductDescription}
            setProductImage={setProductImage}
            handleSubmit={handleSubmit}
           />
           <ProductPreview 
            productName={productName}
            productPrice={productPrice}
            productDescription={productDescription}
            productImage={productImage}
           />
        </ProductEditorStyles>
  )
}

```

### Product Data Entry Form
Creating styled entry form to promp data
```javascript
function ProductDataEntryForm({ children, handleProductName, handleProductPrice, handleSubmit, handleProductDescription, setProductImage,...props }) {
  return (
    <ProductDataEntryFormStyles  {...props} onSubmit={handleSubmit}>
      <ProductImage>
        <Label>Product Image</Label>
        <ProductImageDropBox setProductImage={setProductImage}/>
      </ProductImage>
      <fieldset>
      <ProductName>
        <Label>Product Name</Label>
        <Input onChange={(e)=>handleProductName(e.target.value.trim())} maxLength={30}/>
      </ProductName>
      <ProductPrice
      ><Label>Product Price</Label>
        <Input width="200px" onChange={(e)=>handleProductPrice(e.target.value.trim())} maxLength={8}/>
      </ProductPrice>
      </fieldset>
      <ProductDescription>
        <Label>Product Description</Label>
        <TextArea onChange={(e)=>handleProductDescription(e.target.value.trim())} maxLength={250} rows={6}/>
      </ProductDescription>

      <div>
        <SubmitButton width="100%" padding=".75rem 0" margin="1.125rem 0 0 0" type="submit">Add Product</SubmitButton>
      </div>

    </ProductDataEntryFormStyles>
  )
}
```
### Product Image Drop Box
Creating dropZone for input image 
__Import Dependancies__  
Import the required functionality for the Image Drop Box Component.
```javascript
import {useDropzone} from 'react-dropzone'
```
### Product Preview   
Passing data variable to show information about product
```javascript
function ProductPreview ({children, productName, productPrice, productImage, productDescription, ...props})  {
  return (
        <ProductPreviewStyles {...props}>
           <ProductImage>
              <img src={productImage.previewImage} alt="Orange Sneakers Marketplace" width="320" height="200"/>
           </ProductImage>
           <ProductName>{productName}</ProductName>
           <ProductPrice>${productPrice}</ProductPrice>
           <ProductDescription>{productDescription}</ProductDescription>
        </ProductPreviewStyles>
  )
}
```

## Editor FeedBack
After the submit button is clicked, the Editor feedback is used to show the status of uploading and successfully uploaded and there are two button to help navigate to add another prouduct or view all uploaded products. 

```javascript

function EditorFeedBack ({children, status, writeCompleted, ...props})  {
    const navigator = useNavigate()
  return (
        <EditorFeedBackStyles  {...props}>
          { 
           !status
           ?
           <FeedBack>
             <AiOutlineCheckCircle color="11DABC" size="12rem"/>
             <FeedBackMessage>
               Product Uploaded Successfully
             </FeedBackMessage>
           </FeedBack>
            :
            <FeedBack>
             <AiOutlineCloudUpload color="11DABC" size="12rem"/>
             <FeedBackMessage>
               Uploading New Product
             </FeedBackMessage>
           </FeedBack>
          }
           <FeedBackOption>
             <Button
             bc="#F05523"
             color="#f8fafc"
             onClick={() => writeCompleted(false)}
             disabled={status}
             >Add Another Product</Button>
             <Button
             bc="#171717"
             color="#f8fafc"
              onClick={() => navigator('/dashboard')}
             >View All</Button>
           </FeedBackOption>

        </EditorFeedBackStyles>
  )
}
```

# Page-Not-Found

## PageNotFound.js Checking For A Valid User
In the 404 page not found we need to make a check on the Auth State. If there is a user then we should return them to the dashboard and if there is no user registered then they should go back to the login screen.

<br/>

__Import Dependancies__  
Import the required functionality for the PageNotFound Component.


```javascript
 import React, {useState, useEffect} from 'react'
 
 import {Link, useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from 'libs/firebase'

import { Button } from 'ui/buttons'
 import {NotFoundStyles} from './styles'

 ```
<br/>

__Add onAuthStateChange__  
Inside the PageNotFound function you are going to perform the same check to find out if there is a user or not. If there is a valid user then we should create a link to the dashboard page and if there is no valid usre then we will create a link to the login page.  
Instead of creating a conditional render we will check the value of the isUser state. Using a terniary operator we can render a link into depending on the value of state.   
The last part is to create a sign out button inside the sidebar page.


 ```javascript

 function PageNotFound  (props){
    const [isUser, setIsUser]= useState(false)
    const navigator = useNavigate();
  
   
        onAuthStateChanged(auth, (user) => {
            console.log(user)
        
        
            if (user) {
                setIsUser(true)
            
            } else {
                // error shouldn't get access return to the login page
                setIsUser(false)
               
            }
          });
 

      return (
          <>
          <NotFoundStyles>
              <header>
                    <h1> <span>404</span> Page Not Found</h1>
              </header>
              {
                  isUser? <Link to="/dashboard">back to safty</Link>:<Link to="/">back to safty</Link>
              }
             
          </NotFoundStyles>
          </>
      )

 }
 
 export default PageNotFound 
```

## SideBar.js Providing A Logout Button
Open your SideBar.js file. Add the following dependancies.

<br/>



```javascript
 import React from 'react'

 import { signOut } from 'firebase/auth';
 import {auth} from 'libs/firebase';
 
  import {SideBarStyles} from './styles.js'
 import {Button} from 'ui/buttons'
 ```
__Adding A Login Out Link  
Add a button to the sidebar component and a click event handler to the button. In the example provided the ```onLogOutRequest``` handler has just a single line of code the signOut() method. This method will remove the use from the application and update the onAuthStateChange observer. Since the code is already added to the dashboar to listen for changes in authentication the isUser state will change in the DashboardPage and the user will be returned to the login page.


 ```javascript
function SideBar  (props){
     

     function onLogOutRequest(e){
           signOut(auth)
      //   signOut(auth).then(() => {
      //       // Sign-out successful.
             
      //     }).catch((error) => {
      //       // An error happened.
      //     });
     }
    
     return( 
         <SideBarStyles>

             <header>
               <h2>Dashboard</h2>
             </header>
          
             <Button onClick={onLogOutRequest} padding="0.125rem 0.5rem" fs="12px" margin="4rem 0" width="max-content">log out</Button>

            </SideBarStyles>
     )
 }
 
 export default SideBar 
 ```
 
 

 

 

 