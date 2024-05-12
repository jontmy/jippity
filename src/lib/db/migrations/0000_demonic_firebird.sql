CREATE TABLE IF NOT EXISTS "jippity_account" (
	"account_provider" varchar NOT NULL,
	"github_id" varchar(40) NOT NULL,
	"user_id" char(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jippity_account_account_provider_github_id_pk" PRIMARY KEY("account_provider","github_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jippity_chat" (
	"id" char(16) PRIMARY KEY NOT NULL,
	"user_id" char(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jippity_message" (
	"id" char(16) PRIMARY KEY NOT NULL,
	"chat_id" char(16) NOT NULL,
	"user_id" char(16) NOT NULL,
	"content" text NOT NULL,
	"message_role" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jippity_session" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"user_id" char(16) NOT NULL,
	"provider" varchar NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jippity_user" (
	"id" char(16) PRIMARY KEY NOT NULL,
	"username" varchar(32) NOT NULL,
	"email" varchar(255),
	"picture" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jippity_account" ADD CONSTRAINT "jippity_account_user_id_jippity_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."jippity_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jippity_chat" ADD CONSTRAINT "jippity_chat_user_id_jippity_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."jippity_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jippity_message" ADD CONSTRAINT "jippity_message_chat_id_jippity_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."jippity_chat"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jippity_message" ADD CONSTRAINT "jippity_message_user_id_jippity_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."jippity_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jippity_session" ADD CONSTRAINT "jippity_session_user_id_jippity_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."jippity_user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
