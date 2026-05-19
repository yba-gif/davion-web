CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"author" varchar(100) NOT NULL,
	"read_time" varchar(20),
	"published" boolean DEFAULT false,
	"featured_image" varchar(500),
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"location" varchar(255) NOT NULL,
	"country" varchar(100),
	"event_date" timestamp NOT NULL,
	"end_date" timestamp,
	"image" varchar(500),
	"registration_url" varchar(500),
	"max_attendees" integer,
	"current_attendees" integer DEFAULT 0,
	"status" varchar(20) DEFAULT 'upcoming',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_name" varchar(255) DEFAULT 'Base1' NOT NULL,
	"site_description" text DEFAULT 'Market Makers. Capital Allocators On-Chain Operators',
	"contact_email" varchar(255) DEFAULT 'info@base1.io',
	"maintenance_mode" boolean DEFAULT false,
	"maintenance_message" text DEFAULT 'We are currently performing maintenance. Please check back soon.',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "verified" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"telegram" varchar(255) NOT NULL,
	"twitter" varchar(255),
	"email" varchar(255) NOT NULL,
	"website" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
