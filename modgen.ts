import fs from "node:fs";
import path from "node:path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Please provide a module name.");
  process.exit(1);
}

// Helper: PascalCase
const toPascalCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Plural folder and files
const pluralModuleName = moduleName.endsWith("s") ? moduleName.toLowerCase() : moduleName.toLowerCase() + "s";
const ModuleName = toPascalCase(pluralModuleName);

// Prisma model name (singular)
const prismaModelName = pluralModuleName.endsWith("s") ? pluralModuleName.slice(0, -1) : pluralModuleName;

const baseDir = path.join(__dirname, "src", "app", "modules");
const modulePath = path.join(baseDir, pluralModuleName);

if (fs.existsSync(modulePath)) {
  console.error(`Module '${pluralModuleName}' already exists.`);
  process.exit(1);
}

try {
  fs.mkdirSync(modulePath, { recursive: true });

  // Convert to singular for controller function names
  const singularName = pluralModuleName.endsWith("s") ? pluralModuleName.slice(0, -1) : pluralModuleName;
  const SingularName = toPascalCase(singularName);

  const files: Record<string, string> = {
    [`${pluralModuleName}.controllers.ts`]: `import catchAsync from "@shared/catchAsync";

const create${SingularName} = catchAsync(async (req, res) => {
  console.log(req, res);
});

const get${ModuleName} = catchAsync(async (req, res) => {
  console.log(req, res);
});

const get${SingularName}ById = catchAsync(async (req, res) => {
  console.log(req, res);
});

const update${SingularName}ById = catchAsync(async (req, res) => {
  console.log(req, res);
});

const delete${SingularName}ById = catchAsync(async (req, res) => {
  console.log(req, res);
});

export const ${ModuleName}Controllers = {
  create${SingularName},
  get${ModuleName},
  get${SingularName}ById,
  update${SingularName}ById,
  delete${SingularName}ById,
};
`,

    [`${pluralModuleName}.services.ts`]: `import prisma from "@shared/prisma";

const create${SingularName}IntoDB = async () => {
  // Example: return await prisma.${prismaModelName}.create({ data: {...} });
};

const get${ModuleName}FromDB = async () => {
  return await prisma.${prismaModelName}.findMany();
};

const get${SingularName}ByIdFromDB = async () => {
  // Example: return await prisma.${prismaModelName}.findUnique({ where: {...} });
};

const update${SingularName}ByIdIntoDB = async () => {
  // Example: return await prisma.${prismaModelName}.update({ where: {...}, data: {...} });
};

const delete${SingularName}ByIdFromDB = async () => {
  // Example: return await prisma.${prismaModelName}.delete({ where: {...} });
};

export const ${ModuleName}Services = {
  create${SingularName}IntoDB,
  get${ModuleName}FromDB,
  get${SingularName}ByIdFromDB,
  update${SingularName}ByIdIntoDB,
  delete${SingularName}ByIdFromDB,
};
`,

    [`${pluralModuleName}.routes.ts`]: `import createRouter from "@shared/createRouter";
import { ${ModuleName}Controllers } from "./${pluralModuleName}.controllers";

const router = createRouter();

router.post("/", ${ModuleName}Controllers.create${SingularName});
router.get("/", ${ModuleName}Controllers.get${ModuleName});
router.get("/:id", ${ModuleName}Controllers.get${SingularName}ById);
router.patch("/:id", ${ModuleName}Controllers.update${SingularName}ById);
router.delete("/:id", ${ModuleName}Controllers.delete${SingularName}ById);

export const ${ModuleName}Routes = router;
`,

    [`${pluralModuleName}.types.ts`]: `export type T${SingularName} = {
  // Add your type properties here
  // Example:
  // id: string;
  // name: string;
  // email: string;
};
`,

    [`${pluralModuleName}.validators.ts`]: `import z from "zod";

const create${SingularName}ValidationSchema = z.object({
  body: z.object({
    // Add your validation schema here
    // Example:
    // name: z.string().min(2).max(100),
    // email: z.string().email(),
  }),
});

const ${singularName}IdParamsValidationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const update${SingularName}ByIdValidationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    // Add your optional validation schema here
    // Example:
    // name: z.string().min(2).max(100).optional(),
    // email: z.string().email().optional(),
  }),
});

export const ${ModuleName}Validators = {
  create${SingularName}ValidationSchema,
  ${singularName}IdParamsValidationSchema,
  update${SingularName}ByIdValidationSchema,
};
`,
  };

  for (const fileName in files) {
    const filePath = path.join(modulePath, fileName);
    fs.writeFileSync(filePath, files[fileName]);
    console.log(`Created file: ${filePath}`);
  }

  console.log(`Module '${pluralModuleName}' generated successfully in src/app/modules.`);
} catch (error) {
  console.error("Error generating module:", error);
  process.exit(1);
}
