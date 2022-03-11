
Orange - Basic Dashboard
======================================

The dashboard will be the loading interface with Login Page, Main DashBoard and 404 Page
<!-- toc -->
* [Login Page](#Login)
* [Main DashBoard](#Dashboard)
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

# Dashboard

## DashBoardPage.js Creating A Protected Route 
To check to make sure that only a signed in user can access the dashboard we have to create a protected route. To do this we will have to create a few methods that will work together to check the current login status. If there is a firebase user then a successfull login will allow the user access to the dashboard to do this we will use the onAuthStateChange() method.  
<br/>
__Import the Required dependancies__  
From the Firebase SDK import the onAuthStateChanged method. This method listens for changes in the authentication state, when a user signs in or logs out. We will use this to check if there is a firebase user trying to access the page.

```javascript
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import {auth} from 'libs/firebase'
 

import {SideBar} from 'components/sidebar'
import  {AppBar}  from 'components/appbar'
import {DashBoardStyles} from './styles'

```  
<br/>  

__Adding The AuthStateChange Observer__  
Inside the DashBoardPage function start by creating a piece of state called ```isUser.```. The default state for a firebase user is false. Nobody should be allowed to access the page unless they are logged in. Next use the useNavigate method from the react router dom package. We will use this to return unauthorized users back to the login screen.  
Create the ```onAuthStateChange()``` to check to see if there is a current logged in user. If there is then we can change the state to true.
 

```javascript

  function DashBoardPage  (props){
    const [isUser, setIsUser]= useState(false)
    const navigator = useNavigate();

    onAuthStateChanged(auth, (user) => {
   
        if (user) {
            setIsUser(true)
     
        } else {
            // error shouldn't get access return to the login page
            setIsUser(false)
            navigator('/')
        }
      });
```  
<br/>

__Conditional Rendering__  
Because the onAuthStateChange method changes the value of the state variable isUser then we can use this to render the correct piece of UI state, which is the dashboard. The null is returned becaulse we do not want to see anything while onAuthStateChange is checking with firebase to see if there is a user. Thats it we now have a protected route.

```javascript

      if(isUser){
        return( 
            <>
            <AppBar/>
            <DashBoardStyles>
               <SideBar/>
                <Outlet/>
            </DashBoardStyles>
            </>
        )
      } 

      return null
  }
  
  export default DashBoardPage 
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
 
 

 

 

 