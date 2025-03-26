# Rich Money Blogs

A simple blog app built with Next.js 14, MongoDB, Tailwind CSS, TypeScript, and JWT.

## Technologies

- Next.js 14
- MongoDB
- Tailwind CSS
- TypeScript
- JWT
- Shadcn UI

## Getting Started

- First install the dependencies:

```bash
npm install
```

- Then, run the development server:

```bash
npm run dev
```

- You can now access the app at [http://localhost:3000](http://localhost:3000)

## Important

- If you try to deploy on production, make sure to set the `JWT_SECRET` environment variable in the `.env` file.
  - Otherwise the app will use a default secret that is **not** secure.

- The app uses MongoDB to store the users.
  - Make sure to create a `blog` database (using the provided script) on your MongoDB instance and add the `MONGODB_URI` environment variable to your `.env` file.
  - The `MONGODB_URI` should point to the URI of your MongoDB instance.
  - If you don't have a MongoDB instance, you can use the free tier of MongoDB Atlas or run one via Docker.

## Credits

- [Eros Klein](https://www.paypal.com/paypalme/erosklein)
- [Leo Breneis](https://www.oefb.at/Profile/Spieler/1247437?Leo-Breneis)
- [Melanie Dohr](https://de-de.facebook.com/melanie.dohr.54)