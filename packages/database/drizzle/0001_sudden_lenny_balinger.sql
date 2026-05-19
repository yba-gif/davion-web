CREATE TABLE "analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"user_id" varchar(255),
	"session_id" varchar(255),
	"page_path" varchar(500),
	"referrer" varchar(500),
	"user_agent" text,
	"ip_address" varchar(45),
	"country" varchar(2),
	"city" varchar(100),
	"device_type" varchar(50),
	"browser" varchar(50),
	"os" varchar(50),
	"duration" integer,
	"metadata" text,
	"created_at" timestamp DEFAULT now()
);
