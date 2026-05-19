CREATE INDEX "idx_analytics_session_id" ON "analytics" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_analytics_created_at" ON "analytics" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_analytics_event_type" ON "analytics" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_analytics_page_path" ON "analytics" USING btree ("page_path");--> statement-breakpoint
CREATE INDEX "idx_analytics_referrer" ON "analytics" USING btree ("referrer");--> statement-breakpoint
CREATE INDEX "idx_analytics_composite" ON "analytics" USING btree ("created_at","session_id","event_type");--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "image";