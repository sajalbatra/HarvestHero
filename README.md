# HarvestHero

## Overview
HarvestHero is a platform designed to facilitate the connection between individuals, restaurants, grocery stores, and other donors with NGOs and charities. The platform aims to efficiently distribute various resources such as food, clothes, monetary donations, books, toys, medical supplies, technology, and other essentials to those in need.

## Purpose
The main purpose of HarvestHero is to streamline the donation process, making it easier for donors to contribute and for NGOs and charities to receive and distribute donations effectively. By providing a centralized platform, HarvestHero enables:

- **Efficient Donation Matching:** Donors can easily find NGOs and charities that are in need of specific types of donations, ensuring that resources are distributed where they are most needed.

- **Enhanced Accessibility:** Individuals, restaurants, grocery stores, and other potential donors can quickly connect with organizations dedicated to helping the community, fostering a sense of community engagement and support.

- **Transparency and Accountability:** The platform promotes transparency by providing clear visibility into how donations are used and distributed by NGOs and charities, building trust among donors and the community.

- **Impact Tracking:** HarvestHero allows users to track the impact of their donations, providing insights into the difference they are making in the lives of those who benefit from their contributions.

## Key Features
- **User Profiles:** Donors and NGOs can create profiles detailing their donation preferences, needs, and impact stories.
  
- **Donation Matching:** Algorithms match donors with relevant NGOs based on donation types and geographical preferences.
  
- **Secure Transactions:** Built-in security measures ensure safe and reliable donation transactions.

## Tech Stack

### Frontend (Web)
- **Framework:** [Next.js](https://nextjs.org/) (v14.1.1)
- **Language:** TypeScript
- **UI & Styling:**
  - Tailwind CSS
  - Radix UI
  - React Icons
  - Lucide React
  - Tailwind CSS Animate
- **State Management:** Recoil
- **Theming:** `next-themes`
- **Notifications:** React Toastify
- **Animations:** React Typed, React Fast Marquee
- **PDF Support:** React PDF
- **Utilities:** Axios, clsx, dotenv, sharp

### Backend (API Server)
- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Authentication & Security:**
  - JSON Web Tokens (JWT)
  - bcryptjs for password hashing
  - CORS for security
- **Database:** PostgreSQL
- **Caching:**
  - Redis (via ioredis)
- **File Uploads:** Multer
- **Validation:** Zod
- **Mailing:** Nodemailer
- **Cloud Storage:** Azure Blob Storage
- **Image Processing:** Sharp
- **Environment Management:** dotenv
- **Dev Tools:** ts-node, nodemon

## How to Use
1. **Sign Up:** Create a donor or NGO profile to start donating or receiving donations.
2. **Explore Donations:** Browse through available donations or create a donation request specifying your organization's needs.
3. **Connect and Donate:** Connect with matching donors or NGOs and initiate donation transactions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 12 or above)
- [npm](https://www.npmjs.com/) (version 6 or above)
- [Docker](https://www.docker.com/) (for running PostgreSQL and Redis)

### Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/sajalbatra/HarvestHero
    cd HarvestHero
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Setup Docker containers:**
    To run PostgreSQL and Redis using Docker, follow these steps:

    - **Create a `docker-compose.yml` file:**
      ```yaml
      version: '3.8'

      services:
        postgres:
          image: postgres:13
          container_name: postgres
          environment:
            POSTGRES_USER: your_postgres_user
            POSTGRES_PASSWORD: your_postgres_password
            POSTGRES_DB: your_database
          ports:
            - "5432:5432"
          volumes:
            - postgres_data:/var/lib/postgresql/data

        redis:
          image: redis:latest
          container_name: redis
          ports:
            - "6379:6379"

      volumes:
        postgres_data:
      ```

    - **Start the Docker containers:**
      ```bash
      docker-compose up -d
      ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

### Deployment
To deploy the application, you can use platforms like [Heroku](https://www.heroku.com/), [Vercel](https://vercel.com/), or any cloud provider of your choice.

## Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. **Fork the repository:**
    Click the "Fork" button at the top right of this page to create your own copy of the repository.

2. **Create a branch:**
    ```bash
    git checkout -b feature-branch
    ```

3. **Make your changes:**
    Implement your changes in the codebase.

4. **Commit your changes:**
    ```bash
    git commit -m "Description of the changes"
    ```

5. **Push to the branch:**
    ```bash
    git push origin feature-branch
    ```

6. **Create a pull request:**
    Go to the original repository and click the "New Pull Request" button to submit your changes for review.

## Contributors
- [Sajal Batra](https://github.com/sajalbatra)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
We thank all our contributors and supporters who help make HarvestHero a success. Your efforts are greatly appreciated!