# Expense Tracker

Expense Tracker is a web application built with Next.js, Firebase, and Tailwind CSS that allows users to track their expenses. Users can log in or register, add and view their transactions, and see a summary of their total balance.

![Expense Tracker Screenshot](./screenshot.png)

## Live Demo

Check out the live demo of Expense Tracker: [https://expense-tracker-mjpc-arrow66.vercel.app/](https://expense-tracker-mjpc-arrow66.vercel.app/)

## Features

- User authentication: Users can create an account, log in, and securely authenticate using Firebase authentication.
- Dashboard: Users can add new transactions, view the transaction history, and see the total balance.
- Real-time updates: The app integrates with Firebase Realtime Database to provide real-time updates to the transaction list.
- Responsive design: The app is designed to be responsive and optimized for both desktop and mobile devices.
- Error handling: Proper error handling is implemented to handle any potential errors and provide a smooth user experience.

## Installation

1. Clone the repository:

```
git clone https://github.com/Arrow66/expense-tracker.git

```

2. Install dependencies:

```
cd expense-tracker
npm install

```


3. Set up Firebase:

   - Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com) and enable Firebase Authentication and Realtime Database.
   - Copy the Firebase configuration settings and replace them in the `.env.local` file:

     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=<YOUR_API_KEY>
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
     NEXT_PUBLIC_FIREBASE_DATABASE_URL=<YOUR_DATABASE_URL>
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<YOUR_MESSAGING_SENDER_ID>
     NEXT_PUBLIC_FIREBASE_APP_ID=<YOUR_APP_ID>
     ```

4. Start the development server:

```
npm run dev

```


5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app.

## Technologies Used

- Next.js: A React framework for building server-rendered applications.
- Firebase: A platform that provides various services including authentication and real-time database.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Reactfire: A library that provides hooks and components for Firebase integration in React applications.


## License

This project is licensed under the [MIT License](LICENSE).
