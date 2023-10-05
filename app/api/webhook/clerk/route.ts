import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createAppUser, deleteAppUser } from "@/lib/webhook/app-user.actions";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  // Handlers for each event type
  // User Created
  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      username,
      first_name,
      last_name,
      banned,
      image_url,
    } = evt.data;
    if (!id || !email_addresses.length || !username) {
      return new Response("Error occured -- missing user data", {
        status: 400,
      });
    }
    try {
      await createAppUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        imageUrl: image_url,
        username: username,
        firstName: first_name,
        lastName: last_name,
        banned,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Internal Server Error", {
        status: 500,
      });
    }
  }

  // User Updated
  if (eventType === "user.updated") {
    const {
      id,
      email_addresses,
      username,
      first_name,
      last_name,
      banned,
      image_url,
    } = evt.data;
    if (!id || !email_addresses.length || !username) {
      return new Response("Error occured -- missing user data", {
        status: 400,
      });
    }
    try {
      await createAppUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        imageUrl: image_url,
        username: username,
        firstName: first_name,
        lastName: last_name,
        banned,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Internal Server Error", {
        status: 500,
      });
    }
  }

  // User Deleted
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      return new Response("Error occured -- no user id", {
        status: 400,
      });
    }
    try {
      await deleteAppUser(id);
      return new Response("User Deleted", {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Internal Server Error", {
        status: 500,
      });
    }
  }

  // Email Created
  if (eventType === "email.created") {
    return new Response("Request for email creation accepted", {
      status: 202,
    });
  }

  return new Response("Error: No handler found for the specified event type.", {
    status: 404,
  });
}
