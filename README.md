# E-commerce Website with Django & Tailwind CSS
#### This is a modern and responsive e-commerce platform built with the robust Django framework for the backend and styled using the utility-first approach of Tailwind CSS. It provides a solid foundation for a scalable online store.

# ✨ Features
* User Authentication: Secure user registration, login, and logout functionality.

* Product Catalog: Browse products with detailed descriptions and images.

* Shopping Cart: Add, update, and remove items from a dynamic shopping cart.

* Order Management: A straightforward checkout process and a history of past orders for authenticated users.

* Admin Panel: An intuitive Django admin interface for managing products, users, and orders.

* Responsive Design: A seamless user experience on all devices, from desktop to mobile, thanks to Tailwind CSS.

# 🛠️ Technologies Used
Python: The core programming language.

* Django: The high-level Python web framework used for the backend.

* Tailwind CSS: A utility-first CSS framework for fast and flexible styling.

* SQLite: Default database for development. Can be easily switched to PostgreSQL or MySQL for production.

# 🚀 Getting Started
#### Follow these instructions to get a local copy of the project up and running on your machine for development and testing purposes.

### Prerequisites
* You'll need Python 3 installed on your system.

### Installation
* Clone the repository:
```
git clone https://github.com/Raunak567/E-Commerce
cd E-Commerce
```
#### Create and activate a virtual environment:

#### On macOS/Linux:
```
python3 -m venv venv
source venv/bin/activate
```
#### On Windows:
```
python -m venv venv
venv\Scripts\activate
```
### Install the required packages:
```
pip install -r requirements.txt
```
### Apply database migrations:

```
python manage.py migrate
```
### Create a superuser to access the admin panel:
```
python manage.py createsuperuser
```
* Follow the prompts to create your admin account.
  
### Run the development server:
```
python manage.py runserver
```
## The application will now be running at http://127.0.0.1:8000.

### 🖥️ Usage
* Browse the Website: Open your web browser and navigate to http://127.0.0.1:8000 to see the front-end.

* Admin Panel: Access the admin interface at http://127.0.0.1:8000/admin and log in with the superuser credentials you created.

### 🤝 Contributing
#### Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

#### Fork the Project.

* Create your Feature Branch (git checkout -b feature/AmazingFeature).

* Commit your Changes (git commit -m 'Add some AmazingFeature').

* Push to the Branch (git push origin feature/AmazingFeature).
