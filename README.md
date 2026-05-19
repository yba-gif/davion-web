# Base1

A modern, scalable blog and events platform built with cutting-edge web technologies. This monorepo architecture leverages Nuxt 3, Drizzle ORM, PostgreSQL, and MinIO for optimal performance and developer experience.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PNPM 8+
- Docker & Docker Compose

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd base1
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Start development services**
```bash
pnpm docker:dev
```

5. **Run database migrations**
```bash
pnpm db:generate
pnpm db:migrate
```

6. **Start the development server**
```bash
pnpm dev:web
```

🎉 The application will be running at [http://localhost:3000](http://localhost:3000)

## 🏗️ Technology Stack

### Frontend & Backend
- **Nuxt 3** - Full-stack Vue.js framework with server-side rendering
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **TypeScript** - Static type checking for enhanced code quality

### Database & ORM
- **PostgreSQL** - Robust, open-source relational database
- **Drizzle ORM** - Type-safe ORM with excellent TypeScript support
- **Drizzle Kit** - Schema management and database migrations

### File Storage
- **MinIO** - High-performance, S3-compatible object storage
- **Image Processing** - Automated image upload and optimization

### DevOps & Tooling
- **Turborepo** - High-performance monorepo build system
- **PNPM** - Fast, disk space efficient package manager
- **Docker** - Containerized development environment

## 📁 Project Structure

```
base1/
├── apps/
│   ├── web/                    # Main Nuxt 3 application
│   │   ├── components/         # Vue components
│   │   ├── pages/             # Application routes
│   │   ├── server/            # Server-side code
│   │   │   ├── api/           # API endpoints
│   │   │   └── utils/         # Server utilities
│   │   ├── composables/       # Vue composables
│   │   └── assets/            # Static assets
│   └── admin/                 # Admin panel (planned)
├── packages/
│   ├── database/              # Database layer
│   │   ├── src/schema/        # Drizzle schemas
│   │   └── src/migrations/    # Database migrations
│   ├── ui/                    # Shared UI components
│   ├── config/                # Shared configurations
│   └── utils/                 # Shared utilities
├── docker/                    # Docker configurations
└── scripts/                   # Build and deployment scripts
```

## 🗄️ Database Schema

### Blog Posts
- **Content Management**: Title, content, excerpt, and SEO metadata
- **Author Information**: Author details and reading time estimates
- **Publication**: Publishing status and scheduled dates
- **Media**: Featured images and media attachments

### Events
- **Event Details**: Title, description, and categorization
- **Location & Timing**: Venue information and event scheduling
- **Registration**: Registration URLs and attendee management
- **Capacity**: Maximum attendees and current registration count

### Contact Submissions
- **Contact Information**: Name, email, and company details
- **Communication**: Subject and message content
- **Tracking**: Submission timestamps and status

## 🔧 Development Commands

### Core Commands
```bash
# Start all applications in development mode
pnpm dev

# Start only the web application
pnpm dev:web

# Start only the admin panel (planned)
pnpm dev:admin

# Build for production
pnpm build
```

### Docker Services
```bash
# Start PostgreSQL + MinIO CDN for development
pnpm docker:dev

# Stop development services
pnpm docker:dev:down

# Start only MinIO CDN
pnpm docker:minio

# Stop only MinIO CDN
pnpm docker:minio:down

# Access MinIO Console: http://localhost:9001
# Access CDN: http://localhost:9080
```

### Full Environment Setup
```bash
# Start development environment with all services
docker-compose -f docker/docker-compose.dev.yml up -d

# Start production environment
docker-compose -f docker/docker-compose.prod.yml up -d

# Run linting
pnpm lint

# Run tests
pnpm test
```

### Database Commands
```bash
# Generate schema changes
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Open Drizzle Studio (database visualization)
pnpm db:studio
# Opens at: https://local.drizzle.studio?port=4983
```

### Docker Commands
```bash
# Start development services
pnpm docker:dev

# Stop all services
pnpm docker:down

# Restart services
docker-compose -f docker/docker-compose.dev.yml restart
```

## 🔒 Environment Variables

### Environment Files
- `.env.example` - Example environment variables

> **Note**: For EasyPanel deployments, ensure `.env.prod` exists as the deployment system expects this specific filename.

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/base1

# MinIO (File Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_USE_SSL=false
MINIO_PUBLIC_URL=http://localhost:9000

```

## 📊 Development Services

### PostgreSQL Database
- **Port:** 5432
- **Database:** base1
- **Username:** postgres
- **Password:** password

### MinIO Object Storage
- **API Port:** 9000
- **Console Port:** 9001
- **Access Key:** minioadmin
- **Secret Key:** minioadmin123
- **Web Console:** http://localhost:9001

## 🚀 Deployment

### Production Build
```bash
# Build all packages
pnpm build

# Build specific application
pnpm build --filter=web
```
