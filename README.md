# seafood-project
Seafood Market – Online Seafood & Aquaculture Marketplace

Project Overview

Seafood Market is a web-based marketplace developed to make seafood purchasing and aquaculture farming products easily accessible through a single platform. It connects customers with seafood products and fish seeds required for farming.

The application provides a simple and user-friendly interface where customers can explore available products, view prices, add items to their cart, and place orders. It also supports user registration, login, and order management.

The main goal of this project is to simplify the seafood purchasing process and provide a convenient digital platform for both seafood buyers and aquaculture customers.

Key Features

User Registration & Login: Allows users to create accounts and securely access the application.

Seafood Products: Displays available fresh seafood products with images and prices.

Fish Seeds for Farming: Provides different fish seed varieties such as Rohu, Catla, and Tilapia.

Shopping Cart: Allows users to add products, manage quantities, and review selected items.

Order Management: Enables users to place orders and view their order details.

Responsive User Interface: Provides a simple and user-friendly browsing experience.

Technologies Used

Category

Technologies

Frontend

React.js, Tailwind CSS

Backend

Python, Django, Django REST Framework

Database

SQLite

Routing

React Router

UI Components

SweetAlert2, React Icons

Development Environment

Node.js, Pip

System Architecture

The application follows a frontend-backend architecture.

Frontend: React.js handles the user interface and customer interactions.

Backend: Django and Django REST Framework manage application logic and API communication.

Database: SQLite stores application data.

The frontend communicates with the backend through REST APIs to perform application operations.

Project Modules

User Authentication

Seafood Product Management

Fish Seed Management

Shopping Cart Management

Order Processing

Database Management

Installation and Setup

1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Backend Setup

cd backend
python -m venv venv

Activate the virtual environment:

Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run database migrations:

python manage.py migrate

Start the backend server:

python manage.py runserver

3. Frontend Setup

Open another terminal:

cd seafood-ui
npm install
npm start

The application will be available at:

http://localhost:3000

Note: Run these commands from the folders containing the respective backend and frontend configuration files.

Future Enhancements

Integration of online payment gateways.

Real-time product availability and inventory updates.

Product reviews and customer ratings.

Advanced search and filtering options.

Delivery tracking and order notifications.

Improved admin and reporting functionalities.

Conclusion

Seafood Market provides a convenient digital solution for purchasing seafood and exploring aquaculture farming products. By bringing seafood products and fish seeds together on one platform, the application aims to make the buying process easier, more accessible, and efficient. The project also provides a foundation for introducing additional marketplace features in the future.

Project Type: MCA Academic Project

Technologies: React.js | Python | Django | Django REST Framework | SQLite
