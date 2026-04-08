[![ci-nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template/actions/workflows/ci.yml/badge.svg)](https://github.com/ics-software-engineering/nextjs-application-template/actions/workflows/ci.yml)

For details, please see http://ics-software-engineering.github.io/nextjs-application-template/.

## Installation

1. **Install PostgreSQL** and create a database for your app:
	```bash
	createdb nextjs-application-template
	```

2. **Clone this template** (or use the "Use this template" button on GitHub to create your own repo).

3. **Install dependencies:**
	```bash
	npm install
	```

4. **Create your .env file:**
	- Copy `sample.env` to `.env` and update the `DATABASE_URL` to match your PostgreSQL setup.

5. **Run database migrations:**
	```bash
	npx prisma migrate dev
	```

6. **Generate Prisma client:**
	```bash
	npx prisma generate
	```

7. **Seed the database:**
	```bash
	npm run seed
	```

8. **Start the development server:**
	```bash
	npm run dev
	```

The app will be available at [http://localhost:3000](http://localhost:3000).

See the [template documentation](http://ics-software-engineering.github.io/nextjs-application-template/) for more details and walkthroughs.
