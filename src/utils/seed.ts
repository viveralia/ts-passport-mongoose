import Category from "../models/Category";
import Role from "../models/Role";

export const createDefaultRoles = async () => {
  const count = await Role.estimatedDocumentCount();

  if (count > 0) return;

  const defaultRoles = await Promise.all([
    Role.create({ name: "PROVIDER" }),
    Role.create({ name: "CONSUMER" }),
  ]);

  console.log(`Roles created: ${defaultRoles}`);
};

export const createDefaultCategories = async () => {
  const count = await Category.estimatedDocumentCount();

  if (count > 0) return;

  const defaultCategories = await Promise.all([
    Category.create({ name: "DESIGN" }),
    Category.create({ name: "MARKETING" }),
    Category.create({ name: "PROGRAMMING" }),
  ]);

  console.log(`Categories created: ${defaultCategories}`);
};
