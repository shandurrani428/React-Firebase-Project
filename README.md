# React-Firebase-Project
1. Authentication
-	Login and Register screens. Use email and password.
-	Use Firebase Authentication functions for registration and login
-	After logging in successfully, show a welcome screen.
-	While log in is in progress, show a waiting indicator.
-	If log in fails, show an alert.
-	Use HOC to protect the welcome screen which is available only for logged in users.
-	Use React Navigation to control the routes.
-	Create a simple profile page, show the user email on the top and Log Out button
-	Welcome screen should be visible only on the first login

2. Firebase/ Firestore:
-	In the welcome screen, add a button to navigate to a list screen.
-	The list screen is a simple list, every list item is a text object only.
-	List item is read only.
-	List items should be separated by a horizontal thin line.
-	List item should be swipable to delete.
-	Save the list data in the firebase/firestore
-	At the bottom right of the list screen, there should be an Action button to add a
-	new list item. When clicking on the Action button, show a popup/dialog/alert asking to enter the text. Text should be at most 40 characters. When typing in, we
-	should count the character. For example, if we type in 35 characters, show 35/40
-	the bottom right and bellow the text input.

3 Additional functionality:

-	Modify the list screen so that it has a Profile button on the top-right and Switcher
-	above the title.
-	When the switcher is on, use Firebase for the list fetch data from firebase else store it in async so it can work on offline mode as well
-	The Profile button should redirect the user to the profile page.
-	Save the user profile information in firebase
-	Implement auto-login. If the user is logged in, move to the home page automatically-
Ly
