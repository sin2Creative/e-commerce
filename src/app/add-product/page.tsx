import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Flomazon",
};

async function addProduct(formdata: FormData) {
  "use server";

  const name = formdata.get("name")?.toString();
  const price = Number(formdata.get("price") || 0);
  const description = formdata.get("description")?.toString();
  const imageUrl = formdata.get("imageUrl")?.toString();
  if (!name || !price || !description || !imageUrl) {
    throw Error("All fields are required");
  }

  await prisma.product.create({
    data: {
      name,
      price,
      description,
      imageUrl,
    },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          className="mb-3 w-full input input-bordered"
          name="name"
          placeholder="Name"
          required
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          className="mb-3 w-full input input-bordered"
          name="imageUrl"
          placeholder="ImageUrl"
          type="url"
          required
        />
        <input
          className="mb-3 w-full input input-bordered"
          name="price"
          placeholder="Price"
          type="number"
          required
        />
        <FormSubmitButton className="btn-block" type="submit">
          Ad Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
