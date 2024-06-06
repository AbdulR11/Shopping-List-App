# Shopping List App

Visit the site at https://shopping-list-ar11.netlify.app/

This project is a simple web-based shopping list application that allows users to add and manage items in a shopping list. The application is built with HTML, CSS, and JavaScript, and uses Firebase Realtime Database to store and synchronize the shopping list items across different sessions and devices.

Key Features:
1. User Interface:

A clean and minimalistic design with a responsive layout, styled using CSS.
An input field for entering the name of the item to be added to the shopping list.
An "Add to cart" button to add the entered item to the list.
A list displaying the added items, with each item styled as a list element.

2. Functionality:

Users can add items to the shopping list by typing in the input field and clicking the "Add to cart" button.
Items are displayed dynamically in the list below the input field.
Clicking on an item in the list removes it from the database and the list.
Firebase Integration:

3. Firebase Realtime Database is used to store the shopping list items.
Items are pushed to the database when added and removed from the database when clicked.
The list is updated in real-time to reflect changes, ensuring that users see the most current state of the shopping list.

4.Text Selection Disabled:
The CSS user-select: none property is used to prevent users from selecting text on the page, providing a more app-like experience.

How It Works:
The application initializes Firebase with the provided configuration.
When an item is added via the input field and button, it is pushed to the Firebase database.
The list is dynamically updated to reflect the current state of the database, showing all items currently in the shopping list.
Clicking on a list item removes it from the database, which in turn updates the displayed list.
This project demonstrates basic CRUD (Create, Read, Update, Delete) operations with Firebase and showcases how to create a simple, interactive web application with real-time data synchronization.
