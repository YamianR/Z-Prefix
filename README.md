# Z-Prefix Inventory Manager

Inventory Manager is a web application designed to help users manage their inventory of items. It allows users to register, log in, create, view, edit, and delete items in their inventory.

## User Stories

- As an inventory manager, I want to be able to create an account so that I can track my inventory.
- As an inventory manager, I want to be able to log into my account so that I can see my inventory of items.
- After logging in, the inventory manager should be redirected to their inventory of items.
- As an inventory manager, I want to be able to create a new item so that I can share my item details with the world.
- After the item is created, the inventory manager should be redirected to their inventory of items.
- An item displays name, description, and quantity.
- As an inventory manager, I want to be able to see my entire inventory of items.
- The inventory of items should display the first 100 characters of each item description, with "..." at the end if the description is longer than 100 characters.
- As an inventory manager, I want to be able to see any individual item I have added.
- The full item information should be displayed.
- As an inventory manager, I want to be able to edit an item so that I can fix any mistakes I made creating it.
- When the user toggles edit mode, the page remains the same and the fields become editable.
- As an inventory manager, I want to be able to delete an item so that I can remove any unwanted content.
- When the user deletes the item they should be redirected to their inventory of items.
- As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.
- Unauthenticated users should be able to view all items, and any single item.
- As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.

## Installation

1. Clone the repository:
git clone https://github.com/your_username/inventory-manager.git

2. Navigate to the project directory:
cd inventory-manager

3. Install dependencies:
npm install

4. Start the development server:
npm start

5. Open your browser and visit http://localhost:3000 to view the application.

## Technologies Used

- React.js
- Express.js
- Node.js
- PostgresSQL.js
- JWT.js